"use client";

import { Button } from "@/components/ui/button";
import { TFleetManager } from "@/types/fleet-manager.type";
import { removeCookie } from "@/utils/cookies";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useStore } from "@/store/store";
import { useTranslation } from "@/hooks/use-translation";

interface NavbarProps {
  fleetData: TFleetManager;
}

const Header: React.FC<NavbarProps> = ({ fleetData }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { lang, setLang } = useStore();
  const { t } = useTranslation();


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
            {t("home")}
          </Link>
          <Link
            href="/about-us"
            className="text-black  hover:text-[#DC3173] transition-colors flex items-center gap-1"
          >
            {t("aboutUs")}
          </Link>
          <Link
            href="/blog"
            className="text-black hover:text-[#DC3173] transition-colors flex items-center gap-1"
          >
            {t("blog")}
          </Link>
          <Link
            href="/contact-us"
            className="text-black hover:text-[#DC3173] transition-colors flex items-center gap-1"
          >
            {t("contactUs")}
          </Link>

          {/* Language & Dark Mode */}
          <Select
            value={lang}
            onValueChange={(value: 'en' | 'pt') => {
              setLang(value)
            }}
          >
            <SelectTrigger className="w-[70px] hover:border hover:border-[#DC3173]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">EN</SelectItem>
              <SelectItem value="pt">PT</SelectItem>
            </SelectContent>
          </Select>

          {/* Auth Button or Avatar */}
          {
            fleetData?.email ? (
              <>
                {/* Dashboard Button */}
                <Link
                  href="/agent/dashboard"
                  className="ml-4 px-5 py-2 bg-[#DC3173] text-white font-semibold rounded-lg hover:bg-[#a72b5c] transition-all"
                >
                  {t("dashboard")}
                </Link>
                {/* Logout Button */}
                <Button
                  onClick={logOut}
                  variant="outline"
                  className="ml-4 px-5 border-[#DC3173] text-[#DC3173] font-semibold rounded-lg shadow-md hover:bg-[#DC3173] hover:text-white hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  {t("logout")}
                </Button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-[#DC3173] text-white rounded-lg hover:bg-pink-600 transition-colors font-semibold"
              >
                {t("login")} / {t("signUp")}
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
            {t("home")}
          </Link>
          {fleetData?.email && (
            <Link
              href="/agent/dashboard"
              className="text-black  hover:text-[#DC3173] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("dashboard")}
            </Link>
          )}
          <Link
            href="/about"
            className="text-black  hover:text-[#DC3173] transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t("aboutUs")}
          </Link>
          <Link
            href="/blog"
            className="text-black hover:text-[#DC3173] transition-colors flex items-center gap-1"
          >
            {t("blog")}
          </Link>
          <Link
            href="/contact-us"
            className="text-black hover:text-[#DC3173] transition-colors flex items-center gap-1"
          >
            {t("contactUs")}
          </Link>

          {/* Language & Dark Mode */}
          <Select
            value={lang}
            onValueChange={(value: 'en' | 'pt') => {
              setLang(value)
            }}
          >
            <SelectTrigger className="w-[70px] hover:border hover:border-[#DC3173]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">EN</SelectItem>
              <SelectItem value="pt">PT</SelectItem>
            </SelectContent>
          </Select>

          {
            !fleetData?.email && (
              <Link
                href="/login"
                className="px-4 py-2 bg-[#DC3173] text-white rounded-lg hover:bg-pink-600 transition-colors font-semibold text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("login")} / {t("signUp")}
              </Link>
            )
          }
        </div >
      </div >
    </header >
  );
};

export default Header;
