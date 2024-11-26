import React from 'react';
import { BookOpen, Users, LayoutGrid, ArrowUpRight } from 'lucide-react';
import type { Book, User } from '../types';

interface DashboardProps {
  books: Book[];
  users: User[];
}

export default function Dashboard({ books, users }: DashboardProps) {
  const stats = [
    {
      icon: <BookOpen className="text-indigo-600" size={24} />,
      label: 'Total Books',
      value: books.length,
      detail: `${books.filter((b) => b.available).length} Available`,
    },
    {
      icon: <Users className="text-green-600" size={24} />,
      label: 'Active Users',
      value: users.length,
      detail: `${users.filter((u) => u.borrowedBooks.length > 0).length} Borrowing`,
    },
    {
      icon: <LayoutGrid className="text-purple-600" size={24} />,
      label: 'Categories',
      value: new Set(books.map((b) => b.category)).size,
      detail: 'Unique Categories',
    },
  ];

  const recentBooks = books.slice(-5);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-50 rounded-lg">{stat.icon}</div>
              <ArrowUpRight className="text-gray-400" size={20} />
            </div>
            <p className="text-gray-600 text-sm">{stat.label}</p>
            <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
            <p className="text-gray-500 text-sm">{stat.detail}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-4">Recently Added Books</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="pb-3 text-gray-600">Title</th>
                <th className="pb-3 text-gray-600">Author</th>
                <th className="pb-3 text-gray-600">Category</th>
                <th className="pb-3 text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBooks.map((book) => (
                <tr key={book.id} className="border-b border-gray-100">
                  <td className="py-3">{book.title}</td>
                  <td className="py-3 text-gray-600">{book.author}</td>
                  <td className="py-3">
                    <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                      {book.category}
                    </span>
                  </td>
                  <td className="py-3">
                    <span
                      className={`${
                        book.available
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      } text-xs px-2 py-1 rounded-full`}
                    >
                      {book.available ? 'Available' : 'Borrowed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}