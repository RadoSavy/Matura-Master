"""
Bulgarian AI with Data-Driven Learning
Loads actual lesson data from JavaScript files and learns from it
"""

import json
import os
import re
from datetime import datetime
from typing import List, Dict, Optional, Any
import requests

class DataLoader:
    """Extracts and loads data from JavaScript files"""
    
    @staticmethod
    def load_js_file(file_path: str) -> Dict[str, Any]:
        """Load and parse JavaScript file to extract data"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            data = {}
            
            # Extract lessons array
            lessons_match = re.search(r'const lessons = \[(.*?)\n\];', content, re.DOTALL)
            if lessons_match:
                data['lessons'] = lessons_match.group(1)
            
            # Extract appData
            app_data_match = re.search(r'const appData = \{(.*?)\};', content, re.DOTALL)
            if app_data_match:
                data['app_data'] = app_data_match.group(1)
            
            return data
        except Exception as e:
            print(f"Error loading JS file: {e}")
            return {}
    
    @staticmethod
    def extract_lesson_titles_and_descriptions(file_path: str) -> List[Dict]:
        """Extract lesson titles and descriptions from JS file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            lessons = []
            
            # Find all lesson objects with title and description
            lesson_pattern = r'\{\s*id:\s*(\d+),\s*title:\s*[\'"]([^\'"]+)[\'"],.*?description:\s*[\'"]([^\'"]+)[\'"]'
            
            for match in re.finditer(lesson_pattern, content, re.DOTALL):
                lesson = {
                    'id': match.group(1),
                    'title': match.group(2),
                    'description': match.group(3)
                }
                lessons.append(lesson)
            
            return lessons
        except Exception as e:
            print(f"Error extracting lessons: {e}")
            return []


