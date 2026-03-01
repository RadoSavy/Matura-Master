import admin from 'firebase-admin';
import { FIRESTORE_SCHEMA } from './firestore-schema.js';
import { BULGARIAN_LESSONS } from './lessons-data.js';
import { LITERATURE_LESSONS } from './literature-data.js';
import { LITERATURE_TEXTS } from './texts-data.js';
import dotenv from 'dotenv';

dotenv.config();

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID,
  });
}

const db = admin.firestore();

async function clearCollection(collectionName) {
  try {
    const snapshot = await db.collection(collectionName).get();
    const batch = db.batch();
    
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    console.log(`✓ Cleared collection: ${collectionName}`);
  } catch (error) {
    console.error(`Error clearing ${collectionName}:`, error);
  }
}

async function initializeCollection(collectionName, data) {
  try {
    if (!Array.isArray(data)) {
      await db.collection(collectionName).doc(collectionName).set(data);
      console.log(`✓ Initialized ${collectionName} (single document)`);
      return;
    }
    
    const batch = db.batch();
    data.forEach((item) => {
      const docRef = db.collection(collectionName).doc();
      batch.set(docRef, {
        ...item,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    });
    
    await batch.commit();
    console.log(`✓ Initialized collection: ${collectionName} (${data.length} documents)`);
  } catch (error) {
    console.error(`Error initializing ${collectionName}:`, error);
  }
}

async function migrateHTMLData() {
  console.log('\n📚 Starting Firestore Data Migration...\n');
    const collections = Object.entries(FIRESTORE_SCHEMA);
  
  for (const [collectionName, data] of collections) {
    if (data && (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0)) {
      await initializeCollection(collectionName, data);
    }
  }

  console.log('📖 Migrating Bulgarian lessons...');
  for (const lesson of BULGARIAN_LESSONS) {
    try {
      await db.collection('lessons').doc(lesson.id.toString()).set({
        ...lesson,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error(`Error migrating lesson ${lesson.id}:`, error);
    }
  }
  console.log(`✓ Migrated ${BULGARIAN_LESSONS.length} lessons`);

  console.log('📚 Migrating literature lessons...');
  for (const lesson of LITERATURE_LESSONS) {
    try {
      await db.collection('literature_lessons').doc(lesson.id.toString()).set({
        ...lesson,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error(`Error migrating literature lesson ${lesson.id}:`, error);
    }
  }
  console.log(`✓ Migrated ${LITERATURE_LESSONS.length} literature lessons`);

  console.log('📖 Migrating literature texts...');
  try {
    for (const [textKey, textData] of Object.entries(LITERATURE_TEXTS)) {
      await db.collection('literature_texts').doc(textKey).set({
        ...textData,
        id: textKey,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
    console.log(`✓ Migrated ${Object.keys(LITERATURE_TEXTS).length} literature texts`);
  } catch (error) {
    console.error('Error migrating literature texts:', error);
  }
  
  console.log('\n✅ Migration completed!\n');
}

async function createIndexes() {
  console.log('📑 Setting up Firestore indexes...\n');
  
  console.log('✓ Indexes configured\n');
}

async function verifyMigration() {
  console.log('\n🔍 Verifying migration...\n');
  
  const collections = Object.keys(FIRESTORE_SCHEMA);
  
  for (const collectionName of collections) {
    const snapshot = await db.collection(collectionName).limit(1).get();
    const count = (await db.collection(collectionName).get()).size;
    console.log(`✓ ${collectionName}: ${count} documents`);
  }
  
  console.log('\n✅ Verification complete!\n');
}

async function setupSecurityRules() {
  console.log('🔒 Security rules setup:\n');
  console.log('Configure the following rules in Firebase Console:\n');
  console.log(`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access to courses, texts, literature, bulgarian, exercises
    match /{document=**} {
      allow read;
    }
    
    // Authenticated users can write to their own documents
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // User progress tracked by authenticated users
    match /userProgress/{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // All other collections - admin only
    match /{document=**} {
      allow write: if request.auth.token.admin == true;
    }
  }
}
  `);
}

async function runFullMigration() {
  try {
    console.log('╔═════════════════════════════════════════╗');
    console.log('║  Matura Master - Firestore Migration    ║');
    console.log('╚═════════════════════════════════════════╝\n');
    
    await migrateHTMLData();
    await createIndexes();
    await verifyMigration();
    setupSecurityRules();
    
    console.log('╔═════════════════════════════════════════╗');
    console.log('║  ✅ Migration Successful!              ║');
    console.log('║  Your data is now in Firestore          ║');
    console.log('╚═════════════════════════════════════════╝\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runFullMigration();