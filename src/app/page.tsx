import { Experience } from "@/components/experience/Experience";
import { Hero } from "@/components/sections/Hero";
import { Technologies } from "@/components/sections/Technologies";
import { Cases } from "@/components/sections/Cases";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#servicos"
        className="caption fixed left-4 top-4 z-[70] -translate-y-24 rounded-md border border-accent bg-background px-3 py-2 text-ice transition-transform duration-200 focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      <Experience />
      <main className="relative z-10 overflow-x-clip">
        <Hero />
        <Technologies />
        <Cases />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
