'use client';

import Image from 'next/image';
import { ReactNode, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaUser, FaSignOutAlt, FaBell, FaSearch, FaChevronDown } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';

interface MobileNavLinkProps {
  href: string;
  children: ReactNode;
  onClick: () => void;
}

interface NavLinkProps {
  href: string;
  isActive: boolean;
  children: ReactNode;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const profileRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await logout();
    setIsProfileOpen(false);
  };
  
  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className=""></div>
              <Image
                src="/logo.png"
                alt="TutorLink Logo"
                width={48}
                height={48}
                className="relative rounded-full ring-2 ring-white/50 group-hover:ring-white transition-all duration-300"
              />
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-[#FF6636] to-[#FF8A50] bg-clip-text text-transparent group-hover:text-transparent transition-all duration-300">
              TutorLink
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink href="/" isActive={pathname === '/'}>Home</NavLink>
            <NavLink href="/tutors" isActive={pathname === '/tutors'}>Browse Tutors</NavLink>
            <NavLink href="/about" isActive={pathname === '/about'}>About</NavLink>
            <NavLink href="/faq" isActive={pathname === '/faq'}>FAQ</NavLink>
            <NavLink href="/blog" isActive={pathname === '/blog'}>Blog</NavLink>
          </div>

          {/* Authentication Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <button className="p-3 rounded-full hover:bg-gray-100 transition-colors">
                  <FaSearch className="w-5 h-5 text-gray-600" />
                </button>
                
                <button className="p-3 rounded-full hover:bg-gray-100 transition-colors relative">
                  <FaBell className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                
                <div className="relative" ref={profileRef}>
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF6636] to-[#FF8A50] text-white flex items-center justify-center font-bold text-lg shadow-md">
                      {user?.name.charAt(0)}
                    </div>
                    <FaChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-3 w-60 bg-white rounded-xl shadow-2xl py-2 border border-gray-100/50"
                      >
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                        <Link href="/dashboard" onClick={() => setIsProfileOpen(false)} className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#FF6636] transition-colors">
                          <FaUser className="w-4 h-4 mr-3 text-gray-400" />
                          Dashboard
                        </Link>
                        <Link href="/dashboard/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#FF6636] transition-colors">
                          <FaUser className="w-4 h-4 mr-3 text-gray-400" />
                          Profile
                        </Link>
                        <div className="h-px bg-gray-100 my-1"></div>
                        <button 
                          onClick={handleLogout} 
                          className="flex items-center w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#FF6636] transition-colors"
                        >
                          <FaSignOutAlt className="w-4 h-4 mr-3 text-gray-400" />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login" className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-[#FF6636] transition-colors">
                  Login
                </Link>
                <Link href="/register" className="relative px-7 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#FF8A50] to-[#FF6636] rounded-full hover:shadow-lg hover:shadow-[#FF6636]/40 transition-all transform hover:scale-105">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none transition-colors z-50"
            >
              <div className="w-6 h-6 flex flex-col justify-around items-center">
                <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${isMenuOpen ? "rotate-45 translate-y-[5px]" : ""}`}></span>
                <span className={`block w-6 h-0.5 bg-gray-700 transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : ""}`}></span>
                <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-[5px]" : ""}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50 absolute w-full"
          >
            <div className="container mx-auto px-4 py-5 space-y-2">
              <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>Home</MobileNavLink>
              <MobileNavLink href="/tutors" onClick={() => setIsMenuOpen(false)}>Browse Tutors</MobileNavLink>
              <MobileNavLink href="/about" onClick={() => setIsMenuOpen(false)}>About</MobileNavLink>
              <MobileNavLink href="/faq" onClick={() => setIsMenuOpen(false)}>FAQ</MobileNavLink>
              <MobileNavLink href="/blog" onClick={() => setIsMenuOpen(false)}>Blog</MobileNavLink>
              
              <div className="pt-4 border-t border-gray-200/50 mt-4">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center space-x-3 px-4 py-3 mb-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF6636] to-[#FF8A50] text-white flex items-center justify-center font-medium">
                        {user?.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                    <MobileNavLink href="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</MobileNavLink>
                    <MobileNavLink href="/dashboard/profile" onClick={() => setIsMenuOpen(false)}>Profile</MobileNavLink>
                    <button 
                      onClick={handleLogout} 
                      className="w-full text-left block px-4 py-3 text-base font-medium text-gray-500 hover:text-[#FF6636] hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-3 px-4 pt-2">
                    <Link href="/login" onClick={() => setIsMenuOpen(false)} className="py-3 text-center text-[#FF6636] font-medium border-2 border-[#FF6636] rounded-xl hover:bg-[#FF6636] hover:text-white transition-all">
                      Login
                    </Link>
                    <Link href="/register" onClick={() => setIsMenuOpen(false)} className="py-3 text-center text-white font-medium bg-gradient-to-r from-[#FF6636] to-[#FF8A50] rounded-xl hover:shadow-lg transition-all transform hover:scale-105">
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Helper Components
const NavLink: React.FC<NavLinkProps> = ({ href, isActive, children }) => {
  return (
    <Link
      href={href}
      className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all relative group ${
        isActive 
          ? 'text-[#FF6636]' 
          : 'text-gray-600 hover:text-[#FF6636] hover:bg-gray-100'
      }`}
    >
      {children}
      {isActive && (
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF8A50] to-[#FF6636] rounded-full"
          layoutId="underline"
        />
      )}
      {!isActive && (
         <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#FF8A50] to-[#FF6636] rounded-full group-hover:w-full transition-all duration-300"></span>
      )}
    </Link>
  );
};

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, children, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block px-4 py-3 text-base font-medium rounded-lg transition-all ${
        isActive 
          ? 'text-[#FF6636] bg-[#FF6636]/10' 
          : 'text-gray-600 hover:text-[#FF6636] hover:bg-gray-50'
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;