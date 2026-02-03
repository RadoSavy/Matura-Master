# 🔄 Migration Guide - Converting HTML to Use Firestore

This guide shows how to convert your existing static HTML files to upload data to Firestore.

---

## Overview

Your current HTML files are static with no database backend. After this migration, they will:
- ✅ Upload form data to Firestore
- ✅ Retrieve data from database
- ✅ Display dynamic content
- ✅ Allow editing and deletion

---

## Step 1: Add Firestore Uploader Script

In each HTML file you want to migrate, add this near the closing `</body>` tag:

```html
<!-- Load Firestore uploader library -->
<script src="/scripts/firestore-uploader.js"></script>
```

---

## Step 2: Select Which HTML Files to Migrate

Based on your structure, here's what should be migrated:

| File | Type | Collection | Action |
|------|------|------------|--------|
| `courses.html` | Course listing | `courses` | Show + Add + Edit |
| `texts.html` | Text listing | `texts` | Show + Add + Edit |
| `literature.html` | Literature | `literature` | Show + Add + Edit |
| `bulgarian.html` | Bulgarian content | `bulgarian` | Show + Add + Edit |
| `baiganio.html` | Baiganio content | `baiganio` | Show + Add + Edit |
| `auth.html` | Authentication | `users` | Register user data |
| `index.html` | Homepage | Optional | Display stats |

---

## Step 3: Migrate Individual Pages

### Example 1: Courses Page

#### Current HTML (Before)
```html
<div id="coursesList">
  <!-- Static content here -->
</div>
```

#### Updated HTML (After)
```html
<!-- Form to add new course -->
<form id="addCourseForm">
  <input type="text" name="title" placeholder="Course Title" required>
  <textarea name="description" placeholder="Course Description" required></textarea>
  <input type="text" name="instructor" placeholder="Instructor Name">
  <button type="submit">Add Course</button>
</form>

<!-- List of courses -->
<div id="coursesList"></div>

<script src="/scripts/firestore-uploader.js"></script>
<script src="/scripts/integration-examples.js"></script>
<script>
  const uploader = new FirestoreUploader('http://localhost:5000/api');

  // Load courses on page load
  async function loadCourses() {
    try {
      const courses = await uploader.getDocuments('courses');
      displayCourses(courses);
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  }

  // Display courses in HTML
  function displayCourses(courses) {
    const container = document.getElementById('coursesList');
    container.innerHTML = courses.map(course => `
      <div class="course-item">
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <small>Instructor: ${course.instructor || 'N/A'}</small>
        <button onclick="deleteCourseItem('${course.id}')">Delete</button>
      </div>
    `).join('');
  }

  // Handle form submission
  document.getElementById('addCourseForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);
      
      await uploader.addDocument('courses', data);
      alert('Course added successfully!');
      e.target.reset();
      loadCourses(); // Refresh list
    } catch (error) {
      alert('Error: ' + error.message);
    }
  });

  // Delete course
  async function deleteCourseItem(courseId) {
    if (confirm('Delete this course?')) {
      try {
        await uploader.deleteDocument('courses', courseId);
        loadCourses(); // Refresh list
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  }

  // Load courses on page load
  loadCourses();
</script>
```

---

## Step 4: Common Patterns

### Pattern 1: Display List from Database

```javascript
const uploader = new FirestoreUploader('http://localhost:5000/api');

async function displayList(collectionName, containerId) {
  const container = document.getElementById(containerId);
  
  try {
    const items = await uploader.getDocuments(collectionName);
    container.innerHTML = items.map(item => `
      <div class="item">
        <h3>${item.title || item.name}</h3>
        <p>${item.description || item.content}</p>
        <button onclick="deleteItem('${collectionName}', '${item.id}')">Delete</button>
      </div>
    `).join('');
  } catch (error) {
    container.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
}

async function deleteItem(collection, docId) {
  try {
    await uploader.deleteDocument(collection, docId);
    displayList(collection, collection + 'List');
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

// On page load
displayList('courses', 'coursesList');
```

### Pattern 2: Form Submission

```javascript
const uploader = new FirestoreUploader('http://localhost:5000/api');
const form = document.getElementById('myForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  try {
    // Show loading state
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Uploading...';

    // Upload data
    const result = await uploader.submitForm('mycollection', form);

    // Show success
    alert('Uploaded! ID: ' + result.id);
    form.reset();

    // Refresh list
    if (window.refreshList) {
      refreshList();
    }
  } catch (error) {
    alert('Error: ' + error.message);
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
  }
});
```

### Pattern 3: Search/Filter

