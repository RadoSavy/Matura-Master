/**
 * Dynamic Firestore Schema - Loads from Original JavaScript Files
 * This file extracts and prepares data from the original JS files for Firestore
 */

/**
 * Function to extract lesson data from JavaScript files
 * This runs on the server side to prepare data for Firestore
 */
export const extractLessonDataFromJS = (jsContent) => {
  const lessons = [];
  
  // Parse lesson objects from JS content
  const lessonMatches = jsContent.match(/\{\s*id:\s*\d+.*?(?=\n\s*\},|\n\s*\])/gs);
  
  if (lessonMatches) {
    lessonMatches.forEach((match) => {
      try {
        // Extract id
        const idMatch = match.match(/id:\s*(\d+)/);
        // Extract title
        const titleMatch = match.match(/title:\s*['\"]([^'"]+)['\"]/);
        // Extract description
        const descMatch = match.match(/description:\s*['\"]([^'"]+)['\"]/);
        // Extract xp
        const xpMatch = match.match(/xp:\s*(\d+)/);
        // Extract icon
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

/**
 * Determine lesson category based on content
 */
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

/**
 * Prepare Firestore collections from original data
 * This structure matches what will be loaded from JS files
 */
export const DYNAMIC_FIRESTORE_SCHEMA = {
  // Lessons collection - will be populated from JS files
  lessons: [],
  
  // Topics collection - derived from lessons
  topics: [],
  
  // Exercises collection - generated from lessons
  exercises: [],
  
  // Users collection
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
  
  // User progress tracking
  userProgress: []
};

/**
 * Function to populate collections from loaded lessons
 */
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
  
  // Count by category
  lessons.forEach(lesson => {
    const cat = lesson.category || 'general';
    collections.trainingData.categories[cat] = 
      (collections.trainingData.categories[cat] || 0) + 1;
  });
  
  return collections;
};

/**
 * Extract unique topics from lessons
 */
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

/**
 * Get icon for category
 */
const getCategoryIcon = (category) => {
  const icons = {
    grammar: '📖',
    literature: '✍️',
    communication: '📡',
    general: '📚'
  };
  return icons[category] || '📚';
};

/**
 * Generate exercises from lessons
 */
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

/**
 * Schema for AI training data
 */
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
