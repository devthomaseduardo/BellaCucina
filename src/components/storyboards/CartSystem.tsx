import React from "react";
import { CartProvider } from "../cart/CartContext";
import CartButton from "../cart/CartButton";
import MenuItem from "../menu/MenuItem";
import WaiterButton from "../waiter/WaiterButton";

const CartSystemDemo = () => {
  const sampleItem = {
    id: "1",
    name: "Pizza Margherita",
    description:
      "Pizza clássica italiana com molho de tomate caseiro, queijo mussarela de búfala importada, manjericão fresco orgânico, sal marinho e azeite extra-virgem premium.",
    price: 39.9,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=75",
    category: "Pizza",
  };
   
  return (
    <CartProvider>
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Sistema de Pedidos
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Área do Cliente</h2>
            <p className="mb-4">
              Os clientes podem adicionar itens ao carrinho e visualizar seu
              pedido.
            </p>

            <div className="flex justify-center mb-6">
              <CartButton className="mx-auto" />
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-3">
                Exemplo de Item do Menu
              </h3>
              <MenuItem
                id={sampleItem.id}
                name={sampleItem.name}
                description={sampleItem.description}
                price={sampleItem.price}
                image={sampleItem.image}
                category={sampleItem.category}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Área do Garçom</h2>
            <p className="mb-4">
              Os garçons podem visualizar todos os pedidos, alterar status e
              editar itens.
            </p>

            <div className="flex justify-center mb-6">
              <WaiterButton className="mx-auto" />
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-3">Funcionalidades</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Visualização de todos os pedidos em tempo real</li>
                <li>
                  Filtros por status (pendente, preparando, pronto, entregue)
                </li>
                <li>Edição de quantidades e observações</li>
                <li>Atualização de status do pedido</li>
                <li>Busca por mesa ou itens</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
          <WaiterButton
            variant="secondary"
            className="rounded-full shadow-lg h-12 w-12 p-0"
            size="icon"
          />

          <CartButton
            variant="default"
            className="rounded-full shadow-lg h-12 w-12 p-0"
            size="icon"
          />
        </div>
      </div>
    </CartProvider>
  );
};

export default CartSystemDemo;
