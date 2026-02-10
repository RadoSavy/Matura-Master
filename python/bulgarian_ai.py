"""
BAI Ганьо - Bulgarian AI Assistant
Python-based actionable AI for Matura Master

This AI system can:
1. Answer educational questions with context
2. Generate exercises and problems
3. Grade user submissions
4. Provide personalized study recommendations
5. Track learning patterns
"""

import json
import random
from datetime import datetime
from typing import List, Dict, Optional
import requests

class BulgarianAI:
    """Main AI class for Bulgarian language education"""
    
    def __init__(self, api_base_url: str = "http://localhost:5000/api"):
        self.api_base_url = api_base_url
        self.context_cache = {}
        self.knowledge_base = self._initialize_knowledge_base()
        
    def _initialize_knowledge_base(self) -> Dict:
        """Initialize with educational knowledge about Bulgarian language"""
        return {
            "grammar": {
                "parts_of_speech": {
                    "noun": {
                        "description": "Имя - дума, която обозначава някой или нещо",
                        "examples": ["момче", "училище", "книга"],
                        "rules": [
                            "Имената имат род: мъжки, женски, средни",
                            "Имената имат число: единствено, множествено"
                        ]
                    },
                    "verb": {
                        "description": "Глагол - дума, която обозначава действие",
                        "examples": ["учи", "работи", "пази"],
                        "rules": [
                            "Глаголите имат вид: свършен, несвършен",
                            "Глаголите имат време: сегашно, минало, бъдеще"
                        ]
                    },
                    "adjective": {
                        "description": "Прилагателно - дума, която определя имя",
                        "examples": ["красив", "голям", "млад"],
                        "rules": [
                            "Прилагателните се съгласуват с имената",
                            "Имат степени: положителна, сравнителна, превъзходна"
                        ]
                    },
                    "adverb": {
                        "description": "Наречие - дума, която определя глагол",
                        "examples": ["красиво", "бързо", "внимателно"],
                        "rules": [
                            "Наречиата отговарят на въпроса 'как?'",
                            "Не се изменят в род и число"
                        ]
                    }
                },
                "punctuation": {
                    "period": {
                        "description": "Точка (.)",
                        "usage": "За завършване на изречение",
                        "examples": ["Учу български. Харесва ми."]
                    },
                    "comma": {
                        "description": "Запетая (,)",
                        "usage": "За отделяне на части в изречението",
                        "examples": ["Учу български, математика и английски."]
                    }
                }
            },
            "literature": {
                "analysis_techniques": [
                    "Анализ на герои",
                    "Анализ на сюжет",
                    "Стилистичен анализ",
                    "Контекст и периодизация"
                ],
                "important_works": {
                    "vasil_levski": "Революционен деятел, символ на българското съпротивление",
                    "ivan_vazov": "Основоположник на новата българска литература"
                }
            },
            "mass_communication": {
                "definition": "Масовата комуникация е общуване, което достига до огромна аудитория чрез посредник – медия.",
                "media_types": ["интернет", "телевизия", "радио", "вестници", "списания", "социални мрежи"],
                "text_types": {
                    "informational_note": "Кратък текст с факти, актуалност и обективност",
                    "reportage": "Авторски разказ за събитие с атмосфера и детайли",
                    "interview": "Диалогична форма между интервюиращ и интервюиран"
                },
                "text_purpose": "Текстът в масовата комуникация може да информира, коментира, подтиква към действие, влияе на чувства и емоции, развлича."
            }
        }
    
    def answer_question(self, question: str, context: Optional[str] = None) -> Dict:
        """
        Answer an educational question with educational context
        
        Args:
            question: The question to answer
            context: Optional context about what topic is being studied
            
        Returns:
            Dictionary with answer, explanation, and related resources
        """
        question_lower = question.lower()
        
        # Try to find matching educational content
        for grammar_topic in ["имя", "глагол", "прилагателно", "наречие", "части на речта"]:
            if grammar_topic in question_lower:
                return self._provide_grammar_answer(grammar_topic)

        for literature_topic in ["литература", "произведение", "герой", "анализ"]:
            if literature_topic in question_lower:
                return self._provide_literature_answer(literature_topic)

        for mass_comm_topic in ["медиа", "комуникация", "масова", "текст", "информационна", "бележка", "репортаж", "интервю"]:
            if mass_comm_topic in question_lower:
                return self._provide_mass_communication_answer(question_lower)
        
        # Default educational response
        return {
            "status": "success",
            "answer": "Много добър въпрос! Препоръчвам да проучиш материалите в съответния курс.",
            "explanation": "За по-детайлен отговор, моля посети съответния раздел на курса.",
            "resources": [],
            "timestamp": datetime.now().isoformat()
        }
    
    def _provide_grammar_answer(self, topic: str) -> Dict:
        """Provide a grammar-focused answer"""
        grammar_info = self.knowledge_base["grammar"]["parts_of_speech"]
        
        for key, info in grammar_info.items():
            if key in topic or topic in key:
                return {
                    "status": "success",
                    "answer": info["description"],
                    "explanation": f"Примери: {', '.join(info['examples'])}",
                    "rules": info["rules"],
                    "resources": [],
                    "timestamp": datetime.now().isoformat()
                }
        
        return {
            "status": "partial",
            "answer": "Намерих информация по граматика, но не exactно това което издвоиш.",
            "explanation": "Моля уточни още",
            "resources": [],
            "timestamp": datetime.now().isoformat()
        }
    
    def _provide_literature_answer(self, topic: str) -> Dict:
        """Provide a literature-focused answer"""
        return {
            "status": "success",
            "answer": "Литературата е централна част от курса.",
            "explanation": "Препоръчвам прочетене на класически произведения и лит. анализ.",
            "resources": ["bulgarian.html", "literature.html", "texts.html"],
            "timestamp": datetime.now().isoformat()
        }

    def _provide_mass_communication_answer(self, topic: str) -> Dict:
        """Provide a mass communication-focused answer"""
        mass_comm_info = self.knowledge_base["mass_communication"]

        if "текст" in topic and "масова" in topic:
            return {
                "status": "success",
                "answer": mass_comm_info["text_purpose"],
                "explanation": f"Текстът в масовата комуникация може да бъде: {', '.join(mass_comm_info['text_types'].keys())}",
                "resources": ["bulgarian.html"],
                "timestamp": datetime.now().isoformat()
            }

        return {
            "status": "success",
            "answer": mass_comm_info["definition"],
            "explanation": f"Медии включват: {', '.join(mass_comm_info['media_types'])}",
            "resources": ["bulgarian.html"],
            "timestamp": datetime.now().isoformat()
        }
    
    def generate_exercise(self, topic: str, difficulty: str = "medium", count: int = 1) -> List[Dict]:
        """
        Generate educational exercises on a topic
        
        Args:
            topic: Topic for exercise generation
            difficulty: Exercise difficulty (easy, medium, hard)
            count: Number of exercises to generate
            
        Returns:
            List of generated exercises
        """
        exercises = []
        
        grammar_topics = ["parts_of_speech", "punctuation", "tenses"]
        
        for i in range(count):
            if any(g in topic.lower() for g in ["граматика", "части", "речта"]):
                exercise = self._generate_grammar_exercise(difficulty)
            elif any(l in topic.lower() for l in ["литература", "произведение"]):
                exercise = self._generate_literature_exercise(difficulty)
            else:
                exercise = self._generate_general_exercise(difficulty)
            
            exercises.append(exercise)
        
        return exercises
    
    def _generate_grammar_exercise(self, difficulty: str) -> Dict:
        """Generate grammar exercise"""
        easy_words = ["красив", "бързо", "голям", "учи", "книга"]
        medium_words = ["съответствие", "синтаксис", "морфология", "деривация"]
        hard_words = ["енклиъка", "проклиъка", "апокопа", "синкопа"]
        
        word_pool = easy_words if difficulty == "easy" else (medium_words if difficulty == "medium" else hard_words)
        word = random.choice(word_pool)
        
        return {
            "id": f"exercise-{datetime.now().timestamp()}",
            "type": "multiple_choice",
            "difficulty": difficulty,
            "question": f"Определи частта на речта на думата: '{word}'",
            "options": ["Имя", "Глагол", "Прилагателно", "Наречие"],
            "correct_answer_index": random.randint(0, 3),
            "explanation": f"Думата '{word}' е една от основните части на речта в български език.",
            "topic": "grammar"
        }
    
    def _generate_literature_exercise(self, difficulty: str) -> Dict:
        """Generate literature exercise"""
        return {
            "id": f"exercise-{datetime.now().timestamp()}",
            "type": "short_answer",
            "difficulty": difficulty,
            "question": "Кой е главният герой на произведението?",
            "hint": "Проучи характеристиките на героя в началните глави.",
            "topic": "literature"
        }
    
    def _generate_general_exercise(self, difficulty: str) -> Dict:
        """Generate general exercise"""
        return {
            "id": f"exercise-{datetime.now().timestamp()}",
            "type": "true_false",
            "difficulty": difficulty,
            "question": "Българският език е славянски език.",
            "correct_answer": True,
            "explanation": "Българският е един от южните славянски езици.",
            "topic": "general"
        }
    
    def grade_submission(self, exercise_id: str, user_answer: str, correct_answer: str) -> Dict:
        """
        Grade a user's answer to an exercise
        
        Args:
            exercise_id: ID of the exercise
            user_answer: User's provided answer
            correct_answer: The correct answer
            
        Returns:
            Grading result with feedback
        """
        is_correct = user_answer.lower().strip() == correct_answer.lower().strip()
        
        return {
            "exercise_id": exercise_id,
            "is_correct": is_correct,
            "score": 100 if is_correct else 0,
            "feedback": "Отлично!" if is_correct else "Спробай отново. Преди това прочети материалите.",
            "timestamp": datetime.now().isoformat()
        }
    
    def get_learning_recommendation(self, user_progress: Dict) -> Dict:
        """
        Get personalized learning recommendation based on user progress
        
        Args:
            user_progress: Dictionary with user's progress data
            
        Returns:
            Personalized recommendation
        """
        weak_areas = user_progress.get("weak_areas", [])
        completed_lessons = user_progress.get("completed_lessons", 0)
        
        recommendations = []
        
        if completed_lessons < 5:
            recommendations.append("Начни с основните уроци по граматика.")
        
        if "grammar" in weak_areas:
            recommendations.append("Фокусирай се на практикуване на части на речта.")
        
        if "literature" in weak_areas:
            recommendations.append("Прочети класически произведения и направи анализи.")
        
        if not recommendations:
            recommendations.append("Продължай с напредналите уроци!")
        
        return {
            "recommendations": recommendations,
            "next_topic": "Синтаксис и структура на изречението",
            "estimated_study_time": "2-3 часа",
            "resources": ["bulgarian.html", "literature.html"],
            "timestamp": datetime.now().isoformat()
        }
    
    def search_knowledge_base(self, query: str) -> List[Dict]:
        """
        Search the knowledge base for relevant information
        
        Args:
            query: Search query
            
        Returns:
            List of relevant results
        """
        results = []
        
        # Search through grammar knowledge
        for topic, data in self.knowledge_base["grammar"].items():
            if query.lower() in json.dumps(data).lower():
                results.append({
                    "category": "grammar",
                    "topic": topic,
                    "data": data
                })
        
        # Search through literature knowledge
        for topic, data in self.knowledge_base["literature"].items():
            if query.lower() in json.dumps(data).lower():
                results.append({
                    "category": "literature",
                    "topic": topic,
                    "data": data
                })

        # Search through mass communication knowledge
        for topic, data in self.knowledge_base["mass_communication"].items():
            if query.lower() in json.dumps(data).lower():
                results.append({
                    "category": "mass_communication",
                    "topic": topic,
                    "data": data
                })

        return results[:5]  # Return top 5 results


