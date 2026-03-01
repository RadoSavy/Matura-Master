const FIRESTORE_SCHEMA = {
  courses: [
    {
      title: "Български език",
      description: "Граматика и правопис за национално външно оценяване",
      instructor: "Matura Master Team",
      category: "languages",
      level: "beginner",
      icon: "📚",
    },
    {
      title: "Литература",
      description: "Анализи на произведения и български класикия",
      instructor: "Matura Master Team",
      category: "literature",
      level: "intermediate",
      icon: "📖",
    }
  ],

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
