/**
 * Landing-page content for Nandun Nethanga Perera.
 * Sourced from `nandun_uiux_portfolio_content.md`. Edit text here; projects are
 * managed in Sanity Studio (/studio).
 */

export const site = {
  name: "Nandun Nethanga Perera",
  shortName: "Nandun Perera",
  role: "UI/UX Designer",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  description:
    "Nandun Nethanga Perera is a UI/UX Designer designing user-centred interfaces for web and mobile, with a background in User Experience Design, Business Information Systems and technology quality assurance.",

  contact: {
    email: "Nandun.nethanga@gmail.com",
    // Add real profile URLs to show these links. Empty values are hidden.
    linkedin: "",
    dribbble: "",
  },

  nav: [
    { id: "work", label: "Work" },
    { id: "experience", label: "Experience" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ],

  hero: {
    headline: "Designing intuitive digital experiences through thoughtful problem-solving.",
    /** Word in the headline that gets the design-tool "selection" treatment. */
    highlight: "intuitive",
    intro:
      "I design user-centred interfaces for web and mobile experiences, bringing together usability, visual clarity, and an understanding of how digital products work. My background in User Experience Design and Business Information Systems, alongside experience in quality assurance and risk advisory, helps me approach design challenges with both user needs and business requirements in mind.",
    ctas: {
      primary: { label: "Explore my work", href: "#work" },
      secondary: { label: "Get in touch", href: "#contact" },
    },
    specialisms: ["UI Design", "UX Research", "Wireframing", "Prototyping", "Usability Evaluation"],
    snapshot: [
      { label: "Education", value: "MSc User Experience Design,\nBirmingham City University" },
      { label: "Previously", value: "UI/UX at Lyxux UK, Cloud99X and SkyNet Hosting.\nRisk advisory at Deloitte." },
    ],
  },

  work: {
    title: "Selected Work",
    intro: "A selection of design projects exploring user needs, interface decisions, and digital experiences.",
  },

  experience: {
    title: "Experience",
    intro:
      "My experience spans interface design, user research, prototyping, usability evaluation, and technology quality assurance.",
    roles: [
      {
        company: "Lyxux UK",
        role: "UI/UX Engineer Intern",
        period: "Jul 2024 — Sep 2024",
        summary:
          "Worked on web and mobile interface design, with an emphasis on usability, consistency, and clear user journeys.",
        points: [
          "Designed user interfaces with a focus on simplicity, consistency, and ease of navigation.",
          "Conducted user research and usability testing to understand user needs, behaviours, and pain points.",
          "Used research insights to inform design decisions and refine the user experience.",
        ],
      },
      {
        company: "Cloud99X (Pvt) Ltd",
        role: "UI/UX Designer",
        period: "Jan 2024 — Jul 2024",
        summary:
          "Contributed to digital design work that balanced user needs, visual consistency, and business objectives.",
        points: [
          "Designed navigation experiences aligned with the company’s professional brand identity.",
          "Developed prototypes to explore and refine design solutions.",
          "Considered user requirements and business goals throughout the design process.",
          "Created social media content to support brand visibility and audience engagement.",
        ],
      },
      {
        company: "SkyNet Hosting",
        location: "United States",
        role: "UI/UX Engineer Intern",
        period: "May 2023 — Apr 2024",
        summary:
          "Worked on web and mobile interface design, user research, and prototyping to support consistent and usable digital experiences.",
        points: [
          "Designed interfaces for web and mobile applications, maintaining visual consistency.",
          "Conducted user research through surveys, interviews, and usability tests.",
          "Developed wireframes and prototypes for mobile applications.",
          "Identified navigation issues during usability testing and refined designs in response.",
        ],
      },
      {
        company: "Deloitte",
        role: "Associate Risk Advisor",
        period: "Aug 2022 — Jul 2023",
        summary:
          "Built analytical and quality-focused experience through application assessments and technology risk work.",
        points: [
          "Conducted quality assurance assessments against industry standards and specifications.",
          "Identified potential vulnerabilities in client network infrastructure and provided recommendations.",
          "Reviewed application functionality, security, and performance through structured testing.",
          "Contributed to improving application reliability, security, and operational efficiency.",
        ],
      },
    ],
  },

  capabilities: {
    title: "What I Do",
    intro:
      "I work across key stages of the design process, from understanding user needs to shaping and evaluating digital interfaces.",
    items: [
      {
        icon: "interface",
        title: "UI Design",
        body: "Creating clear, consistent, and visually engaging interfaces that help people navigate and interact with digital products.",
      },
      {
        icon: "research",
        title: "UX Research",
        body: "Exploring user needs, behaviours, and challenges through research and usability testing to inform design decisions.",
      },
      {
        icon: "prototype",
        title: "Wireframing & Prototyping",
        body: "Turning early ideas into structured wireframes and interactive prototypes to communicate, explore, and refine digital experiences.",
      },
      {
        icon: "evaluate",
        title: "Usability & Experience Evaluation",
        body: "Reviewing user interactions, identifying usability issues, and refining designs to make experiences more intuitive.",
      },
    ],
  },

  skills: {
    title: "Skills & Capabilities",
    groups: [
      {
        title: "Design",
        items: ["User Interface Design", "User-Centred Design", "Wireframing", "Prototyping", "User Research", "Usability Testing"],
      },
      {
        title: "Analytical & Technical",
        items: ["Quality Assurance", "Risk Analysis", "Business Process Mapping", "Requirements Gathering", "Problem-Solving", "Critical Thinking"],
      },
      {
        title: "Professional",
        items: ["Collaboration & Communication", "Attention to Detail", "Time Management", "Adaptability", "Reporting & Documentation"],
      },
    ],
  },

  about: {
    title: "A little about me",
    lead: "I’m Nandun Nethanga Perera, a UI/UX Designer with a Master’s degree in User Experience Design and a Bachelor’s degree in Business Information Systems.",
    paragraphs: [
      "I have experience designing user-centred interfaces for web and mobile applications, conducting user research, developing wireframes and prototypes, and evaluating usability. My background in quality assurance and risk advisory has strengthened my analytical thinking, attention to detail, and ability to approach design challenges from both user and business perspectives.",
      "I’m interested in creating accessible, functional, and engaging digital products that make everyday interactions simpler and more meaningful.",
    ],
  },

  education: {
    title: "Education",
    items: [
      {
        school: "Birmingham City University",
        degree: "MSc User Experience Design",
        location: "United Kingdom",
        period: "2025 — 2026",
        body: "Postgraduate study in User Experience Design, developing knowledge of user experience principles, user-centred design, and the design and evaluation of digital experiences.",
        modules: [] as string[],
      },
      {
        school: "University of Westminster",
        degree: "BSc (Hons) Business Information Systems",
        location: "United Kingdom",
        period: "2021 — 2024",
        body: "Undergraduate study combining business and technology, with academic areas including:",
        modules: [
          "BIS Design and Architecture",
          "Agile Project Management",
          "Information Technology Security",
          "Database Systems",
          "Server-Side Web Development",
          "Business Analytics",
          "Strategic Management of Information Systems",
          "Big Data Analysis",
        ],
      },
      {
        school: "Empower Culinary and Hospitality School",
        degree: "Commercial Cookery",
        location: "Sri Lanka",
        period: "2017 — 2018",
        body: "",
        modules: [] as string[],
      },
    ],
  },

  contactSection: {
    title: "Let’s Connect",
    body: [
      "Have a project in mind, an opportunity to discuss, or simply want to connect?",
      "I’m always interested in meeting people, exploring new ideas, and collaborating on meaningful digital experiences.",
    ],
    signoff: "Let’s create something meaningful together.",
  },
} as const;

export type Site = typeof site;
