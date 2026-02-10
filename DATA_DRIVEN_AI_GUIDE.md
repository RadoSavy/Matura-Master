# 📚 Data-Driven AI System Guide

## Overview

Your AI system now:
✅ **Learns from actual lesson data** - Uses content from your original JS files  
✅ **No hardcoded knowledge base** - All knowledge comes from training  
✅ **Actionable AI** - Takes actions based on learned data  
✅ **Firestore synchronized** - Can store and retrieve training data  
✅ **Trainable architecture** - Can be retrained with new lessons  

---

## How It Works

### 1. Data Loading Phase
The AI loads actual lesson data from your JavaScript files:
- `bulgarian.js` - Grammar and language lessons
- `literature.js` - Literary works and analysis
- `texts.js` - Text and communication lessons

### 2. Training Phase
The AI processes the data to:
- Extract topics from lesson titles and descriptions
- Build vocabulary from lesson content
- Generate Q&A pairs based on lessons
- Identify teaching patterns and methods

### 3. Answering Phase
When asked a question, the AI:
- Searches through trained lessons
- Finds matching content
- Returns the most relevant answer
- Provides source and confidence level

---

## Setup & Usage

### Step 1: Start the AI Training Server

```bash
cd python
python ai_training_server.py
```

Expected output:
```
╔═══════════════════════════════════════╗
║  Bulgarian AI Training API Server    ║
╚═══════════════════════════════════════╝

🚀 Running on http://localhost:5001
🤖 Service: Trainable BAI Ганьо

📌 Quick Start:
   1. POST /api/ai/init - Initialize and train AI
   2. POST /api/ai/ask - Ask trained AI
   3. GET /api/ai/training-status - Check status
```

### Step 2: Initialize AI (One-time)

```bash
curl -X POST http://localhost:5001/api/ai/init
```

Response:
```json
{
  "status": "success",
  "message": "AI initialized and trained",
  "load_result": {
    "status": "success",
    "lessons_loaded": 25,
    "topics": ["grammar", "literature", "communication"]
  },
  "train_result": {
    "is_trained": true,
    "lessons_count": 25,
    "topics_count": 3,
    "vocabulary_size": 1250,
    "qa_pairs": 45
  }
}
```

### Step 3: Ask Questions

```bash
curl -X POST http://localhost:5001/api/ai/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "Какво е текстът в масовата комуникация?"}'
```

Response:
```json
{
  "status": "success",
  "answer": "Това е общуване, което достига до огромна аудитория чрез посредник – медия...",
  "source": "Lesson 1: Текстът в масовата комуникация",
  "confidence": 0.95
}
```

---

## API Endpoints

### Training Management

#### Initialize & Train
**POST** `/api/ai/init`
- Loads all lesson data and trains the AI
- Called once on startup
- Response: Training results

#### Load Training Data
**POST** `/api/ai/load-training-data`
- Loads lessons from JavaScript files
- Called before training
- Response: List of loaded lessons

#### Train AI
**POST** `/api/ai/train`
- Trains the model on loaded data
- Response: Training statistics

#### Get Training Status
**GET** `/api/ai/training-status`
- Shows current training state
- Response: Training metadata and statistics

### AI Interaction

#### Ask Trained AI
**POST** `/api/ai/ask`
```json
{
  "question": "Your question here"
}
```
Response includes answer, source, and confidence level

#### Generate Exercises
**POST** `/api/ai/generate-exercise`
```json
{
  "topic": "grammar",
  "count": 3
}
```
Returns 3 exercises based on trained lessons

#### Get Study Path
**GET** `/api/ai/study-path`
Returns recommended lesson sequence based on training data

### Data Access

#### Get All Lessons
**GET** `/api/ai/lessons`
Returns all loaded and processed lessons

#### Get Topics
**GET** `/api/ai/topics`
Returns available topics and lesson counts

#### Get Vocabulary
**GET** `/api/ai/vocabulary?limit=100`
Returns learned vocabulary with frequencies

---

## File Structure

```
python/
├── trainable_ai.py              # Main AI with training logic
│   ├── DataLoader               # Extracts data from JS files
│   ├── TrainableAI              # Core AI with training methods
│   └── ActionableAI             # Actionable tasks (exercises, plans)
│
└── ai_training_server.py        # Flask API server for AI

public/
├── courses-firestore.html       # Updated to use actual lesson data
├── baiganio-enhanced.html       # AI chat interface
└── scripts/
    ├── bulgarian.js             # Original lesson data
    ├── literature.js            # Original lesson data
    └── firestore-integration.js # Client library

server/
├── dynamic-schema.js            # Schema loading from JS files
└── ai_training_server.js        # Node.js integration (optional)
```

---

## How Data Flows

```
Original JS Files (bulgarian.js, literature.js)
        ↓
    DataLoader (extracts lessons)
        ↓
    TrainableAI (processes and trains)
        ↓
    Flask API Server (exposes endpoints)
        ↓
    HTML Pages (ask questions, get answers)
        ↓
    Firestore (optional - store training results)
```

