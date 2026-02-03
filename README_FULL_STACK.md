# 🎓 Matura Master - Full Stack Implementation

Complete full-stack application with React frontend, Express backend, and Firestore database integration.

## 🚀 What's Included

### Frontend
- **React 18** with modern hooks
- **React Router v7** for navigation
- **Firestore service** for data operations
- **Static HTML support** with JavaScript SDK
- **Multiple pages** (Home, Courses, Texts, Bulgarian, Literature, etc.)

### Backend
- **Express.js** REST API server
- **Firebase Admin SDK** for Firestore access
- **CORS support** for cross-origin requests
- **Batch operations** for bulk uploads
- **Query functionality** for searching documents
- **Automatic timestamps** for document tracking

### Database
- **Google Firebase/Firestore** cloud database
- **Real-time synchronization** capability
- **Scalable** to millions of documents
- **Serverless** - no infrastructure to manage

---

## 📋 Quick Start (5 minutes)

### Prerequisites
```bash
# Check Node.js version (should be 14+)
node --version
npm --version
```

### 1. Install Backend Dependencies
```bash
cd server
npm install
```

### 2. Setup Firebase Credentials
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select project: **matura-master-9fac8**
3. Settings → Service Accounts → Generate Private Key
4. Save as `server/serviceAccountKey.json`

### 3. Start Services

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
# Should show: 🚀 Backend server is running on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
npm start
# Should open React app at http://localhost:3000
```

### 4. Test It
Visit: [http://localhost:3000/firestore-example.html](http://localhost:3000/firestore-example.html)

---

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - 5-minute setup guide
- **[SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)** - Step-by-step checklist
- **[INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)** - Comprehensive integration guide
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - What was implemented

---

## 🏗️ Architecture

```
┌─────────────────────┐
│   React Frontend    │
│ (localhost:3000)    │
└──────────┬──────────┘
           │ HTTP
           ↓
┌─────────────────────────────┐
│  Express Backend Server     │
│  (localhost:5000)           │
│  - REST API Endpoints       │
│  - Firebase Admin SDK       │
└──────────┬──────────────────┘
           │ Firestore API
           ↓
┌─────────────────────────────┐
│   Google Firestore DB       │
│   - Documents               │
│   - Collections             │
│   - Real-time sync          │
└─────────────────────────────┘
```

---

## 💻 Usage Examples

### From React Components
```jsx
import { 
  addFirestoreDocument, 
  getAllFirestoreDocuments,
  updateFirestoreDocument,
  deleteFirestoreDocument 
} from '@/services/firestore';

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getAllFirestoreDocuments('courses');
      setCourses(data);
    };
    load();
  }, []);

  const addCourse = async (title, description) => {
    const id = await addFirestoreDocument('courses', {
      title,
      description
    });
    setCourses([...courses, { id, title, description }]);
  };

  return (
    // Your component JSX
  );
}
```

### From Static HTML
```html
<script src="/scripts/firestore-uploader.js"></script>

<form id="courseForm">
  <input name="title" placeholder="Course Title" required>
  <textarea name="description" placeholder="Description" required></textarea>
  <button type="submit">Upload</button>
</form>

<script>
  const uploader = new FirestoreUploader('http://localhost:5000/api');
  
  document.getElementById('courseForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const result = await uploader.submitForm('courses', e.target);
    alert('Uploaded! ID: ' + result.id);
  });
</script>
```

---

## 🔌 API Reference

**Base URL:** `http://localhost:5000/api`

### Documents CRUD

```
POST   /documents/{collection}              Create
GET    /documents/{collection}              Get all
GET    /documents/{collection}/{id}         Get one
PUT    /documents/{collection}/{id}         Update
DELETE /documents/{collection}/{id}         Delete
```

### Batch Operations

```
POST   /batch/{collection}                  Upload multiple
GET    /query/{collection}?field=x&value=y Search
```

---

## 📂 Project Structure

```
Matura-Master/
├── src/                               (React source)
│   ├── pages/                        (Page components)
│   │   ├── Home.jsx
│   │   ├── Courses.jsx
│   │   ├── Texts.jsx
│   │   ├── Literature.jsx
│   │   ├── Bulgarian.jsx
│   │   ├── Baiganio.jsx
│   │   └── Login.jsx
│   ├── services/
│   │   ├── firebase.js              (Auth setup)
│   │   └── firestore.js             (Firestore CRUD) ✨ NEW
│   ├── App.jsx
│   ├── index.js
│   └── styles.css
│
├── public/                            (Static files)
│   ├── scripts/
│   │   ├── firebase-config.js       (Config)
│   │   ├── auth.js                  (Auth utilities)
│   │   ├── firestore-uploader.js    (Upload library) ✨ NEW
│   │   └── integration-examples.js  (Code examples) ✨ NEW
│   ├── firestore-example.html       (Working example) ✨ NEW
│   ├── auth.html
│   ├── courses.html
│   ├── texts.html
│   ├── bulgarian.html
│   ├── literature.html
│   ├── baiganio.html
│   ├── index.html
│   └── css/
│
├── server/                            (Backend) ✨ NEW
│   ├── index.js                     (Express server)
│   ├── package.json                 (Dependencies)
│   ├── .env                         (Configuration)
│   ├── .env.example                 (Template)
│   ├── .gitignore
│   └── serviceAccountKey.json       (Firebase Admin key)
│
├── package.json                      (Frontend dependencies)
├── QUICK_START.md                    ✨ NEW
├── SETUP_CHECKLIST.md                ✨ NEW
├── INTEGRATION_GUIDE.md              ✨ NEW
├── IMPLEMENTATION_SUMMARY.md         ✨ NEW
└── README.md                         (This file)
```

