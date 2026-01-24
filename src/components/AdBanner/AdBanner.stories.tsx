import type { Meta, StoryObj } from '@storybook/react';
import { Info } from 'lucide-react';
import AdBanner from './AdBanner';
import { Button } from '../Button';

const meta: Meta<typeof AdBanner> = {
  title: 'Components/AdBanner',
  component: AdBanner,
};

export default meta;
type Story = StoryObj<typeof AdBanner>;

export const Default: Story = {
  args: {
    icon: Info,
    title: 'Join our newsletter',
    description: 'Get 10% off your first order',
    cta: <Button variant="primary">Subscribe</Button>,
  },
};

export const InlineCTA: Story = {
  args: {
    icon: Info,
    title: 'Limited time offer',
    description: 'Free shipping over $50',
    cta: (
      <a className="px-3 py-1 rounded bg-primary text-white" href="#">
        Shop now
      </a>
    ),
  },
};
