
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import PageTitle from '@/components/layout/PageTitle';
import { BookOpen, User, Calendar, Book, Bell, MessageSquare } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  const menuItems = [
    {
      title: "Alunos",
      description: "Cadastro e gerenciamento de alunos",
      icon: <User className="h-10 w-10 text-school-600" />,
      path: "/alunos"
    },
    {
      title: "Professores",
      description: "Cadastro e gerenciamento de professores",
      icon: <User className="h-10 w-10 text-book-600" />,
      path: "/professores"
    },
    {
      title: "Horários",
      description: "Programação de aulas por turma",
      icon: <Calendar className="h-10 w-10 text-school-600" />,
      path: "/horarios"
    },
    {
      title: "Livros",
      description: "Cadastro dos livros didáticos",
      icon: <Book className="h-10 w-10 text-book-600" />,
      path: "/livros"
    },
    {
      title: "Contatos",
      description: "Gerenciar contatos para notificações",
      icon: <MessageSquare className="h-10 w-10 text-school-600" />,
      path: "/contatos"
    },
    {
      title: "Notificações",
      description: "Configurar lembretes automáticos",
      icon: <Bell className="h-10 w-10 text-book-600" />,
      path: "/notificacoes"
    }
  ];

  return (
    <div className="container py-8 animate-fade-in">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-school-800 mb-2">
          Escola Professor Pedro Teixeira Barroso
        </h1>
        <div className="flex justify-center items-center mb-6">
          <BookOpen className="h-10 w-10 text-school-600 mr-2" />
          <h2 className="text-xl md:text-2xl font-semibold text-school-600">
            Livro na Hora Certa
          </h2>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Sistema de controle de livros didáticos para ajudar os alunos a nunca esquecerem o material necessário para cada aula.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <Card key={item.title} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-t-4 border-t-school-500">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-4">
                {item.icon}
                <CardTitle>{item.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">{item.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => navigate(item.path)}
                variant="default"
              >
                Acessar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Desenvolvido por Genezio de Lavor Oliveira</p>
        <p>Clube de Robótica Criativa © 2025</p>
      </footer>
    </div>
  );
};

export default Index;
