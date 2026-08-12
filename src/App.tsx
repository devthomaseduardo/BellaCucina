import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import WaiterPage from "@/components/waiter/WaiterPage";
import LanguageSelectPage from "@/components/landing/LanguageSelectPage";
import MenuPage from "@/components/menu/MenuPage";
import AdminPage from "@/components/admin/AdminPage";

function App() {
  return (
    <Suspense fallback={<p className="p-6 text-center text-muted-foreground">Carregando…</p>}>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<LanguageSelectPage />} />
          <Route path="/menu" element={<Home />} />
          <Route path="/cardapio" element={<MenuPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/garcom" element={<WaiterPage />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
