'use client';

import Image from 'next/image';
import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

interface MobileNavLinkProps {
  href: string; // 'href' should be a string
  isActive: boolean; // 'isActive' should be a boolean
  children: ReactNode; // 'children' can be any valid React node (text, JSX, etc.)
}
interface NavLinkProps {
  href: string; // 'href' should be a string
  isActive: boolean; // 'isActive' should be a boolean
  children: ReactNode; // 'children' can be any valid React node (text, JSX, etc.)
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
          <span className="flex items-center">
      <Image
        src="/logo.png" // Image path relative to the public folder
        alt="TutorLink Logo"
        width={32}  // Adjust width as needed
        height={32} // Adjust height as needed
        className="mr-2"
      />
      <span className="font-bold text-xl text-[#FF6636]">TutorLink</span>
    </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            <NavLink href="/" isActive={pathname === '/'}>Home</NavLink>
            <NavLink href="/tutors" isActive={pathname === '/tutors'}>Browse Tutors</NavLink>
            <NavLink href="/about" isActive={pathname === '/about'}>About</NavLink>
            <NavLink href="/faq" isActive={pathname === '/faq'}>FAQ</NavLink>
            <NavLink href="/blog" isActive={pathname === '/blog'}>Blog</NavLink>
          </div>

          {/* Authentication Section */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-medium">
                    {user?.name.charAt(0)}
                  </div>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                  <Link href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                </div>
              </div>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
                  Login
                </Link>
                <Link href="/register" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-2">
          <div className="container mx-auto px-4 space-y-1">
            <MobileNavLink href="/" isActive={pathname === '/'}>Home</MobileNavLink>
            <MobileNavLink href="/tutors" isActive={pathname === '/tutors'}>Browse Tutors</MobileNavLink>
            <MobileNavLink href="/about" isActive={pathname === '/about'}>About</MobileNavLink>
            <MobileNavLink href="/faq" isActive={pathname === '/faq'}>FAQ</MobileNavLink>
            <MobileNavLink href="/blog" isActive={pathname === '/blog'}>Blog</MobileNavLink>
            
            <div className="pt-4 border-t border-gray-200 mt-4">
              {isAuthenticated ? (
                <>
                  <MobileNavLink href="/dashboard" isActive={pathname === '/dashboard'}>Dashboard</MobileNavLink>
                  <MobileNavLink href="/dashboard/profile" isActive={pathname === '/dashboard/profile'}>Profile</MobileNavLink>
                  <button 
                    onClick={handleLogout} 
                    className="w-full text-left block px-4 py-2 text-base font-medium text-gray-500 hover:text-indigo-600 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 px-4 pt-2">
                  <Link href="/login" className="py-2 text-center text-indigo-600  rounded-md bg-[#FF6636] hover:bg-indigo-50 transition-colors">
                    Login
                  </Link>
                  <Link href="/register" className="py-2 text-center text-white bg- rounded-md  transition-colors">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// Helper Components
const NavLink: React.FC<NavLinkProps> = ({ href, isActive, children }) => {
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive 
          ? 'text-indigo-600 bg-indigo-50' 
          : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
      }`}
    >
      {children}
    </Link>
  );
};

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, isActive, children }) => {
  return (
    <Link
      href={href}
      className={`block px-4 py-2 text-base font-medium ${
        isActive 
          ? 'text-indigo-600 bg-indigo-50' 
          : 'text-gray-500 hover:text-indigo-600 hover:bg-gray-50'
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;