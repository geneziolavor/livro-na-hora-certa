
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  User, 
  Calendar, 
  BookOpen as Book,
  MessageSquare,
  Bell
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const menuItems = [
    {
      title: "Início",
      url: "/",
      icon: BookOpen,
    },
    {
      title: "Alunos",
      url: "/alunos",
      icon: User,
    },
    {
      title: "Professores",
      url: "/professores",
      icon: User,
    },
    {
      title: "Horários",
      url: "/horarios",
      icon: Calendar,
    },
    {
      title: "Livros",
      url: "/livros",
      icon: Book,
    },
    {
      title: "Contatos",
      url: "/contatos",
      icon: MessageSquare,
    },
    {
      title: "Notificações",
      url: "/notificacoes",
      icon: Bell,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="flex h-16 items-center border-b px-4">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-school-600" />
          <span className="font-bold">Livro na Hora Certa</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <p className="text-xs text-muted-foreground">
          © 2025 Clube de Robótica Criativa
        </p>
        <p className="text-xs text-muted-foreground">
          Desenvolvido por Genezio de Lavor Oliveira
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
