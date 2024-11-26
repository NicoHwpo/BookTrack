import React from 'react';
import { X, Book, Calendar, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import type { User, Book as BookType } from '../types';

interface UserDetailsProps {
  user: User;
  books: BookType[];
  onClose: () => void;
}

export default function UserDetails({ user, books, onClose }: UserDetailsProps) {
  const userBooks = books.filter((book) => user.borrowedBooks.includes(book.id));

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">User Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                <p className="text-gray-600">
                  Name: {user.firstName} {user.lastName}
                </p>
                <p className="text-gray-600">Email: {user.email}</p>
                <p className="text-gray-600">Age: {user.age}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Account Summary</h3>
                <div className="flex items-center gap-2 text-gray-600">
                  <Book size={20} />
                  <span>Books Borrowed: {userBooks.length}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mt-2">
                  <DollarSign size={20} />
                  <span>Amount Owed: ${user.amountOwed.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Borrowed Books</h3>
              <div className="space-y-4">
                {userBooks.map((book) => (
                  <div
                    key={book.id}
                    className="bg-gray-50 p-4 rounded-lg flex flex-col md:flex-row gap-4"
                  >
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-semibold">{book.title}</h4>
                      <p className="text-gray-600 text-sm">{book.author}</p>
                      <div className="flex items-center gap-2 mt-2 text-sm">
                        <Calendar size={16} />
                        <span>
                          Due: {book.dueDate ? format(book.dueDate, 'MMM d, yyyy') : 'N/A'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Rate: ${book.ratePerDay}/day
                      </p>
                    </div>
                  </div>
                ))}
                {userBooks.length === 0 && (
                  <p className="text-gray-600">No books currently borrowed.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}