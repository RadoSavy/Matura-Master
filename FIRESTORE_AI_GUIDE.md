# 🚀 Complete Firestore Migration & AI Implementation Guide

## Overview

This guide covers the complete migration of your HTML static data to **Firestore** and the implementation of an **actionable Python-based AI system** (BAI Ганьо).

### What's New:
✅ **Firestore Integration** - All data now stored in cloud database  
✅ **Python AI Service** - Actionable AI built with Python (not just a knowledge base)  
✅ **AI API Server** - Flask server exposing AI capabilities via REST API  
✅ **Enhanced HTML Pages** - New pages using Firestore & AI  
✅ **Data Migration Scripts** - Automated Firestore initialization  

---

## 📁 File Structure

```
project/
├── python/
│   ├── bulgarian_ai.py          # Main AI system with knowledge base
│   └── ai_server.py              # Flask API server for AI
├── server/
│   ├── index.js                  # Original Node.js server
│   ├── server-enhanced.js        # Enhanced with AI proxy
│   ├── firestore-schema.js       # Firestore collection schemas
│   ├── migrate-to-firestore.js   # Data migration script
│   └── package.json              # Dependencies
├── public/
│   ├── courses-firestore.html    # Updated courses page
│   ├── baiganio-enhanced.html    # Enhanced AI assistant page
│   └── scripts/
│       └── firestore-integration.js  # Firestore helper library
```

---

## ⚙️ Installation & Setup

### Step 1: Install Python AI Server Dependencies

```bash
# Navigate to python directory
cd python

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install flask flask-cors
```

### Step 2: Install Node.js Dependencies

```bash
# Navigate to server directory
cd server

# Install/update dependencies
npm install

# Also install axios for AI proxy (if not already installed)
npm install axios
```

### Step 3: Environment Configuration

Create a `.env` file in the `server/` directory with your Firebase credentials:

```env
# Firebase Configuration
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=matura-master-9fac8
FIREBASE_PRIVATE_KEY_ID=your_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@matura-master-9fac8.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your_client_id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=your_cert_url
FIREBASE_UNIVERSE_DOMAIN=googleapis.com

# Server Configuration
PORT=5000

# AI Service Configuration
AI_SERVICE_URL=http://localhost:5001/api
```

---

## 🚀 Running the System

### Start AI Server (Python)

```bash
cd python
python ai_server.py
```

Expected output:
```
Starting Bulgarian AI Assistant API Server...
Running on http://localhost:5001
AI Service: BAI Ганьо - Bulgarian Educational AI
```

### Start Node.js Backend

```bash
cd server
npm start
```

Or to run with the enhanced server:

```bash
node server-enhanced.js
```

Expected output:
```
🚀 Backend server is running on http://localhost:5000
📊 Firestore database connected to project: matura-master-9fac8
🚀 AI service proxy configured: http://localhost:5001/api
```

### Migrate Data to Firestore

```bash
cd server
node migrate-to-firestore.js
```

This will:
1. Clear existing Firestore collections (optional)
2. Upload initial data from schemas
3. Verify the migration
4. Show security rules recommendations

---

## 🔥 New HTML Pages

### 1. Enhanced Courses Page
**File:** `public/courses-firestore.html`

Features:
- Load courses from Firestore
- Display with dynamic content
- Integrated AI assistant for questions
- Real-time interaction

**Usage:**
```html
<script src="/scripts/firestore-integration.js"></script>
<script>
  const fs = new FirestoreIntegration('http://localhost:5000/api');
  const courses = await fs.loadDocuments('courses');
</script>
```

### 2. Enhanced AI Assistant (BAI Ганьо)
**File:** `public/baiganio-enhanced.html`

Features:
- Chat interface with AI
- Generate exercises on-demand
- Personalized recommendations
- Study plan creation
- Test generation
- Knowledge base search

---

## 🤖 AI System Capabilities

### 1. Question Answering
```javascript
const response = await fs.askAI("Какво е прилагателно?");
// Returns: answer, explanation, rules, resources
```

### 2. Exercise Generation
```javascript
const exercises = await fs.generateExercises('граматика', 'medium', 5);
// Generates 5 medium-difficulty grammar exercises
```

### 3. Grading Submissions
```javascript
const grade = await fs.gradeSubmission('ex-1', 'Прилагателно', 'Прилагателно');
// Returns: is_correct, score, feedback
```

### 4. Learning Recommendations
```javascript
const recs = await fs.getRecommendation({
  weak_areas: ['grammar'],
  completed_lessons: 5
});
// Returns personalized recommendations
```

### 5. Study Plans
```javascript
const plan = await fs.createStudyPlan('user-123', ['граматика', 'литература'], 4);
// Creates 4-week study plan
```

### 6. Knowledge Base Search
```javascript
const results = await fs.searchKnowledge('глаголи');
// Searches AI knowledge base
```

### 7. Test Generation
```javascript
const assessment = await fs.generateAssessment('български', 10);
// Generates 10-question quiz
```

---

## 🗄️ Firestore Collections

### courses
```json
{
  "title": "Български език",
  "description": "Граматика и правопис",
  "instructor": "Matura Master Team",
  "category": "languages",
  "level": "beginner",
  "duration": "8 недели",
  "icon": "📚",
  "topics": ["Граматика", "Правопис"]
}
```

