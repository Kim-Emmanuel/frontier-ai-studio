import SkillRadar3D from "@/components/skills/SkillRadar3D";
import TechnologyGrid from "@/components/skills/TechnologyGrid";
import Certifications from "@/components/skills/Certifications";
import LearningJourney from "@/components/skills/LearningJourney";
import { Container } from "@/components/ui";
import React from "react";

export default function SkillsPage() {
  return (
    <Container className="py-8 space-y-12">
      <h1 className="text-4xl font-bold mb-6">Skills & Expertise</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <SkillRadar3D />
        </div>
        <div>
          <TechnologyGrid />
        </div>
      </div>
      <Certifications />
      <LearningJourney />
    </Container>
  );
}
