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
 * @param {string} collectionName 
 * @param {object} data 
 * @returns {Promise<string>}
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
 * @param {string} collectionName
 * @param {string} docId
 * @param {object} data
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
 * @param {string} collectionName 
 * @param {string} docId 
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
 * @param {string} collectionName 
 * @returns {Promise<Array>} 
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
 * @param {string} collectionName 
 * @param {string} docId 
 * @returns {Promise<object>}
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
 * @param {string} collectionName 
 * @param {string} fieldName 
 * @param {*} fieldValue 
 * @returns {Promise<Array>}
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
 * @param {string} collectionName 
 * @param {Array<object>} documents 
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
 * @param {string} collectionName
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
