"""
Flask API Server for Bulgarian AI Assistant
Integrates the actionable Python AI with the Node.js backend
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
from datetime import datetime

# Add parent directory to path to import bulgarian_ai
sys.path.insert(0, '/mnt/c/Users/12 klas/Desktop/Matura-Master/python')
from bulgarian_ai import BulgarianAI, AIActionHandler

app = Flask(__name__)
CORS(app)

# Initialize AI system
ai = BulgarianAI()
action_handler = AIActionHandler(ai)

# ==================== AI Endpoints ====================

@app.route('/api/ai/health', methods=['GET'])
def ai_health():
    """Check if AI service is running"""
    return jsonify({
        "status": "AI service is running",
        "service": "Bulgarian AI Assistant (BAI Ганьо)",
        "timestamp": datetime.now().isoformat()
    })


@app.route('/api/ai/ask', methods=['POST'])
def ask_question():
    """
    Ask a question to the AI
    
    Request body:
    {
        "question": "Какво е прилагателно?",
        "context": "bulgarian_grammar"  # optional
    }
    """
    try:
        data = request.get_json()
        question = data.get('question')
        context = data.get('context')
        
        if not question:
            return jsonify({"error": "Question is required"}), 400
        
        answer = ai.answer_question(question, context)
        return jsonify(answer)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/ai/generate-exercise', methods=['POST'])
def generate_exercise_endpoint():
    """
    Generate exercises on a topic
    
    Request body:
    {
        "topic": "граматика",
        "difficulty": "medium",  # easy, medium, hard
        "count": 5
    }
    """
    try:
        data = request.get_json()
        topic = data.get('topic')
        difficulty = data.get('difficulty', 'medium')
        count = data.get('count', 1)
        
        if not topic:
            return jsonify({"error": "Topic is required"}), 400
        
        exercises = ai.generate_exercise(topic, difficulty, count)
        return jsonify({
            "status": "success",
            "exercises": exercises,
            "count": len(exercises)
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/ai/grade-submission', methods=['POST'])
def grade_submission_endpoint():
    """
    Grade a user's submission
    
    Request body:
    {
        "exercise_id": "ex-1",
        "user_answer": "Прилагателно",
        "correct_answer": "Прилагателно"
    }
    """
    try:
        data = request.get_json()
        exercise_id = data.get('exercise_id')
        user_answer = data.get('user_answer')
        correct_answer = data.get('correct_answer')
        
        if not all([exercise_id, user_answer, correct_answer]):
            return jsonify({"error": "All fields are required"}), 400
        
        result = ai.grade_submission(exercise_id, user_answer, correct_answer)
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/ai/recommendation', methods=['POST'])
def get_recommendation():
    """
    Get personalized learning recommendation
    
    Request body:
    {
        "user_progress": {
            "weak_areas": ["grammar"],
            "completed_lessons": 5
        }
    }
    """
    try:
        data = request.get_json()
        user_progress = data.get('user_progress', {})
        
        recommendation = ai.get_learning_recommendation(user_progress)
        return jsonify(recommendation)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/ai/search', methods=['GET'])
def search_knowledge():
    """
    Search the AI's knowledge base
    
    Query params:
    - query: search term
    """
    try:
        query = request.args.get('query')
        
        if not query:
            return jsonify({"error": "Query parameter is required"}), 400
        
        results = ai.search_knowledge_base(query)
        return jsonify({
            "query": query,
            "results": results,
            "count": len(results)
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ==================== Action Endpoints ====================

@app.route('/api/ai/create-study-plan', methods=['POST'])
def create_study_plan():
    """
    Create a personalized study plan
    
    Request body:
    {
        "user_id": "user-123",
        "topics": ["граматика", "литература"],
        "duration_weeks": 4
    }
    """
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        topics = data.get('topics', [])
        duration_weeks = data.get('duration_weeks', 4)
        
        if not user_id:
            return jsonify({"error": "User ID is required"}), 400
        
        plan = action_handler.create_study_plan(user_id, topics, duration_weeks)
        return jsonify(plan)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/ai/next-lesson', methods=['POST'])
def suggest_next_lesson():
    """
    Suggest next lesson based on progress
    
    Request body:
    {
        "user_id": "user-123",
        "current_progress": {
            "completed_lessons": 5,
            "current_score": 85
        }
    }
    """
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        current_progress = data.get('current_progress', {})
        
        if not user_id:
            return jsonify({"error": "User ID is required"}), 400
        
        suggestion = action_handler.suggest_next_lesson(user_id, current_progress)
        return jsonify(suggestion)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/ai/assessment', methods=['POST'])
def generate_assessment():
    """
    Generate a complete assessment/quiz
    
    Request body:
    {
        "topic": "граматика",
        "num_questions": 10
    }
    """
    try:
        data = request.get_json()
        topic = data.get('topic')
        num_questions = data.get('num_questions', 10)
        
        if not topic:
            return jsonify({"error": "Topic is required"}), 400
        
        assessment = action_handler.generate_assessment(topic, num_questions)
        return jsonify(assessment)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ==================== Health Check ====================

@app.route('/health', methods=['GET'])
def health():
    """General health check"""
    return jsonify({
        "status": "ok",
        "service": "AI Flask API Server"
    })


if __name__ == '__main__':
    print("Starting Bulgarian AI Assistant API Server...")
    print("Running on http://localhost:5001")
    print("AI Service: BAI Ганьо - Bulgarian Educational AI")
    app.run(debug=True, port=5001, host='0.0.0.0')
