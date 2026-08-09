export const studentData = {
  student: {
    id: 'student-001',
    name: 'Ritesh Saha',
    college: 'Sir Gurudas Mahavidyalaya',
    track: 'Software Engineering',
    avatar: 'RS',
    joinDate: '2024-01-01',
    currentDay: 12,
    totalDays: 60,
    currentStreak: 8,
    longestStreak: 12,
    completedDays: 11,
    missedDays: 1,
    rank: 47,
    totalStudents: 1240,
    xp: 2750,
    level: 'Builder',
    badges: ['Early Bird', 'Week Warrior', 'GitHub Streak'],
    todaySubmitted: false,
    streakHistory: [
      true, true, true, false, true, true, true,
      true, true, true, true, false,
    ],
    streakShields: 1,
  },
};

export const challengeDay12 = {
  day: {
    number: 12,
    title: 'Build a REST API with Authentication',
    track: 'Software Engineering',
    difficulty: 'Medium' as const,
    estimatedTime: '3 hours',
    xpReward: 250,
    tags: ['NodeJS', 'Express', 'JWT', 'REST API'],
    description:
      "Today you'll build a complete REST API with JWT-based authentication. This is a foundational skill every backend developer needs. You'll create endpoints for user registration, login, and protected routes. By the end, you'll have a working auth system you can plug into any future project.",
    objectives: [
      { id: 'obj-001', text: 'Set up an Express.js server with proper project structure' },
      { id: 'obj-002', text: 'Implement user registration with password hashing (bcrypt)' },
      { id: 'obj-003', text: 'Create JWT token generation and validation middleware' },
      { id: 'obj-004', text: 'Build protected routes that require authentication' },
      { id: 'obj-005', text: 'Test your API using Postman or Thunder Client' },
    ],
    resources: [
      { id: 'res-001', title: 'JWT.io Documentation', type: 'docs', url: 'https://jwt.io/introduction' },
      { id: 'res-002', title: 'Express.js Official Guide', type: 'docs', url: 'https://expressjs.com/en/guide' },
      { id: 'res-003', title: 'bcrypt npm package', type: 'package', url: 'https://www.npmjs.com/package/bcrypt' },
    ],
    hints: [
      'Start with the project structure before writing any code — models, routes, middleware folders',
      'Use environment variables (.env) for your JWT secret and never hardcode it',
      'Test each endpoint as you build it using Postman — catch bugs early',
    ],
    submissionStatus: 'not_submitted' as const,
    deadline: '2026-08-08T23:59:59',
  },
};

export const leaderboardData = {
  topStudents: [
    { id: 'student-002', rank: 44, name: 'Priya Krishnamurthy', college: 'IIT Madras', streak: 28, xp: 3100, avatar: 'PK' },
    { id: 'student-003', rank: 45, name: 'Rahul Joshi', college: 'BITS Pilani', streak: 25, xp: 3050, avatar: 'RJ' },
    { id: 'student-004', rank: 46, name: 'Sneha Iyer', college: 'NIT Trichy', streak: 22, xp: 2900, avatar: 'SI' },
    { id: 'student-001', rank: 47, name: 'Ritesh Saha', college: 'Sir Gurudas Mahavidyalaya', streak: 8, xp: 2750, avatar: 'RS', isCurrentUser: true },
    { id: 'student-005', rank: 48, name: 'Karthik Reddy', college: 'IIIT Hyderabad', streak: 7, xp: 2600, avatar: 'KR' },
    { id: 'student-006', rank: 49, name: 'Ananya Das', college: 'Jadavpur University', streak: 6, xp: 2500, avatar: 'AD' },
  ],
};

export const allBadges = [
  { id: 'badge-001', emoji: '🌅', name: 'Early Bird', description: 'Submitted before 9 AM', earned: true },
  { id: 'badge-002', emoji: '⚔️', name: 'Week Warrior', description: '7-day streak achieved', earned: true },
  { id: 'badge-003', emoji: '🐙', name: 'GitHub Streak', description: '10 commits in a row', earned: true },
  { id: 'badge-004', emoji: '🚀', name: 'First Launch', description: 'Complete Day 1', earned: true },
  { id: 'badge-005', emoji: '💎', name: 'Diamond Coder', description: '30-day streak', earned: false },
  { id: 'badge-006', emoji: '🏆', name: 'Champion', description: 'Top 10 on leaderboard', earned: false },
  { id: 'badge-007', emoji: '🌙', name: 'Night Owl', description: '5 submissions after 11 PM', earned: false },
  { id: 'badge-008', emoji: '⚡', name: 'Speed Demon', description: 'Submit within 1 hour', earned: false },
];

export const testimonials = [
  {
    id: 'test-001',
    name: 'Divya Nair',
    college: 'Manipal Institute of Technology',
    track: 'AI & Machine Learning',
    quote: "ABTalks changed how I approach learning. 60 days of consistent building gave me a portfolio that got me a data science internship at a startup in Bangalore. The streak pressure is real — and it works.",
    daysCompleted: 60,
    avatar: 'DN',
  },
  {
    id: 'test-002',
    name: 'Vikram Patel',
    college: 'DAIICT Gandhinagar',
    track: 'Software Engineering',
    quote: "I had zero projects before ABTalks. After the challenge, I had 60 GitHub commits and a full-stack app. Recruiters actually noticed. The LinkedIn post habit alone changed my visibility completely.",
    daysCompleted: 58,
    avatar: 'VP',
  },
  {
    id: 'test-003',
    name: 'Meera Sundaram',
    college: 'PSG College of Technology',
    track: 'Data Science',
    quote: "The community kept me going on days I wanted to quit. Seeing others submit at 11:45 PM motivated me to push through. Now I\'m interning at a fintech company analyzing real data.",
    daysCompleted: 60,
    avatar: 'MS',
  },
];

export const tracks = [
  {
    id: 'track-ai',
    emoji: '🤖',
    name: 'AI & Machine Learning',
    tagline: 'Build intelligent systems from scratch',
    description: 'From neural networks to LLM applications — build real AI projects that solve actual problems.',
    difficulty: 4,
    students: 3800,
    color: 'from-purple-500 to-pink-500',
    accentColor: 'rgba(168, 85, 247, 0.2)',
    borderColor: 'rgba(168, 85, 247, 0.3)',
  },
  {
    id: 'track-ds',
    emoji: '📊',
    name: 'Data Science',
    tagline: 'Turn data into decisions',
    description: 'EDA, visualizations, predictive models — learn the full data pipeline on real datasets.',
    difficulty: 3,
    students: 2900,
    color: 'from-cyan-500 to-blue-500',
    accentColor: 'rgba(6, 182, 212, 0.2)',
    borderColor: 'rgba(6, 182, 212, 0.3)',
  },
  {
    id: 'track-se',
    emoji: '💻',
    name: 'Software Engineering',
    tagline: 'Ship production-ready code',
    description: 'APIs, databases, deployment — build the full stack skills companies actually hire for.',
    difficulty: 3,
    students: 3300,
    color: 'from-green-500 to-emerald-500',
    accentColor: 'rgba(16, 185, 129, 0.2)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
];