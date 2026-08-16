import React, { useState } from "react";
import { useCart, CartItem } from "./CartContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Minus, Plus, ReceiptText, Trash2, X, Edit, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";

interface CartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CartModal: React.FC<CartModalProps> = ({ open, onOpenChange }) => {
  const {
    items,
    updateQuantity,
    removeItem,
    totalPrice,
    totalItems,
    clearCart,
    updateNotes,
    tableNumber,
    setTableNumber,
    customerName,
    setCustomerName,
    setSuccessMessage,
    setShowSuccessToast,
    addOrder,
  } = useCart();
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [itemNotes, setItemNotes] = useState<string>("");
  const [localTableNumber, setLocalTableNumber] = useState(tableNumber || "");
  const [localCustomerName, setLocalCustomerName] = useState(
    customerName || "",
  );
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateNotes = (id: string) => {
    updateNotes(id, itemNotes);
    setEditingItemId(null);
  };

  const startEditingNotes = (item: CartItem) => {
    setEditingItemId(item.id);
    setItemNotes(item.notes || "");
  };

  const handleCheckout = async () => {
    if (isSubmitting) return;

    if (!localTableNumber) {
      setSuccessMessage("Por favor, informe o número da sua mesa.");
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
      return;
    }

    if (!localCustomerName) {
      setSuccessMessage(
        "Por favor, informe seu nome antes de finalizar o pedido.",
      );
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
      return;
    }

    if (localTableNumber && localTableNumber !== tableNumber) {
      setTableNumber(localTableNumber);
    }

    if (localCustomerName && localCustomerName !== customerName) {
      setCustomerName(localCustomerName);
    }

    setIsSubmitting(true);
    try {
      const orderId = await addOrder({
        tableNumber: localTableNumber,
        customerName: localCustomerName,
        items: items,
        status: "pending",
        totalPrice: totalPrice,
      });

      setCreatedOrderId(orderId);
      setOrderSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="flex max-h-[90vh] flex-col border-white/10 bg-background/95 shadow-[0_24px_90px_-48px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:max-w-[540px]">
          {orderSuccess ? (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-8 w-8" aria-hidden />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">
                Pedido enviado
              </h2>
              <p className="mb-6 text-muted-foreground">
                Seu pedido foi registrado e enviado para a equipe do restaurante.
              </p>

              {createdOrderId ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-full max-w-[420px] rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-left">
                    <div className="flex items-center gap-2 font-medium">
                      <ReceiptText className="h-4 w-4 text-primary" aria-hidden />
                      Pedido #{createdOrderId}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Mesa: {localTableNumber}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Cliente: {localCustomerName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Total: R$ {totalPrice.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Itens: {totalItems}
                    </p>
                    <p className="mt-3 w-fit rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-100">
                      Status: recebido pela equipe
                    </p>
                  </div>

                  <Button
                    className="w-full max-w-[420px] rounded-full"
                    onClick={() => {
                      clearCart();
                      setOrderSuccess(false);
                      setCreatedOrderId(null);
                      onOpenChange(false);
                    }}
                  >
                    Continuar no cardápio
                  </Button>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  Registrando pedido...
                </div>
              )}
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Seu Pedido</DialogTitle>
                <DialogDescription>
                  Revise os itens do seu pedido antes de finalizar.
                </DialogDescription>
              </DialogHeader>

              {items.length === 0 ? (
                <div className="py-6 text-center">
                  <div className="mx-auto mb-4 h-16 w-16 text-muted-foreground/60">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <p className="mb-4 text-muted-foreground">
                    Seu carrinho está vazio.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    className="mt-2 rounded-full border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
                  >
                    Continuar Comprando
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <Label
                        htmlFor="tableNumber"
                        className="text-sm font-medium"
                      >
                        Número da Mesa <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="tableNumber"
                        value={localTableNumber}
                        onChange={(e) => setLocalTableNumber(e.target.value)}
                        placeholder="Nº da mesa"
                        className="mt-1 rounded-full border-white/10 bg-white/[0.04]"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="customerName"
                        className="text-sm font-medium"
                      >
                        Identificação <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          id="customerName"
                          value={localCustomerName}
                          onChange={(e) => setLocalCustomerName(e.target.value)}
                          placeholder="Ex: Nome do grupo ou líder"
                          className="rounded-full border-white/10 bg-white/[0.04] pl-9"
                        />
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  <ScrollArea className="max-h-[40vh] flex-1 pr-4">
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex border-b border-white/10 pb-4">
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-medium">{item.name}</h4>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                            <div className="mb-1 flex items-center gap-2">
                              <p className="text-sm text-muted-foreground">
                                R$ {item.price.toFixed(2)}
                              </p>
                              {item.customerName && (
                                <span className="rounded-md border border-primary/10 bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                                  Para: {item.customerName}
                                </span>
                              )}
                            </div>

                            {editingItemId === item.id ? (
                              <div className="mt-2">
                                <Textarea
                                  value={itemNotes}
                                  onChange={(e) => setItemNotes(e.target.value)}
                                  placeholder="Observações (ex: sem cebola)"
                                  className="h-20 rounded-2xl border-white/10 bg-white/[0.04] text-sm"
                                />
                                <div className="mt-1 flex justify-end space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setEditingItemId(null)}
                                  >
                                    <X className="mr-1 h-4 w-4" /> Cancelar
                                  </Button>
                                  <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() => handleUpdateNotes(item.id)}
                                  >
                                    Salvar
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <>
                                {item.notes && (
                                  <p className="mb-2 text-xs italic text-muted-foreground">
                                    Obs: {item.notes}
                                  </p>
                                )}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-7 w-7 rounded-full border-white/10 bg-white/[0.04]"
                                      onClick={() =>
                                        updateQuantity(
                                          item.id,
                                          item.quantity - 1,
                                        )
                                      }
                                    >
                                      <Minus className="h-3 w-3" />
                                    </Button>
                                    <span className="w-8 text-center">
                                      {item.quantity}
                                    </span>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-7 w-7 rounded-full border-white/10 bg-white/[0.04]"
                                      onClick={() =>
                                        updateQuantity(
                                          item.id,
                                          item.quantity + 1,
                                        )
                                      }
                                    >
                                      <Plus className="h-3 w-3" />
                                    </Button>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => startEditingNotes(item)}
                                    className="h-7 px-2"
                                  >
                                    <Edit className="mr-1 h-3 w-3" /> Obs
                                  </Button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="mt-4 border-t border-white/10 pt-4">
                    <div className="mb-4 flex justify-between text-lg font-medium">
                      <span>Total:</span>
                      <span>R$ {totalPrice.toFixed(2)}</span>
                    </div>
                    <DialogFooter className="flex-col gap-2 sm:flex-col">
                      <Button
                        onClick={handleCheckout}
                        className="w-full rounded-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Enviando pedido..." : "Enviar pedido"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => clearCart()}
                        className="w-full rounded-full border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
                      >
                        Limpar Carrinho
                      </Button>
                    </DialogFooter>
                  </div>
                </>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CartModal;
