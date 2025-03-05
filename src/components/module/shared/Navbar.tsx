"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/services/AuthService";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user, setIsLoading } = useUser();
  const handleLogOut = () => {
    logout();
    setIsLoading(true);
  };

  const pathname = usePathname();

  return (
    
    // <nav className="bg-white shadow-md px-6 py-4 sticky top-0 w-full z-50">
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-sm bg-white/0 transition-colors duration-300 hover:bg-white/100">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <span className="text-2xl font-bold  flex items-center gap-1">
            TutorLink 🎓
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex lg:space-x-10 md:gap-4">
          <Link href="/"  className={`hover:text-blue-600 ${
                pathname === "/" ? "text-green-500 underline" : ""
              }`}>
            Home
          </Link>
          
          <Link href="/tution-jobs" className={`hover:text-blue-600 ${
                pathname === "/tution-jobs" ? "text-green-500 underline" : ""
              }`}>
            Tution Jobs
          </Link>
          <Link href="/browse-tutors" className={`hover:text-blue-600 ${
                pathname === "/browse-tutors" ? "text-green-500 underline" : ""
              }`}>
            Browse Tutors
          </Link>
          <Link href="/about"  className={`hover:text-blue-600 ${
                pathname === "/about" ? "text-green-500 underline" : ""
              }`}>
            About
          </Link>
          <Link href="/faq" className={`hover:text-blue-600 ${
                pathname === "/faq" ? "text-green-500 underline" : ""
              }`}>
            FAQ
          </Link>
          <Link href="/blog" className={`hover:text-blue-600 ${
                pathname === "/blog" ? "text-green-500 underline" : ""
              }`}>
            Blog
          </Link>
        </div>

       
        

        <div className="hidden md:flex">
          {user ? (
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className=" h-12 w-12">
                    <AvatarImage
                      className="rounded-full"
                      src={user?.image || "https://github.com/shadcn.png"}
                    />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>My Shop</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="bg-red-500 cursor-pointer"
                    onClick={handleLogOut}
                  >
                    <LogOut />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex space-x-4">
              <Button
                variant="outline"
                className="border-2 bg-green-300 rounded-xl"
              >
                <Link href="/login">Login</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md py-4 flex flex-col justify-center items-center space-y-4 px-6">
          {user ? (
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className=" h-16 w-16">
                    <AvatarImage src={user?.image} />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>My Shop</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="bg-red-500 cursor-pointer"
                    onClick={handleLogOut}
                  >
                    <LogOut />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex space-x-4">
              <Button
                variant="outline"
                className="border-2 bg-green-300 rounded-xl"
              >
                <Link href="/login">Login</Link>
              </Button>
            </div>
          )}
          <Link href="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/browse-tutors" onClick={() => setIsOpen(false)}>
            Browse Tutors
          </Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link href="/faq" onClick={() => setIsOpen(false)}>
            FAQ
          </Link>
          <Link href="/blog" onClick={() => setIsOpen(false)}>
            Blog
          </Link>
          <div className="flex md:hidden"></div>
        </div>
      )}
    </nav>
  );
}
