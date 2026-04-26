import React from "react";

import HeroSection from "./home/HeroSection";
import GalleryStrip from "./home/GalleryStrip";
import MenuExperiences from "./home/MenuExperiences";
import ChefBrigadeSection from "./home/ChefBrigadeSection";
import FeaturedItems from "./home/FeaturedItems";
import MenuSection from "./menu/MenuSection";
import ReservationSection from "./reservation/ReservationSection";
import Footer from "./layout/Footer";

import { CartProvider, useCart } from "./cart/CartContext";
import ToastSuccess from "./ui/toast-success";
import FloatingActions from "./layout/FloatingActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/i18n/I18nProvider";
import { StickySiteNav } from "@/components/layout/StickySiteNav";

const HomePageContent = () => {
  const restaurantName = "Bella Cucina";
  const { showSuccessToast, setShowSuccessToast, successMessage, setSuccessMessage } =
    useCart();
  const { t } = useI18n();

  return (
    <div className="bg-background min-h-screen w-full min-w-0 overflow-x-hidden">
      {/* Success Toast */}
      {showSuccessToast && (
        <ToastSuccess
          title={successMessage}
          onClose={() => setShowSuccessToast(false)}
        />
      )}

      <FloatingActions showWaiterAction={false} />

      <StickySiteNav />

      <main className="min-w-0 pt-0">
        {/* Hero Section */}
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

        <MenuExperiences />

        <ChefBrigadeSection />

        <FeaturedItems title={t("featured.title")} subtitle={t("featured.subtitle")} />

        {/* Menu Section */}
        <section id="menu">
          <MenuSection title={t("menu.sectionTitle")} description={t("menu.sectionDescription")} showQrCode={true} />
        </section>

        {/* Reservation Section */}
        <ReservationSection
          restaurantName={restaurantName}
          restaurantImage="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80"
          title={t("reservation.sectionTitle")}
          description={t("reservation.sectionDescription")}
        />

        {/* About Section */}
        <section id="about" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6">
                <p className="text-[11px] tracking-[0.28em] uppercase text-muted-foreground">
                  {t("about.kicker")}
                </p>
                <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl md:text-5xl">
                  {t("about.title")}
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                  <p>{t("about.p1")}</p>
                  <p>{t("about.p2")}</p>
                </div>

                <div className="mt-8 rounded-3xl border border-border/60 bg-card/70 backdrop-blur-md p-6">
                  <p className="text-sm text-muted-foreground">
                    {t("about.quote")}
                  </p>
                  <p className="mt-3 text-sm font-medium text-foreground">
                    {t("about.chef")}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm">
                    <img
                      src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80"
                      alt=""
                      className="h-56 w-full object-cover transition-transform duration-700 hover:scale-[1.06]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />
                  </div>
                  <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Ossobuco.jpg"
                      alt=""
                      className="h-56 w-full object-cover transition-transform duration-700 hover:scale-[1.06]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />
                  </div>
                  <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm col-span-2">
                    <img
                      src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1000&q=80"
                      alt=""
                      className="h-60 w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-black/0" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="inline-flex items-center rounded-full bg-black/35 px-3 py-2 text-xs text-white/95 backdrop-blur">
                        {t("about.mosaicCaption")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-full rounded-3xl border border-border/60 bg-card/70 backdrop-blur-md p-7 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-display text-2xl text-foreground mb-2">
                  {t("about.card1Title")}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("about.card1Body")}
                </p>
              </div>

              <div className="h-full rounded-3xl border border-border/60 bg-card/70 backdrop-blur-md p-7 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-display text-2xl text-foreground mb-2">
                  {t("about.card2Title")}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("about.card2Body")}
                </p>
              </div>

              <div className="h-full rounded-3xl border border-border/60 bg-card/70 backdrop-blur-md p-7 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-display text-2xl text-foreground mb-2">
                  {t("about.card3Title")}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("about.card3Body")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <p className="text-[11px] tracking-[0.28em] uppercase text-muted-foreground">
                {t("contact.kicker")}
              </p>
              <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl md:text-5xl">
                {t("contact.title")}
              </h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                {t("contact.intro")}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 rounded-3xl border border-border/60 bg-card/70 backdrop-blur-md p-7 shadow-sm">
                <h3 className="font-display text-2xl text-foreground mb-2">
                  {t("contact.formTitle")}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {t("contact.formHint")}
                </p>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setShowSuccessToast(true);
                    setSuccessMessage("Mensagem enviada com sucesso!");
                    setTimeout(() => setShowSuccessToast(false), 3000);
                    e.currentTarget.reset();
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("contact.name")}</Label>
                      <Input id="name" placeholder="Seu nome" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("contact.email")}</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Seu email"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t("contact.message")}</Label>
                    <Textarea
                      id="message"
                      placeholder="Sua mensagem"
                      required
                      rows={5}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button type="submit" className="w-full sm:w-auto">
                      {t("contact.send")}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full sm:w-auto"
                      onClick={() => {
                        window.location.href = "mailto:contato@bellacucina.com";
                      }}
                    >
                      {t("contact.preferEmail")}
                    </Button>
                  </div>
                </form>
              </div>

              <div className="lg:col-span-6 rounded-3xl border border-border/60 bg-card/70 backdrop-blur-md p-7 shadow-sm">
                <h3 className="font-display text-2xl text-foreground mb-2">
                  {t("contact.visitTitle")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-medium text-foreground">{t("contact.address")}</p>
                      <p className="text-muted-foreground">
                        Rua Principal, 123, Cidade, Estado 12345
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{t("contact.phone")}</p>
                      <p className="text-muted-foreground">(11) 1234-5678</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{t("contact.email")}</p>
                      <p className="text-muted-foreground">
                        contato@bellacucina.com
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {t("contact.hours")}
                      </p>
                      <p className="text-muted-foreground">
                        Segunda - Quinta: 11:00 - 22:00
                      </p>
                      <p className="text-muted-foreground">
                        Sexta - Sábado: 11:00 - 23:00
                      </p>
                      <p className="text-muted-foreground">
                        Domingo: 12:00 - 21:00
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-border/60 aspect-[4/3] md:aspect-auto md:min-h-[320px]">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.1775656636577!2d-46.6585407!3d-23.5646162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzUyLjYiUyA0NsKwMzknMzAuNyJX!5e0!3m2!1spt-BR!2sbr!4v1620151913177!5m2!1spt-BR!2sbr"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      title="Mapa do restaurante"
                    />
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-border/60 bg-muted/20 p-4 text-sm text-muted-foreground">
                  {t("contact.tip")}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
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