```javascript
const uploader = new FirestoreUploader('http://localhost:5000/api');

async function searchByCategory(category) {
  try {
    const results = await uploader.queryDocuments(
      'courses',        // collection
      'category',       // field to search
      category          // value to match
    );
    
    displayResults(results);
  } catch (error) {
    console.error('Search failed:', error);
  }
}

// Usage
document.getElementById('categorySelect').addEventListener('change', (e) => {
  searchByCategory(e.target.value);
});
```

---

## Step 5: Styling Tips

Make forms look good:

```css
form {
  max-width: 500px;
  margin: 20px auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

form input,
form textarea,
form select {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
}

form button {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.3s;
}

form button:hover {
  opacity: 0.9;
}

form button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.item {
  background: #f5f5f5;
  padding: 15px;
  margin: 10px 0;
  border-radius: 4px;
  border-left: 4px solid #667eea;
}

.item h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.item p {
  margin: 0 0 10px 0;
  color: #666;
  line-height: 1.5;
}

.item button {
  background: #dc3545;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.item button:hover {
  background: #c82333;
}
```

---

## Step 6: Error Handling

Add proper error handling:

```javascript
const uploader = new FirestoreUploader('http://localhost:5000/api');

// Helper to show errors
function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = `
    background: #f8d7da;
    color: #721c24;
    padding: 15px;
    border-radius: 4px;
    margin: 10px 0;
    border: 1px solid #f5c6cb;
  `;
  errorDiv.textContent = message;
  
  const container = document.querySelector('main') || document.body;
  container.insertBefore(errorDiv, container.firstChild);
  
  setTimeout(() => errorDiv.remove(), 5000);
}

// Helper to show success
function showSuccess(message) {
  const successDiv = document.createElement('div');
  successDiv.style.cssText = `
    background: #d4edda;
    color: #155724;
    padding: 15px;
    border-radius: 4px;
    margin: 10px 0;
    border: 1px solid #c3e6cb;
  `;
  successDiv.textContent = message;
  
  const container = document.querySelector('main') || document.body;
  container.insertBefore(successDiv, container.firstChild);
  
  setTimeout(() => successDiv.remove(), 5000);
}

// Use in try/catch
try {
  const result = await uploader.addDocument('courses', data);
  showSuccess('✓ Course added successfully!');
} catch (error) {
  console.error(error);
  showError('✗ Error: ' + error.message);
}
```

---

## Step 7: Add Loading States

```javascript
function setLoading(element, isLoading) {
  if (isLoading) {
    element.disabled = true;
    element.style.opacity = '0.6';
    element.dataset.originalText = element.textContent;
    element.textContent = '⏳ Loading...';
  } else {
    element.disabled = false;
    element.style.opacity = '1';
    element.textContent = element.dataset.originalText;
  }
}

// Usage
const btn = document.getElementById('submitBtn');
setLoading(btn, true);

try {
  await uploader.addDocument('courses', data);
} finally {
  setLoading(btn, false);
}
```

---

## Step 8: Complete Example - Texts Page

Here's a complete migrated page:

