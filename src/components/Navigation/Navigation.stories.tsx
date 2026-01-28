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

// Navigation links as objects (new API)
const demoNavLinks = demoLinks.map((l) => ({
  id: l.name.toLowerCase(),
  label: l.name,
  href: l.href,
}));

// Sample navigation links as React nodes
// sample navigation links as objects for the new `navigationLinks` prop
const sampleNavLinks = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'products', label: 'Products', href: '/products' },
  { id: 'wishlist', label: 'Wishlist', href: '/wishlist' },
];

// Sample mobile navigation links
const sampleMobileSections = [
  {
    title: 'Categories',
    links: [
      {
        id: 'electronics',
        label: 'Electronics',
        href: '/category/electronics',
        isAnchor: true,
      },
      {
        id: 'clothing',
        label: 'Clothing',
        href: '/category/clothing',
        isAnchor: true,
      },
      {
        id: 'home-garden',
        label: 'Home & Garden',
        href: '/category/home',
        isAnchor: true,
      },
    ],
  },
  {
    title: 'Categories 2',
    links: [
      {
        id: 'electronics',
        label: 'Electronics',
        href: '/category/electronics',
        isAnchor: true,
      },
      {
        id: 'clothing',
        label: 'Clothing',
        href: '/category/clothing',
        isAnchor: true,
      },
      {
        id: 'home-garden',
        label: 'Home & Garden',
        href: '/category/home',
        isAnchor: true,
      },
    ],
  },
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
    navigationLinks: demoNavLinks,
    searchPlaceholder: 'Search products...',
    onSearch: (query) => console.log('Search:', query),
  },
};

export const WithNavigationIcons: Story = {
  args: {
    brand: <BrandLogo />,
    appNavigationItems: sampleIcons,
    searchPlaceholder: 'Search products...',
    onSearch: (query) => console.log('Search:', query),
  },
};

export const WithMobileMenuContent: Story = {
  args: {
    brand: <BrandLogo />,
    navigationLinks: demoNavLinks,
    mobileMenuNavigationLinks: sampleMobileSections,
    searchPlaceholder: 'Search products...',
    onSearch: (query) => console.log('Search:', query),
  },
};

export const FullFeatured: Story = {
  args: {
    brand: <BrandLogo />,
    appNavigationItems: sampleIcons,
    navigationLinks: sampleNavLinks,
    searchPlaceholder: 'Search for products, brands, and more...',
    onSearch: (query) => console.log('Search query:', query),
    mobileMenuNavigationLinks: [
      {
        title: 'Quick Links',
        links: [
          { id: 'orders', label: 'My Orders', href: '/orders', isAnchor: true },
          {
            id: 'settings',
            label: 'Settings',
            href: '/settings',
            isAnchor: true,
          },
          { id: 'help', label: 'Help Center', href: '/help', isAnchor: true },
        ],
      },
    ],
  },
};

export const MinimalNavbar: Story = {
  args: {
    brand: <span className="text-2xl font-black text-white">BRAND</span>,
    navigationLinks: demoNavLinks,
    searchPlaceholder: 'Search...',
  },
};

export const EcommerceNavbar: Story = {
  args: {
    brand: <BrandLogo />,
    navigationLinks: sampleNavLinks,
    appNavigationItems: [
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
    navigationLinks: sampleNavLinks,
    appNavigationItems: sampleIcons,
    searchEnabled: false,
  },
};

export const WithCustomClassName: Story = {
  args: {
    brand: <BrandLogo />,
    navigationLinks: sampleNavLinks,
    className: 'shadow-xl',
    searchPlaceholder: 'Search...',
  },
};

export const FullFeaturedWithSubheader: Story = {
  args: {
    brand: <BrandLogo />,
    appNavigationItems: sampleIcons,
    navigationLinks: sampleNavLinks,
    searchPlaceholder: 'Search for products, brands, and more...',
    onSearch: (query) => console.log('Search query:', query),
    mobileMenuNavigationLinks: [
      {
        title: 'Quick Links',
        links: [
          { id: 'orders', label: 'My Orders', href: '/orders', isAnchor: true },
          {
            id: 'settings',
            label: 'Settings',
            href: '/settings',
            isAnchor: true,
          },
        ],
      },
    ],
  },
};
