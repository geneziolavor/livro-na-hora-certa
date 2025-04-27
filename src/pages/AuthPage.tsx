
import React, { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
              role: 'student' // Define o papel como aluno
            }
          }
        });

        if (error) throw error;
        toast.success('Cadastro realizado com sucesso! Verifique seu email.');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;
        toast.success('Login realizado com sucesso!');
        navigate('/');
      }
    } catch (error: any) {
      toast.error(error.message || 'Erro na autenticação');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <BookOpen className="h-12 w-12 text-school-600 mx-auto mb-2" />
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Livro na Hora Certa
          </h1>
          <p className="text-gray-600">
            {isSignup ? 'Crie sua conta de aluno' : 'Acesse sua conta de aluno'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {isSignup && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Digite seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={isSignup}
              />
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Digite seu e-mail escolar"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-school-600 hover:bg-school-700">
            {isSignup ? 'Criar Conta' : 'Entrar'}
          </Button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="text-school-600 hover:underline text-sm"
            >
              {isSignup 
                ? 'Já tem uma conta? Faça login' 
                : 'Não tem conta? Cadastre-se'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
