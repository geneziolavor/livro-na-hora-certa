
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Bell, BookOpen, Menu } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "Livro na Hora Certa" }) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center bg-white shadow-md">
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <SidebarTrigger>
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SidebarTrigger>
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-school-600" />
            <span className="font-medium text-xl text-school-800">
              {title}
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/notificacoes">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notificações</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