class TrainableAI:
    """AI system that learns from training data"""
    
    def __init__(self):
        self.training_data = {
            'lessons': [],
            'topics': {},
            'questions_and_answers': [],
            'vocabulary': {},
            'patterns': {}
        }
        self.is_trained = False
        self.training_history = []
    
    def load_training_data_from_js(self, js_files: List[str]) -> Dict:
        """Load and process training data from JavaScript files"""
        print(f"📚 Loading training data from {len(js_files)} files...\n")
        
        all_lessons = []
        
        for js_file in js_files:
            if os.path.exists(js_file):
                lessons = DataLoader.extract_lesson_titles_and_descriptions(js_file)
                print(f"✓ Loaded {len(lessons)} lessons from {os.path.basename(js_file)}")
                all_lessons.extend(lessons)
            else:
                print(f"✗ File not found: {js_file}")
        
        self.training_data['lessons'] = all_lessons
        
        # Extract topics from lessons
        self.training_data['topics'] = self._extract_topics_from_lessons()
        
        print(f"\n✅ Training data loaded:")
        print(f"   - Total lessons: {len(all_lessons)}")
        print(f"   - Topics: {list(self.training_data['topics'].keys())}")
        
        return {
            'status': 'success',
            'lessons_loaded': len(all_lessons),
            'topics': list(self.training_data['topics'].keys())
        }
    
    def _extract_topics_from_lessons(self) -> Dict[str, List[str]]:
        """Extract topics from lesson titles and descriptions"""
        topics = {}
        
        for lesson in self.training_data['lessons']:
            title = lesson['title'].lower()
            description = lesson['description'].lower()
            combined = f"{title} {description}"
            
            # Categorize lessons
            if any(word in combined for word in ['граматика', 'части', 'глагол', 'имя', 'прилагателно', 'наречие']):
                if 'grammar' not in topics:
                    topics['grammar'] = []
                topics['grammar'].append(lesson)
            
            if any(word in combined for word in ['литература', 'произведение', 'поет', 'автор', 'творчество']):
                if 'literature' not in topics:
                    topics['literature'] = []
                topics['literature'].append(lesson)
            
            if any(word in combined for word in ['текст', 'коммуникация', 'медиа', 'новина']):
                if 'communication' not in topics:
                    topics['communication'] = []
                topics['communication'].append(lesson)
        
        return topics
    
    def train(self, training_data: Dict = None) -> Dict:
        """Train the AI on the loaded data"""
        try:
            if training_data:
                self.training_data.update(training_data)
            
            print("\n🔬 Training AI Model...\n")
            
            # Build vocabulary from lessons
            self._build_vocabulary()
            
            # Extract patterns
            self._extract_patterns()
            
            # Generate Q&A pairs from lessons
            self._generate_qa_pairs()
            
            self.is_trained = True
            
            training_record = {
                'timestamp': datetime.now().isoformat(),
                'lessons_count': len(self.training_data['lessons']),
                'topics_count': len(self.training_data['topics']),
                'vocabulary_size': len(self.training_data['vocabulary']),
                'qa_pairs': len(self.training_data['questions_and_answers'])
            }
            
            self.training_history.append(training_record)
            
            print(f"✅ Training Complete:")
            print(f"   - Lessons: {training_record['lessons_count']}")
            print(f"   - Topics: {training_record['topics_count']}")
            print(f"   - Vocabulary: {training_record['vocabulary_size']} terms")
            print(f"   - Q&A Pairs: {training_record['qa_pairs']}")
            
            return training_record
        except Exception as e:
            print(f"❌ Training failed: {e}")
            return {'error': str(e)}
    
    def _build_vocabulary(self) -> None:
        """Build vocabulary from lessons"""
        vocab = {}
        
        for lesson in self.training_data['lessons']:
            title = lesson['title']
            description = lesson['description']
            
            words = (title + ' ' + description).lower().split()
            
            for word in words:
                word_clean = re.sub(r'[^\w]', '', word)
                if len(word_clean) > 2:
                    vocab[word_clean] = vocab.get(word_clean, 0) + 1
        
        self.training_data['vocabulary'] = vocab
    
    def _extract_patterns(self) -> None:
        """Extract patterns from lesson content"""
        patterns = {
            'lesson_types': set(),
            'common_topics': set(),
            'teaching_methods': set()
        }
        
        for lesson in self.training_data['lessons']:
            title = lesson['title'].lower()
            
            # Identify lesson type patterns
            if 'как' in title or 'какво' in title:
                patterns['lesson_types'].add('explanatory')
            if 'анализ' in title:
                patterns['lesson_types'].add('analytical')
            if 'творчество' in title:
                patterns['lesson_types'].add('creative')
        
        # Convert sets to lists for JSON serialization
        self.training_data['patterns'] = {
            k: list(v) for k, v in patterns.items()
        }
    
    def _generate_qa_pairs(self) -> None:
        """Generate Q&A pairs from lessons"""
        qa_pairs = []
        
        for lesson in self.training_data['lessons']:
            qa_pairs.append({
                'question': f"какво е {lesson['title'].lower()}?",
                'answer': lesson['description'],
                'lesson_id': lesson['id']
            })
        
        self.training_data['questions_and_answers'] = qa_pairs
    
    def answer_from_training(self, question: str) -> Dict:
        """Answer a question using training data"""
        if not self.is_trained:
            return {
                'status': 'error',
                'message': 'AI not trained yet',
                'suggestion': 'Please train the AI first'
            }

        question_lower = question.lower()
        question_words = set(re.findall(r'\b\w+\b', question_lower))

        # Search in Q&A pairs with better matching
        for qa in self.training_data['questions_and_answers']:
            qa_words = set(re.findall(r'\b\w+\b', qa['question'].lower()))
            if question_words & qa_words:  # Intersection of words
                return {
                    'status': 'success',
                    'answer': qa['answer'],
                    'source': f"Lesson {qa['lesson_id']}",
                    'confidence': 0.95
                }

        # Search in lessons directly with word matching
        best_match = None
        best_score = 0

        for lesson in self.training_data['lessons']:
            title_lower = lesson['title'].lower()
            desc_lower = lesson['description'].lower()
            combined = title_lower + ' ' + desc_lower

            lesson_words = set(re.findall(r'\b\w+\b', combined))
            common_words = question_words & lesson_words

            if common_words:
                score = len(common_words)
                if score > best_score:
                    best_score = score
                    best_match = lesson

        if best_match:
            return {
                'status': 'success',
                'answer': best_match['description'],
                'source': f"Lesson: {best_match['title']}",
                'confidence': min(0.9, 0.7 + (best_score * 0.05))
            }

        # Topic match
        for topic, lessons in self.training_data['topics'].items():
            if topic in question_lower or any(word in question_lower for word in ['комуникация', 'литература', 'граматика']):
                response = f"Намерих {len(lessons)} урока за {topic}:\n"
                for lesson in lessons[:3]:
                    response += f"• {lesson['title']}: {lesson['description'][:100]}...\n"
                return {
                    'status': 'success',
                    'answer': response,
                    'source': f"Topic: {topic}",
                    'confidence': 0.75
                }

        # Fallback: provide helpful information
        available_topics = list(self.training_data['topics'].keys())
        return {
            'status': 'success',
            'answer': f'Не намерих точен отговор на въпроса ви. Мога да помогна с информация за следните теми: {", ".join(available_topics)}. Опитайте да зададете въпрос за конкретна тема.',
            'source': 'General assistance',
            'confidence': 0.5
        }
    
    def get_training_status(self) -> Dict:
        """Get current training status"""
        return {
            'is_trained': self.is_trained,
            'training_history': self.training_history,
            'data_summary': {
                'lessons': len(self.training_data['lessons']),
                'topics': len(self.training_data['topics']),
                'vocabulary': len(self.training_data['vocabulary']),
                'qa_pairs': len(self.training_data['questions_and_answers'])
            }
        }
    
    def export_training_data(self) -> Dict:
        """Export training data"""
        # Convert any problematic types
        export_data = {
            'lessons': self.training_data['lessons'],
            'topics': {k: [l['title'] for l in v] for k, v in self.training_data['topics'].items()},
            'vocabulary_size': len(self.training_data['vocabulary']),
            'qa_pairs_count': len(self.training_data['questions_and_answers']),
            'patterns': self.training_data['patterns'],
            'training_history': self.training_history
        }
        return export_data


