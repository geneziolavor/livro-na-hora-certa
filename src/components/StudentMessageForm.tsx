
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { MessageSquare } from 'lucide-react';

const StudentMessageForm = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast.error('A mensagem não pode estar vazia');
      return;
    }

    setIsLoading(true);
    
    try {
      // Pegar o usuário atual
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        toast.error('Você precisa estar logado para enviar mensagens');
        setIsLoading(false);
        return;
      }

      const { error } = await supabase
        .from('student_messages')
        .insert({ 
          message: message.trim(),
          status: 'pending',
          user_id: session.user.id
        });

      if (error) throw error;

      toast.success('Mensagem enviada com sucesso!');
      setMessage('');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao enviar mensagem');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <MessageSquare className="h-6 w-6 text-school-600 mr-2" />
          <h2 className="text-xl font-semibold text-school-800">
            Enviar Mensagem
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Digite sua mensagem para a escola"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[120px]"
            maxLength={500}
          />
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {message.length}/500 caracteres
            </p>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-school-600 hover:bg-school-700"
            >
              {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentMessageForm;
