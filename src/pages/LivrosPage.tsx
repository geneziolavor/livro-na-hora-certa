
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
import { mockBooks, Book } from '@/utils/mockData';
import { toast } from '@/components/ui/sonner';
import { BookOpen, Plus } from 'lucide-react';

const LivrosPage = () => {
  const [books, setBooks] = useLocalStorage<Book[]>('livros', mockBooks);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  
  const handleAddBook = () => {
    if (!title || !subject || !grade) {
      toast.error('Preencha todos os campos');
      return;
    }
    
    const newBook: Book = {
      id: `b${Date.now()}`,
      title,
      subject,
      grade
    };
    
    setBooks([...books, newBook]);
    toast.success('Livro cadastrado com sucesso!');
    setTitle('');
    setSubject('');
    setGrade('');
    setOpen(false);
  };
  
  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <PageTitle 
          title="Cadastro de Livros" 
          description="Gerencie os livros didáticos utilizados nas disciplinas" 
        />
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Adicionar Livro
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Livro</DialogTitle>
              <DialogDescription>
                Cadastre um novo livro didático para usar no sistema.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Título
                </Label>
                <Input
                  id="title"
                  placeholder="Nome do livro"
                  className="col-span-3"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subject" className="text-right">
                  Disciplina
                </Label>
                <Input
                  id="subject"
                  placeholder="Ex: Matemática"
                  className="col-span-3"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
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
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddBook}>
                Cadastrar Livro
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {books.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">Nenhum livro cadastrado</h3>
          <p className="text-muted-foreground mb-4">
            Clique no botão "Adicionar Livro" para começar.
          </p>
        </div>
      ) : (
        <Table>
          <TableCaption>Lista de livros cadastrados</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Disciplina</TableHead>
              <TableHead>Série</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.subject}</TableCell>
                <TableCell>{book.grade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default LivrosPage;
