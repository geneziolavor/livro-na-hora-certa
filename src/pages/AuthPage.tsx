
import React, { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from 'react-router-dom';

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
              full_name: name
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignup ? 'Cadastro' : 'Login'}
        </h2>
        <form onSubmit={handleAuth} className="space-y-4">
          {isSignup && (
            <Input
              type="text"
              placeholder="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={isSignup}
            />
          )}
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            {isSignup ? 'Cadastrar' : 'Entrar'}
          </Button>
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="text-blue-500 hover:underline"
            >
              {isSignup 
                ? 'Já tem conta? Faça login' 
                : 'Não tem conta? Cadastre-se'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
