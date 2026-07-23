'use client';

import { Menu, Phone, X } from 'lucide-react';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Helper function to close menu when a link is clicked
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="top-0 z-50 sticky bg-background border-b w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link href="/" className="flex items-center">
            <img
              src="/duyhoa.png" // Replace with your actual logo path
              alt="Duy Hoà"
              className="w-auto h-15 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="font-medium text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Trang chủ
            </Link>
            <Link
              href="/about"
              className="font-medium text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Về chúng tôi
            </Link>
            <Link
              href="/brands"
              className="font-medium text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Thương hiệu
            </Link>
            <Link
              href="/projects"
              className="font-medium text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Dự án
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 font-medium text-foreground text-sm">
              <Phone className="w-4 h-4 text-primary" />
              0904.683.035
            </div>
            <Link
              href="/#contact-section"
              className={buttonVariants({ size: 'lg' })}
            >
              <span className="uppercase">Trở thành Đại lý</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden top-full left-0 absolute bg-background shadow-lg border-border border-b w-full">
          <div className="flex flex-col space-y-4 px-4 sm:px-6 pt-4 pb-6">
            <Link
              href="/"
              onClick={closeMenu}
              className="font-medium text-foreground text-4xl transition-colors"
            >
              Trang chủ
            </Link>
            <Link
              href="/about"
              onClick={closeMenu}
              className="font-medium text-foreground text-4xl transition-colors"
            >
              Về chúng tôi
            </Link>
            <Link
              href="/brands"
              onClick={closeMenu}
              className="font-medium text-foreground text-4xl transition-colors"
            >
              Thương hiệu
            </Link>
            <Link
              href="/projects"
              onClick={closeMenu}
              className="font-medium text-foreground text-4xl transition-colors"
            >
              Dự án
            </Link>

            {/* Mobile Contact & CTA */}
            <div className="flex flex-col gap-4 pt-4 border-border border-t">
              <div className="flex items-center gap-2 font-medium text-foreground text-base">
                <Phone className="w-5 h-5 text-primary" />
                0904.683.035
              </div>
              <Link
                href="/#contact-section"
                className={buttonVariants({ size: 'lg' })}
              >
                <span className="uppercase">Trở thành Đại lý</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
