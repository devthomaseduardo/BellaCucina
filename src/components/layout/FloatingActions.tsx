import React, { useState } from "react";
import CartModal from "@/components/cart/CartModal";
import { useCart } from "@/components/cart/CartContext";
import WaiterButton from "@/components/waiter/WaiterButton";
import { cn } from "@/lib/utils";

type FloatingActionsProps = {
  className?: string;
  showWaiterAction?: boolean;
};

const formatPrice = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

const FloatingActions = ({
  className,
  showWaiterAction = false,
}: FloatingActionsProps) => {
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems, totalPrice } = useCart();
  const itemLabel = totalItems === 1 ? "1 item" : `${totalItems} itens`;

  return (
    <>
      <div
        className={cn(
          "fixed z-50 flex flex-col items-end gap-2",
          "bottom-[max(0.875rem,env(safe-area-inset-bottom,0px))] right-[max(0.875rem,env(safe-area-inset-right,0px))] sm:bottom-6 sm:right-6",
          className,
        )}
      >
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className={cn(
            "group relative flex h-9 w-9 items-center justify-center gap-2 rounded-full sm:h-11 sm:w-auto sm:min-w-[9.5rem] sm:justify-start sm:px-3.5",
            "transition-all hover:-translate-y-0.5 active:translate-y-0",
            totalItems > 0
              ? "border border-primary/30 bg-primary text-primary-foreground shadow-[0_18px_60px_-24px_hsl(var(--primary))] hover:bg-primary/90"
              : "border border-white/10 bg-black/[0.68] text-white shadow-xl backdrop-blur-xl hover:bg-white/[0.12]",
          )}
          aria-label="Abrir pedido"
        >
          <span
            className={cn(
              "grid h-7 w-7 shrink-0 place-items-center rounded-full font-display text-sm sm:h-8 sm:w-8",
              totalItems > 0 ? "bg-black/[0.16]" : "bg-white/[0.08] text-primary",
            )}
          >
            P
          </span>
          <span className="hidden min-w-0 text-left sm:block">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] opacity-75">
              Pedido
            </span>
            <span className="block truncate text-sm font-semibold leading-tight">
              {totalItems > 0 ? itemLabel : "Abrir comanda"}
            </span>
          </span>
          {totalItems > 0 && (
            <>
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-black px-1 text-[10px] font-bold sm:hidden">
                {totalItems}
              </span>
              <span className="ml-auto hidden shrink-0 rounded-full bg-black/[0.16] px-2.5 py-1 text-xs font-semibold sm:inline-flex">
                {formatPrice(totalPrice)}
              </span>
            </>
          )}
        </button>

        {showWaiterAction && (
          <WaiterButton
            variant="secondary"
            size="icon"
            className="h-10 w-10 rounded-full border border-white/10 bg-black/[0.68] text-foreground shadow-xl backdrop-blur-xl hover:bg-white/[0.12]"
          />
        )}
      </div>

      <CartModal open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
};

export default FloatingActions;
