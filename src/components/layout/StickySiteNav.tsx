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
  "shrink-0 rounded-full px-3.5 py-2 text-center text-xs font-semibold leading-tight tracking-tight",
  "text-white/66 transition-colors",
  "hover:bg-white/[0.08] hover:text-white",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
  "sm:px-3.5 sm:text-[13px]",
);

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
        <div className="flex w-max max-w-[min(100%,calc(100vw-0.5rem))] items-stretch justify-center gap-1.5 md:hidden">
          <div
            className={cn(
              "flex min-h-11 max-w-[min(16rem,calc(100vw-3.75rem))] shrink items-center justify-center rounded-full border border-white/10",
              "bg-black/55 px-3.5 py-2 text-center shadow-xl backdrop-blur-xl sm:px-4",
            )}
          >
            <span className="truncate font-display text-sm font-semibold tracking-tight text-white">
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
                  "h-11 w-11 shrink-0 self-center rounded-full border-white/10 bg-black/55 text-white shadow-xl backdrop-blur-xl",
                  "hover:bg-white/[0.1] hover:text-white",
                )}
                aria-label={t("nav.openMenu")}
              >
                <Menu className="h-[18px] w-[18px]" strokeWidth={2.25} aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-[min(100%,19rem)] flex-col border-l border-white/10 bg-background p-0 sm:max-w-[19rem]"
            >
              <SheetHeader className="border-b border-white/10 px-5 pb-4 pt-5 text-center sm:text-center">
                <SheetTitle className="font-display text-base text-foreground">
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
                      "rounded-xl px-3 py-3 text-center text-sm font-semibold text-foreground",
                      "transition-colors hover:bg-white/[0.06]",
                    )}
                  >
                    {t(`nav.${link.key}`)}
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div
          className={cn(
            "hidden w-max min-w-0 max-w-[calc(100vw-0.75rem)] md:block",
            "rounded-full border border-white/10",
            "bg-black/50 py-1.5 pl-2 pr-2 text-white shadow-[0_18px_60px_-32px_rgba(0,0,0,0.9)] backdrop-blur-xl md:max-w-[calc(100vw-1rem)]",
          )}
        >
          <nav
            className={cn(
              "scrollbar-hide flex min-h-11 w-max min-w-0 max-w-full items-center justify-center gap-0.5 overflow-x-auto overscroll-x-contain px-0.5",
              "sm:gap-1 sm:px-1",
            )}
            aria-label={t("nav.mobileMenuTitle")}
          >
            <button
              type="button"
              onClick={() => scrollToSection("#")}
              className="mr-2 inline-flex shrink-0 items-center rounded-full bg-white/[0.07] px-4 py-2 font-display text-sm font-semibold text-white transition hover:bg-white/[0.1]"
            >
              Bella Cucina
            </button>
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
