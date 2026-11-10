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
    { id: "about", label: "About" },
    { id: "work", label: "Work" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ],

  hero: {
    headline: "Designing thoughtful, intuitive digital experiences.",
    /** Word in the headline that gets the design-tool "selection" treatment. */
    highlight: "intuitive",
    intro:
      "I design user-centred interfaces for web and mobile, bringing together usability, visual clarity and an understanding of how digital products work. A background in UX design, business information systems and quality assurance helps me balance user needs with business goals.",
    ctas: {
      primary: { label: "Explore my work", href: "#work" },
      secondary: { label: "Get in touch", href: "#contact" },
    },
    specialisms: ["UI Design", "UX Research", "Wireframing", "Prototyping", "Usability"],
    /** Short facts under the hero. Each item: a main line and an optional detail. */
    education: [{ main: "MSc User Experience Design", detail: "Birmingham City University" }],
    previously: [
      { main: "Lyxux UK", detail: "UI/UX" },
      { main: "Cloud99X", detail: "UI/UX" },
      { main: "SkyNet Hosting", detail: "UI/UX" },
      { main: "Deloitte", detail: "Risk advisory" },
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
    /** How many points to show per role (the first N in each list). */
    pointsPerRole: 2,
    /** Marker for each point: "square" | "number" | "rule" | "arrow". */
    pointStyle: "square" as "square" | "number" | "rule" | "arrow",
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
          "Conducted user research through surveys, interviews, and usability tests.",
          "Identified navigation issues during usability testing and refined designs in response.",
          "Designed interfaces for web and mobile applications, maintaining visual consistency.",
          "Developed wireframes and prototypes for mobile applications.",
        ],
      },
      {
        company: "Deloitte",
        role: "Associate Risk Advisor",
        /** Not a design role: show only company, title and dates. */
        hideDetails: true,
        period: "Aug 2022 — Jul 2023",
        summary:
          "Built analytical and quality-focused experience through application assessments and technology risk work.",
        points: [
          "Conducted quality assurance assessments against industry standards and specifications.",
          "Reviewed application functionality, security, and performance through structured testing.",
          "Identified potential vulnerabilities in client network infrastructure and provided recommendations.",
          "Contributed to improving application reliability, security, and operational efficiency.",
        ],
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
