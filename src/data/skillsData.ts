export type Skill = {
  id: string;
  name: string;
  category: string;
  level: number; // 0-100
  years?: number;
  projects?: string[];
  related?: string[]; // ids of related skills
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  year: number;
  badgeColor?: string;
};

export type Milestone = {
  id: string;
  year: number;
  title: string;
  description?: string;
};

export const categories = ["Frontend", "Backend", "AI/ML", "DevOps", "Tools"];

export const skills: Skill[] = [
  { id: "react", name: "React", category: "Frontend", level: 90, years: 5, projects: ["Website", "Dashboard"], related: ["typescript", "threejs"] },
  { id: "nextjs", name: "Next.js", category: "Frontend", level: 85, years: 4, projects: ["Marketing site"], related: ["react"] },
  { id: "typescript", name: "TypeScript", category: "Tools", level: 88, years: 5, projects: ["All"], related: ["react", "node"] },
  { id: "node", name: "Node.js", category: "Backend", level: 80, years: 6, projects: ["API"], related: ["express"] },
  { id: "python", name: "Python", category: "AI/ML", level: 82, years: 6, projects: ["ML experiments"], related: ["pytorch"] },
  { id: "pytorch", name: "PyTorch", category: "AI/ML", level: 75, years: 3, projects: ["Research"], related: ["python"] },
  { id: "docker", name: "Docker", category: "DevOps", level: 78, years: 4, projects: ["Deployments"], related: ["kubernetes"] },
  { id: "kubernetes", name: "Kubernetes", category: "DevOps", level: 70, years: 2, projects: ["Scaling"], related: ["docker"] },
  { id: "threejs", name: "three.js", category: "Frontend", level: 65, years: 2, projects: ["3D visuals"], related: ["webgl"] },
  { id: "terraform", name: "Terraform", category: "DevOps", level: 60, years: 2, projects: ["Infra as code"], related: ["aws"] },
];

export const certifications: Certification[] = [
  { id: "aws-solutions-architect", name: "AWS Solutions Architect", issuer: "AWS", year: 2022, badgeColor: "#FF9900" },
  { id: "gcp-data-engineer", name: "GCP Data Engineer", issuer: "Google", year: 2023, badgeColor: "#4285F4" },
  { id: "ml-specialization", name: "ML Specialization", issuer: "Coursera", year: 2021, badgeColor: "#0A66C2" },
];

export const milestones: Milestone[] = [
  { id: "m1", year: 2018, title: "Started Frontend", description: "Built first React app" },
  { id: "m2", year: 2020, title: "Backend & APIs", description: "Designed and deployed Node APIs" },
  { id: "m3", year: 2021, title: "ML Projects", description: "Experimented with PyTorch models" },
  { id: "m4", year: 2022, title: "Infra", description: "Adopted Docker & Kubernetes" },
  { id: "m5", year: 2024, title: "Full-stack System Design", description: "Led production systems" },
];
