
export interface Student {
  id: string;
  name: string;
  grade: string;
  shift: 'Manhã' | 'Tarde' | 'Noite';
  contacts: Contact[];
}

export interface Teacher {
  id: string;
  name: string;
  subjects: string[];
}

export interface Book {
  id: string;
  title: string;
  subject: string;
  grade: string;
}

export interface Class {
  id: string;
  dayOfWeek: string;
  time: string;
  subject: string;
  teacher: string;
  grade: string;
  book: string;
}

export interface Contact {
  id: string;
  studentId: string;
  name: string;
  phone: string;
  relationship: string;
}

export interface Notification {
  id: string;
  studentId: string;
  message: string;
  scheduledTime: string;
  sent: boolean;
}

// Mock data para inicializar o aplicativo
export const mockStudents: Student[] = [
  {
    id: 's1',
    name: 'Ana Silva',
    grade: '5º Ano',
    shift: 'Manhã',
    contacts: []
  },
  {
    id: 's2',
    name: 'Pedro Santos',
    grade: '6º Ano',
    shift: 'Tarde',
    contacts: []
  },
  {
    id: 's3',
    name: 'Carla Oliveira',
    grade: '7º Ano',
    shift: 'Manhã',
    contacts: []
  }
];

export const mockTeachers: Teacher[] = [
  {
    id: 't1',
    name: 'Roberto Almeida',
    subjects: ['Matemática', 'Física']
  },
  {
    id: 't2',
    name: 'Juliana Costa',
    subjects: ['Português', 'Literatura']
  },
  {
    id: 't3',
    name: 'Marcos Pereira',
    subjects: ['História', 'Geografia']
  }
];

export const mockBooks: Book[] = [
  {
    id: 'b1',
    title: 'Matemática Fundamental',
    subject: 'Matemática',
    grade: '5º Ano',
  },
  {
    id: 'b2',
    title: 'Português e Interpretação',
    subject: 'Português',
    grade: '5º Ano',
  },
  {
    id: 'b3',
    title: 'História do Brasil',
    subject: 'História',
    grade: '5º Ano',
  }
];

export const mockClasses: Class[] = [
  {
    id: 'c1',
    dayOfWeek: 'Segunda-feira',
    time: '08:00',
    subject: 'Matemática',
    teacher: 'Roberto Almeida',
    grade: '5º Ano',
    book: 'Matemática Fundamental'
  },
  {
    id: 'c2',
    dayOfWeek: 'Segunda-feira',
    time: '10:00',
    subject: 'Português',
    teacher: 'Juliana Costa',
    grade: '5º Ano',
    book: 'Português e Interpretação'
  },
  {
    id: 'c3',
    dayOfWeek: 'Terça-feira',
    time: '08:00',
    subject: 'História',
    teacher: 'Marcos Pereira',
    grade: '5º Ano',
    book: 'História do Brasil'
  }
];

export const mockContacts: Contact[] = [
  {
    id: 'co1',
    studentId: 's1',
    name: 'Maria Silva',
    phone: '(85) 99999-1111',
    relationship: 'Mãe'
  },
  {
    id: 'co2',
    studentId: 's2',
    name: 'João Santos',
    phone: '(85) 99999-2222',
    relationship: 'Pai'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    studentId: 's1',
    message: 'Lembre de levar o livro Matemática Fundamental para aula de hoje às 08:00',
    scheduledTime: '07:30',
    sent: true
  },
  {
    id: 'n2',
    studentId: 's1',
    message: 'Lembre de levar o livro Português e Interpretação para aula de hoje às 10:00',
    scheduledTime: '09:30',
    sent: false
  }
];
