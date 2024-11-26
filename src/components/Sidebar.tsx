import React from 'react';
import { Library, Users, BookOpen, LayoutGrid } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: <Library size={20} />, label: 'Dashboard' },
    { id: 'books', icon: <BookOpen size={20} />, label: 'Books' },
    { id: 'categories', icon: <LayoutGrid size={20} />, label: 'Categories' },
    { id: 'users', icon: <Users size={20} />, label: 'Users' },
  ];

  return (
    <div className="bg-indigo-800 text-white w-64 min-h-screen p-4">
      <div className="flex items-center gap-2 mb-8">
        <Library size={32} />
        <h1 className="text-xl font-bold">Library Manager</h1>
      </div>
      <nav>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors ${
              activeTab === item.id
                ? 'bg-indigo-700'
                : 'hover:bg-indigo-700/50'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}