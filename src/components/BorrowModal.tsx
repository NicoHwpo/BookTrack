import React, { useState } from 'react';
import { X } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import type { Book, User } from '../types';

interface BorrowModalProps {
  book: Book;
  users: User[];
  onSubmit: (bookId: string, userId: string, returnDate: Date) => void;
  onClose: () => void;
}

export default function BorrowModal({ book, users, onSubmit, onClose }: BorrowModalProps) {
  const [selectedUser, setSelectedUser] = useState('');
  const [returnDate, setReturnDate] = useState(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser && returnDate) {
      onSubmit(book.id, selectedUser, returnDate);
      onClose();
    }
  };

  const calculateCost = () => {
    const days = Math.ceil((returnDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return (days * (book.ratePerDay || 0)).toFixed(2);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Borrow Book</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select User
              </label>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                required
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Choose a user...</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName} {user.lastName} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Return Date
              </label>
              <DatePicker
                selected={returnDate}
                onChange={(date: Date) => setReturnDate(date)}
                minDate={new Date()}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Rate per day: ${book.ratePerDay}</p>
              <p className="text-sm font-semibold mt-2">
                Estimated cost: ${calculateCost()}
              </p>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Confirm Borrow
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}