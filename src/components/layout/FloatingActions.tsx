import React, { useEffect, useMemo, useRef, useState } from "react";
import CartButton from "@/components/cart/CartButton";
import WaiterButton from "@/components/waiter/WaiterButton";
import { cn } from "@/lib/utils";
import { ClocheIcon } from "@/components/icons/fine-dining";

type FloatingActionsProps = {
  className?: string;
  whatsappHref?: string;
  showWaiterAction?: boolean;
};

const FloatingActions = ({
  className,
  whatsappHref = "https://wa.me/5500000000000",
  showWaiterAction = false,
}: FloatingActionsProps) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      const el = rootRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const actions = useMemo(
    () => {
      const base = [
        {
          key: "cart",
          label: "Carrinho",
          node: (
            <CartButton
              variant="default"
              size="icon"
              className={cn(
                "h-11 w-11 rounded-xl shadow-sm",
                "bg-primary text-primary-foreground hover:bg-primary/90",
              )}
            />
          ),
        },
      ] as const;

      const waiter = showWaiterAction
        ? ([
            {
              key: "waiter",
              label: "Garçom",
              node: (
                <WaiterButton
                  variant="secondary"
                  size="icon"
                  className={cn(
                    "h-11 w-11 rounded-xl shadow-sm",
                    "bg-secondary/70 hover:bg-secondary",
                    "text-foreground",
                  )}
                />
              ),
            },
          ] as const)
        : ([] as const);

      const whatsapp = [
        {
          key: "whatsapp",
          label: "WhatsApp",
          node: (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar no WhatsApp"
              className={cn(
                "grid place-items-center h-11 w-11 rounded-xl",
                "bg-emerald-600 text-white shadow-sm",
                "transition-all hover:-translate-y-0.5 hover:bg-emerald-500 hover:shadow-md",
                "ring-1 ring-white/15",
              )}
            >
              <span className="text-[15px] font-semibold tracking-tight">
                WA
              </span>
            </a>
          ),
        },
      ] as const;

      return [...base, ...waiter, ...whatsapp];
    },
    [showWaiterAction, whatsappHref],
  );

  return (
    <div
      ref={rootRef}
      className={cn(
        "fixed z-50 flex flex-col items-end gap-3",
        "bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))] right-[max(1.25rem,env(safe-area-inset-right,0px))] sm:bottom-6 sm:right-6",
        className,
      )}
    >
      {/* Menu expandido */}
      <div
        className={cn(
          "flex flex-col items-end gap-2",
          "transition-all duration-200",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        {actions.map((a, idx) => (
          <div
            key={a.key}
            className={cn(
              "flex items-center gap-3",
              "transition-all duration-200 ease-out",
              open
                ? "translate-y-0"
                : "translate-y-2",
            )}
            style={{ transitionDelay: open ? `${idx * 35}ms` : "0ms" }}
          >
            <div
              className={cn(
                "px-3 py-1.5 rounded-full text-xs",
                "bg-background/85 backdrop-blur-md",
                "border border-border/70 shadow-sm",
                "text-foreground",
              )}
            >
              {a.label}
            </div>
            {a.node}
          </div>
        ))}
      </div>

      {/* Botão principal */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Fechar ações" : "Abrir ações"}
        className={cn(
          "relative grid place-items-center h-14 w-14 rounded-full",
          "shadow-xl border border-border/60",
          "bg-gradient-to-b from-[hsl(var(--accent))] to-[hsl(var(--secondary))]",
          "text-foreground",
          "backdrop-blur-md",
          "transition-all hover:-translate-y-0.5 hover:shadow-2xl active:translate-y-0",
        )}
      >
        <span className="absolute inset-0 rounded-full ring-1 ring-white/10" />
        <ClocheIcon className={cn("h-6 w-6 transition-transform", open && "rotate-[-8deg]")} />
      </button>
    </div>
  );
};

export default FloatingActions;

