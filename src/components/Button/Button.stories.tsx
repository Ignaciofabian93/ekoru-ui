import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { ChevronRight, Download, Heart, Plus, Trash2 } from 'lucide-react';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'outline',
        'ghost',
        'success',
        'warning',
        'error',
      ],
      description: 'The visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button',
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows a loading spinner and disables the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Makes the button take full width',
    },
    leftIcon: {
      control: false,
      description: 'Icon to display before the button text',
    },
    rightIcon: {
      control: false,
      description: 'Icon to display after the button text',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
};

export const Success: Story = {
  args: {
    children: 'Success Button',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning Button',
    variant: 'warning',
  },
};

export const Error: Story = {
  args: {
    children: 'Error Button',
    variant: 'error',
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium Button',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading Button',
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const WithLeftIcon: Story = {
  args: {
    children: 'Download',
    leftIcon: <Download size={16} />,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: 'Next',
    rightIcon: <ChevronRight size={16} />,
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="error">Error</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const IconAlignment: Story = {
  name: '🎯 Icon Alignment Testing',
  render: () => (
    <div className="space-y-8 p-6 bg-gray-50">
      {/* Left Icons - All Sizes */}
      <div>
        <h4 className="mb-3 font-semibold text-gray-700">
          Left Icons - All Sizes
        </h4>
        <div className="flex items-end gap-4 flex-wrap">
          <Button size="sm" leftIcon={Download}>
            Small
          </Button>
          <Button size="md" leftIcon={Download}>
            Medium
          </Button>
          <Button size="lg" leftIcon={Download}>
            Large
          </Button>
        </div>
      </div>

      {/* Right Icons - All Sizes */}
      <div>
        <h4 className="mb-3 font-semibold text-gray-700">
          Right Icons - All Sizes
        </h4>
        <div className="flex items-end gap-4 flex-wrap">
          <Button size="sm" rightIcon={ChevronRight}>
            Small
          </Button>
          <Button size="md" rightIcon={ChevronRight}>
            Medium
          </Button>
          <Button size="lg" rightIcon={ChevronRight}>
            Large
          </Button>
        </div>
      </div>

      {/* Both Icons */}
      <div>
        <h4 className="mb-3 font-semibold text-gray-700">
          Both Icons - All Sizes
        </h4>
        <div className="flex items-end gap-4 flex-wrap">
          <Button size="sm" leftIcon={Download} rightIcon={ChevronRight}>
            Small
          </Button>
          <Button size="md" leftIcon={Download} rightIcon={ChevronRight}>
            Medium
          </Button>
          <Button size="lg" leftIcon={Download} rightIcon={ChevronRight}>
            Large
          </Button>
        </div>
      </div>

      {/* All Variants with Icons */}
      <div>
        <h4 className="mb-3 font-semibold text-gray-700">
          All Variants with Icons
        </h4>
        <div className="flex flex-col gap-3">
          <Button variant="primary" leftIcon={Plus}>
            Primary
          </Button>
          <Button variant="secondary" leftIcon={Download}>
            Secondary
          </Button>
          <Button variant="outline" leftIcon={Heart}>
            Outline
          </Button>
          <Button variant="ghost" leftIcon={Trash2}>
            Ghost
          </Button>
          <Button variant="success" leftIcon={Plus}>
            Success
          </Button>
          <Button variant="warning" leftIcon={Download}>
            Warning
          </Button>
          <Button variant="error" leftIcon={Trash2}>
            Error
          </Button>
        </div>
      </div>

      {/* Icon Only (Short Text) */}
      <div>
        <h4 className="mb-3 font-semibold text-gray-700">
          Short Text with Icons
        </h4>
        <div className="flex gap-3 flex-wrap">
          <Button size="sm" leftIcon={Plus}>
            Add
          </Button>
          <Button size="md" leftIcon={Download}>
            Save
          </Button>
          <Button size="lg" rightIcon={ChevronRight}>
            Go
          </Button>
        </div>
      </div>

      {/* Long Text with Icons */}
      <div>
        <h4 className="mb-3 font-semibold text-gray-700">
          Long Text with Icons
        </h4>
        <div className="flex flex-col gap-3 max-w-md">
          <Button leftIcon={Download} rightIcon={ChevronRight}>
            Download Complete Documentation
          </Button>
          <Button variant="outline" leftIcon={Plus}>
            Add New Item to Your Collection
          </Button>
        </div>
      </div>

      {/* Loading State Comparison */}
      <div>
        <h4 className="mb-3 font-semibold text-gray-700">
          Loading vs Normal Icon
        </h4>
        <div className="flex gap-4 flex-wrap">
          <Button leftIcon={Download}>Normal</Button>
          <Button leftIcon={Download} isLoading>
            Loading
          </Button>
        </div>
      </div>
    </div>
  ),
};

export const EkoruExample: Story = {
  name: '🌱 Ekoru Sustainable Action',
  render: () => (
    <div className="flex flex-col gap-4 p-6 rounded-lg">
      <h3 className="text-lg font-semibold">
        Join the sustainable marketplace
      </h3>
      <div className="flex gap-3">
        <Button
          variant="primary"
          size="lg"
          rightIcon={<ChevronRight size={20} />}
        >
          Start Shopping
        </Button>
        <Button variant="outline" size="lg">
          Learn More
        </Button>
      </div>
      <div className="flex gap-3 flex-wrap">
        <Button variant="success" leftIcon={<Plus size={16} />}>
          Add to Cart
        </Button>
        <Button variant="error" leftIcon={<Trash2 size={16} />}>
          Remove
        </Button>
        <Button variant="ghost" leftIcon={<Heart size={16} />}>
          Favorite
        </Button>
      </div>
    </div>
  ),
};
