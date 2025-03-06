import Hero from "../components/main/Hero";
import Projects from "@/components/main/Projects";
import Skills from "@/components/main/Skills";
import Encryption from "@/components/main/Encryption";
import "../assets/main.scss";
import Hotjar from "@hotjar/browser";

export default function Home() {
  const siteId = 5327937;
  const hotjarVersion = 6;

  Hotjar.init(siteId, hotjarVersion);
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <Skills />
        <Encryption />
        <Projects />
      </div>
    </main>
  );
}
