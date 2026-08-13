'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import Logo from '@/public/duyhoa.png';
import { ArrowRight, ChevronDown, Menu, Phone, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { NavbarCategory } from './navbar';
import { buttonVariants } from './ui/button';

export default function Navbar({
  categories,
}: {
  categories: NavbarCategory[];
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
    null,
  );

  // Track hovered tag for Desktop Mega Menu. Defaults to the first tag of the first category.
  const [activeTag, setActiveTag] = useState(categories[0].tags[0]);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenMobileDropdown(null);
  };

  const toggleMobileDropdown = (menu: string) => {
    setOpenMobileDropdown(openMobileDropdown === menu ? null : menu);
  };

  return (
    <nav className="top-0 z-50 sticky bg-background border-b w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link href="/" className="flex items-center h-full">
            <Image
              src={Logo}
              alt="Duy Hoà"
              priority
              className="w-auto h-15 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center h-full">
            <NavigationMenu className="max-w-full" align="center">
              <NavigationMenuList className="h-full">
                {/* 1. Trang chủ */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    render={<Link href="/" />}
                    className={navigationMenuTriggerStyle()}
                  >
                    <span className="uppercase">Trang chủ</span>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* 2. Giới thiệu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <span className="uppercase">Giới thiệu</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex flex-col p-2 w-48">
                      <li>
                        <NavigationMenuLink
                          render={<Link href="/about" />}
                          className="hover:bg-background p-3 font-medium text-foreground hover:text-primary text-sm transition-colors"
                        >
                          Về Duy Hoà
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink
                          render={<Link href="/projects" />}
                          className="hover:bg-background p-3 font-medium text-foreground hover:text-primary text-sm transition-colors"
                        >
                          Dự án
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* 3. Sản phẩm (Mega Menu) */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <span className="uppercase">Sản phẩm</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="flex bg-background mx-auto p-8 md:p-12 w-screen max-w-300">
                      {/* Left Column: Grid + Bottom Links */}
                      <div className="flex flex-col pr-12 grow">
                        {/* 4-Column Grid for Categories */}
                        <div className="gap-8 grid grid-cols-2 lg:grid-cols-4 grow">
                          {categories.map((cat, idx) => (
                            <div key={idx} className="flex flex-col gap-4">
                              <Link
                                href={`/product?category=${encodeURIComponent(cat.slug)}`}
                                className="w-fit font-mono text-muted-foreground hover:text-primary text-xs uppercase tracking-widest transition-colors"
                              >
                                {cat.title}
                              </Link>
                              <ul className="flex flex-col gap-3">
                                {cat.tags.map((tag, sIdx) => (
                                  <li
                                    key={sIdx}
                                    onMouseEnter={() => setActiveTag(tag)}
                                  >
                                    <Link
                                      href={`/product?subcategory=${encodeURIComponent(tag.slug)}`}
                                      className={cn(
                                        'font-medium text-sm transition-colors',
                                        activeTag.name === tag.name
                                          ? 'text-primary'
                                          : 'text-foreground',
                                      )}
                                    >
                                      {tag.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        {/* Bottom Links (All Products & Pricing) */}
                        <div className="flex gap-12 mt-12 pt-6 border-border border-t">
                          <Link
                            href="/product"
                            className="group flex items-center gap-2 font-mono text-muted-foreground hover:text-primary text-xs uppercase tracking-wider transition-colors"
                          >
                            Tất cả sản phẩm
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                          <Link
                            href="/pricing"
                            className="group flex items-center gap-2 font-mono text-muted-foreground hover:text-primary text-xs uppercase tracking-wider transition-colors"
                          >
                            Xem bảng giá
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>

                      {/* Right Column: Dynamic Featured Block based on Hovered Tag */}
                      <div className="hidden lg:flex flex-col justify-between gap-3 bg-muted/20 border border-border w-[320px] shrink-0">
                        <div className="space-x-3 p-6">
                          <h3 className="font-heading text-2xl leading-tight">
                            {activeTag.name}
                          </h3>

                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {activeTag.desc}
                          </p>
                        </div>

                        {/* Tag Specific Image */}
                        <div className="flex justify-center items-center bg-background mt-8 h-60">
                          {activeTag.image ? (
                            <img
                              src={activeTag.image}
                              alt={activeTag.name}
                              className="bg-primary opacity-90 hover:opacity-100 grayscale hover:grayscale-0 w-full h-full object-cover transition-all duration-500"
                            />
                          ) : (
                            <span className="font-mono text-xs uppercase">
                              Đang cập nhật hình ảnh
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* 4. Bảng giá */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    render={<Link href="/pricing" />}
                    className={navigationMenuTriggerStyle()}
                  >
                    <span className="uppercase">Bảng giá</span>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* 5. Tin tức */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <span className="uppercase">Tin tức</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex flex-col p-2 w-48">
                      <li>
                        <NavigationMenuLink
                          render={<Link href="/article/news" />}
                          className="hover:bg-background p-3 font-medium text-foreground hover:text-primary text-sm transition-colors"
                        >
                          Tin Duy Hoà
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink
                          render={<Link href="/article/event" />}
                          className="hover:bg-background p-3 font-medium text-foreground hover:text-primary text-sm transition-colors"
                        >
                          Sự kiện
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink
                          render={<Link href="/article/guide" />}
                          className="hover:bg-background p-3 font-medium text-foreground hover:text-primary text-sm transition-colors"
                        >
                          Kiến thức
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <Link
                          href="/article"
                          className="group flex items-center gap-2 hover:bg-background mt-2 p-3 pt-6 border-t font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                          <span className="font-mono text-xs uppercase tracking-wider transition-colors">
                            Tất cả tin tức
                          </span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* 6. Liên hệ */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <span className="uppercase">Liên hệ</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex flex-col p-2 w-48">
                      <li>
                        <NavigationMenuLink
                          render={<Link href="/contact/agency" />}
                          className="hover:bg-background p-3 font-medium text-foreground hover:text-primary text-sm transition-colors"
                        >
                          Đại lý
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink
                          render={<Link href="/contact/project" />}
                          className="hover:bg-background p-3 font-medium text-foreground hover:text-primary text-sm transition-colors"
                        >
                          Dự án
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4 font-mono shrink-0">
            <div className="flex items-center gap-2 text-foreground text-sm">
              <Phone className="w-4 h-4 text-primary" />
              0333.455.889
            </div>
            <Link
              href="/#contact-section"
              className={buttonVariants({
                size: 'lg',
                className: 'rounded-none',
              })}
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
        <div className="md:hidden top-full left-0 absolute bg-background border-border border-b w-full max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="flex flex-col space-y-2 px-4 sm:px-6 py-6">
            <Link
              href="/"
              onClick={closeMenu}
              className="py-3 border-border/50 border-b font-medium text-xl"
            >
              Trang chủ
            </Link>

            {/* Mobile: Giới thiệu */}
            <div className="border-border/50 border-b">
              <button
                onClick={() => toggleMobileDropdown('gioithieu')}
                className="flex justify-between items-center py-3 w-full font-medium text-xl"
              >
                Giới thiệu
                <ChevronDown
                  className={cn(
                    'w-5 h-5 transition-transform',
                    openMobileDropdown === 'gioithieu' && 'rotate-180',
                  )}
                />
              </button>
              {openMobileDropdown === 'gioithieu' && (
                <div className="flex flex-col space-y-3 ml-2 pb-4 pl-4 border-primary/20 border-l-2">
                  <Link
                    href="/about"
                    onClick={closeMenu}
                    className="py-1 text-muted-foreground text-lg"
                  >
                    Về Duy Hoà
                  </Link>
                  <Link
                    href="/projects"
                    onClick={closeMenu}
                    className="py-1 text-muted-foreground text-lg"
                  >
                    Dự án
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile: Sản phẩm (Simple Approach) */}
            <div className="border-border/50 border-b">
              <button
                onClick={() => toggleMobileDropdown('sanpham')}
                className="flex justify-between items-center py-3 w-full font-medium text-xl"
              >
                Sản phẩm
                <ChevronDown
                  className={cn(
                    'w-5 h-5 transition-transform',
                    openMobileDropdown === 'sanpham' && 'rotate-180',
                  )}
                />
              </button>
              {openMobileDropdown === 'sanpham' && (
                <div className="flex flex-col space-y-5 ml-2 pb-4 pl-4 border-primary/20 border-l-2">
                  <Link
                    href="/product"
                    onClick={closeMenu}
                    className="py-1 font-bold text-primary"
                  >
                    Xem tất cả sản phẩm &rarr;
                  </Link>
                  {categories.map((cat, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <Link
                        href={`/product?category=${encodeURIComponent(cat.slug)}`}
                        onClick={closeMenu}
                        className="w-fit font-mono text-muted-foreground hover:text-primary text-xs uppercase tracking-widest transition-colors"
                      >
                        {cat.title}
                      </Link>
                      <div className="flex flex-col gap-2 pl-2">
                        {cat.tags.map((tag, tIdx) => (
                          <Link
                            key={tIdx}
                            href={`/product?subcategory=${encodeURIComponent(tag.slug)}`}
                            onClick={closeMenu}
                            className="py-1 text-foreground"
                          >
                            {tag.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/pricing"
              onClick={closeMenu}
              className="py-3 border-border/50 border-b font-medium text-xl"
            >
              Bảng giá
            </Link>

            {/* Mobile: Tin tức */}
            <Link
              href="/article"
              onClick={closeMenu}
              className="py-3 border-border/50 border-b font-medium text-xl"
            >
              Tin tức
            </Link>

            {/* Mobile: Liên hệ */}
            <div className="border-border/50 border-b">
              <button
                onClick={() => toggleMobileDropdown('lienhe')}
                className="flex justify-between items-center py-3 w-full font-medium text-xl"
              >
                Liên hệ
                <ChevronDown
                  className={cn(
                    'w-5 h-5 transition-transform',
                    openMobileDropdown === 'lienhe' && 'rotate-180',
                  )}
                />
              </button>
              {openMobileDropdown === 'lienhe' && (
                <div className="flex flex-col space-y-3 ml-2 pb-4 pl-4 border-primary/20 border-l-2">
                  <Link
                    href="/contact/agency"
                    onClick={closeMenu}
                    className="py-1 text-muted-foreground text-lg"
                  >
                    Đại lý
                  </Link>
                  <Link
                    href="/contact/project"
                    onClick={closeMenu}
                    className="py-1 text-muted-foreground text-lg"
                  >
                    Dự án
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Contact & CTA */}
            <div className="flex flex-col gap-4 pt-6 pb-12 font-mono">
              <div className="flex justify-center items-center gap-2 font-medium text-foreground">
                <Phone className="w-5 h-5 text-primary" />
                0333.455.889
              </div>
              <Link
                href="/#contact-section"
                className={buttonVariants({
                  size: 'lg',
                  className: 'w-full rounded-none',
                })}
                onClick={closeMenu}
              >
                <span className="font-bold uppercase tracking-wider">
                  Trở thành Đại lý
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
