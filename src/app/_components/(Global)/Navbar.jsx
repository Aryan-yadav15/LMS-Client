import React from 'react';
import Link from 'next/link';
import { Home, BookOpen, GraduationCap, Users, Settings, Bell } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="h-full w-[80px] bg-[#1a1a1a] rounded-2xl
                    flex flex-col items-center py-4">
      {/* Logo Section */}
      <div className="mb-6">
        <Link href="/" className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl">
          <GraduationCap size={24} className="text-white" />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col items-center space-y-4 flex-grow">
        <Link href="/" 
              className="flex flex-col items-center justify-center w-12 h-12 rounded-xl
                         hover:bg-white/10 transition-colors duration-200 group">
          <Home size={22} className="text-gray-400 group-hover:text-white" />
        </Link>
        <Link href="/courses" 
              className="flex flex-col items-center justify-center w-12 h-12 rounded-xl
                         hover:bg-white/10 transition-colors duration-200 group">
          <BookOpen size={22} className="text-gray-400 group-hover:text-white" />
        </Link>
        <Link href="/students" 
              className="flex flex-col items-center justify-center w-12 h-12 rounded-xl
                         hover:bg-white/10 transition-colors duration-200 group">
          <Users size={22} className="text-gray-400 group-hover:text-white" />
        </Link>
      </div>

      {/* Bottom Actions */}
      <div className="mt-auto flex flex-col items-center space-y-4">
        <Link href="/notifications" 
              className="flex flex-col items-center justify-center w-12 h-12 rounded-xl
                         hover:bg-white/10 transition-colors duration-200 group">
          <Bell size={22} className="text-gray-400 group-hover:text-white" />
        </Link>
        <Link href="/settings" 
              className="flex flex-col items-center justify-center w-12 h-12 rounded-xl
                         hover:bg-white/10 transition-colors duration-200 group">
          <Settings size={22} className="text-gray-400 group-hover:text-white" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;