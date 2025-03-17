

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
  const { user, setIsLoading , isLoading} = useUser();
  const pathname = usePathname();

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
  };

  if(isLoading){
    return <div>
      <h1>Loading</h1>
    </div>
  }
  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/80  transition-colors h-[70px] flex items-center px-6">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold flex items-center gap-1">
            TutorLink 🎓
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex lg:space-x-10 md:gap-4">
            {[
              "/",
              
              "/tution-request",
              "/tution-jobs",
              "/browse-tutors",
              "/about",
              "/faq",
              "/blog",
            ].map((route) => (
              <Link
                key={route}
                href={route}
                className={`hover:text-blue-600 ${
                  pathname === route ? "text-green-500 underline" : ""
                }`}
              >
                {route.replace("/", "").toUpperCase() || "HOME"}
              </Link>
            ))}
          </div>

          {/* User Account Section */}
          <div className="hidden md:flex">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="h-12 w-12">
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
                  <DropdownMenuItem>
                    <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
                  </DropdownMenuItem>
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
            ) : (
              <Button
                variant="outline"
                className="border-2 bg-green-300 rounded-xl"
              >
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Fixed Overlapping Issue */}
      <div className="mt-[70px]">{/* এখানে তোর পেজের কন্টেন্ট আসবে */}</div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md py-4 flex flex-col items-center space-y-4 px-6">
          {["/", "/browse-tutors", "/about", "/faq", "/blog"].map((route) => (
            <Link key={route} href={route} onClick={() => setIsOpen(false)}>
              {route.replace("/", "").toUpperCase() || "HOME"}
            </Link>
          ))}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user?.image} />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
                </DropdownMenuItem>
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
          ) : (
            <Button
              variant="outline"
              className="border-2 bg-green-300 rounded-xl"
            >
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      )}
    </>
  );
}
