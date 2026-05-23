"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send, Mail, MapPin, Phone, Loader2 } from "lucide-react";
import { useState } from "react";
import { sendEmailAction } from "@/app/actions/send-email";

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await sendEmailAction(formData);

    if (result.success) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setIsSending(false);
      }, 5000);
    } else {
      alert("Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente ou nos chame no WhatsApp.");
      setIsSending(false);
    }
  };

  return (
    <section id="contato" className="py-24 bg-[#0a0a0a] border-b border-white/10">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Vamos conversar?</h2>
          <p className="text-gray-400 md:text-lg max-w-[600px] mx-auto">
            Preencha o formulário abaixo ou entre em contato diretamente. Estamos prontos para transformar sua ideia em realidade.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-8">
              <h3 className="text-2xl font-bold text-white">Informações de Contato</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-blue-500 mt-1" />
                  <div>
                    <p className="font-medium text-white">E-mail</p>
                    <p className="text-gray-400">contato@loadingtecnology.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-blue-500 mt-1" />
                  <div>
                    <p className="font-medium text-white">WhatsApp / Telefone</p>
                    <p className="text-gray-400">+55 (48) 99144-7684</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-blue-500 mt-1" />
                  <div>
                    <p className="font-medium text-white">Localização</p>
                    <p className="text-gray-400">Atendimento 100% Remoto e Global</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center bg-blue-500/10 border border-blue-500/20 rounded-2xl p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Mensagem Enviada!</h3>
                <p className="text-gray-300">
                  Agradecemos o contato. Nossa equipe retornará o mais breve possível.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">Nome Completo</label>
                    <input 
                      id="name" 
                      name="name"
                      required 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                      placeholder="João Silva"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">E-mail</label>
                    <input 
                      id="email" 
                      name="email"
                      type="email" 
                      required 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                      placeholder="joao@empresa.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-300">Telefone / WhatsApp</label>
                    <input 
                      id="phone" 
                      name="phone"
                      type="tel" 
                      required 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-gray-300">Assunto</label>
                    <input 
                      id="subject" 
                      name="subject"
                      required 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                      placeholder="Desenvolvimento de App Mobile"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300">Mensagem</label>
                  <textarea 
                    id="message" 
                    name="message"
                    required 
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none" 
                    placeholder="Conte-nos um pouco sobre o seu projeto..."
                  />
                </div>

                <Button type="submit" disabled={isSending} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-6 text-lg group disabled:opacity-70 disabled:cursor-not-allowed">
                  {isSending ? (
                    <>
                      Enviando... <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                    </>
                  ) : (
                    <>
                      Enviar Mensagem
                      <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
