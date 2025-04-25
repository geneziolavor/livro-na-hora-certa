
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Index from "./pages/Index";
import AlunosPage from "./pages/AlunosPage";
import ProfessoresPage from "./pages/ProfessoresPage";
import LivrosPage from "./pages/LivrosPage";
import HorariosPage from "./pages/HorariosPage";
import ContatosPage from "./pages/ContatosPage";
import NotificacoesPage from "./pages/NotificacoesPage";
import NotFound from "./pages/NotFound";
import AppSidebar from "./components/layout/AppSidebar";
import Header from "./components/layout/Header";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/alunos" element={<AlunosPage />} />
                  <Route path="/professores" element={<ProfessoresPage />} />
                  <Route path="/livros" element={<LivrosPage />} />
                  <Route path="/horarios" element={<HorariosPage />} />
                  <Route path="/contatos" element={<ContatosPage />} />
                  <Route path="/notificacoes" element={<NotificacoesPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
