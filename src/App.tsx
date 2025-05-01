
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Index from "./pages/Index";
import AlunosPage from "./pages/AlunosPage";
import ProfessoresPage from "./pages/ProfessoresPage";
import LivrosPage from "./pages/LivrosPage";
import HorariosPage from "./pages/HorariosPage";
import ContatosPage from "./pages/ContatosPage";
import NotificacoesPage from "./pages/NotificacoesPage";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import AppSidebar from "./components/layout/AppSidebar";
import Header from "./components/layout/Header";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import MensagensPage from "./pages/MensagensPage";
import ManualPage from "./pages/ManualPage";

const queryClient = new QueryClient();

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              {session ? (
                <>
                  <AppSidebar />
                  <div className="flex flex-col flex-1">
                    <Header />
                    <main className="flex-1">
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/auth" element={<Navigate to="/" />} />
                        <Route path="/alunos" element={<AlunosPage />} />
                        <Route path="/professores" element={<ProfessoresPage />} />
                        <Route path="/livros" element={<LivrosPage />} />
                        <Route path="/horarios" element={<HorariosPage />} />
                        <Route path="/contatos" element={<ContatosPage />} />
                        <Route path="/notificacoes" element={<NotificacoesPage />} />
                        <Route path="/mensagens" element={<MensagensPage />} />
                        <Route path="/manual" element={<ManualPage />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                  </div>
                </>
              ) : (
                <Routes>
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="*" element={<Navigate to="/auth" />} />
                </Routes>
              )}
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
