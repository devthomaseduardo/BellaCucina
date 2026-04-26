import React from "react";
import WaiterPanel from "@/components/waiter/WaiterPanel";

const WaiterPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Página dedicada do garçom (sessão separada via rota) */}
      <WaiterPanel open={true} onOpenChange={() => {}} />
    </div>
  );
};

export default WaiterPage;