class AIActionHandler:
    """Handles actionable AI tasks"""
    
    def __init__(self, ai: BulgarianAI, api_base_url: str = "http://localhost:5000/api"):
        self.ai = ai
        self.api_base_url = api_base_url
    
    def create_study_plan(self, user_id: str, topics: List[str], duration_weeks: int = 4) -> Dict:
        """Create a personalized study plan"""
        return {
            "user_id": user_id,
            "topics": topics,
            "duration_weeks": duration_weeks,
            "weekly_goals": [
                {"week": 1, "goal": f"Learn {topics[0] if topics else 'basics'}"},
                {"week": 2, "goal": "Practice exercises"},
                {"week": 3, "goal": "Advanced topics"},
                {"week": 4, "goal": "Final review"}
            ][:duration_weeks],
            "created_at": datetime.now().isoformat()
        }
    
    def suggest_next_lesson(self, user_id: str, current_progress: Dict) -> Dict:
        """Suggest the next lesson based on progress"""
        return {
            "user_id": user_id,
            "next_lesson": "Синтаксис на сложното изречение",
            "reason": "Завършил си основните модули",
            "difficulty": "intermediate",
            "estimated_duration_minutes": 45
        }
    
    def generate_assessment(self, topic: str, num_questions: int = 10) -> Dict:
        """Generate a complete assessment/quiz"""
        exercises = self.ai.generate_exercise(topic, "medium", num_questions)
        return {
            "assessment_id": f"assessment-{datetime.now().timestamp()}",
            "topic": topic,
            "exercises": exercises,
            "total_questions": len(exercises),
            "time_limit_minutes": 30,
            "passing_score": 70
        }


if __name__ == "__main__":
    # Initialize the AI
    ai = BulgarianAI()
    
    # Test example usage
    print("=== Bulgarian AI Assistant Test ===\n")
    
    # Test question answering
    answer = ai.answer_question("Какво е прилагателно?")
    print(f"Question: Какво е прилагателно?")
    print(f"Answer: {answer['answer']}\n")
    
    # Test exercise generation
    exercises = ai.generate_exercise("граматика", "easy", 2)
    print(f"Generated {len(exercises)} exercises\n")
    
    # Test grading
    grade = ai.grade_submission("ex-1", "Прилагателно", "Прилагателно")
    print(f"Grade: {grade['is_correct']} - {grade['feedback']}\n")
    
    # Test recommendations
    user_progress = {
        "weak_areas": ["grammar"],
        "completed_lessons": 3
    }
    recommendation = ai.get_learning_recommendation(user_progress)
    print(f"Recommendations: {recommendation['recommendations']}\n")