---

## 🔑 Key Features

✅ **Create** documents in Firestore
✅ **Read** documents with flexible queries
✅ **Update** existing documents
✅ **Delete** documents
✅ **Batch operations** for bulk uploads
✅ **Search** by field values
✅ **Auto timestamps** (created/updated)
✅ **Error handling** with clear messages
✅ **CORS support** for browser requests
✅ **Static HTML support** via JS SDK
✅ **React integration** with service layer
✅ **Real-time capable** (via Firestore)

---

## 🔐 Security

### ⚠️ Never commit these files:
```
server/serviceAccountKey.json
server/.env
```

### Must be in `.gitignore`:
```
server/serviceAccountKey.json
server/.env
node_modules/
```

### Setup Firestore Security Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only authenticated users can read/write
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md#security-considerations) for more.

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| **Backend won't start** | Check Node.js v14+: `node --version` |
| **CORS errors** | Ensure backend runs on port 5000 |
| **Firebase not connecting** | Verify `serviceAccountKey.json` exists |
| **Data not appearing** | Check Firestore collections in Firebase Console |
| **"Module not found"** | Run `npm install` in server folder |
| **Port already in use** | Kill process: `lsof -ti:5000 \| xargs kill -9` |

---

## 📖 Detailed Guides

For comprehensive documentation, see:

1. **[QUICK_START.md](./QUICK_START.md)** - Fast setup
2. **[SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)** - Step-by-step
3. **[INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)** - Complete reference
4. **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - What's new

---

## 🚀 Deployment

### Backend
```bash
# Deploy to Google Cloud Run
gcloud run deploy matura-backend --source .
```

### Frontend
```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

See deployment guides in [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for details.

---

## 📦 Dependencies

### Frontend (`package.json`)
- react: ^18.2.0
- react-dom: ^18.2.0
- react-router-dom: ^7.12.0
- firebase: ^11.10.0
- @react-oauth/google: ^0.12.2
- jwt-decode: ^4.0.0

### Backend (`server/package.json`)
- express: ^4.18.2
- firebase-admin: ^12.0.0
- cors: ^2.8.5
- dotenv: ^16.3.1

---

## 📋 Collections Setup

Suggested Firestore collections:

```
firestore/
├── courses/              (Course materials)
│   └── {courseId}
│       ├── title: string
│       ├── description: string
│       ├── category: string
│       └── createdAt: timestamp
│
├── texts/                (Bulgarian texts)
│   └── {textId}
│       ├── title: string
│       ├── content: string
│       ├── author: string
│       └── createdAt: timestamp
│
├── literature/           (Literary works)
├── bulgarian/            (Bulgarian language content)
├── baiganio/             (Baiganio content)
└── users/                (User profiles)
    └── {userId}
        ├── email: string
        ├── name: string
        └── createdAt: timestamp
```

---

## ✨ What's New in This Update

### Added Files
- `server/` folder with complete backend
- `src/services/firestore.js` - React Firestore service
- `public/scripts/firestore-uploader.js` - HTML upload SDK
- `public/scripts/integration-examples.js` - Code samples
- `public/firestore-example.html` - Working example
- Multiple documentation files

### New Capabilities
- Upload data from React components
- Upload data from static HTML files
- Search and filter documents
- Batch upload operations
- Full CRUD operations
- Real-time capable database

---

## 🎯 Next Steps

1. **Complete Setup**
   - Download Firebase Admin key
   - Run backend and frontend
   - Test with example page

2. **Integration**
   - Add Firestore to existing HTML pages
   - Create React components for pages
   - Setup authentication

3. **Enhancement**
   - Add data validation
   - Implement error handling
   - Add user feedback

4. **Deployment**
   - Deploy backend
   - Deploy frontend
   - Setup monitoring

---

## 💡 Tips & Tricks

### Development
```bash
# Use nodemon for auto-reload
npm run dev

# See backend logs
# Check the terminal running backend
```

### Testing
```bash
# Test API with curl
curl -X POST http://localhost:5000/api/documents/test \
  -H "Content-Type: application/json" \
  -d '{"title":"Test"}'
```

### Debugging
```javascript
// In browser console
const uploader = new FirestoreUploader();
uploader.getDocuments('courses').then(console.log);
```

---

## 🤝 Contributing

To add new features:

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

---

## 📄 License

See LICENSE file in project root.

---

## 🆘 Support

For issues or questions:

1. Check documentation files
2. Review code examples
3. Check browser console (F12)
4. Check server terminal logs
5. Verify Firebase Console setup

---

## 🎉 You're Ready!

Everything is set up. Follow the [QUICK_START.md](./QUICK_START.md) guide to get running in 5 minutes.

**Happy coding!** 🚀

---

**Last Updated:** February 3, 2026  
**Status:** ✅ Complete & Ready to Use
