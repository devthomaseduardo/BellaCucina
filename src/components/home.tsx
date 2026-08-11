import React from "react";

import HeroSection from "./home/HeroSection";
import GalleryStrip from "./home/GalleryStrip";
import FeaturedItems from "./home/FeaturedItems";
import MenuSection from "./menu/MenuSection";
import ReservationSection from "./reservation/ReservationSection";
import Footer from "./layout/Footer";

import { CartProvider, useCart } from "./cart/CartContext";
import ToastSuccess from "./ui/toast-success";
import FloatingActions from "./layout/FloatingActions";
import { useI18n } from "@/i18n/I18nProvider";
import { StickySiteNav } from "@/components/layout/StickySiteNav";

const HomePageContent = () => {
  const restaurantName = "Bella Cucina";
  const { showSuccessToast, setShowSuccessToast, successMessage } = useCart();
  const { t } = useI18n();

  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-hidden bg-background">
      {showSuccessToast && (
        <ToastSuccess
          title={successMessage}
          onClose={() => setShowSuccessToast(false)}
        />
      )}

      <FloatingActions showWaiterAction={false} />
      <StickySiteNav />

      <main className="min-w-0 pt-0">
        <HeroSection
          eyebrow={t("hero.eyebrow")}
          title={t("hero.title")}
          subtitle={t("hero.subtitle")}
          backgroundImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=85"
          ctaText={t("hero.ctaMenu")}
          secondaryCtaText={t("hero.ctaReserve")}
          onCtaClick={() =>
            document
              .getElementById("menu")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          onSecondaryCtaClick={() =>
            document
              .getElementById("reservations")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        />

        <GalleryStrip />

        <FeaturedItems
          title={t("featured.title")}
          subtitle={t("featured.subtitle")}
        />

        <section id="menu">
          <MenuSection
            title={t("menu.sectionTitle")}
            description={t("menu.sectionDescription")}
            showQrCode={true}
          />
        </section>

        <ReservationSection
          restaurantName={restaurantName}
          restaurantImage="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80"
          title={t("reservation.sectionTitle")}
          description={t("reservation.sectionDescription")}
        />

        <section id="about" className="scroll-mt-24 bg-background py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                  {t("about.kicker")}
                </p>
                <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl md:text-5xl">
                  {t("about.title")}
                </h2>
                <p className="mt-5 leading-relaxed text-muted-foreground">
                  {t("about.p1")}
                </p>

                <div className="mt-8 border-y border-border/60">
                  <div className="grid sm:grid-cols-3">
                    <div className="py-4 sm:pr-4">
                      <p className="font-display text-lg text-foreground">
                        {t("about.card1Title")}
                      </p>
                    </div>
                    <div className="border-t border-border/60 py-4 sm:border-l sm:border-t-0 sm:px-4">
                      <p className="font-display text-lg text-foreground">
                        {t("about.card2Title")}
                      </p>
                    </div>
                    <div className="border-t border-border/60 py-4 sm:border-l sm:border-t-0 sm:pl-4">
                      <p className="font-display text-lg text-foreground">
                        {t("about.card3Title")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80"
                    alt=""
                    className="h-[320px] w-full object-cover sm:h-[420px]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <p className="max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">
                      {t("about.quote")}
                    </p>
                    <p className="mt-3 text-sm font-medium text-white">
                      {t("about.chef")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 bg-muted/20 py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                  {t("contact.kicker")}
                </p>
                <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl md:text-5xl">
                  {t("contact.visitTitle")}
                </h2>
                <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
                  {t("contact.intro")}
                </p>

                <div className="mt-8 space-y-5 text-sm">
                  <div>
                    <p className="font-medium text-foreground">
                      {t("contact.address")}
                    </p>
                    <p className="mt-1 text-muted-foreground">
                      Rua Principal, 123, Cidade, Estado 12345
                    </p>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <p className="font-medium text-foreground">
                        {t("contact.phone")}
                      </p>
                      <p className="mt-1 text-muted-foreground">(11) 1234-5678</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {t("contact.email")}
                      </p>
                      <p className="mt-1 text-muted-foreground">
                        contato@bellacucina.com
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {t("contact.hours")}
                    </p>
                    <p className="mt-1 text-muted-foreground">
                      Segunda a quinta, 11:00 às 22:00
                    </p>
                    <p className="text-muted-foreground">
                      Sexta e sábado, 11:00 às 23:00 · Domingo, 12:00 às 21:00
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm lg:col-span-7">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.1775656636577!2d-46.6585407!3d-23.5646162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzUyLjYiUyA0NsKwMzknMzAuNyJX!5e0!3m2!1spt-BR!2sbr!4v1620151913177!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  className="min-h-[360px] w-full sm:min-h-[430px]"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  title="Mapa do restaurante"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer
        restaurantName={restaurantName}
        address="Rua Principal, 123, Cidade, Estado 12345"
        phone="(11) 1234-5678"
        email="contato@bellacucina.com"
      />
    </div>
  );
};

const HomePage = () => {
  return (
    <CartProvider>
      <HomePageContent />
    </CartProvider>
  );
};

export default HomePage;
