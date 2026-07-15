export type SkillCategory = "AI/ML" | "Astrophysics" | "Mechanical" | "General";

export interface MediaItem {
  type: "image" | "video";
  url: string;
  caption?: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Profile {
  name: string;
  tagline: string;
  titleShort: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  languages: Language[];
  summary: string[];
  cvUrl: string;
}

export interface NarrativePillar {
  field: string;
  accent: "ai" | "astro" | "mech";
  title: string;
  description: string;
}

export interface Narrative {
  eyebrow: string;
  heading: string;
  intro: string;
  pillars: NarrativePillar[];
  closing: string;
}

export interface Education {
  id: string;
  institution: string;
  location: string;
  degree: string;
  status: string;
  period: string;
  cgpa: string;
  highlights: string[];
}

export interface ResearchItem {
  id: string;
  title: string;
  period: string;
  description: string;
  tags: string[];
  media: MediaItem[];
  link?: string;
}

export interface InternshipItem {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  tags: string[];
  media: MediaItem[];
  link?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  period: string;
  description: string;
  tags: string[];
  media: MediaItem[];
  link?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  period: string;
  note: string;
  link?: string;
}

export interface ResearchInterest {
  id: string;
  title: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
}

export interface Contact {
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  note: string;
}

export interface Content {
  profile: Profile;
  narrative: Narrative;
  education: Education[];
  research: ResearchItem[];
  internships: InternshipItem[];
  projects: ProjectItem[];
  certifications: Certification[];
  skills: Skill[];
  contact: Contact;
  researchInterests: ResearchInterest[];
  updatedAt: string;
}
