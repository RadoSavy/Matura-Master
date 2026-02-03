/**
 * Integration Examples
 * Shows how to integrate Firestore uploader into your existing HTML pages
 */

// ============================================
// EXAMPLE 1: Basic Form Upload
// ============================================

/*
HTML:
<form id="courseForm">
  <input type="text" name="title" placeholder="Course Title" required>
  <textarea name="description" placeholder="Course Description" required></textarea>
  <button type="submit">Upload Course</button>
</form>

JavaScript:
*/
function setupCourseForm() {
  const uploader = new FirestoreUploader('http://localhost:5000/api');
  const form = document.getElementById('courseForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
      const result = await uploader.submitForm('courses', form);
      console.log('Course uploaded:', result.id);
      form.reset();
      alert('Course uploaded successfully!');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  });
}

// ============================================
// EXAMPLE 2: Upload with Custom Data
// ============================================

/*
// Upload custom object
*/
async function uploadTextWithMetadata() {
  const uploader = new FirestoreUploader('http://localhost:5000/api');

  const textData = {
    title: 'Bulgarian Folk Tales',
    author: 'Ivan Vazov',
    content: 'Once upon a time...',
    category: 'Literature',
    language: 'bg',
    difficulty: 'intermediate',
    tags: ['bulgarian', 'literature', 'folk-tales']
  };

  try {
    const result = await uploader.addDocument('texts', textData);
    console.log('Text uploaded with ID:', result.id);
  } catch (error) {
    console.error('Upload failed:', error);
  }
}

// ============================================
// EXAMPLE 3: Load and Display Data
// ============================================

/*
// Fetch all courses and display them
*/
async function displayAllCourses() {
  const uploader = new FirestoreUploader('http://localhost:5000/api');

  try {
    const courses = await uploader.getDocuments('courses');

    const coursesList = document.getElementById('courses-list');
    coursesList.innerHTML = courses
      .map(course => `
        <div class="course-item">
          <h3>${course.title}</h3>
          <p>${course.description}</p>
          <small>ID: ${course.id}</small>
        </div>
      `)
      .join('');
  } catch (error) {
    console.error('Error loading courses:', error);
  }
}

// ============================================
// EXAMPLE 4: Update Existing Document
// ============================================

/*
// Update a document
*/
async function updateCourse(courseId, updates) {
  const uploader = new FirestoreUploader('http://localhost:5000/api');

  try {
    const result = await uploader.updateDocument('courses', courseId, {
      title: updates.title,
      description: updates.description,
      lastUpdated: new Date().toISOString()
    });
    console.log('Course updated:', result);
  } catch (error) {
    console.error('Error updating course:', error);
  }
}

// Example usage:
// updateCourse('docId123', {
//   title: 'Updated Course Title',
//   description: 'Updated description'
// });

// ============================================
// EXAMPLE 5: Delete Document
// ============================================

/*
// Delete a document
*/
async function deleteCourse(courseId) {
  if (!confirm('Are you sure you want to delete this course?')) return;

  const uploader = new FirestoreUploader('http://localhost:5000/api');

  try {
    const result = await uploader.deleteDocument('courses', courseId);
    console.log('Course deleted:', result);
  } catch (error) {
    console.error('Error deleting course:', error);
  }
}

// ============================================
// EXAMPLE 6: Batch Upload Multiple Items
// ============================================

/*
// Upload multiple documents at once
*/
async function uploadMultipleTexts() {
  const uploader = new FirestoreUploader('http://localhost:5000/api');

  const texts = [
    {
      title: 'Text 1',
      author: 'Author 1',
      content: 'Content of text 1',
      category: 'Literature'
    },
    {
      title: 'Text 2',
      author: 'Author 2',
      content: 'Content of text 2',
      category: 'History'
    },
    {
      title: 'Text 3',
      author: 'Author 3',
      content: 'Content of text 3',
      category: 'Science'
    }
  ];

  try {
    const result = await uploader.batchUpload('texts', texts);
    console.log(`${result.count} documents uploaded!`);
    console.log('Document IDs:', result.ids);
  } catch (error) {
    console.error('Batch upload failed:', error);
  }
}

// ============================================
// EXAMPLE 7: Search/Query Documents
// ============================================

