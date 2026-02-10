/**
 * Firestore Database Schema Definition
 * This file defines the structure and initial data for all Firestore collections
 */

const FIRESTORE_SCHEMA = {
  // Courses Collection
  courses: [
    {
      title: "Български език",
      description: "Граматика и правопис за национално външно оценяване",
      instructor: "Matura Master Team",
      category: "languages",
      level: "beginner",
      duration: "8 недели",
      icon: "📚",
      topics: ["Граматика", "Правопис", "Синтаксис", "Стилистика"]
    },
    {
      title: "Литература",
      description: "Анализи на произведения и български класикия",
      instructor: "Matura Master Team",
      category: "literature",
      level: "intermediate",
      duration: "10 недели",
      icon: "📖",
      topics: ["Класична литература", "Модерна литература", "Поезия", "Проза"]
    }
  ],

  // Texts/Literature Pieces Collection
  texts: [
    {
      title: "Тургенев - 'Отцы и дети'",
      author: "Иван Тургенев",
      type: "novel",
      content: "Публикувано през 1862 година, романът е един от най-важните произведения на руската литература...",
      category: "literature",
      difficulty: "advanced",
      studyNotes: [],
      exercises: []
    },
    {
      title: "Пушкин - 'Евгений Онегин'",
      author: "Александър Пушкин",
      type: "novel",
      content: "Роман в стихове, публикуван между 1833 и 1837 година...",
      category: "literature",
      difficulty: "advanced",
      studyNotes: [],
      exercises: []
    }
  ],

  // Bulgarian Language Topics
  bulgarian: [
    {
      topic: "Части на речта",
      description: "Пълен курс по частите на речта в български език",
      sections: [
        { name: "Имена", content: "" },
        { name: "Глаголи", content: "" },
        { name: "Прилагателни", content: "" },
        { name: "Наречия", content: "" }
      ]
    },
    {
      topic: "Пунктуация",
      description: "Правила за правилна пунктуация",
      sections: [
        { name: "Точка", content: "" },
        { name: "Запетая", content: "" },
        { name: "Двоеточие", content: "" }
      ]
    }
  ],

  // AI Training Data / Knowledge Base (being migrated to Python)
  aiContext: [
    {
      topic: "Съответствие между части на речта",
      explanation: "Граматично правило за съответствие",
      examples: ["Пример 1", "Пример 2"]
    }
  ],

  // Users Collection
  users: [
    {
      email: "user@example.com",
      name: "Student Name",
      role: "student",
      createdAt: new Date(),
      progress: {
        coursesEnrolled: [],
        completedLessons: [],
        score: 0
      }
    }
  ],

  // Exercise/Questions Collection
  exercises: [
    {
      title: "Упражнение 1: Части на речта",
      type: "multiple-choice",
      category: "bulgarian",
      difficulty: "easy",
      question: "Какво е следното слово? 'красиво'",
      options: ["Имя", "Прилагателно", "Наречие", "Глагол"],
      correctAnswer: 2,
      explanation: "Думата 'красиво' отговаря на въпроса 'как?' и е наречие."
    }
  ],

  // Progress Tracking
  userProgress: [
    {
      userId: "user-id",
      exerciseId: "exercise-id",
      completed: false,
      score: 0,
      attempts: 0,
      timestamp: new Date()
    }
  ]
};

export { FIRESTORE_SCHEMA };
