// Site configuration
export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  image: string;
  github?: string;
  demo?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  description: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Role {
  year: string;
  title: string;
  description: string;
  details?: string[];
}

export interface Experience {
  company: string;
  year?: string;
  title?: string;
  description?: string;
  details?: string[];
  roles?: Role[];
}

export interface Education {
  year: string;
  degree: string;
  institution: string;
}

const siteConfig = {
  // Feature flags
  features: {
    showProjects: true,
    enableDownloads: true,
  },

  // Site metadata
  metadata: {
    title: "M Fahmi Hassan | Full Stack Engineer",
    description: "Portfolio of M Fahmi Hassan, a Full Stack Engineer & Team Lead with expertise in React, Next.js, Vue.js, and Agile Project Management.",
    author: "M Fahmi Hassan",
    keywords: "Full Stack Engineer, React, Next.js, Vue.js, TypeScript, Portfolio, Jakarta, Indonesia",
    url: "https://mfah.me",
  },

  // Personal Info
  personalInfo: {
    name: "M Fahmi Hassan",
    role: "Full Stack Engineer & Team Lead",
    email: "hello.fahmihassan@gmail.com",
    phone: "082120401994",
    location: "Jakarta, Indonesia",
    experienceYears: "5+ Years",
    about: [
      "Experienced Full Stack Developer skilled in TypeScript, JavaScript, Node.JS, VueJS, ReactJS, and React Native. I have played a key role in the development of major platforms like rumahsiapkerja.com.",
      "Proficient in both frontend and backend technologies including MySQL, MongoDB, and SQL Server. I am eager to contribute my expertise in project management, team leadership, and agile methodologies to impactful software projects.",
    ],
    resumeUrl: "/cv.pdf",
    profileImage: "/images/fahmi-profile.jpg",
  },

  // Social links
  social: {
    github: "https://github.com/TheFahmi",
    linkedin: "https://www.linkedin.com/in/mfahmihassan",
    twitter: "https://twitter.com/thefahmhassan",
    email: "mailto:hello.fahmihassan@gmail.com",
  },

  // Hero Section
  hero: {
    badge: "Available for work",
    titlePrefix: "Hi, I'm",
    titleHighlight: "M Fahmi Hassan",
    subtitle: "Full Stack Engineer & Team Lead",
    description: "Full Stack Developer specializing in the MERN stack, Vue.js, and Project Management. Transforming complex requirements into seamless web experiences.",
    techStack: ['React', 'Next.js', 'Vue.js', 'Node.js', 'TypeScript'],
    quickStats: [
      { number: '4+', label: 'Years Experience' },
      { number: '3', label: 'Major Platforms' }, // RSK 2.0, 3.0, Backoffice
      { number: '100%', label: 'Commitment' },
    ],
  },

  // Skills Section
  skills: [
    {
      title: 'Frontend Development',
      skills: [
        { name: 'JavaScript (ES6+)', level: 95, description: 'Core language proficiency' },
        { name: 'React.js & Next.js', level: 90, description: 'Modern component-based UI' },
        { name: 'Vue.js & Nuxt.js', level: 90, description: 'Progressive framework expertise' },
        { name: 'TypeScript', level: 85, description: 'Type-safe development' },
        { name: 'TailwindCSS', level: 95, description: 'Rapid UI styling' },
      ]
    },
    {
      title: 'Backend & Database',
      skills: [
        { name: 'Node.js & Express', level: 80, description: 'Server-side runtime' },
        { name: 'MySQL', level: 75, description: 'Relational database management' },
        { name: 'MongoDB', level: 70, description: 'NoSQL database' },
        { name: 'NestJS', level: 70, description: 'Scalable server-side apps' },
      ]
    },
    {
      title: 'Tools & Management',
      skills: [
        { name: 'Git & Version Control', level: 90, description: 'Code collaboration' },
        { name: 'Jira & Agile', level: 85, description: 'Project tracking & methodology' },
        { name: 'React Native', level: 80, description: 'Cross-platform mobile apps' },
        { name: 'Testing (Jest/Mocha)', level: 75, description: 'Unit & integration testing' },
      ]
    }
  ] as SkillCategory[],

  // Projects Section
  projects: [
    {
      id: 1,
      title: 'SMEs AI Hackathon Platform',
      description: 'Multi-Tenant SaaS for UMKM Indonesia featuring WhatsApp Chatbot, Kolosal AI Customer Service, and complete business management tools.',
      category: 'SaaS / AI',
      technologies: ['TypeScript', 'Next.js', 'Docker', 'AI', 'PostgreSQL'],
      image: '/images/project-sme.png',
      github: 'https://github.com/TheFahmi/SMEs-hackathon-imphnen-kolosal-ai',
      featured: true
    },
    {
      id: 2,
      title: 'Rumah Siap Kerja 3.0',
      description: 'Spearheaded the redesign and development of RSK 3.0. Migrated stack from Vue.js to React.js for better scalability and performance.',
      category: 'Full Stack',
      technologies: ['React.js', 'Next.js', 'TypeScript', 'TailwindCSS'],
      image: '/images/project-rsk.jpg',
      demo: 'https://rumahsiapkerja.com',
      featured: true
    },
    {
      id: 3,
      title: 'FuelMeter Mobile',
      description: 'A mobile application for tracking vehicle fuel consumption, logs, and efficiency statistics. Built with cross-platform performance in mind.',
      category: 'Mobile',
      technologies: ['Dart', 'Flutter'],
      image: '/images/project-fuel.png',
      github: 'https://github.com/TheFahmi/fuelmeter-mobile',
      featured: true
    },
    {
      id: 4,
      title: 'Ujian Anak App',
      description: 'Interactive educational quiz application designed for children. Features engaging UI and colorful design to make learning fun.',
      category: 'Education',
      technologies: ['JavaScript', 'Frontend'],
      image: '/images/project-quiz.png',
      github: 'https://github.com/TheFahmi/ujian-anak-app',
      featured: false
    },
    {
      id: 5,
      title: 'RSK Back-office',
      description: 'Administrative back-office system optimizing internal workflows for Rumah Siap Kerja.',
      category: 'Frontend',
      technologies: ['Vue.js', 'Nuxt.js', 'TypeScript', 'TailwindCSS'],
      image: '/images/project-backoffice.jpg',
      featured: false
    },
    {
      id: 6,
      title: 'RSK Mobile App',
      description: 'React Native mobile application for RSK, ensuring seamless experience across iOS and Android devices.',
      category: 'Mobile',
      technologies: ['React Native', 'JavaScript', 'Redux'],
      image: '/images/project-mobile.jpg',
      featured: false
    }
  ] as Project[],

  // Experience Section
  experience: [
    {
      company: 'Rumah Siap Kerja',
      roles: [
        {
          year: 'Dec 2021 - Apr 2024',
          title: 'Frontend Developer Lead',
          description: 'Led a frontend team of 5, delivering RSK 3.0 and Back-office.',
          details: [
            'Led a frontend team of 5 members, managing tasks and deadlines.',
            'Implemented Agile practices: sprint planning, stand-ups, retrospectives.',
            'Spearheaded the redesign of RSK 3.0 and migrated stack from Vue to React.',
            'Developed RSK Back-office using Nuxt.js and TailwindCSS.'
          ]
        },
        {
          year: 'Apr 2020 - Dec 2021',
          title: 'Frontend Developer',
          description: 'Developed partner and user-facing platforms using Vue.js and React.js.',
          details: [
            'Developed platforms for company partners (Vue.js) and end-users (React.js).',
            'Utilized SCSS/Less for styling and integrated RESTful APIs.',
            'Conducted comprehensive testing (LambdaTest, Nightwatch, Mocha).'
          ]
        },
        {
          year: 'Mar 2020',
          title: 'Jr. Full Stack Developer',
          description: 'Focused on frontend architecture and database management.',
          details: [
            'Collaborated on software solution ideas and architecture design.',
            'Developed and managed databases (MySQL).',
            'Implemented APIs using NestJS.'
          ]
        }
      ]
    },
    {
      year: 'Oct 2019 - Mar 2020',
      title: 'Bootcamp Student',
      company: 'Purwadhika Startup School',
      description: 'Intensive Web & Mobile Development course specializing in the MERN stack.',
    },
    {
      year: 'Sep 2018 - Aug 2019',
      title: 'IT Helpdesk',
      company: 'Indosat Ooredoo (MII)',
      description: 'Managed incident tickets, user accounts, and technical support.',
    }
  ] as Experience[],

  // Education Section
  education: [
    {
      year: '2019 - 2020',
      degree: 'Web and Mobile Development',
      institution: 'Purwadhika Startup and Coding School'
    },
    {
      year: '2015 - 2018',
      degree: 'Diploma Degree, Teknik Informatika',
      institution: 'Politeknik LP3I Jakarta'
    },
    {
      year: '2012 - 2015',
      degree: 'Bachelor Degree (Uncompleted)',
      institution: 'Universitas Bina Nusantara (Binus)'
    }
  ] as Education[],
};

export default siteConfig;
