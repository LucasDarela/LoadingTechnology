"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-white/10 pt-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0a0a] to-[#0a0a0a]" />
      
      <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center space-y-8">
        
        {/* Animated Logo at the top of Hero */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-4"
        >
          <div className="relative flex items-center justify-center w-32 h-32 md:w-40 md:h-40">
            <Logo className="w-20 h-20 md:w-24 md:h-24 text-blue-500" />
            <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-xl animate-pulse"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-gray-300 backdrop-blur-sm"
        >
          <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
          Inovação e Engenharia de Software
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter"
        >
          Transformando ideias em <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
            tecnologia de alto impacto.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-[600px] text-gray-400 md:text-xl"
        >
          Na Loading Tecnology, desenvolvemos soluções de software escaláveis e modernas que impulsionam o seu negócio para o futuro.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button className="bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-full px-8 py-6 text-lg">
            Inicie seu Projeto
          </Button>
          <Button className="bg-transparent text-white border border-white/20 hover:bg-white/10 rounded-full px-8 py-6 text-lg">
            Conheça nossos cases
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
