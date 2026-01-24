import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    image: (
      <img
        src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800&q=60&auto=format&fit=crop"
        alt="Sustainable"
        className="w-full h-full object-cover"
      />
    ),
    title: 'Sustainable Living Tips',
    description: 'Small changes that make a big impact on the environment.',
    cta: (
      <a href="#" className="text-primary text-sm font-medium">
        Read more →
      </a>
    ),
  },
};

export const WithBadge: Story = {
  args: {
    image: (
      <img
        src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800&q=60&auto=format&fit=crop"
        alt="Sustainable"
        className="w-full h-full object-cover"
      />
    ),
    title: 'Featured Post',
    description: 'This post is featured by the editors.',
    cta: (
      <a href="#" className="text-primary text-sm font-medium">
        Read more →
      </a>
    ),
    hasBadge: true,
    badgeText: 'New',
    badgeColor: 'bg-green-500',
    textColor: 'text-white',
  },
};
