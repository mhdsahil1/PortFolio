export const personalInfo = {
  name: 'Muhammed Sahil',
  shortName: 'Sahil',
  title: 'Creative Technologist & Full-Stack Architect',
  headline: 'Crafting fluid, futuristic digital experiences and high-performance creative systems.',
  bio: 'I build at the intersection of creative engineering, futuristic aesthetics, and high-performance systems. Driven by fluid physics, kinetic typography, and zero-latency web architecture.',
  description:
    'Crafting fluid, futuristic digital experiences and high-performance creative systems where interactive physics and visual engineering converge.',
  heroPositioning: 'Crafting fluid, futuristic digital experiences and high-performance creative systems.',
  eyebrow: 'CREATIVE SYSTEMS & INTERACTION',
  email: 'sahilmuhammed112@gmail.com',
  github: 'https://github.com/mhdsahil1',
  linkedin: 'https://www.linkedin.com/in/mhdsahil09/',
  portfolioUrl: 'https://mhdsahil.vercel.app/',
  location: 'Mangalore, India',
  availableForOpportunities: true,
  roles: ['Creative Technologist', 'Full-Stack Architect', 'Interaction Engineer'],
  education: {
    degree: 'B.Tech Computer Science Engineering',
    specialization: 'Cyber Security',
    institution: 'Yenepoya University, Mangalore',
    years: '2024 – Present',
  },
}

export const disciplines = [
  'CYBERSECURITY',
  'FULL-STACK',
  'SYSTEMS',
  'AI',
  'OPEN SOURCE',
]

export const exploration: string[] = [
  'Cybersecurity',
  'Operating Systems',
  'Systems Programming',
  'Network Security',
  'Web Engineering',
]

export type SkillGroup = {
  category: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'LANGUAGES',
    items: ['TypeScript', 'JavaScript', 'Python', 'C', 'C++', 'Dart', 'x86 Assembly'],
  },
  {
    category: 'FRAMEWORKS',
    items: ['React', 'Next.js', 'FastAPI', 'Flutter'],
  },
  {
    category: 'SYSTEMS & TOOLS',
    items: ['Linux', 'MongoDB', 'Git', 'GitHub', 'Three.js', 'QEMU'],
  },
]

export const skills = skillGroups.map((g) => ({
  title: g.category,
  skills: g.items,
}))

export const philosophy = {
  eyebrow: 'ABOUT',
  heading: 'Building with curiosity. Securing with purpose.',
  body: personalInfo.bio,
}

export const stats = [
  { value: '4+', label: 'Featured Systems' },
  { value: '2', label: 'Security Internships' },
  { value: '01', label: 'Unified Core' },
]

export type Project = {
  slug: string
  title: string
  category: string
  categoryNumber: string
  subtitle?: string
  description: string
  technologies: string[]
  features?: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  educational?: boolean
}

export const primaryProjects: Project[] = [
  {
    slug: 'xerova',
    title: 'Xerova',
    category: 'SECURITY',
    categoryNumber: '01',
    subtitle: 'Threat Intelligence Platform',
    description:
      'Cybersecurity threat-intelligence platform for IOC investigation, malicious URL analysis, phishing detection, and security research.',
    technologies: ['TypeScript', 'Next.js', 'MongoDB', 'Auth.js', 'Groq', 'Gemini AI'],
    features: [
      '22+ integrated threat intelligence engines',
      'Autonomous IOC extraction and threat reasoning',
      'Deep malicious URL, phishing & homograph analysis',
      'SSRF protection and input validation',
    ],
    liveUrl: 'https://xerova-lab.vercel.app/',
    githubUrl: 'https://github.com/mhdsahil1/Xerova',
    featured: true,
  },
  {
    slug: 'nyota-os',
    title: 'Nyota OS',
    category: 'SYSTEMS',
    categoryNumber: '02',
    subtitle: 'Experimental Operating System',
    description:
      'Experimental operating system exploring bootloaders, x86, kernel development, memory, hardware interaction, and IPC.',
    technologies: ['C', 'x86 Assembly', 'QEMU', 'NASM', 'Make'],
    features: [
      'Custom stage-2 bootloader',
      'i386 Protected mode & segmentation (GDT)',
      'IDT and PIC interrupt vectoring',
      'QEMU virtual hardware emulation',
    ],
    githubUrl: 'https://github.com/mhdsahil1/Nyota-OS',
    featured: true,
  },
  {
    slug: 'zline',
    title: 'Zline',
    category: 'COMMUNICATION',
    categoryNumber: '03',
    subtitle: 'Encrypted Real-Time Platform',
    description:
      'Real-time communication platform with messaging, media, calls, group calls, reactions, and end-to-end encryption.',
    technologies: ['TypeScript', 'WebRTC', 'Socket.IO', 'React', 'MongoDB'],
    features: [
      'Sender Key end-to-end encryption protocol',
      'Low-latency full-duplex socket signaling',
      'WebRTC audio and video calling',
      'Media preview & encrypted attachments',
    ],
    liveUrl: 'https://zline.vercel.app/',
    githubUrl: 'https://github.com/mhdsahil1/Zline',
    featured: true,
  },
  {
    slug: 'zestora',
    title: 'Zestora',
    category: 'ECOMMERCE',
    categoryNumber: '04',
    subtitle: 'Full-Stack E-Commerce',
    description:
      'Full-stack e-commerce platform with authentication, admin tools, payments, inventory, and order management.',
    technologies: ['TypeScript', 'Next.js', 'MongoDB', 'Razorpay', 'Tailwind CSS'],
    features: [
      'Role-based administration and dashboard',
      'HMAC-SHA256 Razorpay payment pipeline',
      'Atomic inventory reservation with rollback',
      'Strict Zod schema validation guards',
    ],
    liveUrl: 'https://zestoraspices.vercel.app/',
    githubUrl: 'https://github.com/mhdsahil1/Zestora',
    featured: true,
  },
]

