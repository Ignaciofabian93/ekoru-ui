import type { Meta, StoryObj } from '@storybook/react';
import { Banner } from './Banner';

const meta = {
  title: 'Components/Banner',
  component: Banner,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outlined', 'ghost'],
      description: 'The visual style variant of the banner',
    },
    animated: {
      control: 'boolean',
      description: 'Whether to show animated background effect',
    },
    showDots: {
      control: 'boolean',
      description: 'Whether to show decorative dots around the title',
    },
    title: {
      control: 'text',
      description: 'The main title text of the banner',
    },
    description: {
      control: 'text',
      description: 'The description text of the banner',
    },
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'Welcome to Ekoru',
    description: 'Join the sustainable marketplace and make a difference',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    title: 'Eco-Friendly Products',
    description: 'Discover sustainable alternatives for everyday life',
    variant: 'secondary',
  },
};

export const Outlined: Story = {
  args: {
    title: 'Featured Collection',
    description: 'Explore our curated selection of sustainable products',
    variant: 'outlined',
  },
};

export const Ghost: Story = {
  args: {
    title: 'Special Offer',
    description: 'Save on eco-conscious items this month',
    variant: 'ghost',
  },
};

export const WithoutDots: Story = {
  args: {
    title: 'Clean Design',
    description: 'Banner without decorative dots for a minimal look',
    variant: 'primary',
    showDots: false,
  },
};

export const WithoutAnimation: Story = {
  args: {
    title: 'Static Banner',
    description: 'Banner with animations disabled',
    variant: 'primary',
    animated: false,
  },
};

export const AllVariants: Story = {
  args: {
    title: '',
    description: '',
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <Banner
        title="Primary Variant"
        description="The default style with gradient background and animations"
        variant="primary"
      />
      <Banner
        title="Secondary Variant"
        description="Transparent background for overlay usage"
        variant="secondary"
      />
      <Banner
        title="Outlined Variant"
        description="Border style with subtle backdrop blur"
        variant="outlined"
      />
      <Banner
        title="Ghost Variant"
        description="Minimal style with light background"
        variant="ghost"
      />
    </div>
  ),
};

export const EkoruExample: Story = {
  name: '🌱 Ekoru Sustainability Campaign',
  args: {
    title: '',
    description: '',
  },
  render: () => (
    <div className="space-y-8">
      <Banner
        title="Plant a Tree with Every Purchase"
        description="Join thousands of eco-warriors making a positive impact on our planet"
        variant="primary"
      />
      <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg">
        <Banner
          title="Featured: Zero-Waste Essentials"
          description="Explore our hand-picked selection of sustainable everyday items"
          variant="outlined"
        />
      </div>
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    title: 'Sustainability Is Our Priority',
    description:
      'At Ekoru, we believe in creating a marketplace that not only serves your shopping needs but also contributes to a healthier planet. Every purchase you make helps fund environmental initiatives worldwide.',
    variant: 'primary',
  },
};

export const ShortContent: Story = {
  args: {
    title: 'Go Green',
    description: 'Shop sustainable',
    variant: 'primary',
  },
};
