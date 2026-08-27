"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export function Cases() {
  return (
    <section
      id="cases"
      className="py-24 bg-[#0a0a0a] relative overflow-hidden border-b border-white/10 scroll-mt-20"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1 space-y-6"
          >
            <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
              Case de Sucesso
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
              Como revolucionamos a gestão com o Chopp Hub
            </h2>
            <p className="text-gray-400 md:text-lg">
              O Chopp Hub é a prova da nossa capacidade de entregar sistemas
              complexos com interfaces amigáveis. Um sistema completo para
              gestão de comodatos, clientes e rotas de entrega.
            </p>

            <ul className="space-y-3">
              {[
                "Gestão financeira e de estoque integrada",
                "App mobile para entregadores (Offline First)",
                "Controle de barris e comodato em tempo real",
                "Emissão de NF-e automatizada",
              ].map((item, i) => (
                <li key={i} className="flex items-center text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mr-3 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="https://chopphub.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors mt-4"
            >
              Ver detalhes do projeto <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 aspect-[4/3] flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-transparent opacity-50"></div>
              {/* Logo da Imagem Real */}
              <div className="relative z-10 text-center">
                <div className="w-32 h-32 mx-auto flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-500 bg-white rounded-2xl p-2 shadow-lg">
                  <Image
                    src="/chopp-hub.png"
                    alt="Chopp Hub Logo"
                    width={128}
                    height={128}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Chopp Hub
                </h3>
                <p className="text-blue-300/80">ERP & Mobile App</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-20 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Darela Chopp Express Case */}
        <div className="flex flex-col-reverse md:flex-row gap-8 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-white/5 aspect-[16/9] flex items-center justify-center group max-h-[280px]">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 to-transparent opacity-50"></div>
              <div className="relative z-10 text-center">
                <div className="w-24 h-24 mx-auto flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-500 bg-white rounded-xl p-3 shadow-lg">
                  <Image
                    src="/darela-logo.png"
                    alt="Darela Chopp Express Logo"
                    width={96}
                    height={96}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  Darela Chopp
                </h3>
                <p className="text-orange-300/80 text-sm">
                  Website / Landing Page
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-[1.5] space-y-4 pl-0 md:pl-8"
          >
            <div className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs text-orange-400">
              Web & Presença Digital
            </div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Vitrine online focada em conversão
            </h3>
            <p className="text-gray-400 text-sm md:text-base">
              Para a Darela Chopp Express, desenvolvemos um site rápido,
              responsivo e direto ao ponto. O foco foi apresentar o catálogo de
              produtos e facilitar o contato direto dos clientes para pedidos,
              garantindo uma presença digital profissional e eficiente.
            </p>

            <a
              href="https://darelachopp.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-orange-400 hover:text-orange-300 font-medium transition-colors text-sm mt-2"
            >
              Visitar o site <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
