import { getContent } from "@/lib/content";
import type { Education as EducationItem } from "@/lib/types";
import Hero from "@/components/Hero";
import SectionIndex from "@/components/SectionIndex";
import Summary from "@/components/Summary";
import Multidisciplinary from "@/components/Multidisciplinary";
import ResearchInterests from "@/components/ResearchInterests";
import Education from "@/components/Education";
import Research from "@/components/Research";
import Internship from "@/components/Internship";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Always read fresh content so admin edits show immediately.
export const dynamic = "force-dynamic";

// Pull the CGPA shown in the hero from the Education section. If more than
// one program exists, prefer the in-progress one (e.g. "4th Year") over a
// completed degree, so the hero reflects current standing.
function heroCgpa(education: EducationItem[]): string {
  const withCgpa = education.filter((e) => e.cgpa && e.cgpa.trim());
  if (withCgpa.length === 0) return "";
  const current = withCgpa.find(
    (e) =>
      e.status &&
      /year/i.test(e.status) &&
      !/graduat|complet|pass/i.test(e.status)
  );
  return (current ?? withCgpa[0]).cgpa;
}

export default function Home() {
  const content = getContent();
  const cgpa = heroCgpa(content.education).split(/\s+/)[0];

  return (
    <>
      <Hero profile={content.profile} cgpa={cgpa} />
      <SectionIndex cgpa={cgpa} />
      <Summary profile={content.profile} />
      <Multidisciplinary narrative={content.narrative} />
      <ResearchInterests items={content.researchInterests} />
      <Education items={content.education} />
      <Internship items={content.internships} />
      <Research items={content.research} />
      <Projects items={content.projects} />
      <Certifications items={content.certifications} />
      <Skills skills={content.skills} />
      <Contact contact={content.contact} />
      <Footer profile={content.profile} updatedAt={content.updatedAt} />
    </>
  );
}
