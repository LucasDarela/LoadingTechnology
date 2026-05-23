"use client";

import { motion } from "framer-motion";
import { 
  Code2, Database, Cloud, Smartphone, 
  Monitor, LayoutTemplate, Server, Cpu
} from "lucide-react";

const technologies = [
  { name: "JavaScript", icon: <Code2 className="w-8 h-8 text-yellow-400" /> },
  { name: "Python", icon: <Cpu className="w-8 h-8 text-blue-500" /> },
  { name: "MySQL", icon: <Database className="w-8 h-8 text-orange-400" /> },
  { name: "AWS", icon: <Cloud className="w-8 h-8 text-yellow-500" /> },
  { name: "Node.js", icon: <Server className="w-8 h-8 text-green-500" /> },
  { name: "Vue.js", icon: <LayoutTemplate className="w-8 h-8 text-green-400" /> },
  { name: "Angular", icon: <LayoutTemplate className="w-8 h-8 text-red-500" /> },
  { name: "React", icon: <Monitor className="w-8 h-8 text-blue-400" /> },
  { name: "Android", icon: <Smartphone className="w-8 h-8 text-green-500" /> },
  { name: "iOS", icon: <Smartphone className="w-8 h-8 text-gray-300" /> },
];

export function Technologies() {
  return (
    <section id="servicos" className="py-24 bg-[#0a0a0a] border-b border-white/10 scroll-mt-20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Nossa Stack Tecnológica</h2>
          <p className="text-gray-400 max-w-[700px] md:text-lg">
            Utilizamos as melhores e mais modernas ferramentas do mercado para garantir que seu projeto seja rápido, seguro e escalável.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group cursor-default"
            >
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {tech.icon}
              </div>
              <span className="font-medium text-gray-200">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
