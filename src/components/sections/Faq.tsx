"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Por que escolher a Loading Technology e não um freelancer?",
    answer: "Trabalhamos com uma equipe multidisciplinar. Diferente de um freelancer, garantimos continuidade, qualidade de código, arquitetura escalável e não deixamos seu projeto na mão. Somos uma empresa parceira de longo prazo."
  },
  {
    question: "Vocês entregam o projeto no prazo estabelecido?",
    answer: "Sim. Utilizamos metodologias ágeis e definimos cronogramas realistas. Você acompanha o progresso em tempo real através de entregas parciais (sprints), sem surpresas no final."
  },
  {
    question: "O código fonte será meu após a conclusão?",
    answer: "Absolutamente. Após a quitação do projeto, 100% da propriedade intelectual e do código fonte são transferidos para você ou sua empresa."
  },
  {
    question: "E se eu precisar de manutenção depois do lançamento?",
    answer: "Oferecemos planos de sustentação e evolução contínua. Seu software nunca fica desatualizado e nossa equipe estará pronta para adicionar novas features quando seu negócio crescer."
  },
  {
    question: "O software vai funcionar bem no celular e no computador?",
    answer: "Sim. Desenvolvemos soluções responsivas e, quando necessário, aplicativos nativos (Android/iOS) focados na melhor experiência do usuário (UX/UI)."
  }
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="container px-4 md:px-6 mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Dúvidas Frequentes</h2>
          <p className="text-gray-400 md:text-lg">
            Transparência desde o primeiro contato. Entenda como trabalhamos.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-semibold text-gray-200 pr-8">{faq.question}</span>
                  <ChevronDown 
                    className={cn(
                      "w-5 h-5 text-gray-400 transition-transform duration-300", 
                      isOpen && "transform rotate-180"
                    )} 
                  />
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 text-gray-400">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
