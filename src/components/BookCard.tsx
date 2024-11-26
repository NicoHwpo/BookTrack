import React from 'react';
import { Book, CheckCircle, XCircle, Info } from 'lucide-react';
import { format } from 'date-fns';
import type { Book as BookType } from '../types';

interface BookCardProps {
  book: BookType;
  onBorrow?: () => void;
  onReturn?: () => void;
  onDetails?: () => void;
}

export default function BookCard({ book, onBorrow, onReturn, onDetails }: BookCardProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer"
      onClick={onDetails}
    >
      <img
        src={book.coverUrl}
        alt={book.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
            {book.category}
          </span>
          {book.available ? (
            <span className="flex items-center gap-1 text-green-600 text-sm">
              <CheckCircle size={16} /> Available
            </span>
          ) : (
            <span className="flex items-center gap-1 text-red-600 text-sm">
              <XCircle size={16} /> Borrowed
              {book.dueDate && ` (Due: ${format(book.dueDate, 'MMM d, yyyy')})`}
            </span>
          )}
        </div>
        {book.available ? (
          <button
            onClick={(e) => { e.stopPropagation(); onBorrow && onBorrow(); }}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            <Book size={18} />
            Borrow Book
          </button>
        ) : (
          book.borrowedBy && (
            <button
              onClick={(e) => { e.stopPropagation(); onReturn && onReturn(); }}
              className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
            >
              <Book size={18} />
              Return Book
            </button>
          )
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onDetails && onDetails(); }}
          className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Info size={18} />
          View Details
        </button>
      </div>
    </div>
  );
}