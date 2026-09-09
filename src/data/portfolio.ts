export const personalInfo = {
  name: 'Sahil',
  role: 'Computer Science Engineering Student',
  specialization: 'Cybersecurity',
  eyebrow: "COLLECTION '26",
  heroPositioning: 'Securing Systems. Building Software.',
  supportingPositioning:
    'Computer science student focused on cybersecurity, software development, networking, and systems.',
  description:
    'I build secure web applications, cybersecurity tools, and software projects while exploring how systems work from the application layer down to the operating system.',
  roles: [
    'Cybersecurity Student',
    'Software Developer',
    'Security Enthusiast',
    'Full-Stack Developer',
  ],
  email: 'sahilmuhammed112@gmail.com',
  availableForOpportunities: true,
}

export const philosophy = {
  eyebrow: 'THE PHILOSOPHY',
  heading: 'Building with curiosity. Securing with purpose.',
  body: 'I learn by building. My interests span cybersecurity, software development, networking, web applications, and low-level systems. I enjoy understanding not only how software works, but also how it can fail and how it can be made more secure.',
}

export type SkillCategory = {
  title: string
  skills: string[]
}

export const skills: SkillCategory[] = [
  {
    title: 'Programming',
    skills: ['C++', 'Python', 'JavaScript', 'Java', 'HTML', 'CSS'],
  },
  {
    title: 'Web Development',
    skills: ['React', 'Next.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'REST APIs'],
  },
  {
    title: 'Cybersecurity',
    skills: [
      'Linux',
      'Kali Linux',
      'Nmap',
      'Metasploit',
      'Wireshark',
      'Burp Suite',
      'Web Security',
      'Secure Coding',
      'Vulnerability Scanning',
      'Networking',
    ],
  },
  {
    title: 'Databases & Tools',
    skills: ['MongoDB', 'SQL', 'Git', 'GitHub', 'VS Code', 'Docker', 'WSL', 'VMware', 'Vercel'],
  },
]

export type Project = {
  slug: string
  title: string
  subtitle?: string
  description: string
  technologies: string[]
  features?: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  educational?: boolean
}

export const projects: Project[] = [
  {
    slug: 'xerova',
    title: 'Xerova',
    subtitle: 'Cybersecurity Intelligence Platform',
    description:
      'A security-focused platform designed to bring cybersecurity intelligence and security workflows into a centralized interface.',
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'MongoDB',
      'Node.js',
      'Cybersecurity APIs',
      'Authentication',
    ],
    liveUrl: 'https://xerova-lab.vercel.app/',
    githubUrl: 'https://github.com/mhdsahil1/Xerova',
    featured: true,
  },
  {
    slug: 'zline',
    title: 'Zline',
    subtitle: 'Secure Real-Time Chat Application',
    description:
      'A full-stack real-time messaging platform focused on secure communication, modern messaging features, and end-to-end encryption.',
    technologies: [
      'Next.js',
      'React',
      'Node.js',
      'MongoDB',
      'Socket.IO',
      'WebSockets',
      'NextAuth',
      'End-to-End Encryption',
    ],
    features: [
      'Real-time messaging',
      'End-to-end encryption',
      'Message reactions',
      'Read receipts',
      'Message editing',
      'Message deletion',
      'File sharing',
      'Media previews',
      'Calling',
      'Group communication',
    ],
    liveUrl: 'https://zline.vercel.app/',
    githubUrl: 'https://github.com/mhdsahil1/Zline',
    featured: true,
  },
  {
    slug: 'nyota-os',
    title: 'Nyota OS',
    subtitle: 'Experimental Hobby Operating System',
    description:
      'A hobby operating system built from scratch to explore boot processes, low-level programming, kernel development, hardware interaction, and operating-system fundamentals.',
    technologies: ['C', 'Assembly', 'NASM', 'GCC', 'GNU LD', 'Make', 'QEMU', 'Linux / WSL'],
    features: [
      'Bootable disk image',
      'Boot process',
      'Low-level programming',
      'Kernel experimentation',
      'QEMU testing',
      'Operating-system fundamentals',
    ],
    githubUrl: 'https://github.com/mhdsahil1/Nyota-OS'
  },
  {
    slug: 'vulnerability-scanner',
    title: 'Vulnerability Scanner',
    description:
      'A Python-based cybersecurity tool for network reconnaissance, port scanning, and basic web security assessment.',
    technologies: ['Python', 'Socket Programming', 'HTTP', 'Networking'],
    features: ['TCP port scanning', 'Network reconnaissance', 'Web scanning', 'Structured scan output'],
    githubUrl: 'https://github.com/mhdsahil1/Vulnerability-Scanner'
  },
  {
    slug: 'secure-coding-review',
    title: 'Secure Coding Review',
    description:
      'An educational security project demonstrating common web application vulnerabilities and practical mitigation techniques.',
    technologies: ['Python', 'Flask', 'SQL', 'Web Security'],
    features: [
      'SQL Injection',
      'Cross-Site Scripting',
      'Command Injection',
      'Secure implementations',
      'Security mitigation techniques',
    ],
    
    educational: true,
  },
]

export type ExperienceEntry = {
  organization: string
  role: string
  description: string
  areas: string[]
  dates: string
}

export const experience: ExperienceEntry[] = [
  {
    organization: 'CodeAlpha',
    role: 'Cybersecurity Intern',
    description:
      'Worked on practical cybersecurity assignments involving vulnerability analysis, secure coding, web application security, and security-focused development.',
    areas: ['Vulnerability analysis', 'Secure coding', 'Web security', 'Security testing', 'Cybersecurity projects'],
    dates: 'Aug 2026 ',
  },
]

export type EducationEntry = {
  title: string
  subtitle?: string
  meta: string[]
  score?: string
}

export const education: EducationEntry[] = [
  {
    title: 'Bachelor of Technology',
    subtitle: 'Computer Science Engineering — Cybersecurity',
    meta: ['Yenepoya University', 'Mangalore', '2024 - present'],
  },
  {
    title: '2nd PUC',
    subtitle: 'PCMB',
    meta: [],
    score: '494 / 600',
  },
  {
    title: 'SSLC',
    meta: [],
    score: '592 / 625',
  },
]

export const exploration = [
  'Cybersecurity',
  'Web Application Security',
  'Networking',
  'Operating Systems',
  'Secure Software Development',
  'Data Structures & Algorithms',
]

export const stats = [
  { value: '4+', label: 'Featured Projects' },
  { value: '1', label: 'Cybersecurity Internship' },
  { value: '∞', label: 'Things Still Being Learned' },
]

export const socialLinks = {
  github: 'https://github.com/mhdsahil1',
  linkedin: 'https://www.linkedin.com/in/mhdsahil09/',
  email: personalInfo.email,
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export const HLS_SRC =
  'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'
