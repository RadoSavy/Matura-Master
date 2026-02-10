"""
Flask API Server for Trainable Bulgarian AI
Integrates the data-driven AI system
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
from datetime import datetime
import os

# Add parent directory to path
sys.path.insert(0, 'c:/Users/12 klas/Desktop/Matura-Master/python')
from trainable_ai import ActionableAI

app = Flask(__name__)
CORS(app)

# Initialize AI system
ai = ActionableAI()
training_status = {'status': 'not_trained', 'message': 'AI needs training'}

# Configure paths
PROJECT_ROOT = 'c:/Users/12 klas/Desktop/Matura-Master'
JS_FILES = [
    f'{PROJECT_ROOT}/public/scripts/bulgarian.js',
    f'{PROJECT_ROOT}/public/scripts/literature.js',
    f'{PROJECT_ROOT}/public/scripts/texts.js'
]

# ==================== Health Check ====================

@app.route('/api/ai/health', methods=['GET'])
def ai_health():
    """Check if AI service is running"""
    return jsonify({
        "status": "AI service is running",
        "service": "Trainable Bulgarian AI (BAI Ганьо)",
        "training_status": training_status,
        "timestamp": datetime.now().isoformat()
    })


# ==================== AI Training ====================

@app.route('/api/ai/load-training-data', methods=['POST'])
def load_training_data():
    """Load training data from JavaScript files"""
    global training_status
    
    try:
        print("Loading training data...")
        result = ai.load_training_data_from_js(JS_FILES)
        training_status = {'status': 'data_loaded', 'message': 'Ready to train'}
        
        return jsonify({
            "status": "success",
            "message": "Training data loaded from JavaScript files",
            "data": result
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/ai/train', methods=['POST'])
def train_ai():
    """Train the AI on loaded data"""
    global training_status
    
    try:
        if not ai.training_data['lessons']:
            return jsonify({
                "error": "No training data loaded",
                "message": "Please load training data first with /api/ai/load-training-data"
            }), 400
        
        print("Training AI...")
        result = ai.train()
        training_status = {'status': 'trained', 'message': 'AI is ready'}
        
        return jsonify({
            "status": "success",
            "message": "AI trained successfully",
            "training_result": result
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/ai/training-status', methods=['GET'])
def get_training_status():
    """Get current training status and data"""
    try:
        status = ai.get_training_status()
        return jsonify({
            "status": "success",
            "training_status": training_status,
            "data": status
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/ai/export-training-data', methods=['GET'])
def export_training_data():
    """Export training data"""
    try:
        data = ai.export_training_data()
        return jsonify({
            "status": "success",
            "data": data
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ==================== AI Interaction ====================

@app.route('/api/ai/ask', methods=['POST'])
def ask_question():
    """
    Ask a question to the trained AI
    
    Request body:
    {
        "question": "Какво е текстът в масовата комуникация?"
    }
    """
    try:
        data = request.get_json()
        question = data.get('question')
        
        if not question:
            return jsonify({"error": "Question is required"}), 400
        
        if training_status['status'] != 'trained':
            return jsonify({
                "error": "AI not trained",
                "message": "Please train the AI first"
            }), 400
        
        answer = ai.answer_from_training(question)
        return jsonify(answer)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/ai/generate-exercise', methods=['POST'])
def generate_exercise():
    """
    Generate exercises from training data
    
    Request body:
    {
        "topic": "граматика",
        "count": 3
    }
    """
    try:
        data = request.get_json()
        topic = data.get('topic')
        count = data.get('count', 3)
        
        if training_status['status'] != 'trained':
            return jsonify({"error": "AI not trained"}), 400
        
        exercises = ai.generate_exercise_from_training(topic, count)
        return jsonify({
            "status": "success",
            "exercises": exercises,
            "count": len(exercises)
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/ai/study-path', methods=['GET'])
def get_study_path():
    """Get recommended study path based on training data"""
    try:
        if training_status['status'] != 'trained':
            return jsonify({"error": "AI not trained"}), 400
        
        path = ai.get_study_path()
        return jsonify({
            "status": "success",
            "study_path": path
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ==================== Data Management ====================

@app.route('/api/ai/lessons', methods=['GET'])
def get_lessons():
    """Get all loaded lessons"""
    try:
        lessons = ai.training_data['lessons']
        return jsonify({
            "status": "success",
            "lessons": lessons,
            "count": len(lessons)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/ai/topics', methods=['GET'])
def get_topics():
    """Get available topics from training data"""
    try:
        topics = {
            topic: len(lessons) 
            for topic, lessons in ai.training_data['topics'].items()
        }
        return jsonify({
            "status": "success",
            "topics": topics
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/ai/vocabulary', methods=['GET'])
def get_vocabulary():
    """Get vocabulary learned by AI"""
    try:
        limit = request.args.get('limit', 100, type=int)
        sorted_vocab = sorted(
            ai.training_data['vocabulary'].items(),
            key=lambda x: x[1],
            reverse=True
        )[:limit]
        
        return jsonify({
            "status": "success",
            "vocabulary": dict(sorted_vocab),
            "total": len(ai.training_data['vocabulary'])
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ==================== Initialization ====================

@app.route('/api/ai/init', methods=['POST'])
def initialize_ai():
    """Initialize AI by loading and training data"""
    try:
        # Load data
        load_result = ai.load_training_data_from_js(JS_FILES)
        
        # Train AI
        train_result = ai.train()
        
        global training_status
        training_status = {'status': 'trained', 'message': 'AI initialized and trained'}
        
        return jsonify({
            "status": "success",
            "message": "AI initialized and trained",
            "load_result": load_result,
            "train_result": train_result
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ==================== Health Check ====================

@app.route('/health', methods=['GET'])
def health():
    """General health check"""
    return jsonify({
        "status": "ok",
        "service": "Trainable AI Flask API Server",
        "ai_status": training_status
    })


# Error handler
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found"}), 404


if __name__ == '__main__':
    print("\n╔═══════════════════════════════════════╗")
    print("║  Bulgarian AI Training API Server    ║")
    print("╚═══════════════════════════════════════╝\n")

    print("🚀 Running on http://localhost:5001")
    print("🤖 Service: Trainable BAI Ганьо\n")

    print("📌 Quick Start:")
    print("   1. POST /api/ai/init - Initialize and train AI")
    print("   2. POST /api/ai/ask - Ask trained AI")
    print("   3. GET /api/ai/training-status - Check status\n")

    # Auto-initialize AI on startup
    try:
        print("🤖 Initializing AI system...")
        load_result = ai.load_training_data_from_js(JS_FILES)
        train_result = ai.train()
        training_status = {'status': 'trained', 'message': 'AI initialized and trained on startup'}
        print("✅ AI initialized successfully\n")
    except Exception as e:
        print(f"❌ AI initialization failed: {e}\n")
        training_status = {'status': 'error', 'message': str(e)}

    app.run(debug=True, port=5001, host='0.0.0.0')
