# ✅ Setup Checklist

## Before You Start

Make sure you have:
- [ ] Node.js v14+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Firebase project created and active
- [ ] Firebase Admin SDK credentials ready

---

## Installation Steps

### Step 1: Backend Dependencies
```bash
cd server
npm install
```
**Status:** ⏳ To be done

### Step 2: Firebase Credentials
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click on your project: **matura-master-9fac8**
3. Go to **⚙️ Project Settings** (top left)
4. Click **Service Accounts** tab
5. Click **Generate New Private Key** button
6. A JSON file will download - save it as `server/serviceAccountKey.json`

**Status:** ⏳ To be done

### Step 3: Verify .env File
- Check that `server/.env` exists with correct values
- Update `FIREBASE_PROJECT_ID` if different

**Status:** ✅ Already created

### Step 4: Start Backend
```bash
cd server
npm run dev
```
You should see:
```
🚀 Backend server is running on http://localhost:5000
📊 Firestore database connected to project: matura-master-9fac8
```

**Status:** ⏳ To be done

### Step 5: Start Frontend (in another terminal)
```bash
npm start
```
React will open at `http://localhost:3000`

**Status:** ⏳ To be done

---

## Verification Steps

### ✅ Backend Running
```bash
curl http://localhost:5000/health
```
Expected response: `{"status":"Backend is running"}`

