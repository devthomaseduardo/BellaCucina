import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import MenuSection from "@/components/menu/MenuSection";
import { CartProvider } from "@/components/cart/CartContext";
import FloatingActions from "@/components/layout/FloatingActions";
import { StickySiteNav } from "@/components/layout/StickySiteNav";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const MenuPageContent = () => {
  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-hidden bg-background">
      <StickySiteNav />
      <FloatingActions showWaiterAction={false} />

      <main className="min-w-0 pt-20 md:pt-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Button
            asChild
            variant="outline"
            className="mb-6 rounded-full border-white/10 bg-white/[0.045]"
          >
            <Link to="/menu">
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden />
              Voltar para a experiência
            </Link>
          </Button>
        </div>

        <section id="menu" className="scroll-mt-24">
          <MenuSection />
        </section>
      </main>

      <Footer
        restaurantName="Bella Cucina"
        address="Rua Principal, 123, Cidade, Estado 12345"
        phone="(11) 1234-5678"
        email="contato@bellacucina.com"
      />
    </div>
  );
};

const MenuPage = () => {
  return (
    <CartProvider>
      <MenuPageContent />
    </CartProvider>
  );
};

export default MenuPage;
