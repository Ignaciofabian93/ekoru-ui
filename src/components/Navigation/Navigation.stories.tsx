import type { Meta, StoryObj } from '@storybook/react';
import Navbar from './Navigation';
import { Home, ShoppingCart, User, Heart, Bell, Package } from 'lucide-react';

const meta = {
  title: 'Components/Navigation',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder text for search input',
    },
    searchEnabled: {
      control: 'boolean',
      description: 'Enable or disable search functionality',
    },
    sideMenuTitle: {
      control: 'text',
      description: 'Title for mobile side menu',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample brand logo
const BrandLogo = () => (
  <a href="/" className="flex items-center gap-2">
    <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center">
      <span className="text-primary font-bold text-lg">E</span>
    </div>
    <span className="text-xl font-bold text-white">EKORU</span>
  </a>
);

const demoLinks = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Wishlist', href: '/wishlist', icon: Heart },
];

const demoLinksAsNodes = demoLinks.map((link) => (
  <a
    href={link.href}
    key={link.name}
    className="flex items-center gap-2 px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-colors"
  >
    {link.icon && <link.icon className="h-5 w-5" />}
    <span>{link.name}</span>
  </a>
));

// Sample navigation links as React nodes
const sampleLinks = [
  <a
    key="home"
    href="/"
    className="flex items-center gap-2 px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-colors"
  >
    <Home className="h-5 w-5" />
    <span>Home</span>
  </a>,
  <a
    key="products"
    href="/products"
    className="flex items-center gap-2 px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-colors"
  >
    <Package className="h-5 w-5" />
    <span>Products</span>
  </a>,
  <a
    key="wishlist"
    href="/wishlist"
    className="flex items-center gap-2 px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-colors"
  >
    <Heart className="h-5 w-5" />
    <span>Wishlist</span>
  </a>,
];

// Sample mobile navigation links
const sampleMobileLinks = [
  <a
    key="home"
    href="/"
    className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-background-secondary transition-colors"
  >
    <Home className="h-5 w-5" />
    <span>Home</span>
  </a>,
  <a
    key="products"
    href="/products"
    className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-background-secondary transition-colors"
  >
    <Package className="h-5 w-5" />
    <span>Products</span>
  </a>,
  <a
    key="wishlist"
    href="/wishlist"
    className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-background-secondary transition-colors"
  >
    <Heart className="h-5 w-5" />
    <span>Wishlist</span>
  </a>,
];

// Sample navigation icons
const sampleIcons = [
  <button
    key="notifications"
    className="relative p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
    aria-label="Notifications"
  >
    <Bell className="h-5 w-5" />
    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
  </button>,
  <button
    key="cart"
    className="relative p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
    aria-label="Shopping cart"
  >
    <ShoppingCart className="h-5 w-5" />
    <span className="absolute -top-1 -right-1 h-5 w-5 bg-white text-primary text-xs rounded-full flex items-center justify-center font-semibold">
      3
    </span>
  </button>,
  <button
    key="user"
    className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
    aria-label="User account"
  >
    <User className="h-5 w-5" />
  </button>,
];

export const Default: Story = {
  args: {
    searchPlaceholder: 'Search products...',
    onSearch: (query) => console.log('Search:', query),
  },
};

export const WithBrand: Story = {
  args: {
    brand: <BrandLogo />,
    searchPlaceholder: 'Search products...',
    onSearch: (query) => console.log('Search:', query),
  },
};

export const WithNavigationLinks: Story = {
  args: {
    brand: <BrandLogo />,
    navigationLinks: demoLinksAsNodes,
    searchPlaceholder: 'Search products...',
    onSearch: (query) => console.log('Search:', query),
  },
};

export const WithNavigationIcons: Story = {
  args: {
    brand: <BrandLogo />,
    navigationIcons: sampleIcons,
    searchPlaceholder: 'Search products...',
    onSearch: (query) => console.log('Search:', query),
  },
};

export const WithMobileMenuContent: Story = {
  args: {
    brand: <BrandLogo />,
    navigationLinks: sampleMobileLinks,
    mobileMenuContent: (
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground-secondary mb-2">
            Categories
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/category/electronics"
                className="block px-4 py-2 text-foreground hover:bg-background-secondary rounded-lg transition-colors"
              >
                Electronics
              </a>
            </li>
            <li>
              <a
                href="/category/clothing"
                className="block px-4 py-2 text-foreground hover:bg-background-secondary rounded-lg transition-colors"
              >
                Clothing
              </a>
            </li>
            <li>
              <a
                href="/category/home"
                className="block px-4 py-2 text-foreground hover:bg-background-secondary rounded-lg transition-colors"
              >
                Home & Garden
              </a>
            </li>
          </ul>
        </div>
        <div className="pt-4 border-t border-surface-active">
          <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors">
            Sign Out
          </button>
        </div>
      </div>
    ),
    searchPlaceholder: 'Search products...',
    onSearch: (query) => console.log('Search:', query),
  },
};

export const FullFeatured: Story = {
  args: {
    brand: <BrandLogo />,
    navigationIcons: sampleIcons,
    navigationLinks: sampleLinks,
    searchPlaceholder: 'Search for products, brands, and more...',
    onSearch: (query) => console.log('Search query:', query),
    mobileMenuContent: (
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground-secondary mb-2">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/orders"
                className="block px-4 py-2 text-foreground hover:bg-background-secondary rounded-lg transition-colors"
              >
                My Orders
              </a>
            </li>
            <li>
              <a
                href="/settings"
                className="block px-4 py-2 text-foreground hover:bg-background-secondary rounded-lg transition-colors"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="/help"
                className="block px-4 py-2 text-foreground hover:bg-background-secondary rounded-lg transition-colors"
              >
                Help Center
              </a>
            </li>
          </ul>
        </div>
        <div className="pt-4 border-t border-surface-active">
          <button className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
            Logout
          </button>
        </div>
      </div>
    ),
  },
};

export const MinimalNavbar: Story = {
  args: {
    brand: <span className="text-2xl font-black text-white">BRAND</span>,
    searchPlaceholder: 'Search...',
  },
};

export const EcommerceNavbar: Story = {
  args: {
    brand: <BrandLogo />,
    navigationLinks: sampleLinks,
    navigationIcons: [
      <button
        key="cart"
        className="relative p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
        aria-label="Shopping cart"
      >
        <ShoppingCart className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
          5
        </span>
      </button>,
    ],
    searchPlaceholder: 'Search for products...',
    onSearch: (query) => alert(`Searching for: ${query}`),
  },
};

export const WithoutSearch: Story = {
  args: {
    brand: <BrandLogo />,
    navigationLinks: sampleLinks,
    navigationIcons: sampleIcons,
    searchEnabled: false,
  },
};

export const WithCustomClassName: Story = {
  args: {
    brand: <BrandLogo />,
    navigationLinks: sampleLinks,
    className: 'shadow-xl',
    searchPlaceholder: 'Search...',
  },
};

export const FullFeaturedWithSubheader: Story = {
  args: {
    brand: <BrandLogo />,
    navigationIcons: sampleIcons,
    navigationLinks: sampleLinks,
    searchPlaceholder: 'Search for products, brands, and more...',
    onSearch: (query) => console.log('Search query:', query),
    mobileMenuContent: (
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground-secondary mb-2">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/orders"
                className="block px-4 py-2 text-foreground hover:bg-background-secondary rounded-lg transition-colors"
              >
                My Orders
              </a>
            </li>
            <li>
              <a
                href="/settings"
                className="block px-4 py-2 text-foreground hover:bg-background-secondary rounded-lg transition-colors"
              >
                Settings
              </a>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
};
