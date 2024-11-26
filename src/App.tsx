import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import BookDetails from './components/BookDetails';
import AddBookForm from './components/AddBookForm';
import CategoryView from './components/CategoryView';
import UserDetails from './components/UserDetails';
import AddUserForm from './components/AddUserForm';
import BorrowModal from './components/BorrowModal';
import type { Book, User, Category } from './types';
import BookList from './components/BookList';

// Sample data
const initialBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Classic Literature',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
    available: true,
    description: 'A novel that explores the decadence and idealism of the Jazz Age.',
    ratePerDay: 0.50,
    replacementValue: 15.99,
  },
  {
    id: '2',
    title: 'Dune',
    author: 'Frank Herbert',
    category: 'Science Fiction',
    coverUrl: 'https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?auto=format&fit=crop&q=80&w=800',
    available: false,
    borrowedBy: 'user1',
    dueDate: new Date('2024-04-01'),
    description: 'A complex epic of politics, religion, and planetary ecology.',
    ratePerDay: 0.75,
    replacementValue: 19.99,
  },
  {
    id: '3',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    category: 'Romance',
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800',
    available: true,
    description: 'A classic novel of manners exploring love, marriage, and social status.',
    ratePerDay: 0.60,
    replacementValue: 14.50,
  },
];

const initialUsers: User[] = [
  {
    id: 'user1',
    firstName: 'John',
    borrowedBooks: ['2'],
    lastName: 'Doe',
    email: 'jondoe@gmail.com',
    age: 0,
    amountOwed: 0
  },
  {
    id: 'user2',
    firstName: 'Jane',
    borrowedBooks: [],
    lastName: 'Smith',
    email: 'janesmith@gmail.com',
    age: 0,
    amountOwed: 0
  },
];

const initialCategories: Category[] = [
  { id: '1', name: 'Classic Literature' },
  { id: '2', name: 'Science Fiction' },
  { id: '3', name: 'Romance' },
  { id: '4', name: 'Mystery' },
  { id: '5', name: 'Fantasy' },
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [categories] = useState<Category[]>(initialCategories);
  
  // New state for modals and selected category/user
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  const [bookToBorrow, setBookToBorrow] = useState<Book | null>(null);

  const handleAddBook = (newBook: Book) => {
    setBooks([...books, newBook]);
  };

  const handleAddUser = (newUser: User) => {
    setUsers([...users, newUser]);
  };

  useEffect(() => {
    console.log('users:', users);
  }, [users]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const handleOpenBorrowModal = (book: Book) => {
    setBookToBorrow(book);
    setIsBorrowModalOpen(true);
  };

  const handleCloseBorrowModal = () => {
    setBookToBorrow(null);
    setIsBorrowModalOpen(false);
  };

  const handleBorrow = (bookId: string, userId: string, returnDate: Date) => {
    // Update the book's status
    setBooks(books.map(book => 
      book.id === bookId
        ? { ...book, available: false, borrowedBy: userId, dueDate: returnDate }
        : book
    ));
  
    // Update the user's borrowed books array
    setUsers(users.map(user => 
      user.id === userId
        ? { ...user, borrowedBooks: [...user.borrowedBooks, bookId] }
        : user
    ));
  
    handleCloseBorrowModal();
  };
  
  // Add this function to handle returns to also update user's borrowed books
  const handleReturn = (bookId: string) => {
    // Find the user who borrowed the book
    const book = books.find(b => b.id === bookId);
    if (book && book.borrowedBy) {
      // Update the user's borrowed books array
      setUsers(users.map(user => 
        user.id === book.borrowedBy
          ? { ...user, borrowedBooks: user.borrowedBooks.filter(id => id !== bookId) }
          : user
      ));
    }
  
    // Update the book's status
    setBooks(books.map(book => 
      book.id === bookId
        ? { ...book, available: true, borrowedBy: undefined, dueDate: undefined }
        : book
    ));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard books={books} users={users} />;
        case 'books':
          return (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Library Books</h2>
                <button 
                  onClick={() => setIsAddBookModalOpen(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Add New Book
                </button>
              </div>
              <BookList 
                books={books}
                onBorrow={handleOpenBorrowModal}
                onReturn={handleReturn}
                onDetails={(book) => setSelectedBook(book)}
              />
            </div>
          );      
      case 'categories':
        return selectedCategory ? (
          <CategoryView
            category={selectedCategory}
            books={books}
            onBorrow={handleOpenBorrowModal}
            onReturn={handleReturn}
            onBookClick={handleBookClick}
            onBack={handleBackToCategories}
          />
        ) : (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Book Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div 
                  key={category.id} 
                  className="bg-white rounded-lg shadow-md p-6 cursor-pointer"
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <h3 className="text-xl font-semibold mb-3">{category.name}</h3>
                  <p className="text-gray-600">
                    {books.filter((b) => b.category === category.name).length} books
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Library Users</h2>
              <button 
                onClick={() => setIsAddUserModalOpen(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add New User
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-md">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="p-4">Name</th>
                    <th className="p-4">Books Borrowed</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr 
                      key={user.id} 
                      className="border-b cursor-pointer"
                      onClick={() => handleUserClick(user)}
                    >
                      <td className="p-4">{user.firstName}</td>
                      <td className="p-4">{user.borrowedBooks.length}</td>
                      <td className="p-4">
                        <span
                          className={`${
                            user.borrowedBooks.length > 0
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          } text-xs px-2 py-1 rounded-full`}
                        >
                          {user.borrowedBooks.length > 0 ? 'Has Books' : 'Clear'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1">{renderContent()}</main>
      
      {/* Book Details Modal */}
      {selectedBook && (
        <BookDetails 
          book={selectedBook} 
          onClose={() => setSelectedBook(null)} 
        />
      )}

      {/* Add Book Modal */}
      {isAddBookModalOpen && (
        <AddBookForm 
          categories={categories}
          onSubmit={handleAddBook}
          onClose={() => setIsAddBookModalOpen(false)}
        />
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <UserDetails 
          user={selectedUser} 
          books={books}
          onClose={() => setSelectedUser(null)} 
        />
      )}

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <AddUserForm 
          onSubmit={handleAddUser}
          onClose={() => setIsAddUserModalOpen(false)}
        />
      )}

      {/* Borrow Modal */}
      {isBorrowModalOpen && bookToBorrow && (
        <BorrowModal 
          book={bookToBorrow}
          users={users}
          onSubmit={handleBorrow}
          onClose={handleCloseBorrowModal}
        />
      )}
    </div>
  );
}

export default App;