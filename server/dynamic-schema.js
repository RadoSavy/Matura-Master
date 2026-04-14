export const extractLessonDataFromJS = (jsContent) => {
  const lessons = [];

  const lessonMatches = jsContent.match(/\{\s*id:\s*\d+.*?(?=\n\s*\},|\n\s*\])/gs);
  
  if (lessonMatches) {
    lessonMatches.forEach((match) => {
      try {
        const idMatch = match.match(/id:\s*(\d+)/);
        const titleMatch = match.match(/title:\s*['\"]([^'"]+)['\"]/);
        const descMatch = match.match(/description:\s*['\"]([^'"]+)['\"]/);
        const xpMatch = match.match(/xp:\s*(\d+)/);
        const iconMatch = match.match(/icon:\s*['\"]([^'"]+)['\"]/);
        
        if (idMatch && titleMatch && descMatch) {
          lessons.push({
            id: idMatch[1],
            title: titleMatch[1],
            description: descMatch[1],
            xp: xpMatch ? parseInt(xpMatch[1]) : 0,
            icon: iconMatch ? iconMatch[1] : '📚',
            category: determineCategory(titleMatch[1] + ' ' + descMatch[1])
          });
        }
      } catch (e) {
        console.error('Error parsing lesson:', e);
      }
    });
  }
  
  return lessons;
};

const determineCategory = (content) => {
  const lower = content.toLowerCase();
  
  if (lower.includes('граматика') || lower.includes('част') || lower.includes('глагол')) {
    return 'grammar';
  } else if (lower.includes('литература') || lower.includes('поет') || lower.includes('произведение')) {
    return 'literature';
  } else if (lower.includes('текст') || lower.includes('комуникац') || lower.includes('медиа')) {
    return 'communication';
  }
  
  return 'general';
};

export const DYNAMIC_FIRESTORE_SCHEMA = {
  lessons: [],
  topics: [],
  exercises: [],
  
  users: [
    {
      email: "demo@example.com",
      name: "Demo Student",
      role: "student",
      createdAt: new Date(),
      progress: {
        completedLessons: [],
        exercisesCompleted: 0,
        totalXP: 0,
        currentStreak: 0
      }
    }
  ],
    userProgress: []
};

export const populateCollectionsFromLessons = (lessons) => {
  const collections = {
    lessons: lessons,
    topics: extractTopicsFromLessons(lessons),
    exercises: generateExercisesFromLessons(lessons),
    trainingData: {
      totalLessons: lessons.length,
      categories: {},
      vocabulary: {},
      lastUpdated: new Date().toISOString()
    }
  };
  
  lessons.forEach(lesson => {
    const cat = lesson.category || 'general';
    collections.trainingData.categories[cat] = 
      (collections.trainingData.categories[cat] || 0) + 1;
  });
  
  return collections;
};

const extractTopicsFromLessons = (lessons) => {
  const topicMap = new Map();
  
  lessons.forEach(lesson => {
    const category = lesson.category || 'general';
    
    if (!topicMap.has(category)) {
      topicMap.set(category, {
        name: category,
        lessons: [],
        totalXP: 0,
        icon: getCategoryIcon(category)
      });
    }
    
    const topic = topicMap.get(category);
    topic.lessons.push({
      id: lesson.id,
      title: lesson.title,
      description: lesson.description
    });
    topic.totalXP += lesson.xp || 0;
  });
  
  return Array.from(topicMap.values());
};

const getCategoryIcon = (category) => {
  const icons = {
    grammar: '📖',
    literature: '✍️',
    communication: '📡',
    general: '📚'
  };
  return icons[category] || '📚';
};

const generateExercisesFromLessons = (lessons) => {
  const exercises = [];
  
  lessons.forEach((lesson, index) => {
    exercises.push({
      id: `exercise-${lesson.id}-1`,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      type: 'comprehension',
      difficulty: 'easy',
      question: `Какво е основната идея на "${lesson.title}"?`,
      hint: lesson.description.substring(0, 100) + '...',
      category: lesson.category
    });
    
    exercises.push({
      id: `exercise-${lesson.id}-2`,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      type: 'true-false',
      difficulty: 'medium',
      question: `Според урока "${lesson.title}", това е важно: ${lesson.description.split('.')[0]}?`,
      category: lesson.category
    });
  });
  
  return exercises;
};

export const AI_TRAINING_SCHEMA = {
  trainingData: {
    lessonsCount: 0,
    topicsCount: 0,
    vocabularySize: 0,
    qaCount: 0,
    lastTrained: null,
    status: 'not_trained'
  },
  
  vocabulary: [],
  
  patterns: {
    lessonTypes: [],
    commonTopics: [],
    teachingMethods: []
  },
  
  qaDatabase: []
};

export default {
  extractLessonDataFromJS,
  DYNAMIC_FIRESTORE_SCHEMA,
  populateCollectionsFromLessons,
  AI_TRAINING_SCHEMA
};
