"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, LogOut, User } from "lucide-react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > 50) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" },
    { name: "PVC Cards", href: "/pvc" },
    { name: "Aadhar", href: "/aadhar" },
    { name: "Tools", href: "/tools", highlight: true },
    { name: "Contact", href: "/#contact" },
  ];

  const adminLink = [
    { name: "Admin", href: "/admin/login" },
  ];

  const handleLogout = async () => {
    await logout();
    setIsProfileOpen(false);
    router.push("/");
  };

  return (
    <header className={`sticky top-0 z-50 bg-white border-b border-slate-200 shadow-md transition-transform duration-300 transform ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-blue-600 shadow-lg">
              <span className="font-black text-lg text-white">C</span>
            </div>
            <span className="hidden font-bold text-slate-900 sm:inline text-lg">
              CSC Wale
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center ${
                  item.highlight
                    ? "text-fuchsia-700 bg-fuchsia-100 hover:bg-fuchsia-200"
                    : "text-slate-700 hover:text-red-600 hover:bg-red-50/50"
                }`}
              >
                {item.name}
                {item.highlight && (
                  <span className="ml-1.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 px-1.5 py-[2px] text-[10px] font-bold text-white shadow-sm uppercase tracking-wider">
                    New
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!loading && !user ? (
              <>
                <Link
                  href="/admin/login"
                  className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 rounded-lg transition-all"
                  title="Admin Portal"
                >
                  Admin
                </Link>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  Login
                </Link>
                <a
                  href="https://wa.me/919452657508"
                  className="rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-5 py-2.5 text-sm font-bold text-white hover:shadow-lg hover:shadow-red-500/30 transition-all hover:scale-105 active:scale-95"
                >
                  Contact Us
                </a>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  {user?.photoURL && (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-8 h-8 rounded-full border-2 border-red-500"
                    />
                  )}
                  <span className="text-sm font-semibold text-slate-700 hidden sm:inline">
                    {user?.displayName || "User"}
                  </span>
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg z-50 min-w-[200px]">
                    <Link
                      href="/dashboard"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-t-lg"
                    >
                      <User className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-b-lg border-t border-slate-200"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden border-t border-slate-200 bg-slate-50/80 backdrop-blur py-4">
            <div className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors flex items-center ${
                    item.highlight
                      ? "text-fuchsia-700 bg-fuchsia-100"
                      : "text-slate-700 hover:text-red-600 hover:bg-red-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                  {item.highlight && (
                    <span className="ml-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 px-1.5 py-[2px] text-[10px] font-bold text-white uppercase tracking-wider">
                      New
                    </span>
                  )}
                </Link>
              ))}

              {!loading && !user ? (
                <>
                  <Link
                    href="/login"
                    className="mx-3 mt-3 px-4 py-2.5 text-sm font-bold text-red-600 border-2 border-red-600 text-center rounded-lg hover:bg-red-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <a
                    href="https://wa.me/919452657508"
                    className="mx-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-4 py-2.5 text-sm font-bold text-white text-center hover:shadow-lg transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact Us
                  </a>
                </>
              ) : (
                <>
                  <Link
                    href="/dashboard"
                    className="mx-3 mt-3 px-4 py-2.5 text-sm font-bold text-white bg-red-600 text-center rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="mx-3 px-4 py-2.5 text-sm font-bold text-red-600 border-2 border-red-600 text-center rounded-lg hover:bg-red-50"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
