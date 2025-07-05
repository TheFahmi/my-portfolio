import { NextResponse } from 'next/server';

// GitHub repository interface
interface GitHubRepository {
  id: number;
  name: string;
  description: string | null;
  fork: boolean;
  private: boolean;
  language: string | null;
  topics: string[];
  homepage: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  size: number;
}

export async function GET() {
  try {
    const username = 'TheFahmi'; // GitHub username
    const token = process.env.GITHUB_TOKEN; // Optional GitHub token for higher rate limits
    
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-App'
    };
    
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }
    
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      { headers }
    );

    if (!response.ok) {
      // For development, return mock data if GitHub API fails
      if (process.env.NODE_ENV === 'development') {
        console.log('GitHub API failed, returning mock data');
        return NextResponse.json(getMockProjects());
      }
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const repositories: GitHubRepository[] = await response.json();
    
    // Filter out forked repositories and transform data
    const projects = repositories
      .filter((repo: GitHubRepository) => !repo.fork && !repo.private)
      .map((repo: GitHubRepository, index: number) => ({
        id: repo.id,
        title: repo.name.split('-').map((word: string) => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        description: repo.description || 'No description available',
        image: `/projects/project${(index % 6) + 1}.jpg`, // Cycle through available images
        category: getProjectCategory(repo.language, repo.topics),
        technologies: getTechnologies(repo.language, repo.topics),
        demoLink: repo.homepage || '#',
        codeLink: repo.html_url,
        status: getProjectStatus(repo),
        progress: Math.floor(Math.random() * 40) + 60, // Random progress for coming-soon projects
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updated: repo.updated_at
      }))
      .sort((a: { updated: string }, b: { updated: string }) => new Date(b.updated).getTime() - new Date(a.updated).getTime());

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    
    // For development, return mock data if there's an error
    if (process.env.NODE_ENV === 'development') {
      console.log('Returning mock data due to error');
      return NextResponse.json(getMockProjects());
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch repositories' },
      { status: 500 }
    );
  }
}

function getMockProjects() {
  return [
    {
      id: 1,
      title: 'My Portfolio',
      description: 'A modern, responsive portfolio website built with Next.js and TypeScript',
      image: '/projects/project1.jpg',
      category: 'web',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      demoLink: 'https://fahmihassan.com',
      codeLink: 'https://github.com/TheFahmi/my-portfolio',
      status: 'completed',
      progress: 100,
      stars: 5,
      forks: 2,
      updated: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      title: 'E Commerce Platform',
      description: 'A full-featured e-commerce platform with product management and payment integration',
      image: '/projects/project2.jpg',
      category: 'web',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      demoLink: '#',
      codeLink: 'https://github.com/TheFahmi/ecommerce-platform',
      status: 'completed',
      progress: 100,
      stars: 12,
      forks: 3,
      updated: '2024-01-10T14:20:00Z'
    },
    {
      id: 3,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates',
      image: '/projects/project3.jpg',
      category: 'web',
      technologies: ['Vue.js', 'Socket.io', 'PostgreSQL'],
      demoLink: '#',
      codeLink: 'https://github.com/TheFahmi/task-manager',
      status: 'coming-soon',
      progress: 85,
      stars: 8,
      forks: 1,
      updated: '2024-01-05T09:15:00Z'
    },
    {
      id: 4,
      title: 'Fitness Tracker',
      description: 'A mobile application for tracking workouts and health metrics',
      image: '/projects/project4.jpg',
      category: 'mobile',
      technologies: ['React Native', 'Firebase', 'Redux'],
      demoLink: '#',
      codeLink: 'https://github.com/TheFahmi/fitness-tracker',
      status: 'completed',
      progress: 100,
      stars: 15,
      forks: 4,
      updated: '2023-12-20T16:45:00Z'
    },
    {
      id: 5,
      title: 'Weather Dashboard',
      description: 'An interactive weather dashboard with real-time data visualization',
      image: '/projects/project5.jpg',
      category: 'web',
      technologies: ['React', 'D3.js', 'Weather API'],
      demoLink: '#',
      codeLink: 'https://github.com/TheFahmi/weather-dashboard',
      status: 'coming-soon',
      progress: 65,
      stars: 6,
      forks: 2,
      updated: '2023-12-15T11:30:00Z'
    },
    {
      id: 6,
      title: 'Social Media App',
      description: 'A social media application with real-time messaging and photo sharing',
      image: '/projects/project6.jpg',
      category: 'mobile',
      technologies: ['React Native', 'Node.js', 'MongoDB', 'Socket.io'],
      demoLink: '#',
      codeLink: 'https://github.com/TheFahmi/social-media-app',
      status: 'coming-soon',
      progress: 40,
      stars: 3,
      forks: 1,
      updated: '2023-12-01T08:00:00Z'
    }
  ];
}

function getProjectCategory(language: string | null, topics: string[]): string {
  const mobileLanguages = ['swift', 'kotlin', 'dart', 'objective-c'];
  const mobileTopics = ['mobile', 'android', 'ios', 'react-native', 'flutter'];
  
  if (
    (language && mobileLanguages.includes(language.toLowerCase())) ||
    topics?.some(topic => mobileTopics.includes(topic.toLowerCase()))
  ) {
    return 'mobile';
  }
  
  return 'web';
}

function getTechnologies(language: string | null, topics: string[]): string[] {
  const technologies = [];
  
  if (language) {
    technologies.push(language);
  }
  
  // Add relevant topics as technologies
  const relevantTopics = topics?.filter(topic => 
    ['react', 'nextjs', 'nodejs', 'typescript', 'javascript', 'vue', 'angular', 
     'mongodb', 'postgresql', 'mysql', 'redis', 'docker', 'kubernetes', 
     'tailwindcss', 'bootstrap', 'sass', 'webpack', 'vite', 'express', 
     'nestjs', 'graphql', 'rest-api', 'firebase', 'aws', 'vercel'].includes(topic.toLowerCase())
  ) || [];
  
  technologies.push(...relevantTopics);
  
  return technologies.slice(0, 5); // Limit to 5 technologies
}

function getProjectStatus(repo: GitHubRepository): string {
  const lastUpdated = new Date(repo.updated_at);
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  
  // If repository has been updated recently, consider it as coming-soon
  if (lastUpdated > threeMonthsAgo && repo.size > 0) {
    return Math.random() > 0.6 ? 'coming-soon' : 'completed';
  }
  
  return 'completed';
}