
import React, { useState } from 'react';
import PageTitle from '@/components/layout/PageTitle';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
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
import { useLocalStorage } from '@/utils/hooks/useLocalStorage';
import { mockStudents, Student } from '@/utils/mockData';
import { toast } from '@/components/ui/sonner';
import { User, Plus } from 'lucide-react';

const AlunosPage = () => {
  const [students, setStudents] = useLocalStorage<Student[]>('alunos', mockStudents);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [shift, setShift] = useState<'Manhã' | 'Tarde' | 'Noite'>('Manhã');
  
  const handleAddStudent = () => {
    if (!name || !grade || !shift) {
      toast.error('Preencha todos os campos');
      return;
    }
    
    const newStudent: Student = {
      id: `s${Date.now()}`,
      name,
      grade,
      shift,
      contacts: []
    };
    
    setStudents([...students, newStudent]);
    toast.success('Aluno cadastrado com sucesso!');
    setName('');
    setGrade('');
    setShift('Manhã');
    setOpen(false);
  };
  
  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <PageTitle 
          title="Cadastro de Alunos" 
          description="Gerencie os alunos e suas informações" 
        />
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Adicionar Aluno
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Aluno</DialogTitle>
              <DialogDescription>
                Preencha os dados do aluno para cadastro no sistema.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  id="name"
                  placeholder="Nome completo"
                  className="col-span-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="grade" className="text-right">
                  Série
                </Label>
                <Input
                  id="grade"
                  placeholder="Ex: 5º Ano"
                  className="col-span-3"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="shift" className="text-right">
                  Turno
                </Label>
                <Select
                  value={shift}
                  onValueChange={(value) => setShift(value as 'Manhã' | 'Tarde' | 'Noite')}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o turno" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manhã">Manhã</SelectItem>
                    <SelectItem value="Tarde">Tarde</SelectItem>
                    <SelectItem value="Noite">Noite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddStudent}>
                Cadastrar Aluno
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {students.length === 0 ? (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">Nenhum aluno cadastrado</h3>
          <p className="text-muted-foreground mb-4">
            Clique no botão "Adicionar Aluno" para começar.
          </p>
        </div>
      ) : (
        <Table>
          <TableCaption>Lista de alunos cadastrados</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Série</TableHead>
              <TableHead>Turno</TableHead>
              <TableHead>Contatos</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.grade}</TableCell>
                <TableCell>{student.shift}</TableCell>
                <TableCell>{student.contacts.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AlunosPage;