class ActionableAI(TrainableAI):
    """Actionable AI that performs tasks based on training"""
    
    def generate_exercise_from_training(self, topic: str = None, count: int = 3) -> List[Dict]:
        """Generate exercises based on trained data"""
        exercises = []
        
        # Get lessons related to topic
        relevant_lessons = self.training_data['lessons']
        if topic and topic in self.training_data['topics']:
            relevant_lessons = self.training_data['topics'][topic]
        
        # Create exercises from lesson content
        for i, lesson in enumerate(relevant_lessons[:count]):
            exercise = {
                'id': f"exercise-{datetime.now().timestamp()}-{i}",
                'type': 'comprehension',
                'topic': topic or 'general',
                'question': f"Основната идея на '{lesson['title']}' е?",
                'lesson_source': lesson['title'],
                'difficulty': 'medium'
            }
            exercises.append(exercise)
        
        return exercises
    
    def get_study_path(self) -> List[Dict]:
        """Get suggested study path based on training data"""
        return [
            {
                'step': i+1,
                'lesson': lesson['title'],
                'description': lesson['description'],
                'estimated_time': '30-45 minutes'
            }
            for i, lesson in enumerate(self.training_data['lessons'][:5])
        ]


if __name__ == "__main__":
    # Example usage
    print("=== Trainable Bulgarian AI System ===\n")
    
    ai = ActionableAI()
    
    # Load training data from original JS files
    js_files = [
        'c:/Users/12 klas/Desktop/Matura-Master/public/scripts/bulgarian.js',
        'c:/Users/12 klas/Desktop/Matura-Master/public/scripts/literature.js'
    ]
    
    ai.load_training_data_from_js(js_files)
    
    # Train the AI
    ai.train()
    
    # Test the AI
    print("\n📝 Testing trained AI...\n")
    answer = ai.answer_from_training("какво е текстът в масовата комуникация?")
    print(f"Answer: {answer['answer']}")
    
    # Get study path
    print("\n📚 Suggested Study Path:")
    for step in ai.get_study_path():
        print(f"{step['step']}. {step['lesson']}")
