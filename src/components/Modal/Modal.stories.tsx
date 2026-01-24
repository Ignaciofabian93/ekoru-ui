import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Modal size',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show close button in header',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Close modal when clicking overlay',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close modal when pressing Escape key',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component to handle modal state
const ModalWrapper = (args: React.ComponentProps<typeof Modal>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export const Default: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    isOpen: true,
    onClose: () => {},
    title: 'Modal Title',
    children: (
      <div>
        <p className="mb-4">This is a basic modal with default settings.</p>
        <p>Click outside or press Escape to close.</p>
      </div>
    ),
  },
};

export const Small: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Small Modal',
    size: 'sm',
    children: (
      <div>
        <p>This is a small modal with limited width.</p>
      </div>
    ),
  },
};

export const Large: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Large Modal',
    size: 'lg',
    children: (
      <div>
        <p className="mb-4">
          This is a large modal with more space for content.
        </p>
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
      </div>
    ),
  },
};

export const ExtraLarge: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Extra Large Modal',
    size: 'xl',
    children: (
      <div>
        <p className="mb-4">
          This is an extra large modal for extensive content.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-background-secondary rounded">
            <h4 className="font-semibold mb-2">Column 1</h4>
            <p>Content goes here</p>
          </div>
          <div className="p-4 bg-background-secondary rounded">
            <h4 className="font-semibold mb-2">Column 2</h4>
            <p>Content goes here</p>
          </div>
        </div>
      </div>
    ),
  },
};

export const FullWidth: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Full Width Modal',
    size: 'full',
    children: (
      <div>
        <p className="mb-4">This modal takes up most of the screen width.</p>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-background-secondary rounded">
              <h4 className="font-semibold mb-2">Section {i}</h4>
              <p>Content for section {i}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
};

export const WithoutTitle: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    children: (
      <div className="text-center">
        <h3 className="text-xl font-bold mb-4">Custom Content</h3>
        <p>This modal has no title prop, but includes custom content.</p>
      </div>
    ),
  },
};

export const WithoutCloseButton: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'No Close Button',
    showCloseButton: false,
    children: (
      <div>
        <p className="mb-4">
          This modal doesn&apos;t have a close button in the header.
        </p>
        <p>Click outside or press Escape to close.</p>
      </div>
    ),
  },
};

export const NoOverlayClose: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Click Outside Disabled',
    closeOnOverlayClick: false,
    children: (
      <div>
        <p className="mb-4">
          This modal won&apos;t close when clicking outside.
        </p>
        <p>Use the close button or press Escape to close.</p>
      </div>
    ),
  },
};

export const NoEscapeClose: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Escape Key Disabled',
    closeOnEscape: false,
    children: (
      <div>
        <p className="mb-4">
          This modal won&apos;t close when pressing Escape.
        </p>
        <p>Use the close button or click outside to close.</p>
      </div>
    ),
  },
};

export const WithForm: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Contact Form',
    size: 'md',
    children: (
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-input-border rounded-lg bg-input-bg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-input-border rounded-lg bg-input-bg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            rows={4}
            className="w-full px-3 py-2 border border-input-border rounded-lg bg-input-bg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Your message..."
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button variant="primary">Send</Button>
        </div>
      </form>
    ),
  },
};

export const LongContent: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Long Scrollable Content',
    children: (
      <div className="space-y-4">
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>
            Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
        ))}
      </div>
    ),
  },
};

export const ConfirmDialog: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Confirm Action',
    size: 'sm',
    children: (
      <div>
        <p className="mb-6">
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button variant="primary" className="bg-red-500 hover:bg-red-600">
            Delete
          </Button>
        </div>
      </div>
    ),
  },
};
