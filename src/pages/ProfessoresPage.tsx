
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
import { useLocalStorage } from '@/utils/hooks/useLocalStorage';
import { mockTeachers, Teacher } from '@/utils/mockData';
import { toast } from '@/components/ui/sonner';
import { User, Plus } from 'lucide-react';

const ProfessoresPage = () => {
  const [teachers, setTeachers] = useLocalStorage<Teacher[]>('professores', mockTeachers);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [subjects, setSubjects] = useState('');
  
  const handleAddTeacher = () => {
    if (!name || !subjects) {
      toast.error('Preencha todos os campos');
      return;
    }
    
    const subjectsArray = subjects
      .split(',')
      .map(subject => subject.trim())
      .filter(subject => subject !== '');
    
    const newTeacher: Teacher = {
      id: `t${Date.now()}`,
      name,
      subjects: subjectsArray
    };
    
    setTeachers([...teachers, newTeacher]);
    toast.success('Professor cadastrado com sucesso!');
    setName('');
    setSubjects('');
    setOpen(false);
  };
  
  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <PageTitle 
          title="Cadastro de Professores" 
          description="Gerencie os professores e suas disciplinas" 
        />
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Adicionar Professor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Professor</DialogTitle>
              <DialogDescription>
                Preencha os dados do professor para cadastro no sistema.
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
                <Label htmlFor="subjects" className="text-right">
                  Disciplinas
                </Label>
                <Input
                  id="subjects"
                  placeholder="Ex: Matemática, Português, História"
                  className="col-span-3"
                  value={subjects}
                  onChange={(e) => setSubjects(e.target.value)}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddTeacher}>
                Cadastrar Professor
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {teachers.length === 0 ? (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">Nenhum professor cadastrado</h3>
          <p className="text-muted-foreground mb-4">
            Clique no botão "Adicionar Professor" para começar.
          </p>
        </div>
      ) : (
        <Table>
          <TableCaption>Lista de professores cadastrados</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Disciplinas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell className="font-medium">{teacher.name}</TableCell>
                <TableCell>{teacher.subjects.join(', ')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ProfessoresPage;
