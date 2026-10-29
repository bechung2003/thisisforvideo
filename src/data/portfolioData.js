export const portfolioData = {
  profile: {
    name: "Bechung Khumlo",
    role: "Student | Aspiring Software Developer",
    headline: "Hi, I'm Bechung Khumlo.",
    subheadline: "Student | Aspiring Software Developer",
    tagline: "Building digital experiences through curiosity, code, and continuous learning.",
    shortBio:
      " i just want to studyy!!!!",
    status: {
      available: true,
      badgeText: "Student & Aspiring Developer",
      location: "Open to Internships & Junior Roles",
    },
    socials: {
      github: "https://github.com/bechung2003",
      email: "khumlobaechung7@gmail.com",
      linkedin: "", // Add your LinkedIn URL here when ready
    },
  },

  about: {
    intro:
      "I'm a dedicated student and aspiring software developer who is passionate about computing, web technologies, and the art of problem solving. My journey into tech started with a strong curiosity about how software and websites work under the hood.",
    interests:
      "I enjoy crafting clean, responsive user interfaces and understanding how modern web applications manage data. Whenever I encounter a new concept or bug, I enjoy breaking it down, experimenting, and understanding the core mechanics behind it.",
    learning:
      "Right now, I am actively building projects using React, JavaScript (ES6+), HTML5, and modern CSS. I am also working with version control (Git & GitHub) and modern developer tooling like Vite.",
    goals:
      "My immediate goal is to continue growing my programming fundamentals, build useful web applications, and collaborate with other developers. Ultimately, I want to contribute to software products that make a positive difference in people's everyday lives.",
    highlights: [
      {
        title: "Passionate Learner",
        desc: "Constantly exploring new tools, web standards, and developer best practices.",
      },
      {
        title: "Hands-on Builder",
        desc: "Learning by creating functional web applications and writing clean code.",
      },
      {
        title: "Future Collaborator",
        desc: "Eager to contribute to team projects, learn from mentors, and build impactful software.",
      },
    ],
  },

  // Technical skills categorized cleanly and honestly
  skills: [
    {
      category: "Frontend Fundamentals",
      description: "Core languages and frameworks for building modern user interfaces",
      items: [
        { name: "HTML5 & Semantic Markup", status: "Proficient", note: "Accessible structures & clean semantics" },
        { name: "CSS3 & Responsive Design", status: "Proficient", note: "Flexbox, CSS Grid, media queries & animations" },
        { name: "JavaScript (ES6+)", status: "Active Learning", note: "DOM manipulation, fetch, async/await, array methods" },
        { name: "React", status: "Active Learning", note: "Component architecture, hooks, props & state management" },
      ],
    },
    {
      category: "Developer Tools & Workflow",
      description: "Tools I use daily for building, running, and versioning projects",
      items: [
        { name: "Git & GitHub", status: "Proficient", note: "Version control, repositories & branching" },
        { name: "Vite", status: "Proficient", note: "Modern frontend tooling & dev server" },
        { name: "npm / Node.js Basics", status: "Active Learning", note: "Package management & project dependencies" },
        { name: "VS Code & Terminal", status: "Proficient", note: "Productive CLI workflow & debugging" },
      ],
    },
    {
      category: "Exploring & In Progress",
      description: "Concepts and technologies I am currently studying and expanding into",
      items: [
        { name: "REST APIs & Data Fetching", status: "Exploring", note: "Connecting frontends to external web services" },
        { name: "TypeScript Basics", status: "Exploring", note: "Type safety and scalable code practices" },
        { name: "Web Accessibility (a11y)", status: "Exploring", note: "Keyboard navigation & accessible contrast" },
        { name: "Backend Fundamentals", status: "Exploring", note: "Understanding servers, HTTP & databases" },
      ],
    },
  ],

  // =========================================================================
  // PROJECTS LIST
  // -------------------------------------------------------------------------
  // You can add more projects either directly here in this file OR using
  // the "+ Upload / Add Project" button directly on your website!
  //
  // TEMPLATE TO ADD A NEW PROJECT:
  // {
  //   id: "my-project-name",
  //   title: "Project Title",
  //   subtitle: "Short Tagline (e.g. React Weather App)",
  //   category: "Web Development",
  //   image: "/images/project-fintech.jpg", // or place an image in public/images/
  //   tags: ["React", "JavaScript", "CSS"],
  //   summary: "Short description of what the project does and what you learned.",
  //   githubUrl: "https://github.com/bechung2003/your-repo", // or null
  //   liveUrl: "https://your-demo-url.com", // or null
  // },
  // =========================================================================
  projects: [
    {
      id: "personal-portfolio",
      title: "Personal Portfolio Website",
      subtitle: "Responsive Developer Portfolio Built with React & Vite",
      category: "Web Development",
      featured: true,
      image: "/images/project-fintech.jpg",
      tags: ["React", "JavaScript", "HTML5", "Vanilla CSS", "Vite"],
      summary:
        "A clean, modern, and fully responsive personal portfolio designed to showcase my learning journey, skills, and projects as an aspiring software developer.",
      description:
        "I built this portfolio to present my work cleanly, provide transparent details about what I am learning, and give visitors an easy way to get in touch. It is optimized for mobile, tablet, and desktop devices with accessible typography and clean styling.",
      features: [
        "Fully responsive layout across mobile, tablet, and desktop screens",
        "Clean, modern aesthetic with coral and subtle blue accents",
        "Interactive sections for About Me, Skills, Projects, and Contact",
        "Working contact form with feedback and one-click email copying",
      ],
      githubUrl: "https://github.com/bechung2003",
      liveUrl: "#hero",
      isExisting: true,
    },
    {
      id: "upcoming-projects",
      title: "Projects in Progress",
      subtitle: "New Applications Currently in Development",
      category: "Learning & Building",
      featured: true,
      image: "/images/project-ai.jpg",
      tags: ["React", "JavaScript", "Web APIs", "CSS3"],
      summary:
        "I am actively developing new web applications to put my learning into practice. Follow my GitHub to see live commits, code experiments, and upcoming releases.",
      description:
        "As a student developer, building hands-on projects is the core of my growth. I am currently working on web applications that involve interactive state, API integration, and clean user experience.",
      features: [
        "Hands-on coding exercises applying React component design",
        "Exploring RESTful APIs and asynchronous data fetching",
        "Continuous commits and updates to GitHub repositories",
      ],
      githubUrl: "https://github.com/bechung2003",
      liveUrl: null,
      isPlaceholder: true,
    },
  ],
};
