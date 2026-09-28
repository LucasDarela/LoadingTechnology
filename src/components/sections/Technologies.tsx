"use client";

import { Chapter, Fade, Kicker, Lines } from "@/components/experience/Reveal";

const technologies = [
  { name: "JavaScript", area: "Web" },
  { name: "React", area: "Web" },
  { name: "Vue.js", area: "Web" },
  { name: "Angular", area: "Web" },
  { name: "Node.js", area: "Backend" },
  { name: "Python", area: "Backend" },
  { name: "MySQL", area: "Dados" },
  { name: "AWS", area: "Cloud" },
  { name: "Android", area: "Mobile" },
  { name: "iOS", area: "Mobile" },
];

export function Technologies() {
  return (
    <Chapter id="servicos">
      <div className="mx-auto grid min-h-screen max-w-[90rem] items-center px-5 py-32 md:grid-cols-12 md:pl-10 md:pr-28">
        <div className="text-halo flex flex-col gap-7 md:col-span-7 lg:col-span-6">
          <Kicker index="01">Nossa stack tecnológica</Kicker>

          <Lines
            className="text-[clamp(2rem,min(4.4vw,8.5vh),4.5rem)] font-medium leading-[0.98] tracking-[-0.035em] text-ice"
            lines={["Ferramentas que", "escalam com você"]}
          />

          <Fade as="p" delay={0.2} className="max-w-[52ch] text-lg leading-relaxed text-ice/80">
            Utilizamos as melhores e mais modernas ferramentas do mercado para garantir que seu projeto seja rápido,
            seguro e escalável.
          </Fade>

          <ul className="grid grid-cols-2 border-t border-ice/10">
            {technologies.map((tech, i) => (
              <Fade
                as="li"
                key={tech.name}
                delay={0.25 + i * 0.04}
                className="group flex items-baseline justify-between gap-4 border-b border-ice/10 py-3.5 odd:border-r odd:pr-4 even:pl-4"
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-ice transition-colors duration-200 group-hover:text-neon-hot">{tech.name}</span>
                </span>
                <span className="caption hidden text-[10px] text-muted sm:inline">{tech.area}</span>
              </Fade>
            ))}
          </ul>

          <Fade delay={0.4} className="caption text-muted">
            Web · Mobile · Cloud · Dados
          </Fade>
        </div>
      </div>
    </Chapter>
  );
}
