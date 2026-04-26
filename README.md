# 🎓 Matura Master

## 🚀 Features

### 📚 Learning Content
- **Literature Section**: Study key Bulgarian works and authors
- **Texts & Analysis**: Practice interpretation and exam-style questions
- **Courses**: Structured preparation paths
- **Bulgarian Language**: Grammar and writing-focused materials

### 🔐 User System
- **Authentication**: Firebase-based login system
- **Google OAuth**: Fast and secure sign-in

### 🤖 Smart Backend
- **AI Endpoints**: Assist with studying and content generation
- **REST API**: Handles content, logic, and communication
- **Error Handling**: Stable request validation and responses

## 🛠️ Tech Stack

### 🎯 Frontend
- **HTML**
- **React**: Component-based UI
- **React Router**: Navigation system

### ⚙️ Backend
- **Node.js**: Runtime environment
- **Express**: Backend framework
- **CORS**: Cross-origin requests
- **dotenv**: Environment configuration

### ☁️ Services
- **Firebase**: Authentication and database
- **Google OAuth**: External login

## 🚀 Getting Started

### Prerequisites

> [!IMPORTANT]
> - *Node.js 18+ must be installed*
> - *Internet connection required*
> - *Firebase project needed for full functionality*

### Installation

1. **Clone the repository**:
   ```
   git clone https://github.com/RadoSavy/Matura-Master
   cd Matura-Master
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Start the backend**:
   ```
   cd server
   npm run dev
   ```

4. **Start the frontend**:
   ```
   npm start
   ```

## 🎮 Usage

### Running the App
Ensure you have the `.env` file configured with your Firebase credentials before starting the application.

```
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
npm start
```

### Navigation Interface
The system provides an intuitive web interface:
```
🏠 Home - Main dashboard
📚 Literature - Study materials
📝 Texts - Practice analysis
🎓 Courses - Learning modules
🇧🇬 Bulgarian - Language resources
🔐 Login - User authentication
```

## 🧠 System Architecture

### Backend Implementation
```
// Key components of our backend:
1. Express Server: REST API endpoint handling
2. Firebase SDK: Authentication and data storage
3. AI Service: Content generation and assistance
4. Middleware: CORS, JSON parsing, error handling
```

## 🎯 API Specification

### Endpoints

1. **GET /health**
   - Checks server status
   - Returns: `{"status": "ok", "timestamp": "ISO string"}`

2. **POST /api/ai/generate**
   - Sends prompts to AI assistant
   - Expects: `{"prompt": "string", "context": "optional string"}`
   - Returns: `{"response": "string", "success": boolean}`

3. **GET /api/literature**
   - Retrieves literature materials
   - Returns: `{"materials": Array, "total": number}`

4. **POST /api/auth/login**
   - Authenticates user with Firebase
   - Expects: Firebase ID token
   - Returns: `{"user": Object, "token": "string"}`

### Error Handling
- **Network Errors**: Automatic retry with exponential backoff
- **Invalid Responses**: Graceful degradation with clear error messages
- **Validation**: Request body validation before processing
- **Authentication**: Token verification on protected routes

> [!CAUTION]
> You cannot run authentication features without a valid Firebase configuration.

## 🐛 Troubleshooting

### Common Issues

1. **"Server not starting" error**
   - Check if port `5000` is already in use
   - Verify your `.env` file exists in the `server/` folder
   - Ensure all dependencies are installed with `npm install`

2. **"Login not working" error**
   - Verify Firebase configuration in `.env`
   - Check Google OAuth credentials are valid
   - Ensure backend is running on `http://localhost:5000`

3. **"API request failed" error**
   - Open browser console (`F12` → `Network` tab)
   - Check if backend is responding with `GET /health`
   - Verify CORS settings allow `http://localhost:3000`

4. **"AI endpoint timeout" error**
   - Check your internet connection
   - Verify API keys are valid and not expired
   - Reduce request complexity or retry later
