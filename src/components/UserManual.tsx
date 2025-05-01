
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PageTitle from '@/components/layout/PageTitle';
import { BookOpen, MessageSquare, User, Bell, Calendar, Book } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const UserManual = () => {
  return (
    <div className="container py-6">
      <PageTitle 
        title="Manual do Usuário" 
        description="Guia completo de utilização do aplicativo Livro na Hora Certa"
      />
      
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-school-600" />
            <CardTitle>Bem-vindo ao Livro na Hora Certa</CardTitle>
          </div>
          <CardDescription>
            Este aplicativo foi desenvolvido para ajudar os alunos a nunca esquecerem o material necessário para cada aula.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            A Escola Professor Pedro Teixeira Barroso desenvolveu este aplicativo para facilitar a organização dos alunos
            quanto aos livros didáticos necessários para cada disciplina. Com esta ferramenta, você será notificado sobre quais
            livros trazer para cada dia de aula.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-medium">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-school-600" />
                Como criar uma conta e fazer login
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-base">
              <ol className="list-decimal pl-5 space-y-2">
                <li>Abra o aplicativo e clique em "Cadastre-se" na tela inicial</li>
                <li>Preencha seu nome completo, e-mail escolar e crie uma senha</li>
                <li>Clique em "Criar Conta" para registrar-se</li>
                <li>Para fazer login posteriormente, use seu e-mail e senha</li>
                <li>Caso esqueça sua senha, use a opção "Esqueci minha senha" na tela de login</li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-medium">
              <div className="flex items-center gap-2">
                <Book className="h-5 w-5 text-school-600" />
                Consultando livros e horários
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-base">
              <p className="mb-3">Para consultar os livros e horários:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Na página inicial, acesse a seção "Horários" para ver a programação de aulas</li>
                <li>Clique em "Livros" para ver a lista completa dos livros didáticos</li>
                <li>Os livros são organizados por disciplina e série</li>
                <li>Você receberá notificações sobre quais livros trazer em cada dia</li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-medium">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-school-600" />
                Notificações e lembretes
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-base">
              <p className="mb-3">Para gerenciar suas notificações:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Acesse a seção "Notificações" no menu principal</li>
                <li>O aplicativo enviará lembretes automáticos sobre os livros necessários</li>
                <li>Você será notificado na noite anterior sobre os livros do dia seguinte</li>
                <li>As notificações podem ser visualizadas clicando no ícone de sino no topo da tela</li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-medium">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-school-600" />
                Envio de mensagens para a escola
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-base">
              <p className="mb-3">Para enviar mensagens para a administração da escola:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Acesse a seção "Mensagens" no menu principal</li>
                <li>Digite sua mensagem no campo de texto (limite de 500 caracteres)</li>
                <li>Clique em "Enviar Mensagem"</li>
                <li>A escola responderá sua mensagem no menor prazo possível</li>
                <li>Você pode verificar o status das suas mensagens na mesma seção</li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg font-medium">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-school-600" />
                Sobre o aplicativo
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-base">
              <p className="mb-2">O aplicativo "Livro na Hora Certa" foi desenvolvido pelo Clube de Robótica Criativa da Escola Professor Pedro Teixeira Barroso.</p>
              <p>Versão: 1.0.0</p>
              <p>Desenvolvido por: Genezio de Lavor Oliveira</p>
              <p>Contato: clubederoboticacriativa@escola.edu.br</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default UserManual;
