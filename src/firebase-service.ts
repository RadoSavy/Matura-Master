import { firebaseConfig } from './firebase-config';

// Firebase imports - these would come from Firebase SDK
declare const firebase: any;

// Type definitions for Firestore documents
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
  lastLogin: Date;
  xp: number;
  streak: number;
  completedLessons: number[];
  completedLiteratureLessons: number[];
  preferences?: {
    theme?: 'light' | 'dark';
    notifications?: boolean;
  };
}

export interface LessonProgress {
  userId: string;
  lessonId: number;
  lessonType: 'bulgarian' | 'literature';
  completedAt: Date;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  xpEarned: number;
}

export interface KnowledgeBaseDocument {
  id: string;
  category: string;
  keywords: string[];
  answer: string;
  examples?: string[];
  quotes?: string[];
  themes?: string[];
  rules?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface LiteraryWorkDocument {
  id: string;
  title: string;
  author: string;
  category: 'chintulov' | 'botev' | 'vazov' | 'yovkov' | 'other';
  text: string;
  analysis: string;
  keywords: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  userId: string;
  message: string;
  response: string;
  timestamp: Date;
  formatted: boolean;
}

class FirebaseService {
  private db: any;
  private auth: any;
  private currentUser: any = null;

  constructor() {
    this.initializeFirebase();
  }

  private initializeFirebase(): void {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.db = firebase.firestore();
    this.auth = firebase.auth();

    // Listen to auth state changes
    this.auth.onAuthStateChanged((user: any) => {
      this.currentUser = user;
      if (user) {
        this.updateLastLogin(user.uid);
      }
    });
  }

  // ==================== Authentication ====================

