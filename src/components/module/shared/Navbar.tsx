"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4 sticky top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <span className="text-2xl font-bold text-blue-600 flex items-center gap-1">
            TutorLink 🎓
          </span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex lg:space-x-10 md:gap-4">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/browse-tutors" className="hover:text-blue-600">Browse Tutors</Link>
          <Link href="/about" className="hover:text-blue-600">About</Link>
          <Link href="/faq" className="hover:text-blue-600">FAQ</Link>
          <Link href="/blog" className="hover:text-blue-600">Blog</Link>
        </div>
        
        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-4">
          <Button >
            <Link href="/login">Login</Link>
          </Button>
          <Button>
            <Link href="/register">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md py-4 flex flex-col space-y-4 px-6">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/browse-tutors" onClick={() => setIsOpen(false)}>Browse Tutors</Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/faq" onClick={() => setIsOpen(false)}>FAQ</Link>
          <Link href="/blog" onClick={() => setIsOpen(false)}>Blog</Link>
          <div className="flex flex-col space-y-2 mt-4">
            <Button>
              <Link href="/login">Login</Link>
            </Button>
            <Button>
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}