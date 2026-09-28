"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2, Send } from "lucide-react";
import { Chapter, Fade, Kicker, Lines } from "@/components/experience/Reveal";
import { sendEmailAction } from "@/app/actions/send-email";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const contacts = [
  { label: "E-mail", value: "contato@loadingtechnology.com.br", href: "mailto:contato@loadingtechnology.com.br" },
  { label: "WhatsApp / Telefone", value: "+55 (48) 99144-7684", href: "https://wa.me/5548991447684" },
  { label: "Localização", value: "Atendimento 100% remoto e global" },
];

const fields = [
  { id: "name", label: "Nome completo", type: "text", placeholder: "João Silva", autoComplete: "name" },
  { id: "email", label: "E-mail", type: "email", placeholder: "joao@empresa.com", autoComplete: "email" },
  { id: "phone", label: "Telefone / WhatsApp", type: "tel", placeholder: "(00) 00000-0000", autoComplete: "tel" },
  { id: "subject", label: "Assunto", type: "text", placeholder: "Desenvolvimento de App Mobile", autoComplete: "off" },
];

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setError(false);

    const formData = new FormData(e.currentTarget);
    const result = await sendEmailAction(formData);

    if (result.success) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setIsSending(false);
      }, 5000);
    } else {
      setError(true);
      setIsSending(false);
    }
  };

  return (
    <Chapter id="contato" fadeOut={false}>
      <div className="mx-auto grid min-h-screen max-w-[90rem] items-center gap-14 px-5 py-32 md:pl-10 md:pr-28 lg:grid-cols-12">
        <div className="text-halo flex flex-col gap-7 lg:col-span-5">
          <Kicker index="05">Contato</Kicker>

          <Lines
            className="text-[clamp(2.5rem,min(6vw,12vh),6rem)] font-bold leading-[0.92] tracking-[-0.045em] text-ice"
            lines={["Vamos", <span key="c" className="text-neon-hot">conversar?</span>]}
          />

          <Fade as="p" delay={0.2} className="max-w-[44ch] text-lg leading-relaxed text-ice/80">
            Preencha o formulário ou entre em contato diretamente. Estamos prontos para transformar sua ideia em
            realidade.
          </Fade>

          <dl className="border-t border-ice/10">
            {contacts.map((c, i) => (
              <Fade key={c.label} delay={0.25 + i * 0.05} className="flex flex-col gap-1 border-b border-ice/10 py-4">
                <dt className="caption text-muted">{c.label}</dt>
                <dd className="text-ice">
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="transition-colors duration-200 hover:text-neon-hot"
                    >
                      {c.value}
                    </a>
                  ) : (
                    c.value
                  )}
                </dd>
              </Fade>
            ))}
          </dl>
        </div>

        <Fade delay={0.2} className="glass relative rounded-3xl p-6 md:p-10 lg:col-span-7">
          <AnimatePresence mode="wait" initial={false}>
            {isSubmitted ? (
              <motion.div
                key="sent"
                role="status"
                initial={{ opacity: 0, transform: "scale(0.96)" }}
                animate={{ opacity: 1, transform: "scale(1)" }}
                exit={{ opacity: 0, transform: "scale(0.96)" }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
                className="flex min-h-[420px] flex-col items-center justify-center gap-4 text-center"
              >
                <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-neon shadow-[0_0_60px_rgb(36_93_231/0.6)]">
                  <Send className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-3xl font-medium tracking-tight text-ice">Mensagem enviada!</h3>
                <p className="max-w-[36ch] text-ice/70">
                  Agradecemos o contato. Nossa equipe retornará o mais breve possível.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
                className="flex flex-col gap-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  {fields.map((f) => (
                    <div key={f.id} className="flex flex-col gap-2">
                      <label htmlFor={f.id} className="caption text-muted">
                        {f.label}
                      </label>
                      <input
                        id={f.id}
                        name={f.id}
                        type={f.type}
                        required
                        autoComplete={f.autoComplete}
                        placeholder={f.placeholder}
                        className="field"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="caption text-muted">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Conte-nos um pouco sobre o seu projeto..."
                    className="field resize-none"
                  />
                </div>

                {error && (
                  <p role="alert" className="text-sm text-red-300">
                    Ocorreu um erro ao enviar a mensagem. Tente novamente ou nos chame no WhatsApp.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ice px-7 py-4 font-medium text-background transition-[transform,background-color,opacity] duration-150 ease-out hover:bg-white active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSending ? (
                    <>
                      Enviando <Loader2 className="h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Enviar mensagem
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </Fade>
      </div>
    </Chapter>
  );
}
