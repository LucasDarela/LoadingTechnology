import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a] pt-16 pb-8">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <Logo className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold tracking-tight text-white">Loading Tecnology</span>
          </div>
          <div className="flex gap-6">
            <a href="#servicos" className="text-gray-400 hover:text-white transition-colors text-sm">Serviços</a>
            <a href="#cases" className="text-gray-400 hover:text-white transition-colors text-sm">Cases</a>
            <a href="#contato" className="text-gray-400 hover:text-white transition-colors text-sm">Contato</a>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-8 border-t border-white/10 pt-8">
          &copy; {new Date().getFullYear()} Loading Tecnology. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
