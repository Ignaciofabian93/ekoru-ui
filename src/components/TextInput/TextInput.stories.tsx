import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput';
import { Mail, User, Search, Lock, Phone } from 'lucide-react';

const meta = {
  title: 'Components/TextInput',
  component: TextInput,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outline'],
      description: 'The visual style variant of the input',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the input',
    },
    width: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
      description: 'The width of the input container',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
      description: 'The input type',
    },
    hasError: {
      control: 'boolean',
      description: 'Whether the input has an error state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    leftIcon: {
      control: false,
      description: 'Icon component to display on the left',
    },
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    variant: 'default',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
    type: 'email',
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    leftIcon: Mail,
    type: 'email',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    leftIcon: Lock,
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    leftIcon: Mail,
    errorMessage: 'Please enter a valid email address',
    type: 'email',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Username',
    placeholder: 'johndoe',
    leftIcon: User,
    disabled: true,
    value: 'johndoe',
  },
};

export const Filled: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search products...',
    variant: 'filled',
    leftIcon: Search,
    type: 'search',
  },
};

export const Outline: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    variant: 'outline',
    leftIcon: User,
  },
};

export const Small: Story = {
  args: {
    label: 'Small Input',
    placeholder: 'Small size',
    size: 'sm',
    leftIcon: User,
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium Input',
    placeholder: 'Medium size',
    size: 'md',
    leftIcon: User,
  },
};

export const Large: Story = {
  args: {
    label: 'Large Input',
    placeholder: 'Large size',
    size: 'lg',
    leftIcon: User,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <TextInput
        label="Default Variant"
        placeholder="Default input style"
        variant="default"
        leftIcon={Mail}
      />
      <TextInput
        label="Filled Variant"
        placeholder="Filled input style"
        variant="filled"
        leftIcon={Mail}
      />
      <TextInput
        label="Outline Variant"
        placeholder="Outline input style"
        variant="outline"
        leftIcon={Mail}
      />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <TextInput
        label="Small"
        placeholder="Small input"
        size="sm"
        leftIcon={User}
      />
      <TextInput
        label="Medium"
        placeholder="Medium input"
        size="md"
        leftIcon={User}
      />
      <TextInput
        label="Large"
        placeholder="Large input"
        size="lg"
        leftIcon={User}
      />
    </div>
  ),
};

export const DifferentWidths: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <TextInput
        label="Small Width"
        placeholder="33% width"
        width="sm"
        leftIcon={User}
      />
      <TextInput
        label="Medium Width"
        placeholder="50% width"
        width="md"
        leftIcon={User}
      />
      <TextInput
        label="Large Width"
        placeholder="66% width"
        width="lg"
        leftIcon={User}
      />
      <TextInput
        label="Full Width"
        placeholder="100% width"
        width="full"
        leftIcon={User}
      />
    </div>
  ),
};

export const EkoruExample: Story = {
  name: '🌱 Ekoru Login Form',
  render: () => (
    <div className="max-w-md mx-auto p-6 space-y-6 rounded-lg border-2 border-border">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
        <p className="text-foreground-secondary">
          Sign in to your Ekoru account
        </p>
      </div>
      <div className="space-y-4">
        <TextInput
          label="Email"
          placeholder="you@example.com"
          type="email"
          leftIcon={Mail}
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          type="password"
          leftIcon={Lock}
        />
        <TextInput
          label="Phone (Optional)"
          placeholder="+1 (555) 000-0000"
          type="tel"
          leftIcon={Phone}
          variant="filled"
        />
      </div>
    </div>
  ),
};
