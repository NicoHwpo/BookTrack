import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Category } from '../types';

const sampleCovers = [
  'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800',
];

interface AddBookFormProps {
  categories: Category[];
  onSubmit: (bookData: any) => void;
  onClose: () => void;
}

export default function AddBookForm({ categories, onSubmit, onClose }: AddBookFormProps) {
  const [selectedCover, setSelectedCover] = useState(sampleCovers[0]);
  const [customCover, setCustomCover] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const bookData = {
      id: Date.now().toString(),
      title: formData.get('title'),
      author: formData.get('author'),
      category: formData.get('category'),
      description: formData.get('description'),
      ratePerDay: Number(formData.get('ratePerDay')),
      replacementValue: Number(formData.get('replacementValue')),
      coverUrl: customCover ? URL.createObjectURL(customCover) : selectedCover,
      available: true,
    };
    onSubmit(bookData);
    onClose();
  };

  const handleCustomCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCustomCover(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Add New Book</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  required
                  className="w-full p-2 border rounded-lg"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rate per Day (USD)
                </label>
                <input
                  type="number"
                  name="ratePerDay"
                  min="0"
                  step="0.01"
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Replacement Value (USD)
                </label>
                <input
                  type="number"
                  name="replacementValue"
                  min="0"
                  step="0.01"
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                required
                rows={4}
                className="w-full p-2 border rounded-lg"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Cover Image
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {sampleCovers.map((cover) => (
                  <div
                    key={cover}
                    onClick={() => setSelectedCover(cover)}
                    className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                      selectedCover === cover ? 'border-indigo-600' : 'border-transparent'
                    }`}
                  >
                    <img src={cover} alt="Sample cover" className="w-full h-32 object-cover" />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Or upload your own
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCustomCover}
                  className="w-full"
                />
              </div>
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
                Add Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}