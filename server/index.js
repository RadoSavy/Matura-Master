import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.resolve(__dirname, '../public')));

// Initialize Firebase Admin using environment variables (optional)
let db = null;
try {
  if (process.env.FIREBASE_PRIVATE_KEY) {
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

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID,
    });

    db = admin.firestore();
    console.log('Firebase Admin SDK initialized');
  } else {
    console.warn('Firebase credentials not found. Firebase features will be unavailable.');
  }
} catch (error) {
  console.error('Error initializing Firebase:', error.message);
}


// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

// Get Gemini API Key
app.get('/api/gemini-key', (req, res) => {
  const apiKey = process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Gemini API key not configured' });
  }
  res.json({ apiKey });
});

// ===== Lessons API Endpoints =====

/**
 * GET all lessons
 * GET /api/lessons
 */
app.get('/api/lessons', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Firestore not initialized' });
    }

    const snapshot = await db.collection('lessons').orderBy('id').get();
    const lessons = [];

    snapshot.forEach((doc) => {
      lessons.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.json(lessons);
  } catch (error) {
    console.error('Error fetching lessons:', error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET single lesson by ID
 * GET /api/lessons/:lessonId
 */
app.get('/api/lessons/:lessonId', async (req, res) => {
  try {
    const { lessonId } = req.params;

    if (!db) {
      return res.status(500).json({ error: 'Firestore not initialized' });
    }

    const doc = await db.collection('lessons').doc(lessonId).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    res.json({
      id: doc.id,
      ...doc.data(),
    });
  } catch (error) {
    console.error('Error fetching lesson:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ===== AI Knowledge Base API Endpoints =====

/**
 * GET quick questions for AI assistant
 * GET /api/knowledge-base/quick-questions
 */
app.get('/api/knowledge-base/quick-questions', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Firestore not initialized' });
    }

    const doc = await db.collection('ai_knowledge_base').doc('quick_questions').get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Quick questions not found' });
    }

    res.json(doc.data());
  } catch (error) {
    console.error('Error fetching quick questions:', error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET knowledge base topic
 * GET /api/knowledge-base/topic/:topicName
 */
app.get('/api/knowledge-base/topic/:topicName', async (req, res) => {
  try {
    const { topicName } = req.params;

    if (!db) {
      return res.status(500).json({ error: 'Firestore not initialized' });
    }

    const doc = await db.collection('ai_knowledge_base').doc(topicName).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Topic not found' });
    }

    res.json(doc.data());
  } catch (error) {
    console.error('Error fetching knowledge base topic:', error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET all knowledge base topics
 * GET /api/knowledge-base/topics
 */
app.get('/api/knowledge-base/topics', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Firestore not initialized' });
    }

    const snapshot = await db.collection('ai_knowledge_base').get();
    const topics = [];

    snapshot.forEach((doc) => {
      topics.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.json(topics);
  } catch (error) {
    console.error('Error fetching knowledge base topics:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ===== Literature Lessons API Endpoints =====

/**
 * GET all literature lessons
 * GET /api/literature/lessons
 */
app.get('/api/literature/lessons', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Firestore not initialized' });
    }

    const snapshot = await db.collection('literature_lessons').orderBy('id').get();
    const lessons = [];

    snapshot.forEach((doc) => {
      lessons.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.json(lessons);
  } catch (error) {
    console.error('Error fetching literature lessons:', error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET single literature lesson by ID
 * GET /api/literature/lessons/:lessonId
 */
app.get('/api/literature/lessons/:lessonId', async (req, res) => {
  try {
    const { lessonId } = req.params;

    if (!db) {
      return res.status(500).json({ error: 'Firestore not initialized' });
    }

    const doc = await db.collection('literature_lessons').doc(lessonId).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Literature lesson not found' });
    }

    res.json({
      id: doc.id,
      ...doc.data(),
    });
  } catch (error) {
    console.error('Error fetching literature lesson:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ===== Literature Texts API Endpoints =====

/**
 * GET all literature texts
 * GET /api/literature/texts
 */
app.get('/api/literature/texts', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Firestore not initialized' });
    }

    const snapshot = await db.collection('literature_texts').get();
    const texts = [];

    snapshot.forEach((doc) => {
      texts.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.json(texts);
  } catch (error) {
    console.error('Error fetching literature texts:', error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET single literature text by ID
 * GET /api/literature/texts/:textId
 */
app.get('/api/literature/texts/:textId', async (req, res) => {
  try {
    const { textId } = req.params;

    if (!db) {
      return res.status(500).json({ error: 'Firestore not initialized' });
    }

    const doc = await db.collection('literature_texts').doc(textId).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Literature text not found' });
    }

    res.json({
      id: doc.id,
      ...doc.data(),
    });
  } catch (error) {
    console.error('Error fetching literature text:', error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET literature texts by author
 * GET /api/literature/texts/author/:author
 */
app.get('/api/literature/texts/author/:author', async (req, res) => {
  try {
    const { author } = req.params;

    if (!db) {
      return res.status(500).json({ error: 'Firestore not initialized' });
    }

    const snapshot = await db.collection('literature_texts')
      .where('author', '==', author)
      .get();
    
    const texts = [];

    snapshot.forEach((doc) => {
      texts.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.json(texts);
  } catch (error) {
    console.error('Error fetching texts by author:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ===== Firestore CRUD Operations =====

/**
 * ADD - Create a new document
 * POST /api/documents/:collectionName
 */
app.post('/api/documents/:collectionName', async (req, res) => {
  try {
    const { collectionName } = req.params;
    const data = req.body;

    if (!collectionName || !data) {
      return res.status(400).json({ error: 'Collection name and data are required' });
    }

    const docRef = await db.collection(collectionName).add({
      ...data,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({
      message: 'Document created successfully',
      id: docRef.id,
    });
  } catch (error) {
    console.error('Error adding document:', error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET - Retrieve all documents from a collection
 * GET /api/documents/:collectionName
 */
app.get('/api/documents/:collectionName', async (req, res) => {
  try {
    const { collectionName } = req.params;

    const snapshot = await db.collection(collectionName).get();
    const documents = [];

    snapshot.forEach((doc) => {
      documents.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET - Retrieve a single document by ID
 * GET /api/documents/:collectionName/:docId
 */
app.get('/api/documents/:collectionName/:docId', async (req, res) => {
  try {
    const { collectionName, docId } = req.params;

    const doc = await db.collection(collectionName).doc(docId).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json({
      id: doc.id,
      ...doc.data(),
    });
  } catch (error) {
    console.error('Error fetching document:', error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * UPDATE - Update an existing document
 * PUT /api/documents/:collectionName/:docId
 */
app.put('/api/documents/:collectionName/:docId', async (req, res) => {
  try {
    const { collectionName, docId } = req.params;
    const data = req.body;

    await db.collection(collectionName).doc(docId).update({
      ...data,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({
      message: 'Document updated successfully',
      id: docId,
    });
  } catch (error) {
    console.error('Error updating document:', error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE - Delete a document
 * DELETE /api/documents/:collectionName/:docId
 */
app.delete('/api/documents/:collectionName/:docId', async (req, res) => {
  try {
    const { collectionName, docId } = req.params;

    await db.collection(collectionName).doc(docId).delete();

    res.json({
      message: 'Document deleted successfully',
      id: docId,
    });
  } catch (error) {
    console.error('Error deleting document:', error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * BATCH UPLOAD - Upload multiple documents at once
 * POST /api/batch/:collectionName
 */
app.post('/api/batch/:collectionName', async (req, res) => {
  try {
    const { collectionName } = req.params;
    const { documents } = req.body;

    if (!Array.isArray(documents)) {
      return res.status(400).json({ error: 'Documents must be an array' });
    }

    const batch = db.batch();
    const docIds = [];

    documents.forEach((docData) => {
      const docRef = db.collection(collectionName).doc();
      batch.set(docRef, {
        ...docData,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      docIds.push(docRef.id);
    });

    await batch.commit();

    res.status(201).json({
      message: `${documents.length} documents uploaded successfully`,
      count: documents.length,
      ids: docIds,
    });
  } catch (error) {
    console.error('Error batch uploading documents:', error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * QUERY - Search documents by a field
 * GET /api/query/:collectionName?field=fieldName&value=fieldValue
 */
app.get('/api/query/:collectionName', async (req, res) => {
  try {
    const { collectionName } = req.params;
    const { field, value } = req.query;

    if (!field || !value) {
      return res.status(400).json({ error: 'field and value parameters are required' });
    }

    const snapshot = await db
      .collection(collectionName)
      .where(field, '==', value)
      .get();

    const documents = [];
    snapshot.forEach((doc) => {
      documents.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.json(documents);
  } catch (error) {
    console.error('Error querying documents:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error.message);
  res.status(500).json({
    error: error.message || 'Internal server error',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
  console.log(`📊 Firestore database connected to project: ${process.env.FIREBASE_PROJECT_ID}`);
});
