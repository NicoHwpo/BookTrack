import React from 'react';
import { X, Calendar, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import type { Book } from '../types';

interface BookDetailsProps {
  book: Book;
  onClose: () => void;
}

export default function BookDetails({ book, onClose }: BookDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Book Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">{book.title}</h3>
              <p className="text-gray-600">by {book.author}</p>
              
              <div className="flex items-center gap-2">
                <span className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
                  {book.category}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={20} />
                <span>
                  {book.available ? (
                    'Available Now'
                  ) : (
                    `Due: ${book.dueDate ? format(book.dueDate, 'MMM d, yyyy') : 'N/A'}`
                  )}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <DollarSign size={20} />
                <span>Rate: ${book.ratePerDay}/day</span>
              </div>

              <div className="pt-4">
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-gray-600">{book.description}</p>
              </div>

              <div className="pt-4">
                <h4 className="font-semibold mb-2">Additional Information</h4>
                <p className="text-gray-600">
                  Replacement Value: ${book.replacementValue}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}