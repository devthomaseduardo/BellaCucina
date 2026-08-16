import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import AdminPage from "@/components/admin/AdminPage";
import Home from "./components/home";
import KitchenPage from "@/components/kitchen/KitchenPage";
import LanguageSelectPage from "@/components/landing/LanguageSelectPage";
import MenuPage from "@/components/menu/MenuPage";
import SalonPage from "@/components/salon/SalonPage";
import WaiterPage from "@/components/waiter/WaiterPage";

function App() {
  return (
    <Suspense
      fallback={
        <p className="p-6 text-center text-muted-foreground">Carregando…</p>
      }
    >
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<LanguageSelectPage />} />
          <Route path="/menu" element={<Home />} />
          <Route path="/cardapio" element={<MenuPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/garcom" element={<WaiterPage />} />
          <Route path="/cozinha" element={<KitchenPage />} />
          <Route path="/salao" element={<SalonPage />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
