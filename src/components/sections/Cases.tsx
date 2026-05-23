"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export function Cases() {
  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden border-b border-white/10">
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
              O Chopp Hub é a prova da nossa capacidade de entregar sistemas complexos com interfaces amigáveis. Um sistema completo para gestão de comodatos, clientes e rotas de entrega.
            </p>
            
            <ul className="space-y-3">
              {[
                "Gestão financeira e de estoque integrada",
                "App mobile para entregadores (Offline First)",
                "Controle de barris e comodato em tempo real",
                "Emissão de NF-e automatizada"
              ].map((item, i) => (
                <li key={i} className="flex items-center text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mr-3 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <button className="flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors mt-4">
              Ver detalhes do projeto <ArrowRight className="w-4 h-4 ml-2" />
            </button>
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
                <h3 className="text-2xl font-bold text-white mb-2">Chopp Hub</h3>
                <p className="text-blue-300/80">ERP & Mobile App</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
