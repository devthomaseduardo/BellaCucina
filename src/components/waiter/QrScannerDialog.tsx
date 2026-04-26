import * as React from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { Camera, CameraOff } from "lucide-react";
import type { IScannerControls } from "@zxing/browser";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const controlsRef = React.useRef<IScannerControls | null>(null);
  const [status, setStatus] = React.useState<
    "idle" | "starting" | "scanning" | "approved" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const reader = React.useMemo(() => new BrowserMultiFormatReader(), []);

  React.useEffect(() => {
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
          <DialogDescription className="sr-only">
            Aponte sua câmera para o QR Code do pedido para aprovar a entrega.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative rounded-2xl border border-border/70 bg-black overflow-hidden aspect-video sm:h-[320px]">
            <video
              ref={videoRef}
              className={`w-full h-full object-cover transition-opacity duration-300 ${status === "scanning" ? "opacity-100" : "opacity-0"}`}
              muted
              playsInline
            />
            
            {(status === "starting" || status === "idle") && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/10 backdrop-blur-[2px] text-white space-y-4">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
                  <Camera className="absolute inset-0 m-auto h-6 w-6 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-medium">Iniciando Câmera</p>
                  <p className="text-sm text-white/60">Aguarde um momento...</p>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-destructive/10 backdrop-blur-[2px] text-white p-6 text-center">
                <CameraOff className="h-12 w-12 text-destructive mb-4" />
                <p className="text-lg font-medium text-destructive-foreground">Erro na Câmera</p>
                <p className="text-sm text-muted-foreground mt-2 max-w-[280px]">
                  {errorMessage || "Não foi possível acessar a câmera. Verifique as permissões."}
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-6 border-destructive/30 hover:bg-destructive/10"
                  onClick={() => window.location.reload()}
                >
                  Recarregar Página
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${status === "scanning" ? "bg-green-500 animate-pulse" : "bg-muted"}`} />
              {status === "scanning" ? "Câmera ativa: Aponte para o QR Code" : "Aguardando ativação..."}
            </div>
            <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QrScannerDialog;

