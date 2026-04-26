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
import { Minus, Plus, Trash2, X, Edit, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import QrCode from "@/components/ui/QrCode";
import { encodeOrderApprovalQr } from "@/lib/order-qr";

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

  const handleUpdateNotes = (id: string) => {
    updateNotes(id, itemNotes);
    setEditingItemId(null);
  };

  const startEditingNotes = (item: CartItem) => {
    setEditingItemId(item.id);
    setItemNotes(item.notes || "");
  };

  const handleSubmitOrder = () => {
    if (!localTableNumber) {
      setSuccessMessage(
        "Por favor, informe o número da mesa antes de finalizar o pedido.",
      );
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

    // Show success message
    setOrderSuccess(true);

    // Create a new order in the system
    const orderId = addOrder({
      tableNumber: localTableNumber,
      customerName: localCustomerName,
      items: items,
      status: "pending",
      totalPrice: totalPrice,
    });
    setCreatedOrderId(orderId);

    // Mantemos o carrinho aberto para exibir o QR do pedido ao garçom.
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] flex flex-col">
          {orderSuccess ? (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <svg
                  className="h-8 w-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Pedido pronto para aprovação
              </h2>
              <p className="text-muted-foreground mb-6">
                Mostre o QR Code abaixo para o garçom escanear e registrar no
                sistema.
              </p>

              {createdOrderId ? (
                <div className="flex flex-col items-center gap-4">
                  <QrCode
                    value={encodeOrderApprovalQr({
                      v: 2,
                      type: "order-approval",
                      order: {
                        id: createdOrderId,
                        tableNumber: localTableNumber,
                        customerName: localCustomerName,
                        items: items,
                        totalPrice: totalPrice,
                        createdAt: new Date().toISOString(),
                      },
                    })}
                    className="text-foreground"
                  />
                  <div className="bg-muted/40 border border-border/60 p-4 rounded-xl w-full max-w-[420px] text-left">
                    <p className="font-medium">Resumo</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Mesa: {localTableNumber}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Cliente: {localCustomerName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Total: R$ {totalPrice.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Itens: {items.length}
                    </p>
                  </div>

                  <div className="w-full max-w-[420px] flex flex-col sm:flex-row gap-2 justify-center">
                    <Button
                      className="w-full"
                      onClick={() => {
                        clearCart();
                        setOrderSuccess(false);
                        setCreatedOrderId(null);
                        onOpenChange(false);
                      }}
                    >
                      Fechar
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setSuccessMessage("QR Code pronto para o garçom.");
                        setShowSuccessToast(true);
                        setTimeout(() => setShowSuccessToast(false), 2500);
                      }}
                    >
                      Enviar confirmação
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  Gerando QR Code...
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
                  <p className="text-muted-foreground mb-4">
                    Seu carrinho está vazio.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    className="mt-2"
                  >
                    Continuar Comprando
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                        className="mt-1"
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
                          className="pl-9"
                        />
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  <ScrollArea className="flex-1 pr-4 max-h-[40vh]">
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex border-b pb-4">
                          <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
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
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-sm text-muted-foreground">
                                R$ {item.price.toFixed(2)}
                              </p>
                              {item.customerName && (
                                <span className="text-[10px] bg-primary/5 text-primary px-1.5 py-0.5 rounded-md border border-primary/10 font-medium">
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
                                  className="text-sm h-20"
                                />
                                <div className="flex justify-end mt-1 space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setEditingItemId(null)}
                                  >
                                    <X className="h-4 w-4 mr-1" /> Cancelar
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
                                  <p className="text-xs italic text-muted-foreground mb-2">
                                    Obs: {item.notes}
                                  </p>
                                )}
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center space-x-2">
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-7 w-7"
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
                                      className="h-7 w-7"
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
                                    <Edit className="h-3 w-3 mr-1" /> Obs
                                  </Button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="pt-4 border-t mt-4">
                    <div className="flex justify-between font-medium text-lg mb-4">
                      <span>Total:</span>
                      <span>R$ {totalPrice.toFixed(2)}</span>
                    </div>
                    <DialogFooter className="flex-col sm:flex-col gap-2">
                      <Button
                        onClick={handleSubmitOrder}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        Finalizar Pedido
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => clearCart()}
                        className="w-full"
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
