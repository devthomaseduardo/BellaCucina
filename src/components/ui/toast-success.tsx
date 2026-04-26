import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToastSuccessProps {
  title: string;
  description?: string;
  className?: string;
  onClose?: () => void;
}

const ToastSuccess = ({
  title,
  description,
  className,
  onClose,
}: ToastSuccessProps) => {
  return (
    <div
      className={cn(
        "fixed right-4 top-4 z-50 flex w-full max-w-md animate-in slide-in-from-top-full fade-in-20 items-start gap-4 rounded-lg border border-border bg-card p-6 text-card-foreground shadow-lg duration-200",
        className,
      )}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
        <Check className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-foreground">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="sr-only">Close</span>
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ToastSuccess;
