
import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn(
      "sticky top-0 w-full bg-white/70 backdrop-blur z-10 border-b border-gray-100",
      "px-6 py-4 flex items-center justify-between transition-all duration-200",
      className
    )}>
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg"></div>
        <h1 className="text-xl font-display font-medium tracking-tight text-gray-900">
          <span className="font-semibold">Estate</span>Match
        </h1>
      </div>
      
      <div className="hidden sm:flex items-center space-x-6">
        <nav className="flex items-center space-x-6 text-sm">
          <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">For Agents</a>
          <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">Our Listings</a>
          <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">About</a>
        </nav>
        
        <button className="inline-flex rounded-full text-sm px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors">
          Contact
        </button>
      </div>
    </header>
  );
};

export default Header;
