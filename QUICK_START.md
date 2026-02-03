# 🚀 Quick Start Guide - Matura Master

## Summary of Changes

You now have a complete full-stack application with:
- ✅ **React Frontend** - Multiple page components for your application
- ✅ **Node.js/Express Backend** - RESTful API with Firebase Firestore integration
- ✅ **Firestore Database** - Cloud database for storing all your data
- ✅ **Static HTML Support** - JavaScript library to upload data from static HTML files

---

## ⚡ Quick Start (5 minutes)

### Step 1: Setup Backend
```bash
cd server
npm install
```

### Step 2: Get Firebase Admin Credentials
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `matura-master-9fac8`
3. Go to **Project Settings** → **Service Accounts**
4. Click **Generate New Private Key**
5. Save the JSON file as `server/serviceAccountKey.json`

### Step 3: Create Backend Environment File
```bash
cd server
cp .env.example .env
```

Edit `.env` and set:
```
FIREBASE_PROJECT_ID=matura-master-9fac8
PORT=5000
NODE_ENV=development
```

### Step 4: Start Backend
```bash
# Terminal 1
cd server
npm run dev
```

You should see:
```
🚀 Backend server is running on http://localhost:5000
```

### Step 5: Start Frontend
```bash
# Terminal 2
npm start
```

The React app will open on `http://localhost:3000`

---

## 📝 Usage Examples

### From React Components
```jsx
import { addFirestoreDocument, getAllFirestoreDocuments } from '@/services/firestore';

// Add data
await addFirestoreDocument('courses', {
  title: 'Bulgarian Grammar',
  content: 'Learn Bulgarian grammar...'
});

// Get all data
const courses = await getAllFirestoreDocuments('courses');
```

### From Static HTML Files
```html
<script src="/scripts/firestore-uploader.js"></script>

<script>
  const uploader = new FirestoreUploader('http://localhost:5000/api');
  
  // Upload form data
  const form = document.getElementById('myForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await uploader.submitForm('courses', form);
  });
</script>
```

### Test It Out
Visit [http://localhost:3000/firestore-example.html](http://localhost:3000/firestore-example.html) to see a full working example!

---

## 📂 Project Files Added

### Frontend (React)
- `src/services/firestore.js` - Firestore CRUD operations for React

### Backend (Node.js)
- `server/index.js` - Express server with API endpoints
- `server/package.json` - Backend dependencies
- `server/.env.example` - Environment template
- `server/.gitignore` - Git ignore rules

### Static HTML Support
- `public/scripts/firestore-uploader.js` - Library for HTML file uploads
- `public/firestore-example.html` - Complete working example

### Documentation
- `INTEGRATION_GUIDE.md` - Comprehensive integration guide
- `QUICK_START.md` - This file

---

## 🔌 API Endpoints

**Base URL:** `http://localhost:5000/api`

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/documents/{collection}` | Create document |
| GET | `/documents/{collection}` | Get all documents |
| GET | `/documents/{collection}/{docId}` | Get single document |
| PUT | `/documents/{collection}/{docId}` | Update document |
| DELETE | `/documents/{collection}/{docId}` | Delete document |
| POST | `/batch/{collection}` | Upload multiple documents |
| GET | `/query/{collection}?field=x&value=y` | Search documents |

---

## 🐛 Troubleshooting

### "Backend not running" error
```bash
cd server
npm run dev
```

### "CORS error" when uploading
- Make sure backend is running on port 5000
- Check that `ALLOWED_ORIGINS` in `.env` includes your frontend URL

### "Firebase initialization failed"
- Verify `serviceAccountKey.json` exists in `server/` folder
- Check `FIREBASE_PROJECT_ID` matches your Firebase project

### "Module not found" errors
```bash
# Frontend
npm install

# Backend
cd server && npm install
```

---

## 📚 Next Steps

1. **Update HTML files** - Add Firestore uploader to your existing HTML pages
2. **Create React pages** - Convert static HTML to React components
3. **Add authentication** - Secure data with Firebase Auth
4. **Deploy** - Host backend (Cloud Run/Heroku) and frontend (Vercel/Netlify)

---

## 📖 Full Documentation

See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for complete documentation on:
- Detailed setup instructions
- All API endpoints
- React component examples
- Security best practices
- Troubleshooting guide

---

## ✨ Key Features

✅ **Real-time Database** - Firestore for cloud data storage
✅ **RESTful API** - Express.js backend with CORS support
✅ **Batch Operations** - Upload multiple documents at once
✅ **Query Support** - Search documents by field values
✅ **Error Handling** - Comprehensive error messages
✅ **Server Timestamps** - Automatic createdAt/updatedAt fields
✅ **Static HTML Support** - Use from vanilla JavaScript
✅ **React Integration** - Full React component support

---

## 🔒 Security Notes

⚠️ **IMPORTANT:**
- Never commit `serviceAccountKey.json` to git
- Use environment variables for sensitive data
- Implement Firestore Security Rules in Firebase Console
- Validate all inputs on the backend
- Use HTTPS in production

---

## 💬 Support

If you encounter issues:
1. Check the [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) troubleshooting section
2. Verify both frontend and backend are running
3. Check browser console and backend logs for errors
4. Ensure Firebase project is active and accessible

---

**You're all set! Happy coding! 🎉**
