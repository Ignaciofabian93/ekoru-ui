import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, Search, X } from 'lucide-react';
import { cn } from '@/utils';

export interface NavigationLinkProps {
  id: string;
  label: string;
  isAnchor?: boolean;
  href?: string;
}

export interface MobileNavigationLinkProps {
  title: string;
  links: NavigationLinkProps[];
}
[];

export interface NavbarProps {
  brand?: React.ReactNode;
  // informational website
  navigationLinks?: NavigationLinkProps[];
  // informational website mobile menu
  mobileMenuNavigationLinks?: MobileNavigationLinkProps[];
  // app links
  appNavigationItems?: React.ReactNode;
  // app mobile menu
  mobileMenuAppNavigationItems?: React.ReactNode;
  // search
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  searchEnabled?: boolean;
  // styles
  className?: string;
  // side menu title
  sideMenuTitle?: string;

  // Aria labels and other accessibility props can be added as needed
  navbarAriaLabel?: string;
  userActionsAriaLabel?: string;
  toggleMobileMenuAriaLabel?: string;
  closeMobileMenuAriaLabel?: string;
  mobileMenuTitleAriaLabel?: string;
}

export default function Navbar({
  brand,
  navigationLinks,
  mobileMenuNavigationLinks,
  appNavigationItems,
  mobileMenuAppNavigationItems,
  searchPlaceholder = 'Search...',
  onSearch,
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
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    navigationLinks?.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleScrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
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
              {/* Navigation Icons - App */}
              {appNavigationItems}

              {/* Navigation Links - Desktop */}
              <div className="hidden lg:flex items-center space-x-2">
                {navigationLinks &&
                  navigationLinks.map((item, index) => (
                    <motion.a
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      href={`#${item.id}`}
                      className={cn(
                        'relative',
                        'text-white',
                        'transition-all duration-200 ease-in-out',
                        'font-medium text-sm',
                        'group',
                        {
                          'text-secondary': activeSection === item.id,
                        }
                      )}
                    >
                      {item.label}
                      <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{
                          scaleX: activeSection === item.id ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-light origin-left"
                      />
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    </motion.a>
                  ))}
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
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    id="mobile-menu-title"
                    className="text-xl font-semibold text-foreground"
                  >
                    {sideMenuTitle}
                  </motion.h2>
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
                <nav className="space-y-2">{mobileMenuAppNavigationItems}</nav>

                {/* Custom Mobile Menu Content */}
                {mobileMenuNavigationLinks && (
                  <div className="mt-6 pt-6 border-t border-surface-active">
                    {mobileMenuNavigationLinks.map((section, index) => (
                      <div key={index} className="h-full overflow-y-auto pb-20">
                        <div className="p-4 space-y-1">
                          <motion.h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-3">
                            {section.title}
                          </motion.h3>
                          {section.links.map(({ id, isAnchor, href, label }) =>
                            isAnchor ? (
                              <motion.a
                                key={id}
                                href={href || '#'}
                                className={cn(
                                  'w-full flex items-center justify-between',
                                  'p-3',
                                  'text-left',
                                  'hover:bg-neutral-light/50',
                                  'transition-colors',
                                  'rounded-lg',
                                  'border-b border-neutral/10'
                                )}
                              >
                                <motion.span className="font-medium text-text-primary">
                                  {label}
                                </motion.span>
                              </motion.a>
                            ) : (
                              <motion.button
                                key={id}
                                onClick={() => handleScrollToSection(id)}
                                className={cn(
                                  'w-full flex items-center justify-between',
                                  'p-3',
                                  'text-left',
                                  'hover:bg-neutral-light/50',
                                  'transition-colors',
                                  'rounded-lg',
                                  'border-b border-neutral/10'
                                )}
                              >
                                <motion.span className="font-medium text-text-primary">
                                  {label}
                                </motion.span>
                              </motion.button>
                            )
                          )}
                        </div>
                      </div>
                    ))}
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
