import React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
  title?: string;
};

export const MonogramBC = ({ title = "Bella Cucina", ...props }: IconProps) => (
  <svg
    viewBox="0 0 64 64"
    width="24"
    height="24"
    role="img"
    aria-label={title}
    {...props}
  >
    <defs>
      <linearGradient id="bcGold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="hsl(var(--accent))" />
        <stop offset="55%" stopColor="hsl(var(--ring))" />
        <stop offset="100%" stopColor="hsl(var(--primary))" />
      </linearGradient>
    </defs>
    <circle
      cx="32"
      cy="32"
      r="28"
      fill="none"
      stroke="url(#bcGold)"
      strokeWidth="2"
      opacity="0.9"
    />
    <path
      d="M21 42V22h10.2c6.2 0 9.3 2.4 9.3 6.6c0 2.6-1.2 4.5-3.7 5.6c3.2.9 4.9 3 4.9 6.1c0 4.7-3.3 7.7-9.7 7.7H21Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path
      d="M43 44c-3.4 0-6.2-2.7-6.2-6.1s2.8-6.1 6.2-6.1c2 0 3.8.8 5 2.1"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

export const ClocheIcon = ({ title = "Concierge", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    role="img"
    aria-label={title}
    {...props}
  >
    <path
      d="M12 7a1 1 0 0 0 1-1V5.2a.8.8 0 0 0-.8-.8h-.4a.8.8 0 0 0-.8.8V6a1 1 0 0 0 1 1Z"
      fill="currentColor"
      opacity="0.9"
    />
    <path
      d="M4.5 16.3a7.5 7.5 0 0 1 15 0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M3.7 17.7h16.6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M6.2 12.2c1.8-1.6 3.8-2.4 5.8-2.4s4 .8 5.8 2.4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      opacity="0.7"
    />
  </svg>
);

export const ShoppingBagIcon = ({
  title = "Carrinho",
  ...props
}: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    role="img"
    aria-label={title}
    {...props}
  >
    <path
      d="M7.5 9.2a4.5 4.5 0 0 1 9 0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M6.2 9.2h11.6l-1 10.4a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8l-1-10.4Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M9 12.2v.6M15 12.2v.6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      opacity="0.75"
    />
  </svg>
);

export const ServiceBellIcon = ({
  title = "Garçom",
  ...props
}: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    role="img"
    aria-label={title}
    {...props}
  >
    <path
      d="M12 6.2a.9.9 0 0 0 .9-.9V4.6a.6.6 0 0 0-.6-.6h-.6a.6.6 0 0 0-.6.6v.7c0 .5.4.9.9.9Z"
      fill="currentColor"
      opacity="0.9"
    />
    <path
      d="M6.4 15.8c.6-4 2.9-6 5.6-6s5 2 5.6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M5 17.6h14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

export const ArrowElegant = ({
  title = "Ir",
  ...props
}: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    role="img"
    aria-label={title}
    {...props}
  >
    <path
      d="M5 12h12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M14 7l5 5-5 5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

