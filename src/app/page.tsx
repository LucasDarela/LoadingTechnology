import { Hero } from "@/components/sections/Hero";
import { Technologies } from "@/components/sections/Technologies";
import { Cases } from "@/components/sections/Cases";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
      <Hero />
      <Technologies />
      <Cases />
      <Faq />
      <Footer />
    </main>
  );
}
