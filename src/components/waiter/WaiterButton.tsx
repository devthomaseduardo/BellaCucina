import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import WaiterPanel from "./WaiterPanel";
import { ServiceBellIcon } from "@/components/icons/fine-dining";

interface WaiterButtonProps {
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const WaiterButton: React.FC<WaiterButtonProps> = ({
  variant = "outline",
  size = "default",
  className = "",
}) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={() => setIsPanelOpen(true)}
        className={className}
        aria-label="Abrir painel do garçom"
      >
        <ServiceBellIcon className="h-5 w-5" />
      </Button>

      <WaiterPanel open={isPanelOpen} onOpenChange={setIsPanelOpen} />
    </>
  );
};

export default WaiterButton;