### ✅ Frontend Running
Open [http://localhost:3000](http://localhost:3000) in browser

### ✅ Firestore Connected
Open [http://localhost:3000/firestore-example.html](http://localhost:3000/firestore-example.html)
Try uploading a document

### ✅ Data in Firestore
Check [Firebase Console](https://console.firebase.google.com) → Firestore Database
Should see your uploaded documents

---

## Common Issues & Solutions

### Issue: "Cannot find module 'firebase-admin'"
```bash
cd server
npm install firebase-admin
```

### Issue: "ENOENT: no such file or directory 'serviceAccountKey.json'"
1. Download from Firebase Console
2. Save as exactly: `server/serviceAccountKey.json`
3. Make sure it's in the `server` folder, not `src`

### Issue: "CORS error" or "Failed to fetch"
- Make sure backend is running: `npm run dev` in server folder
- Check that frontend is accessing `http://localhost:5000/api`

### Issue: "Port 5000 already in use"
```bash
# On Windows - find and kill process using port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Issue: "Firebase initialization failed"
- Verify project ID in `.env` matches Firebase Console
- Check that serviceAccountKey.json has valid credentials
- Make sure Firebase Admin SDK is installed

---

## File Checklist

### Must Have Files
- [x] `server/package.json` - ✅ Created
- [x] `server/index.js` - ✅ Created
- [x] `server/.env` - ✅ Created
- [ ] `server/serviceAccountKey.json` - ⏳ To be added
- [x] `src/services/firestore.js` - ✅ Created
- [x] `public/scripts/firestore-uploader.js` - ✅ Created

### Documentation Files
- [x] `QUICK_START.md` - ✅ Created
- [x] `INTEGRATION_GUIDE.md` - ✅ Created
- [x] `IMPLEMENTATION_SUMMARY.md` - ✅ Created
- [x] `SETUP_CHECKLIST.md` - ✅ This file

### Example Files
- [x] `public/firestore-example.html` - ✅ Created
- [x] `public/scripts/integration-examples.js` - ✅ Created

---

## First Run Test

### Test 1: Backend Health Check
```bash
# Should respond with {"status":"Backend is running"}
curl http://localhost:5000/health
```

### Test 2: Create a Document
```bash
curl -X POST http://localhost:5000/api/documents/test \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","value":123}'
```
Should return: `{"message":"Document created successfully","id":"xxxxx"}`

### Test 3: Get All Documents
```bash
curl http://localhost:5000/api/documents/test
```
Should return array of documents

### Test 4: Web Interface
Visit [http://localhost:3000/firestore-example.html](http://localhost:3000/firestore-example.html)
Try uploading a document

---

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│           Your Browser                          │
│  React App (localhost:3000)                     │
│  & Static HTML Pages                            │
└────────────────┬────────────────────────────────┘
                 │ HTTP Requests
                 │ (fetch API)
                 ↓
┌─────────────────────────────────────────────────┐
│      Backend Server (localhost:5000)            │
│      Node.js/Express                            │
│  - REST API Endpoints                           │
│  - Request Validation                           │
│  - Firebase Admin SDK                           │
└────────────────┬────────────────────────────────┘
                 │ Firebase API Calls
                 │ (with Admin Credentials)
                 ↓
┌─────────────────────────────────────────────────┐
│       Google Firebase                           │
│       - Firestore Database                      │
│       - Cloud Storage                           │
│       - Authentication                          │
└─────────────────────────────────────────────────┘
```

---

## Directory Structure Quick Reference

```
server/              ← Backend code goes here
├── index.js        ← Main server file
├── package.json    ← Dependencies
├── .env            ← Configuration (already created)
└── serviceAccountKey.json ← NEEDED: Download from Firebase

src/services/
└── firestore.js    ← React service for Firestore

public/
├── scripts/
│   ├── firestore-uploader.js       ← HTML upload library
│   └── integration-examples.js     ← Code examples
└── firestore-example.html          ← Working example

Documentation/
├── QUICK_START.md                  ← Start here
├── INTEGRATION_GUIDE.md            ← Full guide
├── IMPLEMENTATION_SUMMARY.md       ← What was done
└── SETUP_CHECKLIST.md              ← This file
```

---

## Environment Variables Reference

**File:** `server/.env`

| Variable | Purpose | Default |
|----------|---------|---------|
| `FIREBASE_PROJECT_ID` | Your Firebase project ID | `matura-master-9fac8` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `ALLOWED_ORIGINS` | CORS allowed domains | `http://localhost:3000` |
| `DEBUG` | Enable debug logging | `true` |

---

## Next: What to Do After Setup

1. **Test Everything Works**
   - Backend running? ✅
   - Frontend running? ✅
   - Can upload to Firestore? ✅

2. **Convert Your HTML Pages**
   - Add Firestore uploader to `auth.html`
   - Add uploader to `courses.html`
   - Add uploader to other pages

3. **Create React Components**
   - Build a Courses page component
   - Build a Texts page component
   - Build a Literature page component

4. **Setup Authentication**
   - Implement Firebase Auth
   - Add login/signup flows
   - Secure API endpoints

5. **Add Data Validation**
   - Validate form inputs
   - Check data on backend
   - Sanitize user submissions

6. **Deploy**
   - Push code to GitHub
   - Deploy backend to Cloud Run
   - Deploy frontend to Vercel
   - Update Firebase security rules

---

## Quick Command Reference

```bash
# Backend
cd server
npm install              # Install dependencies
npm run dev             # Start with auto-reload
npm start               # Start production

# Frontend  
npm start               # Start React dev server
npm build               # Create production build
npm test                # Run tests

# Git
git add .
git commit -m "message"
git push
```

---

## Getting Help

1. **Read Documentation:** Check the guides in this project
2. **Check Examples:** Look at `integration-examples.js`
3. **Browser Console:** Open DevTools (F12) to see errors
4. **Server Logs:** Check terminal running backend
5. **Firebase Console:** Verify data is being saved

---

## Security Reminders

⚠️ **IMPORTANT - DO NOT:**
- ❌ Commit `serviceAccountKey.json` to git
- ❌ Push `.env` file with secrets
- ❌ Share Firebase credentials with others
- ❌ Use production keys in development
- ❌ Allow unauthenticated database access

✅ **DO:**
- ✅ Add files to `.gitignore`
- ✅ Use environment variables
- ✅ Setup Firestore Security Rules
- ✅ Validate all inputs on backend
- ✅ Use HTTPS in production

---

## Success Indicators

You'll know everything is working when:

✅ Backend starts without errors
✅ Frontend loads at localhost:3000
✅ Can visit firestore-example.html
✅ Can upload a document
✅ Document appears in Firebase Console
✅ Can view uploaded documents
✅ Can update/delete documents
✅ No CORS errors in browser console

---

## Timeline

- **Setup:** 10-15 minutes
- **Testing:** 5 minutes
- **Integration with existing code:** 30-60 minutes
- **Full deployment:** 1-2 hours

---

**Ready to get started? Follow QUICK_START.md next! 🚀**

Questions? Check INTEGRATION_GUIDE.md for detailed documentation.
