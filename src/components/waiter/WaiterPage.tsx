import React, { useState } from "react";
import WaiterPanel from "@/components/waiter/WaiterPanel";
import WaiterLogin from "@/components/waiter/Login";

const WaiterPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {!isAuthenticated ? (
        <WaiterLogin onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <WaiterPanel open={true} onOpenChange={() => {}} />
      )}
    </div>
  );
};

export default WaiterPage;
