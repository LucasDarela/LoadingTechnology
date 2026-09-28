"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Chapter, Fade, Kicker, Lines } from "@/components/experience/Reveal";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Por que escolher a Loading Technology e não um freelancer?",
    answer:
      "Trabalhamos com uma equipe multidisciplinar. Diferente de um freelancer, garantimos continuidade, qualidade de código, arquitetura escalável e não deixamos seu projeto na mão. Somos uma empresa parceira de longo prazo.",
  },
  {
    question: "Vocês entregam o projeto no prazo estabelecido?",
    answer:
      "Sim. Utilizamos metodologias ágeis e definimos cronogramas realistas. Você acompanha o progresso em tempo real através de entregas parciais (sprints), sem surpresas no final.",
  },
  {
    question: "O código fonte será meu após a conclusão?",
    answer:
      "Absolutamente. Após a quitação do projeto, 100% da propriedade intelectual e do código fonte são transferidos para você ou sua empresa.",
  },
  {
    question: "E se eu precisar de manutenção depois do lançamento?",
    answer:
      "Oferecemos planos de sustentação e evolução contínua. Seu software nunca fica desatualizado e nossa equipe estará pronta para adicionar novas features quando seu negócio crescer.",
  },
  {
    question: "O software vai funcionar bem no celular e no computador?",
    answer:
      "Sim. Desenvolvemos soluções responsivas e, quando necessário, aplicativos nativos (Android/iOS) focados na melhor experiência do usuário (UX/UI).",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Chapter id="faq">
      <div className="mx-auto grid min-h-screen max-w-[90rem] items-center px-5 py-32 md:grid-cols-12 md:pl-10 md:pr-28">
        <div className="text-halo flex flex-col gap-7 md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7">
          <Kicker index="04">Dúvidas frequentes</Kicker>

          <Lines
            className="text-[clamp(2rem,min(4.4vw,8.5vh),4.5rem)] font-medium leading-[0.98] tracking-[-0.035em] text-ice"
            lines={["Transparência desde", "o primeiro contato"]}
          />

          <Fade delay={0.15} className="flex items-end gap-5">
            <span className="font-mono text-[clamp(2.5rem,min(5vw,9vh),4.5rem)] font-bold leading-none tabular-nums text-ice">100%</span>
            <span className="caption max-w-[22ch] pb-2 text-muted">do código fonte é seu após a quitação</span>
          </Fade>

          <Fade delay={0.25} className="border-t border-ice/10">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const panelId = `faq-panel-${index}`;
              return (
                <div key={faq.question} className="border-b border-ice/10">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="group flex w-full items-start gap-4 py-5 text-left"
                  >
                    <span className="pt-1 font-mono text-xs text-accent tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                    <span className="flex-1 font-medium text-ice transition-colors duration-200 group-hover:text-neon-hot">
                      {faq.question}
                    </span>
                    <Plus
                      aria-hidden
                      className={cn(
                        "mt-0.5 h-5 w-5 shrink-0 text-muted transition-transform duration-300 ease-[var(--ease-out)]",
                        isOpen && "rotate-45 text-ice",
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pl-8 pr-9 leading-relaxed text-ice/70">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </Fade>
        </div>
      </div>
    </Chapter>
  );
}
