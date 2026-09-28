import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="relative z-[45] border-t border-ice/10 bg-background">
      <div className="caption mx-auto flex max-w-[90rem] flex-col items-center justify-between gap-6 px-5 py-10 text-muted md:flex-row md:px-10">
        <div className="flex items-center gap-3 font-display text-sm font-semibold normal-case tracking-normal text-ice">
          <Logo className="h-5 w-5 text-neon-hot" />
          Loading Technology
        </div>
        <nav className="flex gap-6">
          <a href="#servicos" className="transition-colors duration-200 hover:text-ice">Serviços</a>
          <a href="#cases" className="transition-colors duration-200 hover:text-ice">Cases</a>
          <a href="#contato" className="transition-colors duration-200 hover:text-ice">Contato</a>
        </nav>
        <span>&copy; {new Date().getFullYear()} Loading Technology</span>
      </div>
    </footer>
  );
}
