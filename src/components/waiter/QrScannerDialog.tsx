import React, { useEffect, useMemo, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import type { IScannerControls } from "@zxing/browser";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { decodeOrderApprovalQr, type OrderQrPayload } from "@/lib/order-qr";

type QrScannerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApproveOrder: (payload: OrderQrPayload) => void;
  onError?: (message: string) => void;
};

const QrScannerDialog = ({
  open,
  onOpenChange,
  onApproveOrder,
  onError,
}: QrScannerDialogProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const [status, setStatus] = useState<
    "idle" | "starting" | "scanning" | "approved" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const reader = useMemo(() => new BrowserMultiFormatReader(), []);

  useEffect(() => {
    if (!open) return;
    let stopped = false;

    async function start() {
      try {
        setStatus("starting");
        setErrorMessage(null);
        const video = videoRef.current;
        if (!video) return;

        const devices = await BrowserMultiFormatReader.listVideoInputDevices();
        const deviceId = devices?.[0]?.deviceId;

        setStatus("scanning");
        const controls = await reader.decodeFromVideoDevice(
          deviceId,
          video,
          (result, err) => {
            if (stopped) return;
            if (result) {
              const raw = result.getText();
              const payload = decodeOrderApprovalQr(raw);
              if (!payload) {
                setStatus("error");
                setErrorMessage("QR inválido. Tente novamente.");
                onError?.("QR inválido. Tente novamente.");
                return;
              }
              setStatus("approved");
            onApproveOrder(payload);
              onOpenChange(false);
            }
            if (err) {
              // ignore frame errors
            }
          },
        );
        controlsRef.current = controls;
      } catch (e) {
        const message =
          e instanceof Error ? e.message : "Não foi possível abrir a câmera.";
        setStatus("error");
        setErrorMessage(message);
        onError?.(message);
      }
    }

    start();
    return () => {
      stopped = true;
      controlsRef.current?.stop();
      controlsRef.current = null;
      setStatus("idle");
      setErrorMessage(null);
    };
  }, [open, onError, onApproveOrder, onOpenChange, reader]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Escanear QR do Pedido</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border/70 bg-black overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-[320px] object-cover"
              muted
              playsInline
            />
          </div>

          <div className="text-sm text-muted-foreground">
            {status === "starting" && "Abrindo câmera..."}
            {status === "scanning" && "Aponte para o QR Code do cliente."}
            {status === "error" && (errorMessage || "Erro ao escanear.")}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QrScannerDialog;