### texts
```json
{
  "title": "Тургенев - 'Отцы и дети'",
  "author": "Иван Тургенев",
  "type": "novel",
  "content": "...",
  "category": "literature",
  "difficulty": "advanced"
}
```

### exercises
```json
{
  "title": "Упражнение 1: Части на речта",
  "type": "multiple-choice",
  "question": "Какво е следното слово?",
  "options": ["Имя", "Прилагателно", "Наречие", "Глагол"],
  "correctAnswer": 2
}
```

### users
```json
{
  "email": "user@example.com",
  "name": "Student Name",
  "role": "student",
  "progress": {
    "coursesEnrolled": [],
    "completedLessons": [],
    "score": 0
  }
}
```

### userProgress
```json
{
  "userId": "user-id",
  "exerciseId": "exercise-id",
  "completed": false,
  "score": 0,
  "attempts": 0
}
```

---

## 🔌 API Endpoints

### Firestore CRUD
- `POST /api/documents/:collection` - Create document
- `GET /api/documents/:collection` - Get all documents
- `GET /api/documents/:collection/:id` - Get single document
- `PUT /api/documents/:collection/:id` - Update document
- `DELETE /api/documents/:collection/:id` - Delete document
- `POST /api/batch/:collection` - Batch upload
- `GET /api/query/:collection?field=X&value=Y` - Query

### AI Endpoints
- `POST /api/ai/ask` - Ask question
- `POST /api/ai/generate-exercise` - Generate exercises
- `POST /api/ai/grade-submission` - Grade submission
- `POST /api/ai/recommendation` - Get recommendations
- `POST /api/ai/create-study-plan` - Create study plan
- `POST /api/ai/next-lesson` - Get next lesson
- `POST /api/ai/assessment` - Generate assessment
- `GET /api/ai/search?query=X` - Search knowledge base

---

## 📊 Firestore Security Rules

Recommended rules to add in Firebase Console:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access
    match /{document=**} {
      allow read;
    }
    
    // User documents
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // User progress
    match /userProgress/{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Admin writes
    match /{document=**} {
      allow write: if request.auth.token.admin == true;
    }
  }
}
```

---

## 🧪 Testing the System

### Test Firestore Connection
```bash
curl http://localhost:5000/health
```

### Test AI Service
```bash
curl -X POST http://localhost:5000/api/ai/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "Какво е прилагателно?"}'
```

### Test Document Creation
```bash
curl -X POST http://localhost:5000/api/documents/courses \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Course",
    "description": "Test course",
    "instructor": "Test"
  }'
```

---

## 🐛 Troubleshooting

### AI Service Not Responding
- Ensure Python AI server is running: `python python/ai_server.py`
- Check firewall settings for port 5001
- Verify `AI_SERVICE_URL` in .env file

### Firestore Connection Issues
- Verify .env file has correct Firebase credentials
- Check firestore.js existence and initialization
- Ensure Firebase project ID is correct

### Data Not Appearing
- Run migration script: `node server/migrate-to-firestore.js`
- Check Firestore console for data
- Verify security rules allow reads

---

## 🎓 Usage Examples

### Updating HTML to Use Firestore

**Before (Static):**
```html
<div class="course-card">
  <h3>Bulgarian Course</h3>
  <p>Learn Bulgarian</p>
</div>
```

**After (Dynamic with Firestore):**
```html
<div id="course-list"></div>

<script src="/scripts/firestore-integration.js"></script>
<script>
  const fs = new FirestoreIntegration();
  fs.loadDocuments('courses').then(courses => {
    document.getElementById('course-list').innerHTML = courses
      .map(c => `<div class="course-card">
        <h3>${c.title}</h3>
        <p>${c.description}</p>
      </div>`)
      .join('');
  });
</script>
```

### Creating a New Page with AI

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Learning Page</title>
</head>
<body>
  <h1>Ask BAI Ганьо</h1>
  <input type="text" id="question" placeholder="Your question">
  <button onclick="askAI()">Ask</button>
  <div id="answer"></div>

  <script src="/scripts/firestore-integration.js"></script>
  <script>
    const fs = new FirestoreIntegration();
    
    async function askAI() {
      const question = document.getElementById('question').value;
      const response = await fs.askAI(question);
      document.getElementById('answer').innerHTML = response.answer;
    }
  </script>
</body>
</html>
```

---

## 📚 Additional Resources

- **Firestore Documentation:** https://firebase.google.com/docs/firestore
- **Python AI Docs:** See `python/bulgarian_ai.py` for all methods
- **Flask Documentation:** https://flask.palletsprojects.com/
- **Firebase Console:** https://console.firebase.google.com/

---

## 🎉 You're All Set!

Your application now has:
- ✅ Cloud database (Firestore)
- ✅ Python-based actionable AI system
- ✅ REST API for all operations
- ✅ Dynamic HTML pages
- ✅ Exercise generation & grading
- ✅ Personalized learning paths

**Start using the new system by opening:**
- `http://localhost:3000/courses-firestore.html` (for courses)
- `http://localhost:3000/baiganio-enhanced.html` (for AI assistant)

Happy learning! 🚀📚
