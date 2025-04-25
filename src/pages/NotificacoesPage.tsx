
import React, { useState } from 'react';
import PageTitle from '@/components/layout/PageTitle';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocalStorage } from '@/utils/hooks/useLocalStorage';
import { mockClasses, mockStudents, mockContacts, Notification } from '@/utils/mockData';
import { toast } from '@/components/ui/sonner';
import { Bell, Plus } from 'lucide-react';
import { sendNotification } from '@/utils/notifications';
import { Badge } from '@/components/ui/badge';

const NotificacoesPage = () => {
  const [notifications, setNotifications] = useLocalStorage<Notification[]>('notificacoes', []);
  const [students] = useLocalStorage('alunos', mockStudents);
  const [classes] = useLocalStorage('horarios', mockClasses);
  const [contacts] = useLocalStorage('contatos', mockContacts);
  const [open, setOpen] = useState(false);
  
  // Form states
  const [studentId, setStudentId] = useState('');
  const [message, setMessage] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  
  // Para enviar notificação de teste
  const handleSendTestNotification = async () => {
    const success = await sendNotification(
      "Lembrete de Livro",
      "Não esqueça de levar seu livro para a aula de hoje!"
    );
    
    if (success) {
      toast.success("Notificação de teste enviada!");
    } else {
      toast.error("Erro ao enviar notificação de teste");
    }
  };
  
  const handleScheduleNotification = () => {
    if (!studentId || !message || !scheduledTime) {
      toast.error('Preencha todos os campos');
      return;
    }
    
    const newNotification: Notification = {
      id: `n${Date.now()}`,
      studentId,
      message,
      scheduledTime,
      sent: false
    };
    
    setNotifications([...notifications, newNotification]);
    toast.success('Notificação agendada com sucesso!');
    resetForm();
    setOpen(false);
  };
  
  const handleActivateAllNotifications = () => {
    // Em uma aplicação real, isto configuraria todas as notificações
    // automáticas para todos os alunos baseado nos horários de aula
    // Por enquanto, vamos apenas exibir um toast informativo
    
    toast.success('Todas as notificações de livros foram ativadas!', {
      description: 'Os alunos receberão lembretes 30 minutos antes de cada aula.'
    });
    
    const autoNotifications: Notification[] = [];
    
    // Para cada aula, criar 3 notificações para cada aluno da série
    classes.forEach(cls => {
      const classStudents = students.filter(s => s.grade === cls.grade);
      
      classStudents.forEach(student => {
        // Verificar se existe contato para o aluno
        const studentContacts = contacts.filter(c => c.studentId === student.id);
        if (studentContacts.length === 0) return;
        
        // Criar notificações para 30, 20 e 10 minutos antes da aula
        [30, 20, 10].forEach(minutes => {
          const hourMin = cls.time.split(':');
          const notificationDate = new Date();
          notificationDate.setHours(parseInt(hourMin[0]));
          notificationDate.setMinutes(parseInt(hourMin[1]) - minutes);
          
          const timeString = `${notificationDate.getHours().toString().padStart(2, '0')}:${
            notificationDate.getMinutes().toString().padStart(2, '0')}`;
          
          autoNotifications.push({
            id: `auto-${Date.now()}-${student.id}-${cls.id}-${minutes}`,
            studentId: student.id,
            message: `Lembre-se de levar o livro "${cls.book}" para a aula de ${cls.subject} às ${cls.time}`,
            scheduledTime: timeString,
            sent: false
          });
        });
      });
    });
    
    // Adicionar as notificações automáticas às existentes
    setNotifications([...notifications, ...autoNotifications]);
  };
  
  const resetForm = () => {
    setStudentId('');
    setMessage('');
    setScheduledTime('');
  };
  
  const getStudentName = (id: string) => {
    const student = students.find(s => s.id === id);
    return student ? student.name : 'Desconhecido';
  };
  
  const handleSendNow = async (notification: Notification) => {
    const success = await sendNotification(
      "Lembrete de Livro",
      notification.message
    );
    
    if (success) {
      // Atualizar o status da notificação para enviado
      const updatedNotifications = notifications.map(n => 
        n.id === notification.id ? { ...n, sent: true } : n
      );
      setNotifications(updatedNotifications);
    }
  };
  
  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <PageTitle 
          title="Notificações" 
          description="Configure e envie lembretes sobre os livros didáticos" 
        />
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleSendTestNotification}
          >
            Enviar Teste
          </Button>
          
          <Button
            variant="default"
            onClick={handleActivateAllNotifications}
          >
            <Bell className="mr-2 h-4 w-4" /> Ativar Lembretes Automáticos
          </Button>
        </div>
      </div>
      
      <div className="bg-muted/50 rounded-lg p-6 mb-8 border border-muted">
        <h2 className="text-lg font-medium mb-3">Como funcionam as notificações</h2>
        <p className="text-muted-foreground mb-4">
          O sistema envia automaticamente lembretes para os alunos e responsáveis 
          30 minutos antes de cada aula, informando qual livro didático deve ser
          levado para a escola conforme a grade horária.
        </p>
        <p className="text-muted-foreground">
          Para garantir que ninguém esqueça, o sistema envia três lembretes: 30 minutos,
          20 minutos e 10 minutos antes da aula, garantindo que o aluno seja lembrado
          com tempo suficiente para se preparar.
        </p>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Notificações Agendadas</h2>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Nova Notificação Manual
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agendar Notificação</DialogTitle>
              <DialogDescription>
                Agende uma notificação manual para um aluno específico.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="student" className="text-right">
                  Aluno
                </Label>
                <Select value={studentId} onValueChange={setStudentId}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o aluno" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map(student => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Horário
                </Label>
                <Input
                  id="time"
                  type="time"
                  className="col-span-3"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="message" className="text-right">
                  Mensagem
                </Label>
                <Textarea
                  id="message"
                  placeholder="Texto da notificação"
                  className="col-span-3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleScheduleNotification}>
                Agendar Notificação
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {notifications.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">Nenhuma notificação agendada</h3>
          <p className="text-muted-foreground mb-4">
            Clique em "Ativar Lembretes Automáticos" para configurar notificações baseadas nos horários de aula.
          </p>
        </div>
      ) : (
        <Table>
          <TableCaption>Lista de notificações agendadas</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Aluno</TableHead>
              <TableHead>Mensagem</TableHead>
              <TableHead>Horário</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell>{getStudentName(notification.studentId)}</TableCell>
                <TableCell className="max-w-md truncate">{notification.message}</TableCell>
                <TableCell>{notification.scheduledTime}</TableCell>
                <TableCell>
                  {notification.sent ? (
                    <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                      Enviado
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                      Pendente
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleSendNow(notification)}
                    disabled={notification.sent}
                  >
                    Enviar Agora
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default NotificacoesPage;
