import React from 'react';
import BookCard from './BookCard';
import type { Book } from '../types';

interface BookListProps {
  books: Book[];
  onBorrow?: (book: Book) => void;
  onReturn?: (bookId: string) => void;
  onDetails?: (book: Book) => void;
}

export default function BookList({ books, onBorrow, onReturn, onDetails }: BookListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onBorrow={() => onBorrow && onBorrow(book)}
          onReturn={() => onReturn && onReturn(book.id)}
          onDetails={() => onDetails && onDetails(book)}
        />
      ))}
    </div>
  );
}