export const secondaryProjects: Project[] = [
  {
    slug: 'ball-on',
    title: 'Ball-On',
    category: 'DATA & ML',
    categoryNumber: '05',
    subtitle: 'Football Transfer Intelligence & Valuation',
    description:
      'A collaborative football intelligence platform built to analyze player value, transfer activity, and football data using data-driven valuation techniques.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Python', 'FastAPI', 'SQLite'],
    liveUrl: 'https://ball-on.vercel.app/',
    githubUrl: 'https://github.com/MohammadAsheel/Ball-On',
  },
  {
    slug: 'vulnerability-scanner',
    title: 'Vulnerability Scanner',
    category: 'SECURITY TOOL',
    categoryNumber: '06',
    subtitle: 'Network Reconnaissance & Port Auditing',
    description:
      'A Python-based cybersecurity tool for network reconnaissance, multithreaded TCP port scanning, service banner grabbing, and web security vulnerability assessment.',
    technologies: ['Python', 'Socket Programming', 'HTTP', 'Networking', 'Concurrency'],
    githubUrl: 'https://github.com/mhdsahil1/Vulnerability-Scanner',
  },
  {
    slug: 'secure-coding-review',
    title: 'Secure Coding Review',
    category: 'SECURITY RESEARCH',
    categoryNumber: '07',
    subtitle: 'Vulnerability Analysis & Defensive Implementations',
    description:
      'An educational cybersecurity project demonstrating exploitation vectors and hardened mitigation patterns for OWASP Top 10 vulnerabilities.',
    technologies: ['Python', 'Flask', 'SQL', 'Web Security', 'OWASP'],
    educational: true,
  },
]

// All projects combined for backwards compatibility
export const projects: Project[] = [...primaryProjects, ...secondaryProjects]

export type ExperienceEntry = {
  organization: string
  role: string
  period: string
  description: string
  areas: string[]
  dates: string
}

export const experience: ExperienceEntry[] = [
  {
    organization: 'ACMEGRADE × IIT Delhi Rendezvous',
    role: 'Cyber Security Intern',
    period: '2026 – Present',
    description:
      'Engaged in hands-on cybersecurity practices, threat research, and defensive security workflows.',
    areas: ['Cybersecurity', 'Threat Analysis', 'Network Security'],
    dates: '2026 – Present',
  },
  {
    organization: 'CodeAlpha',
    role: 'Cyber Security Intern',
    period: '2026',
    description:
      'Worked on practical cybersecurity assignments involving vulnerability analysis, secure coding, web application security, and security-focused development.',
    areas: ['Vulnerability analysis', 'Secure coding', 'Web security', 'Security testing'],
    dates: '2026',
  },
]

export type EducationEntry = {
  title: string
  subtitle?: string
  meta: string[]
  score?: string
}

export type ModernEducationEntry = {
  degree: string
  field: string
  institution: string
  period: string
  score?: string
}

export const educationList: ModernEducationEntry[] = [
  {
    degree: 'B.Tech Computer Science Engineering',
    field: 'Specialization: Cyber Security',
    institution: 'Yenepoya University, Mangalore',
    period: '2024 – Present',
  },
]

export type LegacyEducation = EducationEntry

// Legacy education export for backwards compatibility
export const education: LegacyEducation[] = [
  {
    title: 'Bachelor of Technology',
    subtitle: 'Computer Science Engineering — Cybersecurity',
    meta: ['Yenepoya University', 'Mangalore', '2024 - present'],
    score: 'Enrolled',
  },
]

export const socialLinks = {
  github: 'https://github.com/mhdsahil1',
  linkedin: 'https://www.linkedin.com/in/mhdsahil09/',
  email: personalInfo.email,
  portfolio: 'https://mhdsahil.vercel.app/',
}

export const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]