  async signInWithEmail(email: string, password: string): Promise<any> {
    try {
      const result = await this.auth.signInWithEmailAndPassword(email, password);
      await this.updateLastLogin(result.user.uid);
      return result.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async signUpWithEmail(email: string, password: string, displayName: string): Promise<any> {
    try {
      const result = await this.auth.createUserWithEmailAndPassword(email, password);
      const user = result.user;

      // Update profile
      await user.updateProfile({ displayName });

      // Create user document
      await this.createUserProfile(user.uid, email, displayName);

      return user;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  async signInWithGoogle(): Promise<any> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await this.auth.signInWithPopup(provider);
      const user = result.user;

      // Check if user profile exists, create if not
      const userDoc = await this.db.collection('users').doc(user.uid).get();
      if (!userDoc.exists) {
        await this.createUserProfile(user.uid, user.email, user.displayName, user.photoURL);
      } else {
        await this.updateLastLogin(user.uid);
      }

      return user;
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await this.auth.signOut();
      this.currentUser = null;
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  getCurrentUser(): any {
    return this.currentUser;
  }

  // ==================== User Profile ====================

  private async createUserProfile(
    uid: string,
    email: string,
    displayName: string,
    photoURL?: string
  ): Promise<void> {
    const userProfile: UserProfile = {
      uid,
      email,
      displayName,
      photoURL,
      createdAt: new Date(),
      lastLogin: new Date(),
      xp: 0,
      streak: 0,
      completedLessons: [],
      completedLiteratureLessons: [],
      preferences: {
        theme: 'light',
        notifications: true
      }
    };

    await this.db.collection('users').doc(uid).set(userProfile);
  }

  async getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      const doc = await this.db.collection('users').doc(uid).get();
      return doc.exists ? doc.data() as UserProfile : null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  }

  private async updateLastLogin(uid: string): Promise<void> {
    try {
      await this.db.collection('users').doc(uid).update({
        lastLogin: new Date()
      });
    } catch (error) {
      console.error('Error updating last login:', error);
    }
  }

  async updateUserXP(uid: string, xpToAdd: number): Promise<void> {
    try {
      await this.db.collection('users').doc(uid).update({
        xp: firebase.firestore.FieldValue.increment(xpToAdd)
      });
    } catch (error) {
      console.error('Error updating XP:', error);
      throw error;
    }
  }

  async updateUserStreak(uid: string, newStreak: number): Promise<void> {
    try {
      await this.db.collection('users').doc(uid).update({
        streak: newStreak
      });
    } catch (error) {
      console.error('Error updating streak:', error);
      throw error;
    }
  }

  // ==================== Lesson Progress ====================

  async saveLessonProgress(progress: LessonProgress): Promise<void> {
    try {
      // Add to lesson progress collection
      await this.db.collection('lessonProgress').add(progress);

      // Update user's completed lessons
      const field = progress.lessonType === 'bulgarian' 
        ? 'completedLessons' 
        : 'completedLiteratureLessons';

      await this.db.collection('users').doc(progress.userId).update({
        [field]: firebase.firestore.FieldValue.arrayUnion(progress.lessonId)
      });

      // Update XP
      await this.updateUserXP(progress.userId, progress.xpEarned);
    } catch (error) {
      console.error('Error saving lesson progress:', error);
      throw error;
    }
  }

  async getUserLessonProgress(
    userId: string,
    lessonType: 'bulgarian' | 'literature'
  ): Promise<LessonProgress[]> {
    try {
      const snapshot = await this.db
        .collection('lessonProgress')
        .where('userId', '==', userId)
        .where('lessonType', '==', lessonType)
        .orderBy('completedAt', 'desc')
        .get();

      return snapshot.docs.map((doc: any) => ({
        ...doc.data(),
        completedAt: doc.data().completedAt.toDate()
      }));
    } catch (error) {
      console.error('Error getting lesson progress:', error);
      return [];
    }
  }

  async getCompletedLessons(userId: string, lessonType: 'bulgarian' | 'literature'): Promise<number[]> {
    try {
      const userDoc = await this.db.collection('users').doc(userId).get();
      if (!userDoc.exists) return [];

      const field = lessonType === 'bulgarian' 
        ? 'completedLessons' 
        : 'completedLiteratureLessons';

      return userDoc.data()[field] || [];
    } catch (error) {
      console.error('Error getting completed lessons:', error);
      return [];
    }
  }

  // ==================== Knowledge Base ====================

  async getKnowledgeBaseEntry(keyword: string): Promise<KnowledgeBaseDocument | null> {
    try {
      const snapshot = await this.db
        .collection('knowledgeBase')
        .where('keywords', 'array-contains', keyword.toLowerCase())
        .limit(1)
        .get();

      if (snapshot.empty) return null;

      return snapshot.docs[0].data() as KnowledgeBaseDocument;
    } catch (error) {
      console.error('Error getting knowledge base entry:', error);
      return null;
    }
  }

  async searchKnowledgeBase(query: string): Promise<KnowledgeBaseDocument[]> {
    try {
      const keywords = query.toLowerCase().split(' ');
      
      const snapshot = await this.db
        .collection('knowledgeBase')
        .where('keywords', 'array-contains-any', keywords.slice(0, 10)) // Firestore limit
        .limit(5)
        .get();

      return snapshot.docs.map((doc: any) => doc.data() as KnowledgeBaseDocument);
    } catch (error) {
      console.error('Error searching knowledge base:', error);
      return [];
    }
  }

  async addKnowledgeBaseEntry(entry: Omit<KnowledgeBaseDocument, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await this.db.collection('knowledgeBase').add({
        ...entry,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding knowledge base entry:', error);
      throw error;
    }
  }

  // ==================== Literary Works ====================

  async getLiteraryWork(workId: string): Promise<LiteraryWorkDocument | null> {
    try {
      const doc = await this.db.collection('literaryWorks').doc(workId).get();
      return doc.exists ? doc.data() as LiteraryWorkDocument : null;
    } catch (error) {
      console.error('Error getting literary work:', error);
      return null;
    }
  }

  async getAllLiteraryWorks(): Promise<LiteraryWorkDocument[]> {
    try {
      const snapshot = await this.db.collection('literaryWorks').orderBy('title').get();
      return snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      } as LiteraryWorkDocument));
    } catch (error) {
      console.error('Error getting literary works:', error);
      return [];
    }
  }

  async getLiteraryWorksByAuthor(author: string): Promise<LiteraryWorkDocument[]> {
    try {
      const snapshot = await this.db
        .collection('literaryWorks')
        .where('author', '==', author)
        .orderBy('title')
        .get();

      return snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      } as LiteraryWorkDocument));
    } catch (error) {
      console.error('Error getting literary works by author:', error);
      return [];
    }
  }

  // ==================== Chat History ====================

  async saveChatMessage(userId: string, message: string, response: string, formatted: boolean): Promise<void> {
    try {
      await this.db.collection('chatHistory').add({
        userId,
        message,
        response,
        formatted,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Error saving chat message:', error);
    }
  }

  async getChatHistory(userId: string, limit: number = 50): Promise<ChatMessage[]> {
    try {
      const snapshot = await this.db
        .collection('chatHistory')
        .where('userId', '==', userId)
        .orderBy('timestamp', 'desc')
        .limit(limit)
        .get();

      return snapshot.docs.map((doc: any) => ({
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate()
      }));
    } catch (error) {
      console.error('Error getting chat history:', error);
      return [];
    }
  }

  // ==================== Leaderboard ====================

  async getLeaderboard(limit: number = 10): Promise<UserProfile[]> {
    try {
      const snapshot = await this.db
        .collection('users')
        .orderBy('xp', 'desc')
        .limit(limit)
        .get();

      return snapshot.docs.map((doc: any) => doc.data() as UserProfile);
    } catch (error) {
      console.error('Error getting leaderboard:', error);
      return [];
    }
  }

  // ==================== Real-time Listeners ====================

  onUserProfileChange(uid: string, callback: (profile: UserProfile | null) => void): () => void {
    return this.db.collection('users').doc(uid).onSnapshot(
      (doc: any) => {
        callback(doc.exists ? doc.data() as UserProfile : null);
      },
      (error: any) => {
        console.error('Error listening to user profile:', error);
        callback(null);
      }
    );
  }
}

// Export singleton instance
export const firebaseService = new FirebaseService();
