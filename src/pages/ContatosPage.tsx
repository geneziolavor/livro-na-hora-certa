
import React, { useState } from 'react';
import PageTitle from '@/components/layout/PageTitle';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { mockContacts, mockStudents, Contact, Student } from '@/utils/mockData';
import { toast } from '@/components/ui/sonner';
import { MessageSquare, Plus } from 'lucide-react';

const ContatosPage = () => {
  const [contacts, setContacts] = useLocalStorage<Contact[]>('contatos', mockContacts);
  const [students] = useLocalStorage<Student[]>('alunos', mockStudents);
  const [open, setOpen] = useState(false);
  
  // Form states
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('');
  
  const relationships = ['Mãe', 'Pai', 'Responsável', 'Outro'];
  
  const handleAddContact = () => {
    if (!studentId || !name || !phone || !relationship) {
      toast.error('Preencha todos os campos');
      return;
    }
    
    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (!phoneRegex.test(phone)) {
      toast.error('Formato de telefone inválido. Use: (99) 99999-9999');
      return;
    }
    
    const newContact: Contact = {
      id: `co${Date.now()}`,
      studentId,
      name,
      phone,
      relationship
    };
    
    setContacts([...contacts, newContact]);
    
    // Atualiza o array de contatos do aluno
    const updatedStudents = students.map(student => {
      if (student.id === studentId) {
        return {
          ...student,
          contacts: [...student.contacts, newContact.id]
        };
      }
      return student;
    });
    
    localStorage.setItem('alunos', JSON.stringify(updatedStudents));
    
    toast.success('Contato cadastrado com sucesso!');
    resetForm();
    setOpen(false);
  };
  
  const resetForm = () => {
    setStudentId('');
    setName('');
    setPhone('');
    setRelationship('');
  };
  
  const formatPhone = (value: string) => {
    if (!value) return value;
    
    const phoneNumber = value.replace(/\D/g, '');
    const phoneNumberLength = phoneNumber.length;
    
    if (phoneNumberLength < 3) return phoneNumber;
    if (phoneNumberLength < 7) return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`;
  };
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhone(e.target.value);
    setPhone(formattedPhone);
  };
  
  const getStudentName = (id: string) => {
    const student = students.find(s => s.id === id);
    return student ? student.name : 'Desconhecido';
  };
  
  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <PageTitle 
          title="Cadastro de Contatos" 
          description="Gerencie os contatos para envio de notificações" 
        />
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Adicionar Contato
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Contato</DialogTitle>
              <DialogDescription>
                Cadastre um novo contato para envio de notificações.
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
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  id="name"
                  placeholder="Nome do contato"
                  className="col-span-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Telefone
                </Label>
                <Input
                  id="phone"
                  placeholder="(99) 99999-9999"
                  className="col-span-3"
                  value={phone}
                  onChange={handlePhoneChange}
                  maxLength={15}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="relationship" className="text-right">
                  Parentesco
                </Label>
                <Select value={relationship} onValueChange={setRelationship}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o parentesco" />
                  </SelectTrigger>
                  <SelectContent>
                    {relationships.map(rel => (
                      <SelectItem key={rel} value={rel}>{rel}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddContact}>
                Cadastrar Contato
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {contacts.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">Nenhum contato cadastrado</h3>
          <p className="text-muted-foreground mb-4">
            Clique no botão "Adicionar Contato" para começar.
          </p>
        </div>
      ) : (
        <Table>
          <TableCaption>Lista de contatos cadastrados</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Aluno</TableHead>
              <TableHead>Nome do Contato</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Parentesco</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{getStudentName(contact.studentId)}</TableCell>
                <TableCell className="font-medium">{contact.name}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.relationship}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ContatosPage;
