import React, { useCallback, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

const SECTION_LINKS = [
  { href: "#", key: "home" as const },
  { href: "#esperienze", key: "experiences" as const },
  { href: "#cucina", key: "cucina" as const },
  { href: "#menu", key: "menu" as const },
  { href: "#reservations", key: "reservations" as const },
  { href: "#about", key: "about" as const },
  { href: "#contact", key: "contact" as const },
];

function scrollToSection(href: string) {
  if (href === "#" || href === "") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

const desktopLinkClass = cn(
  "shrink-0 rounded-full px-3 py-1.5 text-center text-xs font-semibold leading-tight tracking-tight",
  "text-stone-900 transition-colors",
  "hover:bg-stone-900/[0.07] hover:text-stone-950",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2",
  "sm:px-3.5 sm:text-[13px]",
);

/**
 * Barra fixa: telemóvel com marca centrada + menu; desktop com links centrados e contraste forte.
 */
export function StickySiteNav() {
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  const go = useCallback((href: string) => {
    setMobileOpen(false);
    scrollToSection(href);
  }, []);

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-1 sm:px-2",
        "pt-[max(0.35rem,env(safe-area-inset-top))]",
      )}
    >
      <div className="pointer-events-auto mx-auto flex w-full max-w-full min-w-0 flex-col items-center">
        {/* Telemóvel: largura = conteúdo (marca + botão), até ao limite do ecrã */}
        <div className="flex w-max max-w-[min(100%,calc(100vw-0.5rem))] items-stretch justify-center gap-1.5 md:hidden">
          <div
            className={cn(
              "flex min-h-10 max-w-[min(16rem,calc(100vw-3.75rem))] shrink items-center justify-center rounded-full border border-stone-300/90",
              "bg-white/95 px-3.5 py-2 text-center shadow-sm backdrop-blur-md sm:px-4",
            )}
          >
            <span className="truncate font-display text-sm font-semibold tracking-tight text-stone-900">
              Bella Cucina
            </span>
          </div>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className={cn(
                  "h-10 w-10 shrink-0 self-center rounded-full border-stone-300/90 bg-white/95 text-stone-900 shadow-sm backdrop-blur-md",
                  "hover:bg-stone-100 hover:text-stone-950",
                )}
                aria-label={t("nav.openMenu")}
              >
                <Menu className="h-[18px] w-[18px]" strokeWidth={2.25} aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-[min(100%,19rem)] flex-col border-l border-stone-200 bg-background p-0 sm:max-w-[19rem]"
            >
              <SheetHeader className="border-b border-stone-200 px-5 pb-4 pt-5 text-center sm:text-center">
                <SheetTitle className="font-display text-base text-stone-900">
                  {t("nav.mobileMenuTitle")}
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2 py-3">
                {SECTION_LINKS.map((link) => (
                  <button
                    key={link.key}
                    type="button"
                    onClick={() => go(link.href)}
                    className={cn(
                      "rounded-xl px-3 py-3 text-center text-sm font-semibold text-stone-900",
                      "transition-colors hover:bg-stone-100",
                    )}
                  >
                    {t(`nav.${link.key}`)}
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Tablet / desktop: cápsula só com a largura dos links (com scroll se faltar espaço) */}
        <div
          className={cn(
            "hidden w-max min-w-0 max-w-[calc(100vw-0.75rem)] md:block",
            "rounded-full border border-stone-300/90",
            "bg-white/95 py-1.5 pl-1.5 pr-1.5 text-stone-900 shadow-sm backdrop-blur-md sm:pl-2 sm:pr-2 md:max-w-[calc(100vw-1rem)]",
          )}
        >
          <nav
            className={cn(
              "scrollbar-hide flex min-h-10 w-max min-w-0 max-w-full items-center justify-center gap-0.5 overflow-x-auto overscroll-x-contain px-0.5",
              "sm:gap-1 sm:px-1",
            )}
            aria-label={t("nav.mobileMenuTitle")}
          >
            {SECTION_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={desktopLinkClass}
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
