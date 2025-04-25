
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
import { mockClasses, mockTeachers, mockBooks, Class } from '@/utils/mockData';
import { toast } from '@/components/ui/sonner';
import { Calendar, Plus } from 'lucide-react';

const HorariosPage = () => {
  const [classes, setClasses] = useLocalStorage<Class[]>('horarios', mockClasses);
  const [teachers] = useLocalStorage('professores', mockTeachers);
  const [books] = useLocalStorage('livros', mockBooks);
  const [open, setOpen] = useState(false);
  
  // Form states
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [time, setTime] = useState('');
  const [subject, setSubject] = useState('');
  const [teacher, setTeacher] = useState('');
  const [grade, setGrade] = useState('');
  const [book, setBook] = useState('');
  
  const weekDays = [
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira'
  ];
  
  const subjects = Array.from(new Set(teachers.flatMap(teacher => teacher.subjects)));
  
  const filteredTeachers = teachers.filter(t => 
    t.subjects.includes(subject)
  );
  
  const filteredBooks = books.filter(b => 
    b.subject === subject && b.grade === grade
  );
  
  const handleAddClass = () => {
    if (!dayOfWeek || !time || !subject || !teacher || !grade || !book) {
      toast.error('Preencha todos os campos');
      return;
    }
    
    const newClass: Class = {
      id: `c${Date.now()}`,
      dayOfWeek,
      time,
      subject,
      teacher,
      grade,
      book
    };
    
    setClasses([...classes, newClass]);
    toast.success('Horário cadastrado com sucesso!');
    resetForm();
    setOpen(false);
  };
  
  const resetForm = () => {
    setDayOfWeek('');
    setTime('');
    setSubject('');
    setTeacher('');
    setGrade('');
    setBook('');
  };
  
  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <PageTitle 
          title="Horários de Aulas" 
          description="Gerencie a programação de aulas por dia e horário" 
        />
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Adicionar Horário
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Novo Horário de Aula</DialogTitle>
              <DialogDescription>
                Adicione um horário de aula ao cronograma.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="day" className="text-right">
                  Dia
                </Label>
                <Select value={dayOfWeek} onValueChange={setDayOfWeek}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o dia" />
                  </SelectTrigger>
                  <SelectContent>
                    {weekDays.map(day => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
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
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
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
                <Label htmlFor="subject" className="text-right">
                  Disciplina
                </Label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione a disciplina" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map(sub => (
                      <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="teacher" className="text-right">
                  Professor
                </Label>
                <Select 
                  value={teacher} 
                  onValueChange={setTeacher}
                  disabled={!subject}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o professor" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredTeachers.map(t => (
                      <SelectItem key={t.id} value={t.name}>{t.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="book" className="text-right">
                  Livro
                </Label>
                <Select 
                  value={book} 
                  onValueChange={setBook}
                  disabled={!subject || !grade}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o livro" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredBooks.map(b => (
                      <SelectItem key={b.id} value={b.title}>{b.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddClass}>
                Adicionar Horário
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {classes.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">Nenhum horário cadastrado</h3>
          <p className="text-muted-foreground mb-4">
            Clique no botão "Adicionar Horário" para começar.
          </p>
        </div>
      ) : (
        <Table>
          <TableCaption>Horários de aulas cadastrados</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Dia</TableHead>
              <TableHead>Horário</TableHead>
              <TableHead>Série</TableHead>
              <TableHead>Disciplina</TableHead>
              <TableHead>Professor</TableHead>
              <TableHead>Livro</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classes.map((cls) => (
              <TableRow key={cls.id}>
                <TableCell>{cls.dayOfWeek}</TableCell>
                <TableCell>{cls.time}</TableCell>
                <TableCell>{cls.grade}</TableCell>
                <TableCell>{cls.subject}</TableCell>
                <TableCell>{cls.teacher}</TableCell>
                <TableCell>{cls.book}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default HorariosPage;
