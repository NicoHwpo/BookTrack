export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  coverUrl: string;
  available: boolean;
  description: string;
  ratePerDay: number;
  replacementValue: number;
  borrowedBy?: string;
  dueDate?: Date;
}

export interface Category {
  id: string;
  name: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  borrowedBooks: string[];
  amountOwed: number;
}