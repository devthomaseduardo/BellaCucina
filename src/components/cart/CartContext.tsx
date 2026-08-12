import * as React from "react";
import { createContext, useContext } from "react";
import { supabase } from "@/lib/supabase";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  notes?: string;
  customerName?: string;
}

export interface Order {
  id: string;
  tableNumber: string;
  customerName: string;
  items: CartItem[];
  status: "pending" | "preparing" | "ready" | "delivered" | "cancelled";
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

interface CartContextType {
  items: CartItem[];
  addItem: (
    item: Omit<CartItem, "quantity">,
    quantity?: number,
    notes?: string,
    customerName?: string,
  ) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateNotes: (id: string, notes: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  tableNumber: string | null;
  setTableNumber: (tableNumber: string) => void;
  customerName: string | null;
  setCustomerName: (name: string) => void;
  showSuccessToast: boolean;
  setShowSuccessToast: (show: boolean) => void;
  successMessage: string;
  setSuccessMessage: (message: string) => void;
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "createdAt" | "updatedAt">) => Promise<string>;
  importOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order["status"]) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Generate a random ID for orders
const generateOrderId = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const hasSupabaseConfig = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY,
);

const isUuid = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

const readLocalStorage = (key: string) => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(key);
};

const readStoredCart = () => {
  const savedCart = readLocalStorage("cart");
  if (!savedCart) return [];

  try {
    return JSON.parse(savedCart) as CartItem[];
  } catch (error) {
    console.error("Failed to parse cart from localStorage", error);
    return [];
  }
};

const readStoredOrders = () => {
  const savedOrders = readLocalStorage("orders");
  if (!savedOrders) return [];

  try {
    return JSON.parse(savedOrders, (key, value) => {
      if (key === "createdAt" || key === "updatedAt") {
        return new Date(value);
      }
      return value;
    }) as Order[];
  } catch (error) {
    console.error("Failed to parse orders from localStorage", error);
    return [];
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = React.useState<CartItem[]>(readStoredCart);
  const [tableNumber, setTableNumber] = React.useState<string | null>(() =>
    readLocalStorage("tableNumber"),
  );
  const [customerName, setCustomerName] = React.useState<string | null>(() =>
    readLocalStorage("customerName"),
  );
  const [showSuccessToast, setShowSuccessToast] = React.useState<boolean>(false);
  const [successMessage, setSuccessMessage] = React.useState<string>("");
  const [orders, setOrders] = React.useState<Order[]>(readStoredOrders);

  // Save cart to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // Save orders to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // Save table number to localStorage whenever it changes
  React.useEffect(() => {
    if (tableNumber) {
      localStorage.setItem("tableNumber", tableNumber);
    }
  }, [tableNumber]);

  // Save customer name to localStorage whenever it changes
  React.useEffect(() => {
    if (customerName) {
      localStorage.setItem("customerName", customerName);
    }
  }, [customerName]);

  const addItem = (
    item: Omit<CartItem, "quantity">,
    quantity = 1,
    notes = "",
    itemCustomerName = "",
  ) => {
    setItems((prevItems) => {
      // Only merge if ID AND customerName are the same
      const existingItemIndex = prevItems.findIndex(
        (i) => i.id === item.id && (i.customerName || "") === (itemCustomerName || ""),
      );

      if (existingItemIndex >= 0) {
        // Item already exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
          notes: notes || updatedItems[existingItemIndex].notes,
        };
        setSuccessMessage(`${item.name} atualizado no carrinho!`);
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
        return updatedItems;
      } else {
        // Add new item
        setSuccessMessage(`${item.name} adicionado ao carrinho!`);
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
        return [
          ...prevItems,
          {
            ...item,
            quantity,
            notes,
            customerName: itemCustomerName || customerName || undefined,
          },
        ];
      }
    });
  };

  const removeItem = (id: string) => {
    const itemToRemove = items.find((item) => item.id === id);
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    if (itemToRemove) {
      setSuccessMessage(`${itemToRemove.name} removido do carrinho`);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const updateNotes = (id: string, notes: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, notes } : item)),
    );
    setSuccessMessage("Observações atualizadas");
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const clearCart = () => {
    setItems([]);
    setSuccessMessage("Carrinho esvaziado");
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const addOrder = async (
    orderData: Omit<Order, "id" | "createdAt" | "updatedAt">,
  ) => {
    const createLocalOrder = (id = generateOrderId()) => {
      const now = new Date();
      const fallbackOrder: Order = {
        ...orderData,
        id,
        createdAt: now,
        updatedAt: now,
      };
      setOrders((prevOrders) => [...prevOrders, fallbackOrder]);
      return fallbackOrder.id;
    };

    if (!hasSupabaseConfig) {
      return createLocalOrder();
    }

    try {
      const { data: orderResult, error: orderError } = await supabase
        .from('orders')
        .insert({
          table_number: orderData.tableNumber,
          customer_name: orderData.customerName,
          status: orderData.status,
          total_price: orderData.totalPrice
        })
        .select()
        .single();
      
      if (orderError) throw orderError;
      
      const orderId = orderResult.id;
      
      // Insert items
      const itemsToInsert = orderData.items.map(item => ({
        order_id: orderId,
        menu_item_id: isUuid(item.id) ? item.id : null,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image_url: item.image,
        category: item.category,
        notes: item.notes,
        customer_name: item.customerName
      }));
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(itemsToInsert);
        
      if (itemsError) console.error("Error inserting items:", itemsError);

      const now = new Date();
      const newOrder: Order = {
        ...orderData,
        id: orderId,
        createdAt: now,
        updatedAt: now,
      };

      setOrders((prevOrders) => [...prevOrders, newOrder]);
      return orderId;
    } catch (error) {
      console.error("Failed to add order", error);
      return createLocalOrder();
    }
  };

  const importOrder = (order: Order) => {
    setOrders((prevOrders) => {
      if (prevOrders.some((o) => o.id === order.id)) {
        return prevOrders.map((existing) =>
          existing.id === order.id ? order : existing,
        );
      }
      return [...prevOrders, order];
    });
  };

  const updateOrderStatus = async (orderId: string, status: Order["status"]) => {
    const updatedAt = new Date();

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? { ...order, status, updatedAt }
          : order,
      ),
    );

    if (!hasSupabaseConfig) {
      return;
    }

    try {
      await supabase
        .from('orders')
        .update({ status, updated_at: updatedAt.toISOString() })
        .eq('id', orderId);
    } catch (e) {
      console.error("Failed to update status", e);
    }
  };

  const totalItems = React.useMemo(() => 
    items.reduce((total, item) => total + item.quantity, 0),
  [items]);

  const totalPrice = React.useMemo(() => 
    items.reduce((total, item) => total + item.price * item.quantity, 0),
  [items]);

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    updateNotes,
    clearCart,
    totalItems,
    totalPrice,
    tableNumber,
    setTableNumber,
    customerName,
    setCustomerName,
    showSuccessToast,
    setShowSuccessToast,
    successMessage,
    setSuccessMessage,
    orders,
    addOrder,
    importOrder,
    updateOrderStatus,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
