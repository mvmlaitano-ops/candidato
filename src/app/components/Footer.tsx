export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-sm bg-accent/10 flex items-center justify-center">
            <span className="text-accent font-bold text-[7px]">C</span>
          </div>
          <span className="text-xs text-text-3">candidato &middot; radiografia patrimonial</span>
        </div>
        <div className="text-[10px] text-text-3 text-right">
          <p>Dados 2022 via TSE &middot; 2026 simulado &middot;{" "}
            <a href="https://divulgacandcontas.tse.jus.br" target="_blank" rel="noopener noreferrer" className="text-text-2 hover:text-accent transition-colors">
              tse.jus.br
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
