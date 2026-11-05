import { Hero } from "@/components/home/Hero";
import { MissionBand } from "@/components/home/MissionBand";
import { HumanProblem } from "@/components/home/HumanProblem";
import { MeetMachines } from "@/components/home/MeetMachines";
import { InsideRobot } from "@/components/home/InsideRobot";
import { HowWeBuild } from "@/components/home/HowWeBuild";
import { EngineeringTreeSection } from "@/components/home/EngineeringTreeSection";
import { ResearchSection } from "@/components/home/ResearchSection";
import { JourneySection } from "@/components/home/JourneySection";
import { JoinSection } from "@/components/home/JoinSection";

/**
 * The homepage is a single narrative in ten scenes. The footer (Scene 10)
 * is rendered by the root layout. Server components by default; only the
 * interactive scenes and the lazy 3D layers are client components.
 */
export default function HomePage() {
  return (
    <>
      {/* Scene 01 — The Mission */}
      <Hero />
      <MissionBand />

      {/* Scene 02 — The Human Problem */}
      <HumanProblem />

      {/* Scene 03 — Meet the Machines */}
      <MeetMachines />

      {/* Scene 04 — Inside the Robot */}
      <InsideRobot />

      {/* Scene 05 — How We Build */}
      <HowWeBuild />

      {/* Scene 06 — The Engineering Tree */}
      <EngineeringTreeSection />

      {/* Scene 07 — Research & Experiments */}
      <ResearchSection />

      {/* Scene 08 — The Journey */}
      <JourneySection />

      {/* Scene 09 — Join the Work */}
      <JoinSection />

      {/* Scene 10 — Footer, rendered by RootLayout */}
    </>
  );
}
