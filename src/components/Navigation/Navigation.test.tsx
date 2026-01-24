import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Navbar from './Navigation';
import { Home, ShoppingCart } from 'lucide-react';

describe('Navbar', () => {
  const defaultProps = {
    searchPlaceholder: 'Search...',
    onSearch: vi.fn(),
  };

  it('renders without crashing', () => {
    render(<Navbar {...defaultProps} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders default EKORU text when no brand provided', () => {
    render(<Navbar {...defaultProps} />);
    expect(screen.getByText('EKORU')).toBeInTheDocument();
  });

  it('renders custom brand', () => {
    const CustomBrand = () => <span>Custom Brand</span>;
    render(<Navbar {...defaultProps} brand={<CustomBrand />} />);
    expect(screen.getByText('Custom Brand')).toBeInTheDocument();
  });

  it('renders search input with placeholder', () => {
    render(<Navbar {...defaultProps} searchPlaceholder="Search products..." />);
    const searchInputs = screen.getAllByPlaceholderText('Search products...');
    expect(searchInputs.length).toBeGreaterThan(0);
  });

  it('handles search input change', async () => {
    const user = userEvent.setup();
    render(<Navbar {...defaultProps} />);
    const searchInput = screen.getAllByPlaceholderText('Search...')[0];

    await user.type(searchInput, 'test query');
    expect(searchInput).toHaveValue('test query');
  });

  it('calls onSearch when search form is submitted', async () => {
    const onSearch = vi.fn();
    const user = userEvent.setup();
    render(<Navbar {...defaultProps} onSearch={onSearch} />);

    const searchInput = screen.getAllByPlaceholderText('Search...')[0];
    await user.type(searchInput, 'test query');

    const form = searchInput.closest('form');
    expect(form).not.toBeNull();
    if (form) {
      fireEvent.submit(form);
      expect(onSearch).toHaveBeenCalledWith('test query');
    }
  });

  it('renders navigation icons', () => {
    const icons = [
      <div key="icon1" data-testid="test-icon-1">
        Icon 1
      </div>,
      <div key="icon2" data-testid="test-icon-2">
        Icon 2
      </div>,
    ];
    render(<Navbar {...defaultProps} navigationIcons={icons} />);

    expect(screen.getByTestId('test-icon-1')).toBeInTheDocument();
    expect(screen.getByTestId('test-icon-2')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    const links = [
      <a key="home" href="/">
        <Home data-testid="home-icon" /> Home
      </a>,
      <a key="cart" href="/cart">
        <ShoppingCart data-testid="cart-icon" /> Cart
      </a>,
    ];
    render(<Navbar {...defaultProps} navigationLinks={links} />);

    expect(screen.getByText(/Home/)).toBeInTheDocument();
    expect(screen.getByText(/Cart/)).toBeInTheDocument();
  });

  it('toggles mobile menu when button is clicked', async () => {
    const user = userEvent.setup();
    render(<Navbar {...defaultProps} />);

    const menuButton = screen.getByLabelText('Toggle mobile menu');
    expect(menuButton).toBeInTheDocument();

    await user.click(menuButton);

    await waitFor(() => {
      expect(screen.getByText('Menu')).toBeInTheDocument();
    });
  });

  it('closes mobile menu when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<Navbar {...defaultProps} />);

    const menuButton = screen.getByLabelText('Toggle mobile menu');
    await user.click(menuButton);

    await waitFor(() => {
      expect(screen.getByText('Menu')).toBeInTheDocument();
    });

    const closeButton = screen.getByLabelText('Close mobile menu', {
      selector: 'button',
    });
    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText('Menu')).not.toBeInTheDocument();
    });
  });

  it('closes mobile menu when overlay is clicked', async () => {
    const user = userEvent.setup();
    render(<Navbar {...defaultProps} />);

    const menuButton = screen.getByLabelText('Toggle mobile menu');
    await user.click(menuButton);

    await waitFor(() => {
      expect(screen.getByText('Menu')).toBeInTheDocument();
    });

    const overlay = screen.getByLabelText('Close mobile menu', {
      selector: 'div',
    });
    await user.click(overlay);

    await waitFor(() => {
      expect(screen.queryByText('Menu')).not.toBeInTheDocument();
    });
  });

  it('closes mobile menu when Escape key is pressed', async () => {
    const user = userEvent.setup();
    render(<Navbar {...defaultProps} />);

    const menuButton = screen.getByLabelText('Toggle mobile menu');
    await user.click(menuButton);

    await waitFor(() => {
      expect(screen.getByText('Menu')).toBeInTheDocument();
    });

    fireEvent.keyDown(screen.getByRole('banner'), {
      key: 'Escape',
      code: 'Escape',
    });

    await waitFor(() => {
      expect(screen.queryByText('Menu')).not.toBeInTheDocument();
    });
  });

  it('renders custom mobile menu content', async () => {
    const user = userEvent.setup();
    const customContent = (
      <div data-testid="custom-content">Custom Menu Content</div>
    );
    render(<Navbar {...defaultProps} mobileMenuContent={customContent} />);

    const menuButton = screen.getByLabelText('Toggle mobile menu');
    await user.click(menuButton);

    await waitFor(() => {
      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
      expect(screen.getByText('Custom Menu Content')).toBeInTheDocument();
    });
  });

  it('applies custom className', () => {
    render(<Navbar {...defaultProps} className="custom-class" />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('custom-class');
  });

  it('renders navigation links in mobile menu', async () => {
    const user = userEvent.setup();
    const links = [
      <a key="home" href="/">
        <Home /> Home
      </a>,
      <a key="products" href="/products">
        <ShoppingCart /> Products
      </a>,
    ];
    render(<Navbar {...defaultProps} navigationLinks={links} />);

    const menuButton = screen.getByLabelText('Toggle mobile menu');
    await user.click(menuButton);

    await waitFor(() => {
      const mobileLinks = screen.getAllByText('Home');
      expect(mobileLinks.length).toBeGreaterThan(0);
      const mobileProductsLinks = screen.getAllByText('Products');
      expect(mobileProductsLinks.length).toBeGreaterThan(0);
    });
  });

  it('has correct ARIA attributes for mobile menu', async () => {
    const user = userEvent.setup();
    render(<Navbar {...defaultProps} />);

    const menuButton = screen.getByLabelText('Toggle mobile menu');
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(menuButton);

    await waitFor(() => {
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    });

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'Mobile menu');
  });

  it('renders both desktop and mobile search inputs', () => {
    render(<Navbar {...defaultProps} searchPlaceholder="Find items..." />);
    const searchInputs = screen.getAllByPlaceholderText('Find items...');
    expect(searchInputs).toHaveLength(2); // One for desktop, one for mobile
  });

  it('hides search when searchEnabled is false', () => {
    render(<Navbar {...defaultProps} searchEnabled={false} />);
    const searchElements = screen.queryAllByRole('search');
    expect(searchElements).toHaveLength(0);
  });

  it('shows custom side menu title', async () => {
    const user = userEvent.setup();
    render(<Navbar {...defaultProps} sideMenuTitle="Navigation" />);

    const menuButton = screen.getByLabelText('Toggle mobile menu');
    await user.click(menuButton);

    await waitFor(() => {
      expect(screen.getByText('Navigation')).toBeInTheDocument();
    });
  });

  it('prevents default form submission', async () => {
    const onSearch = vi.fn();
    render(<Navbar {...defaultProps} onSearch={onSearch} />);

    const searchInput = screen.getAllByPlaceholderText('Search...')[0];
    const form = searchInput.closest('form');

    const submitEvent = new Event('submit', {
      bubbles: true,
      cancelable: true,
    });
    const preventDefaultSpy = vi.spyOn(submitEvent, 'preventDefault');

    if (form) {
      form.dispatchEvent(submitEvent);
      expect(preventDefaultSpy).toHaveBeenCalled();
    }
  });
});