/*
// Find documents by field value
*/
async function findCoursesByCategory(category) {
  const uploader = new FirestoreUploader('http://localhost:5000/api');

  try {
    const results = await uploader.queryDocuments('courses', 'category', category);
    console.log(`Found ${results.length} courses in ${category}:`);
    results.forEach(course => {
      console.log(` - ${course.title}`);
    });
    return results;
  } catch (error) {
    console.error('Search failed:', error);
  }
}

// Example usage:
// findCoursesByCategory('Bulgarian');

// ============================================
// EXAMPLE 8: Fetch Single Document
// ============================================

/*
// Get a specific document by ID
*/
async function getCourseDetails(courseId) {
  const uploader = new FirestoreUploader('http://localhost:5000/api');

  try {
    const course = await uploader.getDocument('courses', courseId);
    console.log('Course details:', course);
    return course;
  } catch (error) {
    console.error('Error fetching course:', error);
  }
}

// ============================================
// EXAMPLE 9: Complete CRUD Form
// ============================================

/*
HTML:
<div id="crud-container">
  <input type="text" id="docId" placeholder="Document ID (for update)">
  <input type="text" id="title" placeholder="Title" required>
  <textarea id="description" placeholder="Description" required></textarea>
  <select id="operation">
    <option value="create">Create</option>
    <option value="update">Update</option>
    <option value="delete">Delete</option>
  </select>
  <button id="crudBtn">Execute</button>
</div>

JavaScript:
*/
function setupCrudForm() {
  const uploader = new FirestoreUploader('http://localhost:5000/api');
  const btn = document.getElementById('crudBtn');

  btn.addEventListener('click', async () => {
    const operation = document.getElementById('operation').value;
    const docId = document.getElementById('docId').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    try {
      let result;
      switch (operation) {
        case 'create':
          result = await uploader.addDocument('courses', { title, description });
          alert('Created with ID: ' + result.id);
          break;
        case 'update':
          if (!docId) throw new Error('Document ID required for update');
          result = await uploader.updateDocument('courses', docId, { title, description });
          alert('Updated successfully');
          break;
        case 'delete':
          if (!docId) throw new Error('Document ID required for delete');
          result = await uploader.deleteDocument('courses', docId);
          alert('Deleted successfully');
          break;
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  });
}

// ============================================
// EXAMPLE 10: Event-Driven Updates
// ============================================

/*
// Watch for changes and auto-refresh
*/
function setupAutoRefresh(collectionName, containerId) {
  const uploader = new FirestoreUploader('http://localhost:5000/api');
  const container = document.getElementById(containerId);

  async function refresh() {
    try {
      const docs = await uploader.getDocuments(collectionName);
      container.innerHTML = docs
        .map(doc => `<div class="item">${doc.title || doc.name}</div>`)
        .join('');
    } catch (error) {
      console.error('Refresh failed:', error);
    }
  }

  // Initial load
  refresh();

  // Refresh every 5 seconds
  setInterval(refresh, 5000);
}

// Example usage:
// setupAutoRefresh('courses', 'courses-container');

// ============================================
// INITIALIZATION
// ============================================

// Call these when page loads
document.addEventListener('DOMContentLoaded', () => {
  // Setup your forms
  if (document.getElementById('courseForm')) {
    setupCourseForm();
  }

  if (document.getElementById('crudContainer')) {
    setupCrudForm();
  }

  // Load initial data
  if (document.getElementById('coursesContainer')) {
    displayAllCourses();
  }
});

// ============================================
// HELPER UTILITIES
// ============================================

// Show loading state
function showLoading(element) {
  element.innerHTML = '<div style="text-align: center; padding: 20px;">Loading...</div>';
}

// Show error state
function showError(element, error) {
  element.innerHTML = `<div style="color: red; padding: 20px;">${error.message}</div>`;
}

// Format timestamp
function formatDate(timestamp) {
  return new Date(timestamp.seconds * 1000).toLocaleDateString('bg-BG');
}

// Validate form before upload
function validateForm(form) {
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  for (let input of inputs) {
    if (!input.value.trim()) {
      alert(`${input.placeholder || input.name} is required`);
      return false;
    }
  }
  return true;
}

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    setupCourseForm,
    uploadTextWithMetadata,
    displayAllCourses,
    updateCourse,
    deleteCourse,
    uploadMultipleTexts,
    findCoursesByCategory,
    getCourseDetails,
    setupCrudForm,
    setupAutoRefresh,
    showLoading,
    showError,
    formatDate,
    validateForm
  };
}
