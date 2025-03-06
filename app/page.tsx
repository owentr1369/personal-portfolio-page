import Hero from "../components/main/Hero";
import Projects from "@/components/main/Projects";
import Skills from "@/components/main/Skills";
import Encryption from "@/components/main/Encryption";
import "../assets/main.scss";
import HotjarTracker from "@/components/HotjarTracker";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <Skills />
        <Encryption />
        <Projects />
        <HotjarTracker />
      </div>
    </main>
  );
}
