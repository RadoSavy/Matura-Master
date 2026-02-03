/**
 * Firestore Utility for Static HTML Files
 * This file provides functions to upload data to Firestore from static JavaScript
 * Can be imported in HTML script tags and used with vanilla JavaScript
 */

class FirestoreUploader {
  constructor(apiBaseUrl = 'http://localhost:5000/api') {
    this.apiBaseUrl = apiBaseUrl;
  }

  /**
   * Upload a single document to Firestore
   * @param {string} collectionName - Firestore collection name
   * @param {object} data - Data to upload
   * @returns {Promise<object>} Response with document ID
   */
  async addDocument(collectionName, data) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/documents/${collectionName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding document:', error);
      throw error;
    }
  }

  /**
   * Fetch all documents from a collection
   * @param {string} collectionName - Firestore collection name
   * @returns {Promise<Array>} Array of documents
   */
  async getDocuments(collectionName) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/documents/${collectionName}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching documents:', error);
      throw error;
    }
  }

  /**
   * Fetch a single document by ID
   * @param {string} collectionName - Firestore collection name
   * @param {string} docId - Document ID
   * @returns {Promise<object>} Document data
   */
  async getDocument(collectionName, docId) {
    try {
      const response = await fetch(
        `${this.apiBaseUrl}/documents/${collectionName}/${docId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching document:', error);
      throw error;
    }
  }

  /**
   * Update a document
   * @param {string} collectionName - Firestore collection name
   * @param {string} docId - Document ID
   * @param {object} data - Updated data
   * @returns {Promise<object>} Response message
   */
  async updateDocument(collectionName, docId, data) {
    try {
      const response = await fetch(
        `${this.apiBaseUrl}/documents/${collectionName}/${docId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  }

  /**
   * Delete a document
   * @param {string} collectionName - Firestore collection name
   * @param {string} docId - Document ID
   * @returns {Promise<object>} Response message
   */
  async deleteDocument(collectionName, docId) {
    try {
      const response = await fetch(
        `${this.apiBaseUrl}/documents/${collectionName}/${docId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  }

  /**
   * Batch upload multiple documents
   * @param {string} collectionName - Firestore collection name
   * @param {Array<object>} documents - Array of documents to upload
   * @returns {Promise<object>} Response with document IDs and count
   */
  async batchUpload(collectionName, documents) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/batch/${collectionName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ documents }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error batch uploading documents:', error);
      throw error;
    }
  }

  /**
   * Query documents by field value
   * @param {string} collectionName - Firestore collection name
   * @param {string} field - Field name to query
   * @param {*} value - Value to match
   * @returns {Promise<Array>} Array of matching documents
   */
  async queryDocuments(collectionName, field, value) {
    try {
      const params = new URLSearchParams({
        field,
        value: String(value),
      });

      const response = await fetch(
        `${this.apiBaseUrl}/query/${collectionName}?${params}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error querying documents:', error);
      throw error;
    }
  }

  /**
   * Submit a form to Firestore
   * @param {string} collectionName - Collection name
   * @param {HTMLFormElement} form - Form element
   * @returns {Promise<object>} Response from server
   */
  async submitForm(collectionName, form) {
    try {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      return await this.addDocument(collectionName, data);
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FirestoreUploader;
}

// Make available globally for inline script usage
window.FirestoreUploader = FirestoreUploader;
