'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label 
              tabIndex={0} 
              className="btn btn-ghost lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            {isMenuOpen && (
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><Link href="/" className={pathname === '/' ? 'active' : ''}>Home</Link></li>
                <li><Link href="/tutors" className={pathname === '/tutors' ? 'active' : ''}>Browse Tutors</Link></li>
                <li><Link href="/about" className={pathname === '/about' ? 'active' : ''}>About</Link></li>
                <li><Link href="/faq" className={pathname === '/faq' ? 'active' : ''}>FAQ</Link></li>
                <li><Link href="/blog" className={pathname === '/blog' ? 'active' : ''}>Blog</Link></li>
              </ul>
            )}
          </div>
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            TutorLink
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link href="/" className={pathname === '/' ? 'active' : ''}>Home</Link></li>
            <li><Link href="/tutors" className={pathname === '/tutors' ? 'active' : ''}>Browse Tutors</Link></li>
            <li><Link href="/about" className={pathname === '/about' ? 'active' : ''}>About</Link></li>
            <li><Link href="/faq" className={pathname === '/faq' ? 'active' : ''}>FAQ</Link></li>
            <li><Link href="/blog" className={pathname === '/blog' ? 'active' : ''}>Blog</Link></li>
          </ul>
        </div>
        <div className="navbar-end">
          {isAuthenticated ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full bg-neutral text-neutral-content">
                  <span className="text-xl">{user?.name.charAt(0)}</span>
                </div>
              </label>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li>
                  <Link href="/dashboard" className="justify-between">
                    Dashboard
                  </Link>
                </li>
                <li><Link href="/dashboard/profile">Profile</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/login" className="btn btn-ghost">Login</Link>
              <Link href="/register" className="btn btn-primary">Register</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;