"use client";

import { Button } from "@/components/ui/button";
import { TFleetManager } from "@/types/fleet-manager.type";
import { removeCookie } from "@/utils/cookies";
import { Globe, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface NavbarProps {
  fleetData: TFleetManager;
}

const Header: React.FC<NavbarProps> = ({ fleetData }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();


  // Handle scroll effect for sticky navbar shadow
  const [isScrolled, setIsScrolled] = useState(false);

  const logOut = () => {
    removeCookie("accessToken");
    removeCookie("refreshToken");
    router.refresh();
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <header
      className={`fixed w-full top-0 z-50 border-b border-gray-800  transition-shadow ${isScrolled ? "shadow-md" : ""
        } bg-white text-black`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo Section */}
        <Link
          href="/"
          className="flex items-center gap-2 group transition-transform duration-300"
        >
          {/* Animated Logo Image */}
          <div className="w-9 h-9 overflow-hidden rounded-full transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
            <Image
              src="/deligoLogo.png"
              alt="DeliGo Logo"
              width={50}
              height={50}
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Brand Text */}
          <span className="font-bold text-xl text-[#DC3173] group-hover:opacity-90 transition-opacity duration-300">
            DeliGo
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-black  hover:text-[#DC3173] transition-colors flex items-center gap-1"
          >
            Home
          </Link>
          <Link
            href="/about-us"
            className="text-black  hover:text-[#DC3173] transition-colors flex items-center gap-1"
          >
            About Us
          </Link>
          <Link
            href="/blog"
            className="text-black hover:text-[#DC3173] transition-colors flex items-center gap-1"
          >
            Blog
          </Link>
          <Link
            href="/contact-us"
            className="text-black hover:text-[#DC3173] transition-colors flex items-center gap-1"
          >
            Contact Us
          </Link>

          {/* Language & Dark Mode */}
          <button
            onClick={() => alert("Language toggle clicked!")}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Globe className="w-5 h-5 text-black" />
          </button>

          {/* Auth Button or Avatar */}
          {
            fleetData?.email ? (
              <>
                {/* Dashboard Button */}
                <Link
                  href="/agent/dashboard"
                  className="ml-4 px-5 py-2 bg-[#DC3173] text-white font-semibold rounded-lg hover:bg-[#a72b5c] transition-all"
                >
                  Dashboard
                </Link>
                {/* Logout Button */}
                <Button
                  onClick={logOut}
                  variant="outline"
                  className="ml-4 px-5 border-[#DC3173] text-[#DC3173] font-semibold rounded-lg shadow-md hover:bg-[#DC3173] hover:text-white hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-[#DC3173] text-white rounded-lg hover:bg-pink-600 transition-colors font-semibold"
              >
                Login / Sign Up
              </Link>
            )
          }
        </div >

        {/* Mobile Menu Button */}
        < button
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden p-2 rounded-md hover:bg-white  transition-colors"
        >
          <Menu className="w-6 h-6 text-black " />
        </button >
      </nav >

      {/* Mobile Drawer */}
      < div
        className={`fixed top-0 right-0 h-full w-64 bg-white text-black shadow-lg transform transition-transform ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <span className="font-bold text-xl text-[#DC3173]">DeliGo</span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-md   transition-colors"
          >
            <X className="w-6 h-6 text-black" />
          </button>
        </div>
        <div className="flex flex-col mt-4 gap-4 px-6">
          <Link
            href="/"
            className="text-black  hover:text-[#DC3173] transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          {fleetData?.email && (
            <Link
              href="/agent/dashboard"
              className="text-black  hover:text-[#DC3173] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}
          <Link
            href="/about"
            className="text-black  hover:text-[#DC3173] transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/how-it-works"
            className="text-black  hover:text-[#DC3173] transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            How It Works
          </Link>

          <button
            onClick={() => alert("Language toggle clicked!")}
            className="flex items-center gap-2 text-black  hover:text-[#DC3173]"
          >
            <Globe className="w-5 h-5" /> Language
          </button>

          {
            !fleetData?.email && (
              <Link
                href="/login"
                className="px-4 py-2 bg-[#DC3173] text-white rounded-lg hover:bg-pink-600 transition-colors font-semibold text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login / Sign Up
              </Link>
            )
          }
        </div >
      </div >
    </header >
  );
};

export default Header;
