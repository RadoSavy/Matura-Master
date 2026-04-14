class FirestoreUploader {
  constructor(apiBaseUrl = typeof window !== 'undefined' ? `${window.location.origin}/api` : 'http://localhost:5000/api') {
    this.apiBaseUrl = apiBaseUrl;
  }

  /**
   * @param {string} collectionName 
   * @param {object} data 
   * @returns {Promise<object>} 
   */
  async addDocument(collectionName, data) {
    this._validateCollectionName(collectionName);
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
   * @param {string} collectionName
   * @returns {Promise<Array>}
   */
  async getDocuments(collectionName) {
    this._validateCollectionName(collectionName);
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
   * @param {string} collectionName 
   * @param {string} docId 
   * @returns {Promise<object>} 
   */
  async getDocument(collectionName, docId) {
    this._validateCollectionName(collectionName);
    this._validateDocId(docId);
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
   * @param {string} collectionName
   * @param {string} docId
   * @param {object} data
   * @returns {Promise<object>} 
   */
  async updateDocument(collectionName, docId, data) {
    this._validateCollectionName(collectionName);
    this._validateDocId(docId);
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
   * @param {string} collectionName 
   * @param {string} docId 
   * @returns {Promise<object>} 
   */
  async deleteDocument(collectionName, docId) {
    this._validateCollectionName(collectionName);
    this._validateDocId(docId);
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
   * @param {string} collectionName 
   * @param {Array<object>} documents 
   * @returns {Promise<object>} 
   */
  async batchUpload(collectionName, documents) {
    this._validateCollectionName(collectionName);
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
   * @param {string} collectionName 
   * @param {string} field 
   * @param {*} value 
   * @returns {Promise<Array>} 
   */
  async queryDocuments(collectionName, field, value) {
    this._validateCollectionName(collectionName);
    if (!field || typeof field !== 'string') {
      throw new Error('Invalid field name');
    }
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
   * @param {string} collectionName 
   * @param {HTMLFormElement} form 
   * @returns {Promise<object>}
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

  _validateCollectionName(collectionName) {
    if (!collectionName || typeof collectionName !== 'string') {
      throw new Error('Invalid collection name');
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(collectionName)) {
      throw new Error('Collection name contains invalid characters');
    }
  }

  _validateDocId(docId) {
    if (!docId || typeof docId !== 'string') {
      throw new Error('Invalid document ID');
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(docId)) {
      throw new Error('Document ID contains invalid characters');
    }
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = FirestoreUploader;
}

window.FirestoreUploader = FirestoreUploader;
