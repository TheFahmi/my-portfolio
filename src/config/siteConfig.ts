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
    title: "M Fahmi Hassan | Full Stack Engineer & Web Development Services",
    description: "Full Stack Engineer building production-grade web platforms. Offering professional web development services — websites, web apps, e-commerce, and SaaS solutions. Based in Jakarta, Indonesia.",
    author: "M Fahmi Hassan",
    keywords: "Full Stack Engineer, Web Development Services, Jasa Pembuatan Web, NestJS, Next.js, React, TypeScript, Portfolio, Jakarta, Indonesia, E-Commerce, SaaS, Web Application",
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
    description: "I build production-grade web platforms — from SaaS products and e-commerce systems to API integrations. Specializing in Next.js, NestJS, and scalable architecture that grows with your business.",
    techStack: ['React', 'Next.js', 'NestJS', 'Node.js', 'TypeScript'],
    quickStats: [
      { number: '5+', label: 'Years Experience' },
      { number: '6', label: 'Major Platforms' },
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
      title: 'Merdu.id',
      description: 'Multi-tenant SaaS platform for WhatsApp Business integration. Features message management, broadcast, chatbot, QRIS payment gateway, and multi-server load balancing for high performance.',
      category: 'SaaS',
      technologies: ['NestJS', 'Next.js', 'PostgreSQL', 'Redis', 'TypeScript', 'Docker'],
      image: '/images/project-merdu.png',
      demo: 'https://merdu.id',
      featured: true
    },
    {
      id: 3,
      title: 'SEN.co.id',
      description: 'E-commerce platform for educational books and supplies (PT Sarana Ecommerce Nusantara). Features online book catalog, school package deals, shopping cart, order management, and payment integration for schools across Indonesia.',
      category: 'E-Commerce',
      technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'Redis', 'TypeScript', 'TailwindCSS'],
      image: '/images/project-sen.png',
      demo: 'https://sen.co.id',
      featured: true
    },
    {
      id: 5,
      title: 'SPKN.co.id',
      description: 'Corporate website for PT Sarana Pancakarya Nusa — an education solutions provider since 1986. Features online book catalog, admin system, and Supabase CMS integration.',
      category: 'Corporate',
      technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'Docker'],
      image: '/images/project-spkn.png',
      demo: 'https://spkn.co.id',
      featured: false
    },
    {
      id: 6,
      title: 'KIL.co.id',
      description: 'Modern corporate website for PT Katapang Indah Lestari — a trusted business solutions company. Features product catalog, service information, and responsive design.',
      category: 'Corporate',
      technologies: ['Next.js', 'TypeScript', 'TailwindCSS'],
      image: '/images/project-kil.png',
      demo: 'https://kil.co.id',
      featured: false
    },
    {
      id: 7,
      title: 'RumahSiapKerja.com',
      description: 'Training platform for Indonesia\'s Prakerja program — providing professional upskilling courses, business development mentoring, and career readiness programs for job seekers nationwide.',
      category: 'Platform',
      technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeScript', 'TailwindCSS'],
      image: '/images/project-rsk.png',
      demo: 'https://rumahsiapkerja.com',
      featured: true
    },
    {
      id: 8,
      title: 'TemanUjian',
      description: 'AI-powered learning platform for Indonesian students. Features gamified quizzes, AI tutor characters, progress tracking, and rewards system to make studying fun and engaging.',
      category: 'EdTech',
      technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeScript', 'TailwindCSS'],
      image: '/images/project-temanujian.png',
      demo: 'https://ujian.mfah.me',
      featured: true
    },
    {
      id: 9,
      title: 'WaSaaS',
      description: 'E-commerce platform powered by AI WhatsApp integration. Enables businesses to manage online stores, process orders, and engage customers through automated WhatsApp conversations.',
      category: 'SaaS',
      technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'Redis', 'TypeScript', 'Docker'],
      image: '/images/project-wasaas.png',
      demo: 'https://wasaas.mfah.me',
      featured: true
    },
    {
      id: 10,
      title: 'Indonesian Cheer Association',
      description: 'Official platform for Indonesia\'s national cheerleading governing body. Features championship management, membership registration, provincial team directories, news & updates, and certification programs for 1000+ athletes across 15+ provinces.',
      category: 'Platform',
      technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeScript', 'TailwindCSS'],
      image: '/images/project-ica.png',
      demo: 'https://www.indonesiancheer.org',
      featured: true
    },
    {
      id: 11,
      title: 'Pokédex Explorer',
      description: 'Interactive Pokédex web app for browsing and catching Pokémon. Features a searchable Pokémon catalog, detailed stats, type matchups, and a collection tracker — built as a fun side project.',
      category: 'Fun',
      technologies: ['Next.js', 'TypeScript', 'TailwindCSS'],
      image: '/images/project-poke.png',
      demo: 'https://poke.mfah.me',
      featured: false
    },
    {
      id: 12,
      title: 'MultiRentalSystems.com',
      description: 'Complete vehicle rental management system with admin panel, fleet management, online booking, financial reporting, and distributed document storage using MinIO.',
      category: 'Full Stack',
      technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeScript', 'TailwindCSS'],
      image: '/images/project-mrs.png',
      demo: 'https://multirentalsystems.com',
      featured: true
    },
    {
      id: 4,
      title: 'oMoMoMo',
      description: 'Collaborative project management application for teams. Supports Kanban task boards, time tracking, milestone management, and real-time collaboration between team members.',
      category: 'Full Stack',
      technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeScript', 'TailwindCSS'],
      image: '/images/project-placeholder.svg',
      featured: false
    },
  ] as Project[],

  // Experience Section
  experience: [
    {
      year: 'Jun 2025 - Present',
      title: 'Full Stack Developer',
      company: 'Freelance',
      details: [
        'Building custom web applications for various clients.',
        'Developing e-commerce platforms and business solutions.',
        'Specializing in TypeScript, React, Next.js, and Node.js.',
      ],
    },
    {
      year: 'Apr 2024 - Jun 2025',
      title: 'Owner',
      company: 'PT Fokus Andal Inovasi',
      details: [
        'Founded and managed a Shopee Live e-commerce operation.',
        'Scaled team to 25 employees across multiple departments.',
        'Achieved Rp 1.5 billion GMV per month.',
        'Built custom automation tools for advertising campaigns.',
        'Developed financial reporting systems to streamline operations and maximize ROI.',
      ],
    },
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

// Localized content for Indonesian
const localizedContent: Record<string, {
  personalInfo: { about: string[] };
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: SkillCategory[];
}> = {
  id: {
    personalInfo: {
      about: [
        'Full Stack Developer berpengalaman dengan keahlian di TypeScript, JavaScript, Node.JS, VueJS, ReactJS, dan React Native. Berperan penting dalam pengembangan platform besar seperti rumahsiapkerja.com.',
        'Menguasai teknologi frontend maupun backend termasuk MySQL, MongoDB, dan SQL Server. Bersemangat untuk berkontribusi dengan keahlian dalam manajemen proyek, kepemimpinan tim, dan metodologi agile pada proyek-proyek perangkat lunak yang berdampak.',
      ],
    },
    experience: [
      {
        year: 'Jun 2025 - Sekarang',
        title: 'Full Stack Developer',
        company: 'Freelance',
        details: [
          'Membangun aplikasi web custom untuk berbagai klien.',
          'Mengembangkan platform e-commerce dan solusi bisnis.',
          'Spesialisasi di TypeScript, React, Next.js, dan Node.js.',
        ],
      },
      {
        year: 'Apr 2024 - Jun 2025',
        title: 'Owner',
        company: 'PT Fokus Andal Inovasi',
        details: [
          'Mendirikan dan mengelola operasi e-commerce Shopee Live.',
          'Mengembangkan tim hingga 25 karyawan di berbagai departemen.',
          'Mencapai GMV Rp 1,5 miliar per bulan.',
          'Membangun tools otomasi custom untuk kampanye iklan.',
          'Mengembangkan sistem laporan keuangan untuk mengoptimalkan operasi dan memaksimalkan ROI.',
        ],
      },
      {
        company: 'Rumah Siap Kerja',
        roles: [
          {
            year: 'Des 2021 - Apr 2024',
            title: 'Frontend Developer Lead',
            description: 'Memimpin tim frontend beranggotakan 5 orang, mengembangkan RSK 3.0 dan Back-office.',
            details: [
              'Memimpin tim frontend dengan 5 anggota, mengelola tugas dan tenggat waktu.',
              'Menerapkan praktik Agile: sprint planning, stand-up, dan retrospektif.',
              'Memimpin redesain RSK 3.0 dan migrasi stack dari Vue ke React.',
              'Mengembangkan RSK Back-office menggunakan Nuxt.js dan TailwindCSS.',
            ],
          },
          {
            year: 'Apr 2020 - Des 2021',
            title: 'Frontend Developer',
            description: 'Mengembangkan platform untuk partner dan pengguna menggunakan Vue.js dan React.js.',
            details: [
              'Mengembangkan platform untuk partner perusahaan (Vue.js) dan pengguna akhir (React.js).',
              'Menggunakan SCSS/Less untuk styling dan mengintegrasikan API RESTful.',
              'Melakukan pengujian komprehensif (LambdaTest, Nightwatch, Mocha).',
            ],
          },
          {
            year: 'Mar 2020',
            title: 'Jr. Full Stack Developer',
            description: 'Berfokus pada arsitektur frontend dan manajemen database.',
            details: [
              'Berkolaborasi dalam merancang solusi dan arsitektur perangkat lunak.',
              'Mengembangkan dan mengelola database (MySQL).',
              'Mengimplementasikan API menggunakan NestJS.',
            ],
          },
        ],
      },
      {
        year: 'Okt 2019 - Mar 2020',
        title: 'Siswa Bootcamp',
        company: 'Purwadhika Startup School',
        description: 'Kursus intensif Web & Mobile Development dengan spesialisasi MERN stack.',
      },
      {
        year: 'Sep 2018 - Agu 2019',
        title: 'IT Helpdesk',
        company: 'Indosat Ooredoo (MII)',
        description: 'Mengelola tiket insiden, akun pengguna, dan dukungan teknis.',
      },
    ],
    education: [
      {
        year: '2019 - 2020',
        degree: 'Web and Mobile Development',
        institution: 'Purwadhika Startup and Coding School',
      },
      {
        year: '2015 - 2018',
        degree: 'Diploma, Teknik Informatika',
        institution: 'Politeknik LP3I Jakarta',
      },
      {
        year: '2012 - 2015',
        degree: 'Sarjana (Tidak Selesai)',
        institution: 'Universitas Bina Nusantara (Binus)',
      },
    ],
    projects: [
      {
        id: 1,
        title: 'Merdu.id',
        description: 'Platform SaaS multi-tenant untuk integrasi WhatsApp Business. Fitur meliputi manajemen pesan, broadcast, chatbot, payment gateway QRIS, dan load balancing multi-server untuk performa tinggi.',
        category: 'SaaS',
        technologies: ['NestJS', 'Next.js', 'PostgreSQL', 'Redis', 'TypeScript', 'Docker'],
        image: '/images/project-merdu.png',
        demo: 'https://merdu.id',
        featured: true,
      },
      {
        id: 3,
        title: 'SEN.co.id',
        description: 'Platform e-commerce untuk buku dan perlengkapan pendidikan (PT Sarana Ecommerce Nusantara). Fitur meliputi katalog buku online, paket sekolah, keranjang belanja, manajemen pesanan, dan integrasi pembayaran untuk sekolah di seluruh Indonesia.',
        category: 'E-Commerce',
        technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'Redis', 'TypeScript', 'TailwindCSS'],
        image: '/images/project-sen.png',
        demo: 'https://sen.co.id',
        featured: true,
      },
      {
        id: 5,
        title: 'SPKN.co.id',
        description: 'Website perusahaan PT Sarana Pancakarya Nusa — penyedia solusi pendidikan sejak 1986. Fitur meliputi katalog buku online, sistem admin, dan integrasi CMS Supabase.',
        category: 'Korporat',
        technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'Docker'],
        image: '/images/project-spkn.png',
        demo: 'https://spkn.co.id',
        featured: false,
      },
      {
        id: 6,
        title: 'KIL.co.id',
        description: 'Website perusahaan modern PT Katapang Indah Lestari — perusahaan solusi bisnis terpercaya. Fitur meliputi katalog produk, informasi layanan, dan desain responsif.',
        category: 'Korporat',
        technologies: ['Next.js', 'TypeScript', 'TailwindCSS'],
        image: '/images/project-kil.png',
        demo: 'https://kil.co.id',
        featured: false,
      },
      {
        id: 7,
        title: 'RumahSiapKerja.com',
        description: 'Platform pelatihan untuk program Prakerja Indonesia — menyediakan kursus peningkatan keterampilan profesional, mentoring pengembangan bisnis, dan program kesiapan karir bagi pencari kerja di seluruh nusantara.',
        category: 'Platform',
        technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeScript', 'TailwindCSS'],
        image: '/images/project-rsk.png',
        demo: 'https://rumahsiapkerja.com',
        featured: true,
      },
      {
        id: 8,
        title: 'TemanUjian',
        description: 'Platform belajar berbasis AI untuk pelajar Indonesia. Fitur meliputi kuis bergamifikasi, karakter tutor AI, pelacakan progres, dan sistem reward untuk menjadikan belajar menyenangkan dan menarik.',
        category: 'EdTech',
        technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeScript', 'TailwindCSS'],
        image: '/images/project-temanujian.png',
        demo: 'https://ujian.mfah.me',
        featured: true,
      },
      {
        id: 9,
        title: 'WaSaaS',
        description: 'Platform e-commerce yang didukung integrasi AI WhatsApp. Memungkinkan bisnis mengelola toko online, memproses pesanan, dan berinteraksi dengan pelanggan melalui percakapan WhatsApp otomatis.',
        category: 'SaaS',
        technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'Redis', 'TypeScript', 'Docker'],
        image: '/images/project-wasaas.png',
        demo: 'https://wasaas.mfah.me',
        featured: true,
      },
      {
        id: 10,
        title: 'Indonesian Cheer Association',
        description: 'Platform resmi badan pengelola cheerleading nasional Indonesia. Fitur meliputi manajemen kejuaraan, pendaftaran anggota, direktori tim provinsi, berita & info terkini, dan program sertifikasi untuk 1000+ atlet di 15+ provinsi.',
        category: 'Platform',
        technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeScript', 'TailwindCSS'],
        image: '/images/project-ica.png',
        demo: 'https://www.indonesiancheer.org',
        featured: true,
      },
      {
        id: 11,
        title: 'Pokédex Explorer',
        description: 'Aplikasi web Pokédex interaktif untuk menjelajahi dan menangkap Pokémon. Fitur meliputi katalog Pokémon yang bisa dicari, statistik detail, kecocokan tipe, dan pelacak koleksi — dibuat sebagai proyek seru.',
        category: 'Fun',
        technologies: ['Next.js', 'TypeScript', 'TailwindCSS'],
        image: '/images/project-poke.png',
        demo: 'https://poke.mfah.me',
        featured: false,
      },
      {
        id: 12,
        title: 'MultiRentalSystems.com',
        description: 'Sistem manajemen rental kendaraan lengkap dengan panel admin, manajemen armada, pemesanan online, laporan keuangan, dan penyimpanan dokumen terdistribusi menggunakan MinIO.',
        category: 'Full Stack',
        technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeScript', 'TailwindCSS'],
        image: '/images/project-mrs.png',
        demo: 'https://multirentalsystems.com',
        featured: true,
      },
      {
        id: 4,
        title: 'oMoMoMo',
        description: 'Aplikasi manajemen proyek kolaboratif untuk tim. Mendukung papan tugas Kanban, pelacakan waktu, manajemen milestone, dan kolaborasi real-time antar anggota tim.',
        category: 'Full Stack',
        technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeScript', 'TailwindCSS'],
        image: '/images/project-placeholder.svg',
        featured: false,
      },
    ],
    skills: [
      {
        title: 'Pengembangan Frontend',
        skills: [
          { name: 'JavaScript (ES6+)', level: 95, description: 'Penguasaan bahasa inti' },
          { name: 'React.js & Next.js', level: 90, description: 'UI berbasis komponen modern' },
          { name: 'Vue.js & Nuxt.js', level: 90, description: 'Keahlian framework progresif' },
          { name: 'TypeScript', level: 85, description: 'Pengembangan type-safe' },
          { name: 'TailwindCSS', level: 95, description: 'Styling UI yang cepat' },
        ],
      },
      {
        title: 'Backend & Database',
        skills: [
          { name: 'Node.js & Express', level: 80, description: 'Runtime server-side' },
          { name: 'MySQL', level: 75, description: 'Manajemen database relasional' },
          { name: 'MongoDB', level: 70, description: 'Database NoSQL' },
          { name: 'NestJS', level: 70, description: 'Aplikasi server-side yang scalable' },
        ],
      },
      {
        title: 'Tools & Manajemen',
        skills: [
          { name: 'Git & Version Control', level: 90, description: 'Kolaborasi kode' },
          { name: 'Jira & Agile', level: 85, description: 'Pelacakan proyek & metodologi' },
          { name: 'React Native', level: 80, description: 'Aplikasi mobile cross-platform' },
          { name: 'Testing (Jest/Mocha)', level: 75, description: 'Unit & integration testing' },
        ],
      },
    ],
  },
};

// Helper to get localized config
export function getLocalizedConfig(locale: string) {
  const localized = localizedContent[locale];
  if (!localized) return siteConfig;

  return {
    ...siteConfig,
    personalInfo: {
      ...siteConfig.personalInfo,
      about: localized.personalInfo.about,
    },
    experience: localized.experience,
    education: localized.education,
    projects: localized.projects,
    skills: localized.skills,
  };
}

export default siteConfig;
