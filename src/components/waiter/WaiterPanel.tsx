  import React, { useState, useEffect } from "react";
  import {
    AlertTriangle,
    Trash2,
    Edit,
    ChefHat,
    Coffee,
    Clock,
    Check,
    Plus,
  } from "lucide-react";
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Badge } from "@/components/ui/badge";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
  import { ScrollArea } from "@/components/ui/scroll-area";

  import { useCart, Order } from "../cart/CartContext";
  import QrScannerDialog from "./QrScannerDialog";

  interface WaiterPanelProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }

  const WaiterPanel: React.FC<WaiterPanelProps> = ({ open, onOpenChange }) => {
    const {
      orders,
      importOrder,
      updateOrderStatus,
      setShowSuccessToast,
      setSuccessMessage,
    } = useCart();
    const [activeTab, setActiveTab] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [editingOrder, setEditingOrder] = useState<Order | null>(null);
    const [scannerOpen, setScannerOpen] = useState(false);

    // Add some mock orders if there are none in the system
    useEffect(() => {
      if (orders.length === 0) {
        // Mock data will be added through the cart system now
      }
    }, [orders]);

    const filteredOrders = orders.filter((order) => {
      // Filter by tab
      if (activeTab !== "all" && order.status !== activeTab) {
        return false;
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          order.tableNumber.toLowerCase().includes(query) ||
          order.id.toLowerCase().includes(query) ||
          order.items.some((item) => item.name.toLowerCase().includes(query))
        );
      }

      return true;
    });

    const getStatusBadge = (status: Order["status"]) => {
      switch (status) {
        case "pending":
          return (
            <Badge
              variant="outline"
              className="bg-yellow-100 text-yellow-800 border-yellow-300"
            >
              <Clock className="h-3 w-3 mr-1" /> Pendente
            </Badge>
          );
        case "preparing":
          return (
            <Badge
              variant="outline"
              className="bg-blue-100 text-blue-800 border-blue-300"
            >
              <ChefHat className="h-3 w-3 mr-1" /> Preparando
            </Badge>
          );
        case "ready":
          return (
            <Badge
              variant="outline"
              className="bg-green-100 text-green-800 border-green-300"
            >
              <Check className="h-3 w-3 mr-1" /> Pronto
            </Badge>
          );
        case "delivered":
          return (
            <Badge
              variant="outline"
              className="bg-gray-100 text-gray-800 border-gray-300"
            >
              <Coffee className="h-3 w-3 mr-1" /> Entregue
            </Badge>
          );
        case "cancelled":
          return (
            <Badge
              variant="outline"
              className="bg-red-100 text-red-800 border-red-300"
            >
              <AlertTriangle className="h-3 w-3 mr-1" /> Cancelado
            </Badge>
          );
        default:
          return <Badge>{status}</Badge>;
      }
    };

    const formatTime = (date: Date) => {
      return date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const handleEditOrder = (order: Order) => {
      setEditingOrder({ ...order });
    };

    const handleSaveEdit = () => {
      if (!editingOrder) return;

      // Use the updateOrderStatus function from context instead of directly modifying orders
      if (editingOrder) {
        updateOrderStatus(editingOrder.id, editingOrder.status);
      }

      setEditingOrder(null);
    };

    const handleUpdateItemQuantity = (itemId: string, newQuantity: number) => {
      if (!editingOrder) return;

      if (newQuantity <= 0) {
        // Remove item if quantity is 0 or less
        setEditingOrder({
          ...editingOrder,
          items: editingOrder.items.filter((item) => item.id !== itemId),
          totalPrice: editingOrder.items
            .filter((item) => item.id !== itemId)
            .reduce((total, item) => total + item.price * item.quantity, 0),
        });
      } else {
        // Update quantity
        const updatedItems = editingOrder.items.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item,
        );

        setEditingOrder({
          ...editingOrder,
          items: updatedItems,
          totalPrice: updatedItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0,
          ),
        });
      }
    };

    const handleUpdateItemNotes = (itemId: string, notes: string) => {
      if (!editingOrder) return;

      setEditingOrder({
        ...editingOrder,
        items: editingOrder.items.map((item) =>
          item.id === itemId ? { ...item, notes } : item,
        ),
      });
    };

    // Poll for new orders every 5 seconds
    useEffect(() => {
      if (open) {
        const interval = setInterval(() => {
          // This will cause a re-render with the latest orders from context
        }, 5000);

        return () => clearInterval(interval);
      }
    }, [open]);

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Painel do Garçom</DialogTitle>
          </DialogHeader>

          <div className="flex items-center space-x-4 mb-4">
            <Input
              placeholder="Buscar por mesa, pedido ou item..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button
              variant="outline"
              onClick={() => setScannerOpen(true)}
              className="whitespace-nowrap"
            >
              Escanear QR
            </Button>
          </div>

          <QrScannerDialog
            open={scannerOpen}
            onOpenChange={setScannerOpen}
            onApproveOrder={(payload) => {
              if (payload.v === 2) {
                importOrder({
                  id: payload.order.id,
                  tableNumber: payload.order.tableNumber,
                  customerName: payload.order.customerName,
                  items: payload.order.items,
                  status: "preparing",
                  totalPrice: payload.order.totalPrice,
                  createdAt: new Date(payload.order.createdAt),
                  updatedAt: new Date(),
                });
                setSuccessMessage(`Pedido #${payload.order.id} registrado!`);
                setShowSuccessToast(true);
                setTimeout(() => setShowSuccessToast(false), 2500);
                return;
              }

              // fallback antigo (v1)
              const exists = orders.some((o) => o.id === payload.orderId);
              if (!exists) {
                setSuccessMessage("Pedido não encontrado no sistema.");
                setShowSuccessToast(true);
                setTimeout(() => setShowSuccessToast(false), 2500);
                return;
              }
              updateOrderStatus(payload.orderId, "preparing");
              setSuccessMessage(`Pedido #${payload.orderId} aprovado!`);
              setShowSuccessToast(true);
              setTimeout(() => setShowSuccessToast(false), 2500);
            }}
            onError={(message) => {
              setSuccessMessage(message);
              setShowSuccessToast(true);
              setTimeout(() => setShowSuccessToast(false), 2500);
            }}
          />

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="pending">Pendentes</TabsTrigger>
              <TabsTrigger value="preparing">Preparando</TabsTrigger>
              <TabsTrigger value="ready">Prontos</TabsTrigger>
              <TabsTrigger value="delivered">Entregues</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <ScrollArea className="h-[400px] pr-4">
                {filteredOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Nenhum pedido encontrado.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredOrders.map((order) => (
                      <div
                        key={order.id}
                        className="border rounded-lg p-4 bg-white"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-semibold text-lg">
                                Mesa {order.tableNumber}
                              </h3>
                              <span className="mx-2 text-muted-foreground">
                                •
                              </span>
                              <span className="text-sm text-muted-foreground">
                                Pedido #{order.id}
                              </span>
                            </div>
                            <div className="flex items-center mt-1">
                              {getStatusBadge(order.status)}
                              <span className="ml-2 text-xs text-muted-foreground">
                                {formatTime(order.createdAt)}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditOrder(order)}
                            >
                              <Edit className="h-4 w-4 mr-1" /> Editar
                            </Button>
                          </div>
                        </div>

                        <div className="mt-3 space-y-2">
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex justify-between items-center text-sm"
                            >
                              <div className="flex-1">
                                <div className="flex items-center">
                                  <span className="font-medium">
                                    {item.quantity}x
                                  </span>
                                  <span className="ml-2">{item.name}</span>
                                </div>
                                {item.notes && (
                                  <p className="text-xs italic text-muted-foreground ml-6">
                                    Obs: {item.notes}
                                  </p>
                                )}
                              </div>
                              <span className="text-muted-foreground">
                                R$ {(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center mt-4 pt-3 border-t">
                          <span className="font-medium">
                            Total: R$ {order.totalPrice.toFixed(2)}
                          </span>
                          <div className="flex space-x-2">
                            {order.status === "pending" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-blue-300 text-blue-700 hover:bg-blue-50"
                                onClick={() =>
                                  updateOrderStatus(order.id, "preparing")
                                }
                              >
                                <ChefHat className="h-4 w-4 mr-1" /> Preparando
                              </Button>
                            )}
                            {order.status === "preparing" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-green-300 text-green-700 hover:bg-green-50"
                                onClick={() =>
                                  updateOrderStatus(order.id, "ready")
                                }
                              >
                                <Check className="h-4 w-4 mr-1" /> Pronto
                              </Button>
                            )}
                            {order.status === "ready" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                                onClick={() =>
                                  updateOrderStatus(order.id, "delivered")
                                }
                              >
                                <Coffee className="h-4 w-4 mr-1" /> Entregue
                              </Button>
                            )}
                            {(order.status === "pending" ||
                              order.status === "preparing") && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-300 text-red-700 hover:bg-red-50"
                                onClick={() =>
                                  updateOrderStatus(order.id, "cancelled")
                                }
                              >
                                <Trash2 className="h-4 w-4 mr-1" /> Cancelar
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>

          {/* Edit Order Dialog */}
          {editingOrder && (
            <Dialog
              open={!!editingOrder}
              onOpenChange={(open) => !open && setEditingOrder(null)}
            >
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>
                    Editar Pedido - Mesa {editingOrder.tableNumber}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 my-4">
                  {editingOrder.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-start border-b pb-3"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <div className="flex items-center mt-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              handleUpdateItemQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                          <span className="mx-2">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              handleUpdateItemQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Input
                          className="mt-2 text-sm"
                          placeholder="Observações"
                          value={item.notes || ""}
                          onChange={(e) =>
                            handleUpdateItemNotes(item.id, e.target.value)
                          }
                        />
                      </div>
                      <p className="text-muted-foreground">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="font-medium">Total:</span>
                  <span className="font-medium">
                    R$ {editingOrder.totalPrice.toFixed(2)}
                  </span>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setEditingOrder(null)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSaveEdit}>Salvar Alterações</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </DialogContent>
      </Dialog>
    );
  };

  export default WaiterPanel;
