# Matura Master - Integration Guide

This guide explains how to connect your HTML pages with React, use the backend API, and upload data to Firestore.

## Project Structure

```
├── src/                          # React application
│   ├── pages/                    # React page components
│   ├── services/
│   │   ├── firebase.js          # Firebase authentication setup
│   │   └── firestore.js         # Firestore CRUD operations (NEW)
│   └── App.jsx
├── public/                       # Static HTML files
│   ├── scripts/
│   │   ├── firebase-config.js   # Firebase config
│   │   ├── auth.js              # Auth utilities
│   │   └── firestore-uploader.js # Firestore uploader (NEW)
│   └── *.html
├── server/                       # Node.js/Express backend (NEW)
│   ├── index.js                 # Server entry point
│   ├── package.json
│   ├── .env.example
│   └── serviceAccountKey.json   # Firebase Admin SDK key (to be added)
└── package.json                 # Root package
```

## Setup Instructions

### 1. Frontend Setup (React)

The React components are already configured. To use Firestore from React components:

```javascript
import { addFirestoreDocument, getAllFirestoreDocuments, updateFirestoreDocument } from '@/services/firestore';

// Add a document
const docId = await addFirestoreDocument('courses', {
  title: 'Bulgarian Literature',
  content: 'Course content here'
});

// Get all documents
const courses = await getAllFirestoreDocuments('courses');

// Update a document
await updateFirestoreDocument('courses', docId, { title: 'Updated Title' });
```

### 2. Backend Setup (Node.js/Express)

#### Step 1: Navigate to server directory
```bash
cd server
```

#### Step 2: Install dependencies
```bash
npm install
```

#### Step 3: Setup Firebase Admin Credentials
1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate New Private Key"
3. Save as `server/serviceAccountKey.json`

⚠️ **IMPORTANT**: Never commit `serviceAccountKey.json` to version control. Add to `.gitignore`:
```
server/serviceAccountKey.json
server/.env
```

#### Step 4: Create `.env` file
Copy from `.env.example` and fill in values:
```bash
cp .env.example .env
```

#### Step 5: Start the backend server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The backend will run on `http://localhost:5000`

### 3. Using Firestore Uploader in Static HTML

For your static HTML files, use the `firestore-uploader.js` library:

#### In HTML file:
```html
<!-- Load the uploader library -->
<script src="/scripts/firestore-uploader.js"></script>

<script>
  // Initialize uploader (make sure backend is running)
  const uploader = new FirestoreUploader('http://localhost:5000/api');

  // Example: Upload form data
  const form = document.getElementById('myForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
      const result = await uploader.submitForm('courses', form);
      console.log('Document added:', result.id);
      alert('Data uploaded successfully!');
      form.reset();
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Error uploading data');
    }
  });
</script>
```

## API Endpoints

All endpoints are prefixed with `/api/`:

### Create Document
```
POST /documents/{collectionName}
Body: { field1: value1, field2: value2 }
Response: { id: 'docId', message: 'Document created successfully' }
```

### Get All Documents
```
GET /documents/{collectionName}
Response: [{ id: 'docId', ...data }, ...]
```

### Get Single Document
```
GET /documents/{collectionName}/{docId}
Response: { id: 'docId', ...data }
```

### Update Document
```
PUT /documents/{collectionName}/{docId}
Body: { field1: newValue }
Response: { id: 'docId', message: 'Document updated successfully' }
```

### Delete Document
```
DELETE /documents/{collectionName}/{docId}
Response: { id: 'docId', message: 'Document deleted successfully' }
```

### Batch Upload
```
POST /batch/{collectionName}
Body: { documents: [{ field: value }, { field: value }] }
Response: { message: 'X documents uploaded', ids: [...] }
```

### Query Documents
```
GET /query/{collectionName}?field=fieldName&value=fieldValue
Response: [{ id: 'docId', ...data }, ...]
```

## Using FirestoreUploader Class

### Methods available:

```javascript
const uploader = new FirestoreUploader('http://localhost:5000/api');

// Add single document
await uploader.addDocument('collectionName', { field: value });

// Get all documents
const docs = await uploader.getDocuments('collectionName');

// Get single document
const doc = await uploader.getDocument('collectionName', 'docId');

// Update document
await uploader.updateDocument('collectionName', 'docId', { field: newValue });

// Delete document
await uploader.deleteDocument('collectionName', 'docId');

// Batch upload
await uploader.batchUpload('collectionName', [
  { field1: value1 },
  { field2: value2 }
]);

// Query by field
const results = await uploader.queryDocuments('collectionName', 'fieldName', 'value');

// Submit form to Firestore
await uploader.submitForm('collectionName', formElement);
```

## Connecting React Components to Firestore

### Example React Component

```jsx
import { useState, useEffect } from 'react';
import { 
  addFirestoreDocument, 
  getAllFirestoreDocuments,
  updateFirestoreDocument,
  deleteFirestoreDocument 
} from '../services/firestore';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses on mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllFirestoreDocuments('courses');
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, []);

  // Add new course
  const handleAddCourse = async (courseData) => {
    try {
      const docId = await addFirestoreDocument('courses', courseData);
      setCourses([...courses, { id: docId, ...courseData }]);
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  // Update course
  const handleUpdateCourse = async (docId, updates) => {
    try {
      await updateFirestoreDocument('courses', docId, updates);
      setCourses(courses.map(c => c.id === docId ? { ...c, ...updates } : c));
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  // Delete course
  const handleDeleteCourse = async (docId) => {
    try {
      await deleteFirestoreDocument('courses', docId);
      setCourses(courses.filter(c => c.id !== docId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Courses</h1>
      <ul>
        {courses.map(course => (
          <li key={course.id}>{course.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Running Both Frontend and Backend

### Terminal 1: Start Backend
```bash
cd server
npm run dev
```

### Terminal 2: Start React Frontend
```bash
npm start
```

The React app will be on `http://localhost:3000`
The backend API will be on `http://localhost:5000`

## Troubleshooting

### Backend won't connect to Firestore
- Verify `serviceAccountKey.json` exists in the `server/` folder
- Check that `FIREBASE_PROJECT_ID` in `.env` matches your Firebase project
- Ensure Firebase Admin SDK is properly installed: `npm install firebase-admin`

### CORS errors when uploading from HTML
- Make sure backend is running on port 5000
- Check CORS configuration in `server/index.js`
- Update `ALLOWED_ORIGINS` in `.env` if needed

### Module import errors
- Make sure `node_modules` is installed: `npm install`
- Verify Node.js version is 14.0.0 or higher: `node --version`

### Firestore data not appearing
- Check Firebase Console → Firestore Database
- Verify correct collection name is being used
- Check browser console for API errors

## Next Steps

1. **Add More Collections**: Extend your Firestore schema based on your needs
2. **Authentication**: Use Firebase Auth with backend token verification
3. **Validation**: Add input validation on both frontend and backend
4. **Error Handling**: Implement proper error handling and user feedback
5. **Deployment**: Deploy backend to Cloud Run/Heroku and frontend to Vercel/Netlify

## Security Considerations

- Never expose Firebase Admin credentials to client
- Implement Firestore Security Rules in Firebase Console
- Validate all inputs on the backend
- Use environment variables for sensitive data
- Implement authentication before allowing data uploads

For more info: [Firebase Security Rules Documentation](https://firebase.google.com/docs/firestore/security/overview)
