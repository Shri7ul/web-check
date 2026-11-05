import { Hero } from "@/components/home/Hero";
import { MeetMachines } from "@/components/home/MeetMachines";
import { HumanProblem } from "@/components/home/HumanProblem";
import { InsideRobot } from "@/components/home/InsideRobot";
import { HowWeBuild } from "@/components/home/HowWeBuild";
import { ResearchSection } from "@/components/home/ResearchSection";
import { JourneySection } from "@/components/home/JourneySection";
import { People } from "@/components/home/People";
import { JoinSection } from "@/components/home/JoinSection";

/**
 * The homepage is a compact, visual-first story in ten scenes. The Engineering
 * Tree lives on its own route (/engineering-tree) and is deliberately absent
 * here. Server components by default; only interactive scenes are client.
 */
export default function HomePage() {
  return (
    <>
      {/* Scene 01 — The Mission */}
      <Hero />

      {/* Scene 02 — Meet the Robots */}
      <MeetMachines />

      {/* Scene 03 — Rescue Challenges */}
      <HumanProblem />

      {/* Scene 04 — How a Robot Works */}
      <InsideRobot />

      {/* Scene 05 — From Design to Reality */}
      <HowWeBuild />

      {/* Scene 06 — Research & Experiments */}
      <ResearchSection />

      {/* Scene 07 — The Journey */}
      <JourneySection />

      {/* Scene 08 — The People Behind the Machines */}
      <People />

      {/* Scene 09 — Join the Mission */}
      <JoinSection />

      {/* Scene 10 — Footer, rendered by RootLayout */}
    </>
  );
}
