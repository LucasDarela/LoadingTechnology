"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Chapter, Fade, Kicker, Lines } from "@/components/experience/Reveal";

const choppHubFeatures = [
  "Gestão financeira e de estoque integrada",
  "App mobile para entregadores (Offline First)",
  "Controle de barris e comodato em tempo real",
  "Emissão de NF-e automatizada",
];

function ProjectBadge({ src, alt, name, kind }: { src: string; alt: string; name: string; kind: string }) {
  return (
    <Fade delay={0.15} className="flex items-center gap-4">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white p-2 shadow-[0_0_40px_rgb(79_125_255/0.25)]">
        <Image src={src} alt={alt} width={56} height={56} className="h-full w-full object-contain" />
      </div>
      <div>
        <p className="font-medium text-ice">{name}</p>
        <p className="caption text-muted">{kind}</p>
      </div>
    </Fade>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Fade delay={0.35}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group caption inline-flex items-center gap-2 border-b border-ice/20 pb-1 text-ice transition-colors duration-200 hover:border-neon-hot hover:text-neon-hot"
      >
        {children}
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 ease-[var(--ease-out)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </Fade>
  );
}

export function Cases() {
  return (
    <>
      <Chapter id="cases">
        <div className="mx-auto grid min-h-screen max-w-[90rem] items-center px-5 py-32 md:grid-cols-12 md:pl-10 md:pr-28">
          <div className="text-halo flex flex-col gap-7 md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7">
            <Kicker index="02">Case de sucesso</Kicker>

            <Lines
              className="text-[clamp(2rem,min(4.4vw,8.5vh),4.5rem)] font-medium leading-[0.98] tracking-[-0.035em] text-ice"
              lines={["Como revolucionamos", "a gestão com o", <span key="ch" className="text-neon-hot">Chopp Hub</span>]}
            />

            <ProjectBadge src="/chopp-hub.png" alt="Logo do Chopp Hub" name="Chopp Hub" kind="ERP & Mobile App" />

            <Fade as="p" delay={0.2} className="max-w-[52ch] text-lg leading-relaxed text-ice/80">
              O Chopp Hub é a prova da nossa capacidade de entregar sistemas complexos com interfaces amigáveis. Um
              sistema completo para gestão de comodatos, clientes e rotas de entrega.
            </Fade>

            <ul className="border-t border-ice/10">
              {choppHubFeatures.map((item, i) => (
                <Fade as="li" key={item} delay={0.25 + i * 0.05} className="flex items-baseline gap-4 border-b border-ice/10 py-3.5">
                  <span className="font-mono text-xs text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-ice">{item}</span>
                </Fade>
              ))}
            </ul>

            <ExternalLink href="https://chopphub.com">Ver detalhes do projeto</ExternalLink>
          </div>
        </div>
      </Chapter>

      <Chapter id="darela">
        <div className="mx-auto grid min-h-screen max-w-[90rem] items-center px-5 py-32 md:grid-cols-12 md:pl-10 md:pr-28">
          <div className="text-halo flex flex-col gap-7 md:col-span-7 lg:col-span-6">
            <Kicker index="03">Web & presença digital</Kicker>

            <Lines
              className="text-[clamp(2rem,min(4.4vw,8.5vh),4.5rem)] font-medium leading-[0.98] tracking-[-0.035em] text-ice"
              lines={["Vitrine online", "focada em conversão"]}
            />

            <ProjectBadge
              src="/darela-logo.png"
              alt="Logo da Darela Chopp Express"
              name="Darela Chopp Express"
              kind="Website / Landing Page"
            />

            <Fade as="p" delay={0.2} className="max-w-[52ch] text-lg leading-relaxed text-ice/80">
              Para a Darela Chopp Express, desenvolvemos um site rápido, responsivo e direto ao ponto. O foco foi
              apresentar o catálogo de produtos e facilitar o contato direto dos clientes para pedidos, garantindo uma
              presença digital profissional e eficiente.
            </Fade>

            <ExternalLink href="https://darelachopp.com.br">Visitar o site</ExternalLink>
          </div>
        </div>
      </Chapter>
    </>
  );
}
