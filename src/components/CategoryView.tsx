// import React from 'react';
// import BookCard from './BookCard';
// import type { Book } from '../types';

// interface CategoryViewProps {
//   category: string;
//   books: Book[];
//   onBorrow: (bookId: string) => void;
//   onReturn: (bookId: string) => void;
//   onBookClick: (book: Book) => void;
// }

// export default function CategoryView({
//   category,
//   books,
//   onBorrow,
//   onReturn,
//   onBookClick,
// }: CategoryViewProps) {
//   const categoryBooks = books.filter((book) => book.category === category);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">{category}</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {categoryBooks.map((book) => (
//           <BookCard
//             key={book.id}
//             book={book}
//             onBorrow={() => onBorrow(book.id)}
//             onReturn={() => onReturn(book.id)}
//             onClick={() => onBookClick(book)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
import React from 'react';
import BookCard from './BookCard';
import type { Book } from '../types';

interface CategoryViewProps {
  category: string;
  books: Book[];
  onBorrow: (bookId: string) => void;
  onReturn: (bookId: string) => void;
  onBookClick: (book: Book) => void;
  onBack: () => void;
}

export default function CategoryView({
  category,
  books,
  onBorrow,
  onReturn,
  onBookClick,
  onBack,
}: CategoryViewProps) {
  const categoryBooks = books.filter((book) => book.category === category);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{category}</h2>
        <button 
          onClick={onBack}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Back to Categories
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onBorrow={() => onBorrow(book.id)}
            onReturn={() => onReturn(book.id)}
            onDetails={() => onBookClick(book)}
          />
        ))}
      </div>
    </div>
  );
}