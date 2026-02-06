import { db } from './firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  getDoc,
  writeBatch,
} from 'firebase/firestore';

/**
 * Add a new document to a Firestore collection
 * @param {string} collectionName - Collection name in Firestore
 * @param {object} data - Data to upload
 * @returns {Promise<string>} Document ID
 */
export const addFirestoreDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error(`Error adding document to ${collectionName}`);
    throw error;
  }
};

/**
 * Update an existing Firestore document
 * @param {string} collectionName - Collection name
 * @param {string} docId - Document ID
 * @param {object} data - Data to update
 */
export const updateFirestoreDocument = async (collectionName, docId, data) => {
  try {
    await updateDoc(doc(db, collectionName, docId), {
      ...data,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error(`Error updating document in ${collectionName}`);
    throw error;
  }
};

/**
 * Delete a Firestore document
 * @param {string} collectionName - Collection name
 * @param {string} docId - Document ID
 */
export const deleteFirestoreDocument = async (collectionName, docId) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}`);
    throw error;
  }
};

/**
 * Get all documents from a collection
 * @param {string} collectionName - Collection name
 * @returns {Promise<Array>} Array of documents with IDs
 */
export const getAllFirestoreDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(`Error fetching documents from ${collectionName}`);
    throw error;
  }
};

/**
 * Get a single document by ID
 * @param {string} collectionName - Collection name
 * @param {string} docId - Document ID
 * @returns {Promise<object>} Document data
 */
export const getFirestoreDocument = async (collectionName, docId) => {
  try {
    const docSnap = await getDoc(doc(db, collectionName, docId));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching document from ${collectionName}`);
    throw error;
  }
};

/**
 * Query documents by a specific field
 * @param {string} collectionName - Collection name
 * @param {string} fieldName - Field to query
 * @param {*} fieldValue - Value to match
 * @returns {Promise<Array>} Matching documents
 */
export const queryFirestoreDocuments = async (
  collectionName,
  fieldName,
  fieldValue
) => {
  try {
    const q = query(
      collection(db, collectionName),
      where(fieldName, '==', fieldValue)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(`Error querying documents from ${collectionName}`);
    throw error;
  }
};

/**
 * Batch upload multiple documents
 * @param {string} collectionName - Collection name
 * @param {Array<object>} documents - Array of documents to upload
 */
export const batchUploadFirestoreDocuments = async (
  collectionName,
  documents
) => {
  try {
    const batch = writeBatch(db);
    const docRefs = [];

    for (const docData of documents) {
      const docRef = doc(collection(db, collectionName));
      batch.set(docRef, {
        ...docData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      docRefs.push(docRef.id);
    }

    await batch.commit();
    return docRefs;
  } catch (error) {
    console.error(`Error batch uploading documents to ${collectionName}`);
    throw error;
  }
};

/**
 * Delete entire collection (use with caution)
 * @param {string} collectionName - Collection name
 */
export const deleteFirestoreCollection = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const batch = writeBatch(db);

    querySnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
  } catch (error) {
    console.error(`Error deleting collection ${collectionName}`);
    throw error;
  }
};

export default {
  addFirestoreDocument,
  updateFirestoreDocument,
  deleteFirestoreDocument,
  getAllFirestoreDocuments,
  getFirestoreDocument,
  queryFirestoreDocuments,
  batchUploadFirestoreDocuments,
  deleteFirestoreCollection,
};