```html
<!DOCTYPE html>
<html lang="bg">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Texts - Matura Master</title>
  <link rel="stylesheet" href="css/texts.css">
  <style>
    body { font-family: 'Nunito', sans-serif; background: #f5f5f5; }
    main { max-width: 1000px; margin: 0 auto; padding: 20px; }
    .form-container { background: white; padding: 30px; border-radius: 8px; margin-bottom: 30px; }
    .form-container h2 { margin-top: 0; }
    .items-container { display: grid; gap: 20px; }
    .text-item { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; }
    .text-item h3 { margin: 0 0 10px 0; }
    .text-item .meta { color: #666; font-size: 14px; margin: 10px 0; }
    .text-item .content { color: #333; line-height: 1.6; margin: 10px 0; }
    .text-item .actions { display: flex; gap: 10px; margin-top: 15px; }
    .text-item button { padding: 8px 15px; border: none; border-radius: 4px; cursor: pointer; }
    .delete-btn { background: #dc3545; color: white; }
    .delete-btn:hover { background: #c82333; }
    .message { padding: 15px; border-radius: 4px; margin-bottom: 20px; }
    .success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
    .error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
  </style>
</head>
<body>
  <main>
    <h1>📚 Texts</h1>
    <p>Manage Bulgarian texts and literature excerpts</p>

    <!-- Add new text form -->
    <div class="form-container">
      <h2>Add New Text</h2>
      <form id="addTextForm">
        <div>
          <label>Title *</label>
          <input type="text" name="title" placeholder="Text title" required>
        </div>
        <div>
          <label>Author</label>
          <input type="text" name="author" placeholder="Author name">
        </div>
        <div>
          <label>Category</label>
          <input type="text" name="category" placeholder="e.g., Poetry, Prose, Drama">
        </div>
        <div>
          <label>Content *</label>
          <textarea name="content" placeholder="Text content" required style="min-height: 150px;"></textarea>
        </div>
        <button type="submit">Add Text</button>
      </form>
    </div>

    <!-- Messages -->
    <div id="messages"></div>

    <!-- Texts list -->
    <div class="items-container" id="textsList">
      <p style="text-align: center; color: #999;">Loading texts...</p>
    </div>
  </main>

  <script src="/scripts/firestore-uploader.js"></script>
  <script>
    const uploader = new FirestoreUploader('http://localhost:5000/api');
    const form = document.getElementById('addTextForm');
    const messagesDiv = document.getElementById('messages');

    // Load all texts
    async function loadTexts() {
      try {
        const texts = await uploader.getDocuments('texts');
        displayTexts(texts);
      } catch (error) {
        showError('Failed to load texts: ' + error.message);
      }
    }

    // Display texts
    function displayTexts(texts) {
      const container = document.getElementById('textsList');
      
      if (texts.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999;">No texts yet. Add one to get started!</p>';
        return;
      }

      container.innerHTML = texts.map(text => `
        <div class="text-item">
          <h3>${text.title}</h3>
          <div class="meta">
            By ${text.author || 'Unknown'}
            ${text.category ? ' | Category: ' + text.category : ''}
          </div>
          <div class="content">${text.content.substring(0, 200)}...</div>
          <div class="actions">
            <button class="delete-btn" onclick="deleteText('${text.id}')">Delete</button>
          </div>
        </div>
      `).join('');
    }

    // Handle form submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = e.target.querySelector('button');
      
      try {
        btn.disabled = true;
        btn.textContent = 'Adding...';

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        await uploader.addDocument('texts', data);
        showSuccess('✓ Text added successfully!');
        form.reset();
        loadTexts();
      } catch (error) {
        showError('✗ Error: ' + error.message);
      } finally {
        btn.disabled = false;
        btn.textContent = 'Add Text';
      }
    });

    // Delete text
    async function deleteText(textId) {
      if (!confirm('Delete this text?')) return;
      
      try {
        await uploader.deleteDocument('texts', textId);
        showSuccess('✓ Text deleted!');
        loadTexts();
      } catch (error) {
        showError('✗ Error: ' + error.message);
      }
    }

    // Message helpers
    function showMessage(text, type) {
      const div = document.createElement('div');
      div.className = 'message ' + type;
      div.textContent = text;
      messagesDiv.prepend(div);
      setTimeout(() => div.remove(), 4000);
    }

    function showError(text) {
      showMessage(text, 'error');
    }

    function showSuccess(text) {
      showMessage(text, 'success');
    }

    // Load texts on page load
    loadTexts();
  </script>
</body>
</html>
```

---

## Step 9: Testing

1. Start backend: `cd server && npm run dev`
2. Start frontend: `npm start`
3. Visit your migrated page
4. Try adding, viewing, and deleting items
5. Check Firebase Console to verify data is saved

---

## Step 10: Migrate All Pages

Follow the same pattern for:
- `courses.html` → collection: `courses`
- `texts.html` → collection: `texts`
- `literature.html` → collection: `literature`
- `bulgarian.html` → collection: `bulgarian`
- `baiganio.html` → collection: `baiganio`
- `auth.html` → collection: `users`

---

## Checklist

- [ ] Add `<script src="/scripts/firestore-uploader.js"></script>` to HTML
- [ ] Create form for adding new items
- [ ] Add load/display function
- [ ] Add form submission handler
- [ ] Add delete functionality
- [ ] Add error handling
- [ ] Test locally
- [ ] Check Firebase Console

---

## Next: Connect to React

After migrating static pages, consider building React components:

```jsx
// pages/Texts.jsx
import { useState, useEffect } from 'react';
import { addFirestoreDocument, getAllFirestoreDocuments } from '../services/firestore';

export default function Texts() {
  const [texts, setTexts] = useState([]);
  
  useEffect(() => {
    loadTexts();
  }, []);

  const loadTexts = async () => {
    const data = await getAllFirestoreDocuments('texts');
    setTexts(data);
  };

  const addText = async (formData) => {
    await addFirestoreDocument('texts', formData);
    loadTexts();
  };

  return (
    // Your React JSX here
  );
}
```

---

## Support

Having issues? Check:
1. Is backend running? `curl http://localhost:5000/health`
2. Is frontend running? Check localhost:3000
3. Are there browser errors? Open DevTools (F12)
4. Check server logs for API errors
5. Verify collection name matches exactly

**You're all set to migrate your HTML pages!** 🎉
