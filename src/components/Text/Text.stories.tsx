import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['p', 'span', 'label', 'blockquote', 'small', 'code'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg', 'xl'],
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
    },
    color: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'tertiary',
        'error',
        'success',
        'warning',
        'muted',
      ],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children:
      'The quick brown fox jumps over the lazy dog. This is a sample paragraph text.',
  },
};

export const AllVariants: Story = {
  args: { children: '' },
  render: () => (
    <div className="space-y-4 w-full max-w-4xl">
      <Text variant="p">
        Paragraph: The quick brown fox jumps over the lazy dog. This is the
        default text variant used for body copy and longer content blocks.
      </Text>
      <Text variant="span">
        Span: Inline text element that flows with surrounding content.
      </Text>
      <Text variant="label" htmlFor="example">
        Label: Form label text (typically used with inputs)
      </Text>
      <Text variant="blockquote">
        Blockquote: &quot;This is a quoted text that stands out from the main
        content with a border and italic styling.&quot;
      </Text>
      <Text variant="small">
        Small: Fine print or supplementary information
      </Text>
      <Text variant="code">const example = &quot;inline code block&quot;;</Text>
    </div>
  ),
};

export const AllSizes: Story = {
  args: { children: '' },
  render: () => (
    <div className="space-y-4 w-full max-w-4xl">
      <Text size="xs">Extra Small (xs): Very small text for fine print</Text>
      <Text size="sm">Small (sm): Reduced size for secondary content</Text>
      <Text size="base">Base: Default body text size</Text>
      <Text size="lg">Large (lg): Emphasized text, slightly larger</Text>
      <Text size="xl">Extra Large (xl): Prominent text for emphasis</Text>
    </div>
  ),
};

export const AllWeights: Story = {
  args: { children: '' },
  render: () => (
    <div className="space-y-4 w-full max-w-4xl">
      <Text weight="normal">Normal: Regular text weight (default)</Text>
      <Text weight="medium">Medium: Slightly heavier than normal</Text>
      <Text weight="semibold">Semibold: Bold-ish for emphasis</Text>
      <Text weight="bold">Bold: Strong emphasis and importance</Text>
    </div>
  ),
};

export const AllColors: Story = {
  args: { children: '' },
  render: () => (
    <div className="space-y-4 w-full max-w-4xl">
      <Text color="default">Default: Standard foreground color</Text>
      <Text color="primary">Primary: Brand color for key elements</Text>
      <Text color="secondary">Secondary: Less prominent content</Text>
      <Text color="tertiary">Tertiary: Subtle, low-emphasis text</Text>
      <Text color="error">Error: Indicates errors or problems</Text>
      <Text color="success">Success: Positive feedback and confirmation</Text>
      <Text color="warning">Warning: Caution or important notices</Text>
      <Text color="muted">Muted: Very subtle, background text</Text>
    </div>
  ),
};

export const AllAlignments: Story = {
  args: { children: '' },
  render: () => (
    <div className="space-y-4 w-full max-w-4xl">
      <Text align="left">
        Left aligned text (default). The quick brown fox jumps over the lazy
        dog.
      </Text>
      <Text align="center">
        Center aligned text. The quick brown fox jumps over the lazy dog.
      </Text>
      <Text align="right">
        Right aligned text. The quick brown fox jumps over the lazy dog.
      </Text>
      <Text align="justify">
        Justified text spreads evenly across the line. The quick brown fox jumps
        over the lazy dog. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit.
      </Text>
    </div>
  ),
};

export const CombinedVariants: Story = {
  args: { children: '' },
  render: () => (
    <div className="space-y-4 w-full max-w-4xl">
      <Text size="lg" weight="bold" color="primary">
        Large, Bold, Primary Text
      </Text>
      <Text size="sm" color="tertiary" weight="medium">
        Small, Medium, Tertiary Text
      </Text>
      <Text variant="blockquote" size="lg" color="primary">
        &quot;A large primary colored blockquote for emphasis&quot;
      </Text>
      <Text variant="small" color="error" weight="semibold">
        Small error message text
      </Text>
    </div>
  ),
};

export const FormExample: Story = {
  args: { children: '' },
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <div className="space-y-2">
        <Text variant="label" htmlFor="name" weight="medium">
          Full Name
        </Text>
        <input
          id="name"
          type="text"
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter your name"
        />
        <Text variant="small" color="tertiary">
          Please enter your legal name
        </Text>
      </div>
      <div className="space-y-2">
        <Text variant="label" htmlFor="email" weight="medium" color="error">
          Email Address *
        </Text>
        <input
          id="email"
          type="email"
          className="w-full px-3 py-2 border border-error rounded"
          placeholder="you@example.com"
        />
        <Text variant="small" color="error">
          This field is required
        </Text>
      </div>
    </div>
  ),
};

export const ContentExample: Story = {
  args: { children: '' },
  render: () => (
    <div className="space-y-6 w-full max-w-4xl">
      <Text size="lg" weight="semibold">
        Introduction to Component Design
      </Text>
      <Text>
        Building reusable components is essential for maintaining consistency
        and efficiency in modern web applications. A well-designed component
        system provides flexibility while enforcing design standards.
      </Text>
      <Text variant="blockquote" color="primary">
        &quot;Design is not just what it looks like and feels like. Design is
        how it works.&quot; — Steve Jobs
      </Text>
      <Text>
        When creating components, consider accessibility, performance, and
        developer experience. Use <Text variant="code">TypeScript</Text> for
        type safety and <Text variant="code">CVA</Text> for variant management.
      </Text>
      <Text variant="small" color="tertiary">
        Last updated: January 2026
      </Text>
    </div>
  ),
};

export const WithCustomClassName: Story = {
  args: {
    className: 'italic hover:text-primary cursor-pointer',
    children: 'Custom styled text with hover effect',
  },
};

export const AsProperty: Story = {
  args: { children: '' },
  render: () => (
    <div className="space-y-4 w-full max-w-4xl">
      <Text variant="p" as="div">
        Paragraph styling but rendered as a div element
      </Text>
      <Text variant="label" as="span">
        Label styling but rendered as a span element
      </Text>
      <Text variant="small" as="p" color="tertiary">
        Small styling but rendered as a paragraph
      </Text>
    </div>
  ),
};
