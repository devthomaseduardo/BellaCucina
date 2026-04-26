import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { cn } from "@/lib/utils";

type QrCodeProps = {
  value: string;
  className?: string;
};

const QrCode = ({ value, className }: QrCodeProps) => {
  return (
    <div
      className={cn(
        "inline-flex rounded-2xl border border-border/70 bg-card p-3 shadow-sm",
        className,
      )}
    >
      <QRCodeSVG
        value={value}
        size={196}
        bgColor="transparent"
        fgColor="currentColor"
        level="M"
        includeMargin={true}
      />
    </div>
  );
};

export default QrCode;

