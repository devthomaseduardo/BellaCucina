import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import WaiterPage from "@/components/waiter/WaiterPage";
import LanguageSelectPage from "@/components/landing/LanguageSelectPage";

function App() {
  return (
    <Suspense fallback={<p className="p-6 text-center text-muted-foreground">Carregando…</p>}>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<LanguageSelectPage />} />
          <Route path="/menu" element={<Home />} />
          <Route path="/garcom" element={<WaiterPage />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
