/**
 * Enhanced Firestore Integration Module
 * Provides utilities for HTML files to interact with Firestore via the backend API
 * 
 * Usage in HTML:
 * <script src="/scripts/firestore-integration.js"></script>
 * <script>
 *   const fs = new FirestoreIntegration('http://localhost:5000/api');
 *   fs.loadDocuments('courses').then(courses => { ... });
 * </script>
 */

class FirestoreIntegration {
  constructor(apiBaseUrl = 'http://localhost:5000/api') {
    this.apiBaseUrl = apiBaseUrl;
    this.cache = {};
  }

  // ==================== Document Operations ====================

  /**
   * Create a new document in Firestore
   */
  async addDocument(collectionName, data) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/documents/${collectionName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Error adding document to ${collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Load all documents from a collection
   */
  async loadDocuments(collectionName, useCache = true) {
    try {
      // Check cache first
      if (useCache && this.cache[collectionName]) {
        return this.cache[collectionName];
      }

      const response = await fetch(`${this.apiBaseUrl}/documents/${collectionName}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const documents = await response.json();
      this.cache[collectionName] = documents;
      return documents;
    } catch (error) {
      console.error(`Error loading documents from ${collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Get a single document by ID
   */
  async getDocument(collectionName, docId) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/documents/${collectionName}/${docId}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching document ${docId}:`, error);
      throw error;
    }
  }

  /**
   * Update a document
   */
  async updateDocument(collectionName, docId, data) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/documents/${collectionName}/${docId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Error updating document ${docId}:`, error);
      throw error;
    }
  }

  /**
   * Delete a document
   */
  async deleteDocument(collectionName, docId) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/documents/${collectionName}/${docId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      // Invalidate cache
      this.cache[collectionName] = null;
      return await response.json();
    } catch (error) {
      console.error(`Error deleting document ${docId}:`, error);
      throw error;
    }
  }

  /**
   * Upload multiple documents at once (batch upload)
   */
  async batchUploadDocuments(collectionName, documents) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/batch/${collectionName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documents }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      this.cache[collectionName] = null; // Invalidate cache
      return await response.json();
    } catch (error) {
      console.error(`Error batch uploading to ${collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Query documents by field value
   */
  async queryDocuments(collectionName, field, value) {
    try {
      const response = await fetch(
        `${this.apiBaseUrl}/query/${collectionName}?field=${field}&value=${value}`
      );

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Error querying ${collectionName}:`, error);
      throw error;
    }
  }

  // ==================== AI Integration ====================

  /**
   * Ask a question to the AI service
   */
  async askAI(question, context = null) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/ai/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, context }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error asking AI:', error);
      throw error;
    }
  }

  /**
   * Generate exercises on a topic
   */
  async generateExercises(topic, difficulty = 'medium', count = 5) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/ai/generate-exercise`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, difficulty, count }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error generating exercises:', error);
      throw error;
    }
  }

  /**
   * Grade a user submission
   */
  async gradeSubmission(exerciseId, userAnswer, correctAnswer) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/ai/grade-submission`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exercise_id: exerciseId, user_answer: userAnswer, correct_answer: correctAnswer }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error grading submission:', error);
      throw error;
    }
  }

  /**
   * Get personalized learning recommendation
   */
  async getRecommendation(userProgress) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/ai/recommendation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_progress: userProgress }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error getting recommendation:', error);
      throw error;
    }
  }

  /**
   * Create a study plan
   */
  async createStudyPlan(userId, topics, durationWeeks = 4) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/ai/create-study-plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, topics, duration_weeks: durationWeeks }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error creating study plan:', error);
      throw error;
    }
  }

  /**
   * Get next lesson suggestion
   */
  async getNextLesson(userId, currentProgress) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/ai/next-lesson`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, current_progress: currentProgress }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error getting next lesson:', error);
      throw error;
    }
  }

  /**
   * Generate an assessment/quiz
   */
  async generateAssessment(topic, numQuestions = 10) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/ai/assessment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, num_questions: numQuestions }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error generating assessment:', error);
      throw error;
    }
  }

  /**
   * Search knowledge base
   */
  async searchKnowledge(query) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/ai/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error searching knowledge base:', error);
      throw error;
    }
  }

  // ==================== Utility Methods ====================

  /**
   * Clear the cache
   */
  clearCache(collectionName = null) {
    if (collectionName) {
      this.cache[collectionName] = null;
    } else {
      this.cache = {};
    }
  }

  /**
   * Load multiple collections at once
   */
  async loadMultiple(collectionNames) {
    const promises = collectionNames.map(name => this.loadDocuments(name));
    return Promise.all(promises);
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FirestoreIntegration;
}
