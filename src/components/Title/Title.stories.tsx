import type { Meta, StoryObj } from '@storybook/react';
import { Title } from './Title';

const meta = {
  title: 'Components/Title',
  component: Title,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold', 'extrabold'],
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
      ],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
  },
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'The Quick Brown Fox',
  },
};

export const AllLevels: Story = {
  args: { children: '' },
  render: () => (
    <div className="space-y-6 w-full max-w-4xl">
      <Title level="h1">Heading 1 - Main Page Title</Title>
      <Title level="h2">Heading 2 - Section Title</Title>
      <Title level="h3">Heading 3 - Subsection</Title>
      <Title level="h4">Heading 4 - Minor Heading</Title>
      <Title level="h5">Heading 5 - Small Heading</Title>
      <Title level="h6">Heading 6 - Smallest Heading</Title>
    </div>
  ),
};

export const AllWeights: Story = {
  args: { children: '' },
  render: () => (
    <div className="space-y-4 w-full max-w-4xl">
      <Title level="h2" weight="normal">
        Normal Weight Title
      </Title>
      <Title level="h2" weight="medium">
        Medium Weight Title
      </Title>
      <Title level="h2" weight="semibold">
        Semibold Weight Title
      </Title>
      <Title level="h2" weight="bold">
        Bold Weight Title
      </Title>
      <Title level="h2" weight="extrabold">
        Extrabold Weight Title
      </Title>
    </div>
  ),
};

export const AllColors: Story = {
  args: { children: '' },
  render: () => (
    <div className="space-y-4 w-full max-w-4xl">
      <Title level="h3" color="default">
        Default Color Title
      </Title>
      <Title level="h3" color="primary">
        Primary Color Title
      </Title>
      <Title level="h3" color="secondary">
        Secondary Color Title
      </Title>
      <Title level="h3" color="tertiary">
        Tertiary Color Title
      </Title>
      <Title level="h3" color="error">
        Error Color Title
      </Title>
      <Title level="h3" color="success">
        Success Color Title
      </Title>
      <Title level="h3" color="warning">
        Warning Color Title
      </Title>
    </div>
  ),
};

export const AllAlignments: Story = {
  args: { children: '' },
  render: () => (
    <div className="space-y-4 w-full max-w-4xl">
      <Title level="h3" align="left">
        Left Aligned Title
      </Title>
      <Title level="h3" align="center">
        Center Aligned Title
      </Title>
      <Title level="h3" align="right">
        Right Aligned Title
      </Title>
    </div>
  ),
};

export const SemanticVsVisual: Story = {
  args: { children: '' },
  render: () => (
    <div className="space-y-4 w-full max-w-4xl">
      <div className="space-y-2">
        <Title level="h1">Visual H1, Semantic H1</Title>
        <p className="text-sm text-foreground-tertiary">
          level=&quot;h1&quot; (default)
        </p>
      </div>
      <div className="space-y-2">
        <Title level="h3" as="h1">
          Visual H3, Semantic H1
        </Title>
        <p className="text-sm text-foreground-tertiary">
          level=&quot;h3&quot; as=&quot;h1&quot; - Looks like h3 but
          SEO/accessibility sees h1
        </p>
      </div>
      <div className="space-y-2">
        <Title level="h1" as="h2">
          Visual H1, Semantic H2
        </Title>
        <p className="text-sm text-foreground-tertiary">
          level=&quot;h1&quot; as=&quot;h2&quot; - Looks like h1 but
          SEO/accessibility sees h2
        </p>
      </div>
    </div>
  ),
};

export const PageHeadingExample: Story = {
  args: { children: '' },
  render: () => (
    <div className="space-y-6 w-full max-w-4xl">
      <Title level="h1" color="primary">
        Welcome to Ekoru
      </Title>
      <Title level="h2" color="secondary" weight="semibold">
        Your Eco-Friendly Search Engine
      </Title>
      <Title level="h3" color="tertiary" weight="medium">
        Plant trees while you search the web
      </Title>
    </div>
  ),
};

export const WithCustomClassName: Story = {
  args: {
    level: 'h2',
    className: 'underline decoration-primary decoration-2 underline-offset-4',
    children: 'Custom Styled Title',
  },
};