---

## Training Process Explained

### 1. Data Extraction
```python
ai.load_training_data_from_js([
    'public/scripts/bulgarian.js',
    'public/scripts/literature.js'
])
```
- Parses lesson objects from JS
- Extracts title, description, xp, icon
- Organizes by topic

### 2. Model Training
```python
ai.train()
```
- Builds vocabulary from lessons
- Generates Q&A pairs
- Extracts patterns
- Marks as ready for inference

### 3. Inference (Answering)
```python
response = ai.answer_from_training("Your question")
```
- Searches Q&A database
- Matches with lesson content
- Returns best answer with confidence

---

## Example Usage Scenarios

### Scenario 1: Student Asks Question
```javascript
// Frontend
const response = await fs.askAI("Какво е прилагателно?");

// Backend
→ Loads trained AI
→ Searches "прилагателно" in lessons
→ Returns matching lesson content
→ Shows source and confidence
```

### Scenario 2: Generate Exercises
```javascript
const exercises = await fs.generateExercises('grammar', 'easy', 5);

// Backend
→ Gets grammar lessons from training
→ Creates 5 exercises based on lessons
→ Returns exercise questions with sources
```

### Scenario 3: Get Study Path
```javascript
const path = await fs.getStudyPath();

// Backend
→ Returns lessons in order
→ Shows estimated time
→ Includes lesson descriptions
```

---

## Key Features

### 1. **No Hardcoded Knowledge**
- All information comes from your lesson files
- Easy to update - just modify lesson content
- Scalable - add more lessons, AI learns automatically

### 2. **Transparent Answering**
- AI shows source of answer
- Provides confidence rating
- No hidden knowledge base

### 3. **Data-Driven Exercises**
- Exercises generated from actual lessons
- Questions based on real content
- Progressive difficulty

### 4. **Trainable Architecture**
- Can retrain with new lesson data
- Training history maintained
- Statistics tracked

---

## FAQ

**Q: How does the AI learn?**  
A: It loads your existing lesson data from JavaScript files and extracts patterns, vocabulary, and Q&A pairs from them.

**Q: Can I add new lessons?**  
A: Yes! Add lessons to bulgarian.js or literature.js, then retrain with: `POST /api/ai/load-training-data` → `POST /api/ai/train`

**Q: What happens if a question isn't in the training data?**  
A: The AI returns a partial response suggesting to ask about trained topics instead.

**Q: How is this different from a knowledge base?**  
A: A knowledge base is pre-written Q&A pairs. This AI extracts knowledge from your lessons, making it more flexible and updateable.

**Q: Should I use Firestore?**  
A: Firestore is optional. The AI works standalone. Use Firestore if you want to store training results or user progress.

---

## Troubleshooting

### AI Server Not Responding
```bash
# Check if server is running
curl http://localhost:5001/health

# Restart server
python ai_training_server.py
```

### AI Not Trained
```bash
# Initialize AI
curl -X POST http://localhost:5001/api/ai/init

# Check status
curl http://localhost:5001/api/ai/training-status
```

### No Lessons Loaded
- Verify JS files exist in `public/scripts/`
- Check file paths in `ai_training_server.py`
- Ensure lesson objects have correct format

### Questions Not Answered
- Train AI with new data
- Check if question matches lesson content
- Add more varied lessons

---

## Performance Tips

1. **Cache Training Results**
   - Save training data to JSON file
   - Load from cache instead of retraining

2. **Optimize Vocabulary Search**
   - Only search relevant lessons by topic
   - Use vocabulary index for fast lookups

3. **Batch Processing**
   - Load multiple lesson files together
   - Train once, use many times

---

## Next Steps

1. **Test the System**
   - Start AI server: `python ai_training_server.py`
   - Initialize: `POST /api/ai/init`
   - Ask questions via HTML pages

2. **Expand Training Data**
   - Add more lessons to JS files
   - Add different subjects/topics
   - Retrain AI

3. **Integrate with Frontend**
   - Use `firestore-integration.js`
   - Update HTML pages
   - Deploy

4. **Monitor & Improve**
   - Track which questions are unanswered
   - Add lessons for those topics
   - Retrain periodically

---

## Repository Structure
```
Matura-Master/
├── python/
│   ├── trainable_ai.py
│   ├── ai_training_server.py
│   └── requirements.txt
├── server/
│   ├── dynamic-schema.js
│   └── [other server files]
├── public/
│   ├── courses-firestore.html
│   ├── baiganio-enhanced.html
│   └── scripts/
│       ├── bulgarian.js (training data)
│       ├── literature.js (training data)
│       └── firestore-integration.js
└── [other project files]
```

---

## Support & Improvement

The AI improves as you:
- Add more lessons
- Create more educational content
- Expand topics
- Train with new data

No external knowledge base needed - just your content! 🚀
