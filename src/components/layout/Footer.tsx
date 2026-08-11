import React from "react";

interface FooterProps {
  restaurantName?: string;
  address?: string;
  phone?: string;
  email?: string;
}

const Footer = ({
  restaurantName = "Bella Cucina",
  address = "123 Main Street, City, State 12345",
  phone = "(555) 123-4567",
  email = "info@restaurant.com",
}: FooterProps) => {
  return (
    <footer className="w-full border-t border-white/10 bg-black px-4 py-12 text-white md:px-8 md:py-16">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 font-display text-3xl text-zinc-50">{restaurantName}</h3>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-400">
              Cardápio digital, reservas e pedidos por QR para uma experiência italiana moderna.
            </p>
            <div className="mt-5 space-y-2 text-sm text-zinc-400">
              <p className="flex items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">Rua</span>
                {address}
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">Tel</span>
                {phone}
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">Mail</span>
                {email}
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-zinc-50">Horários</h3>
            <p className="mb-2 text-zinc-400">
              Segunda a quinta: 11:00 às 22:00
            </p>
            <p className="mb-2 text-zinc-400">
              Sexta e sábado: 11:00 às 23:00
            </p>
            <p className="text-zinc-400">Domingo: 12:00 às 21:00</p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-zinc-50">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  className="text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  Cardápio
                </a>
              </li>
              <li>
                <a
                  href="#reservations"
                  className="text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  Reservas
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  Sobre
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-zinc-50">Acompanhe</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                FB
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                IG
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                X
              </a>
            </div>
            <div className="mt-6">
              <h4 className="mb-2 text-lg font-semibold">
                Receba novidades
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="min-w-0 flex-1 rounded-l-full border border-white/10 bg-white/[0.05] px-4 py-2 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                <button
                  type="button"
                  className="rounded-r-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-zinc-500">
          <p>
            &copy; {new Date().getFullYear()} {restaurantName}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
