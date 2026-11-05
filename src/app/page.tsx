import { Hero } from "@/components/home/Hero";
import { HumanProblem } from "@/components/home/HumanProblem";
import { MeetMachines } from "@/components/home/MeetMachines";
import { InsideRobot } from "@/components/home/InsideRobot";
import { HowWeBuild } from "@/components/home/HowWeBuild";
import { ResearchSection } from "@/components/home/ResearchSection";
import { People } from "@/components/home/People";
import { JourneySection } from "@/components/home/JourneySection";
import { JoinSection } from "@/components/home/JoinSection";

/**
 * The homepage is a visual story in ten scenes. The Engineering Tree lives
 * on its own route (/engineering-tree) — it is deliberately absent here.
 * The restrained footer (Scene 10) is rendered by the root layout.
 * Server components by default; only interactive scenes are client.
 */
export default function HomePage() {
  return (
    <>
      {/* Scene 01 — The Mission */}
      <Hero />

      {/* Scene 02 — The Problem */}
      <HumanProblem />

      {/* Scene 03 — Meet the Robots */}
      <MeetMachines />

      {/* Scene 04 — How a Robot Works */}
      <InsideRobot />

      {/* Scene 05 — From Design to Reality */}
      <HowWeBuild />

      {/* Scene 06 — Research & Experiments */}
      <ResearchSection />

      {/* Scene 07 — The People Behind the Machines */}
      <People />

      {/* Scene 08 — The Journey */}
      <JourneySection />

      {/* Scene 09 — Join the Mission */}
      <JoinSection />

      {/* Scene 10 — Footer, rendered by RootLayout */}
    </>
  );
}
