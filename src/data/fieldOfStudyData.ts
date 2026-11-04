import { StreamType, DaySchedule, QuizData } from '../types';

export interface FieldOfStudyPreset {
  id: string;
  name: string;
  iconName: string;
  stream: StreamType;
  targetExam: string;
  description: string;
  subjects: string[];
  schedule: DaySchedule[];
  quiz: QuizData;
}

export const FIELDS_OF_STUDY: FieldOfStudyPreset[] = [
  {
    id: 'btech_cse',
    name: 'B.Tech CSE / IT',
    iconName: 'Cpu',
    stream: 'Engineering',
    targetExam: 'B.Tech CS University Finals / GATE CS',
    description: 'Data Structures, Algorithms, Operating Systems, Computer Networks, DBMS',
    subjects: ['Data Structures & Algorithms', 'Operating Systems', 'Database Management Systems', 'Computer Networks'],
    schedule: [
      {
        day: 'Monday',
        slots: [
          { id: 'bt1', time: '08:00 AM - 09:30 AM', subject: 'Data Structures & Algorithms', type: 'Deep Focus', notes: 'Dynamic Programming & Graph Traversal (DFS/BFS)', completed: true },
          { id: 'bt2', time: '01:00 PM - 02:30 PM', subject: 'Operating Systems', type: 'Practice', notes: 'Process Synchronization & Semaphore Implementation', completed: false },
          { id: 'bt3', time: '05:00 PM - 06:30 PM', subject: 'Database Management Systems', type: 'Deep Focus', notes: 'SQL Joins, Indexing & B+ Tree Optimizations', completed: false },
          { id: 'bt4', time: '08:30 PM - 09:30 PM', subject: 'Computer Networks', type: 'Revision', notes: 'TCP/IP Model & Socket Programming Basics', completed: false }
        ]
      }
    ],
    quiz: {
      id: 'q_btech_1',
      title: 'B.Tech CSE Core Mastery Battle',
      subject: 'Computer Science',
      totalXp: 300,
      totalCoins: 50,
      questions: [
        {
          id: 1,
          type: 'mcq',
          question: 'Which CPU scheduling algorithm guarantees minimum average waiting time?',
          options: ['FCFS', 'SJF (Shortest Job First)', 'Round Robin', 'Priority'],
          correctIndex: 1,
          explanation: 'Shortest Job First (SJF) is mathematically optimal for minimizing average wait time.'
        },
        {
          id: 2,
          type: 'true_false',
          question: 'In B+ Trees, data pointers are stored only in the leaf nodes.',
          options: ['True', 'False'],
          correctIndex: 0,
          explanation: 'True! B+ Trees store all actual records/pointers at the leaf level for efficient sequential scans.'
        },
        {
          id: 3,
          type: 'fill_blank',
          question: 'The SQL clause used to filter aggregated groups after GROUP BY is ________.',
          correctAnswer: 'HAVING',
          explanation: 'HAVING filters aggregated records, whereas WHERE filters individual rows.'
        }
      ]
    }
  },
  {
    id: 'mca',
    name: 'MCA (Master of Computer Apps)',
    iconName: 'Code',
    stream: 'Engineering',
    targetExam: 'MCA Semester Finals / Software Placement',
    description: 'Advanced Web Dev, Cloud Architecture, Microservices, Python & Java',
    subjects: ['Advanced Web Development', 'Cloud Computing & AWS', 'Object Oriented Programming (Java/Python)', 'Software Engineering'],
    schedule: [
      {
        day: 'Monday',
        slots: [
          { id: 'mca1', time: '08:00 AM - 09:30 AM', subject: 'Advanced Web Development', type: 'Deep Focus', notes: 'React 19 State Architecture & REST APIs', completed: true },
          { id: 'mca2', time: '01:00 PM - 02:30 PM', subject: 'Cloud Computing & AWS', type: 'Practice', notes: 'Docker Containers, Kubernetes & AWS S3/EC2 setup', completed: false },
          { id: 'mca3', time: '05:00 PM - 06:30 PM', subject: 'OOP in Java & C++', type: 'Deep Focus', notes: 'Design Patterns: Factory, Singleton & Observer', completed: false },
          { id: 'mca4', time: '08:30 PM - 09:30 PM', subject: 'Software Engineering', type: 'Revision', notes: 'Agile Methodologies, CI/CD Pipelines & Testing', completed: false }
        ]
      }
    ],
    quiz: {
      id: 'q_mca_1',
      title: 'MCA Full-Stack & Cloud Architecture',
      subject: 'Software Engineering',
      totalXp: 300,
      totalCoins: 50,
      questions: [
        {
          id: 1,
          type: 'mcq',
          question: 'Which HTTP method is idempotent and used to replace an existing resource?',
          options: ['POST', 'PUT', 'PATCH', 'DELETE'],
          correctIndex: 1,
          explanation: 'PUT is idempotent and replaces the target resource representation with the request payload.'
        },
        {
          id: 2,
          type: 'true_false',
          question: 'In Docker, a container is a running instance of an image.',
          options: ['True', 'False'],
          correctIndex: 0,
          explanation: 'True! An image is a static template, and a container is its active, running instance.'
        },
        {
          id: 3,
          type: 'fill_blank',
          question: 'The Java keyword used to inherit a class is ________.',
          correctAnswer: 'extends',
          explanation: 'Class inheritance in Java uses the "extends" keyword.'
        }
      ]
    }
  },
  {
    id: 'bca',
    name: 'BCA (Bachelor of Computer Apps)',
    iconName: 'Terminal',
    stream: 'Engineering',
    targetExam: 'BCA Semester Board / NIMCET',
    description: 'C/C++ Fundamentals, Web Technologies, Database Systems, Computer Fundamentals',
    subjects: ['C/C++ Programming', 'HTML/CSS & JavaScript', 'Database Fundamentals', 'Computer Organization'],
    schedule: [
      {
        day: 'Monday',
        slots: [
          { id: 'bca1', time: '08:00 AM - 09:30 AM', subject: 'C/C++ Programming', type: 'Deep Focus', notes: 'Pointers, Memory Allocation & Structures', completed: true },
          { id: 'bca2', time: '01:00 PM - 02:30 PM', subject: 'HTML/CSS & JavaScript', type: 'Practice', notes: 'DOM Manipulation, Event Listeners & Flexbox', completed: false },
          { id: 'bca3', time: '05:00 PM - 06:30 PM', subject: 'Database Fundamentals', type: 'Deep Focus', notes: 'Primary Keys, Foreign Keys & Entity Relationship Diagrams', completed: false },
          { id: 'bca4', time: '08:30 PM - 09:30 PM', subject: 'Computer Organization', type: 'Revision', notes: 'Binary Arithmetic, Gates & ALU Operations', completed: false }
        ]
      }
    ],
    quiz: {
      id: 'q_bca_1',
      title: 'BCA Foundation in Programming & DBs',
      subject: 'Computer Fundamentals',
      totalXp: 300,
      totalCoins: 50,
      questions: [
        {
          id: 1,
          type: 'mcq',
          question: 'What is the correct way to allocate dynamic memory for an integer array in C?',
          options: ['malloc(sizeof(int) * n)', 'new int[n]', 'alloc(int, n)', 'create(int, n)'],
          correctIndex: 0,
          explanation: 'malloc(sizeof(int) * n) allocates memory dynamically in C.'
        },
        {
          id: 2,
          type: 'true_false',
          question: 'JavaScript is a statically typed programming language.',
          options: ['True', 'False'],
          correctIndex: 1,
          explanation: 'False! JavaScript is dynamically typed.'
        },
        {
          id: 3,
          type: 'fill_blank',
          question: 'The SQL statement used to retrieve data from a database table is ________.',
          correctAnswer: 'SELECT',
          explanation: 'SELECT queries records from a database.'
        }
      ]
    }
  },
  {
    id: 'mtech_cse',
    name: 'M.Tech CSE / AI & ML',
    iconName: 'Brain',
    stream: 'Engineering',
    targetExam: 'M.Tech Thesis / AI Research / GATE High Score',
    description: 'Machine Learning Algorithms, Deep Learning, High-Performance Computing, Distributed Systems',
    subjects: ['Machine Learning & Neural Nets', 'Distributed Systems & Microservices', 'High-Performance Computing', 'Advanced Algorithms'],
    schedule: [
      {
        day: 'Monday',
        slots: [
          { id: 'mt1', time: '08:00 AM - 09:30 AM', subject: 'Machine Learning', type: 'Deep Focus', notes: 'Transformer Models, Attention Mechanism & PyTorch', completed: true },
          { id: 'mt2', time: '01:00 PM - 02:30 PM', subject: 'Distributed Systems', type: 'Practice', notes: 'Raft Consensus Algorithm & MapReduce Paradigm', completed: false },
          { id: 'mt3', time: '05:00 PM - 06:30 PM', subject: 'High-Performance Computing', type: 'Deep Focus', notes: 'CUDA GPU Parallel Programming & OpenMP', completed: false },
          { id: 'mt4', time: '08:30 PM - 09:30 PM', subject: 'Advanced Algorithms', type: 'Revision', notes: 'Amortized Analysis & NP-Completeness Proofs', completed: false }
        ]
      }
    ],
    quiz: {
      id: 'q_mtech_1',
      title: 'M.Tech AI & High-Performance Computing',
      subject: 'Artificial Intelligence',
      totalXp: 300,
      totalCoins: 50,
      questions: [
        {
          id: 1,
          type: 'mcq',
          question: 'Which activation function is most widely used in modern deep neural network hidden layers to prevent vanishing gradients?',
          options: ['Sigmoid', 'Tanh', 'ReLU', 'Linear'],
          correctIndex: 2,
          explanation: 'Rectified Linear Unit (ReLU) helps mitigate vanishing gradients in deep networks.'
        },
        {
          id: 2,
          type: 'true_false',
          question: 'In distributed systems, the CAP theorem states that a system can simultaneously guarantee Consistency, Availability, and Partition Tolerance.',
          options: ['True', 'False'],
          correctIndex: 1,
          explanation: 'False! CAP theorem proves a distributed system can only provide 2 out of the 3 guarantees simultaneously.'
        },
        {
          id: 3,
          type: 'fill_blank',
          question: 'The self-attention mechanism is the foundational building block of ________ architecture.',
          correctAnswer: 'Transformer',
          explanation: 'Transformers rely heavily on multi-head self-attention mechanisms.'
        }
      ]
    }
  },
  {
    id: 'bsc_cs',
    name: 'B.Sc / M.Sc Computer Science',
    iconName: 'BookOpen',
    stream: 'Engineering',
    targetExam: 'B.Sc / M.Sc CS Board & Entrance',
    description: 'Discrete Mathematics, Theory of Computation, Data Science, Python Analytics',
    subjects: ['Discrete Mathematics', 'Theory of Computation (Automata)', 'Python Data Analytics', 'Compiler Design'],
    schedule: [
      {
        day: 'Monday',
        slots: [
          { id: 'bsc1', time: '08:00 AM - 09:30 AM', subject: 'Discrete Mathematics', type: 'Deep Focus', notes: 'Graph Theory, Eulerian & Hamiltonian Paths', completed: true },
          { id: 'bsc2', time: '01:00 PM - 02:30 PM', subject: 'Theory of Computation', type: 'Practice', notes: 'DFA, NFA Minimization & Context-Free Grammars', completed: false },
          { id: 'bsc3', time: '05:00 PM - 06:30 PM', subject: 'Python Data Analytics', type: 'Deep Focus', notes: 'Pandas DataFrames, NumPy & Matplotlib Visualizations', completed: false },
          { id: 'bsc4', time: '08:30 PM - 09:30 PM', subject: 'Compiler Design', type: 'Revision', notes: 'Lexical Analysis, Parsing Trees & Syntax Analysis', completed: false }
        ]
      }
    ],
    quiz: {
      id: 'q_bsc_1',
      title: 'Computer Science Theory & Mathematics',
      subject: 'Computer Theory',
      totalXp: 300,
      totalCoins: 50,
      questions: [
        {
          id: 1,
          type: 'mcq',
          question: 'Which automata can recognize Context-Free Languages?',
          options: ['Finite Automata', 'Pushdown Automata', 'Linear Bounded Automata', 'Turing Machine only'],
          correctIndex: 1,
          explanation: 'Pushdown Automata (PDA) with stack memory recognizes Context-Free Languages (CFL).'
        },
        {
          id: 2,
          type: 'true_false',
          question: 'A complete graph with n vertices has n*(n-1)/2 edges.',
          options: ['True', 'False'],
          correctIndex: 0,
          explanation: 'True! Each vertex connects to every other vertex.'
        },
        {
          id: 3,
          type: 'fill_blank',
          question: 'The Python library used for high-performance numerical array computing is ________.',
          correctAnswer: 'NumPy',
          explanation: 'NumPy provides N-dimensional array processing in Python.'
        }
      ]
    }
  },
  {
    id: 'coding_bootcamp',
    name: 'Full-Stack & Competitive Coding',
    iconName: 'Zap',
    stream: 'Engineering',
    targetExam: 'FAANG / Tech SDE Placement & LeetCode',
    description: 'LeetCode DSA, System Design, Modern Full-Stack (Next.js, Node.js, PostgreSQL)',
    subjects: ['LeetCode Data Structures & Algorithms', 'System Design & Scalability', 'Full-Stack JavaScript/TypeScript', 'DevOps & Docker'],
    schedule: [
      {
        day: 'Monday',
        slots: [
          { id: 'cc1', time: '08:00 AM - 09:30 AM', subject: 'LeetCode DSA Sprint', type: 'Deep Focus', notes: 'Two Pointers, Sliding Window & Monotonic Stack', completed: true },
          { id: 'cc2', time: '01:00 PM - 02:30 PM', subject: 'System Design', type: 'Practice', notes: 'Designing Rate Limiters, Load Balancers & Redis Caching', completed: false },
          { id: 'cc3', time: '05:00 PM - 06:30 PM', subject: 'Full-Stack Engineering', type: 'Deep Focus', notes: 'Node.js Express REST APIs & Prisma ORM', completed: false },
          { id: 'cc4', time: '08:30 PM - 09:30 PM', subject: 'Git & DevOps', type: 'Revision', notes: 'GitHub Actions, Dockerizing Services & CI/CD', completed: false }
        ]
      }
    ],
    quiz: {
      id: 'q_cc_1',
      title: 'SDE Technical Interview & Coding League',
      subject: 'Coding & System Design',
      totalXp: 300,
      totalCoins: 50,
      questions: [
        {
          id: 1,
          type: 'mcq',
          question: 'What is the time complexity of searching an element in a balanced Binary Search Tree (BST)?',
          options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
          correctIndex: 1,
          explanation: 'A balanced BST halves the search space at each step, taking O(log N) time.'
        },
        {
          id: 2,
          type: 'true_false',
          question: 'Redis is an in-memory key-value data store frequently used for caching.',
          options: ['True', 'False'],
          correctIndex: 0,
          explanation: 'True! Redis stores data in RAM for sub-millisecond latency.'
        },
        {
          id: 3,
          type: 'fill_blank',
          question: 'The architectural style that structures an application as a collection of loosely coupled services is called ________.',
          correctAnswer: 'Microservices',
          explanation: 'Microservices architecture breaks applications into independent services.'
        }
      ]
    }
  }
];
