import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.FIREBASE_PROJECT_ID,
});

const db = admin.firestore();

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Backend is running' });
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
