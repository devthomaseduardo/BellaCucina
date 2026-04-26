import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowElegant } from "@/components/icons/fine-dining";

interface HeroSectionProps {
  backgroundImage?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  secondaryCtaText?: string;
  onCtaClick?: () => void;
  onSecondaryCtaClick?: () => void;
}

const HeroSection = ({
  backgroundImage = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
  eyebrow = "Fine dining",
  title = "Bem-vindo ao Nosso Restaurante",
  subtitle = "Experimente as melhores delícias culinárias com nosso cardápio cuidadosamente elaborado e serviço excepcional.",
  ctaText = "Ver Cardápio",
  secondaryCtaText = "Fazer Reserva",
  onCtaClick = () => {},
  onSecondaryCtaClick = () => {},
}: HeroSectionProps) => {
  return (
    <div className="relative h-[min(92vh,560px)] w-full min-h-[420px] bg-black md:h-[640px] md:min-h-0 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={backgroundImage}
          alt="Fundo do restaurante"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.14),transparent_45%)]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto flex h-full min-h-0 max-w-6xl flex-col justify-center px-4 pb-10 pt-[5.5rem] sm:px-6 sm:pt-24 md:px-8 md:pt-28 lg:pt-32">
        <div className="max-w-2xl min-w-0">
          <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-white/80 sm:text-[11px] sm:tracking-[0.28em]">
            {eyebrow}
          </p>
          <h1 className="mb-4 font-display text-[1.65rem] leading-[1.08] text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mb-8 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base md:text-lg">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={onCtaClick}
              className="bg-primary hover:bg-primary/90 text-white font-medium shadow-lg shadow-black/20"
            >
              {ctaText}
              <ArrowElegant className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onSecondaryCtaClick}
              className="border-white/70 bg-transparent text-white hover:bg-white/15 hover:text-white"
            >
              {secondaryCtaText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
