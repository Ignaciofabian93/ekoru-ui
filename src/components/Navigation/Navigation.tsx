import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, Search, X } from 'lucide-react';
import { cn } from '@/utils';

export interface NavbarProps {
  brand?: React.ReactNode;
  navigationIcons?: React.ReactNode;
  navigationLinks?: React.ReactNode;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  mobileMenuContent?: React.ReactNode;
  className?: string;
  searchEnabled?: boolean;
  sideMenuTitle?: string;

  // Aria labels and other accessibility props can be added as needed
  navbarAriaLabel?: string;
  userActionsAriaLabel?: string;
  toggleMobileMenuAriaLabel?: string;
  closeMobileMenuAriaLabel?: string;
  mobileMenuTitleAriaLabel?: string;
}

export default function Navbar({
  navigationIcons,
  navigationLinks,
  brand,
  searchPlaceholder = 'Search...',
  onSearch,
  mobileMenuContent,
  className = '',
  searchEnabled = true,
  sideMenuTitle = 'Menu',

  // aria labels and other accessibility props can be added as needed
  navbarAriaLabel = 'Main navigation',
  userActionsAriaLabel = 'User actions',
  toggleMobileMenuAriaLabel = 'Toggle mobile menu',
  closeMobileMenuAriaLabel = 'Close mobile menu',
  mobileMenuTitleAriaLabel = 'Mobile menu',
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  // Handle escape key to close mobile menu
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={cn(
          'bg-gradient-to-r from-navbar-dark via-navbar-main to-navbar-dark',
          'sticky top-0 z-50',
          className
        )}
        onKeyDown={handleKeyDown}
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          role="navigation"
          aria-label={navbarAriaLabel}
        >
          {/* Main Navigation */}
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              {brand ? (
                brand
              ) : (
                <span className="text-xl font-bold text-white">EKORU</span>
              )}
            </div>

            {/* Search Bar - Desktop */}
            {searchEnabled && (
              <div
                className="hidden md:flex flex-1 max-w-2xl mx-8"
                role="search"
              >
                <form
                  onSubmit={handleSearchSubmit}
                  className="w-full flex items-center relative"
                >
                  <input
                    id="search-desktop"
                    name="search-desktop"
                    type="search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder={searchPlaceholder}
                    className={cn(
                      'w-full px-4 py-2',
                      'rounded-lg',
                      'border border-input-border',
                      'bg-input-bg',
                      'text-foreground',
                      'placeholder:text-foreground-tertiary',
                      'focus:outline-none',
                      'focus:ring-2',
                      'focus:ring-primary',
                      'focus:border-transparent'
                    )}
                  />
                  <Search className="h-5 w-5 text-primary absolute right-4" />
                </form>
              </div>
            )}

            {/* User Actions */}
            <div
              className="flex items-center space-x-2"
              role="toolbar"
              aria-label={userActionsAriaLabel}
            >
              {/* Navigation Icons */}
              {navigationIcons}

              {/* Navigation Links - Desktop */}
              <div className="hidden lg:flex items-center space-x-2">
                {navigationLinks}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  'p-2',
                  'rounded-lg',
                  'text-white',
                  'hover:bg-primary/30',
                  'transition-colors',
                  'lg:hidden'
                )}
                aria-label={toggleMobileMenuAriaLabel}
                aria-expanded={isMobileMenuOpen}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {searchEnabled && (
            <div className="md:hidden pb-4" role="search">
              <form
                onSubmit={handleSearchSubmit}
                className="w-full flex items-center relative"
              >
                <input
                  id="search-mobile"
                  name="search-mobile"
                  type="search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder={searchPlaceholder}
                  className={cn(
                    'w-full',
                    'px-4 py-2',
                    'rounded-lg',
                    'border border-input-border',
                    'bg-input-bg',
                    'text-foreground',
                    'placeholder:text-foreground-tertiary',
                    'focus:outline-none',
                    'focus:ring-2',
                    'focus:ring-primary',
                    'focus:border-transparent'
                  )}
                />
                <Search className="h-5 w-5 text-primary absolute right-4" />
              </form>
            </div>
          )}
        </nav>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 z-50 flex justify-end"
            role="dialog"
            aria-modal="true"
            aria-labelledby={mobileMenuTitleAriaLabel}
          >
            {/* Overlay Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label={closeMobileMenuAriaLabel}
            />

            {/* Slide-in Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className={cn(
                'relative',
                'w-full',
                'max-w-sm',
                'bg-background',
                'shadow-xl',
                'h-full',
                'overflow-y-auto'
              )}
            >
              <div className="p-6">
                {/* Menu Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2
                    id="mobile-menu-title"
                    className="text-xl font-semibold text-foreground"
                  >
                    {sideMenuTitle}
                  </h2>
                  <button
                    onClick={closeMobileMenu}
                    className={cn(
                      'p-2',
                      'rounded-lg',
                      'text-foreground',
                      'hover:bg-background-secondary',
                      'transition-colors'
                    )}
                    aria-label="Close mobile menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-2">{navigationLinks}</nav>

                {/* Custom Mobile Menu Content */}
                {mobileMenuContent && (
                  <div className="mt-6 pt-6 border-t border-surface-active">
                    {mobileMenuContent}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
