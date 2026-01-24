import type { Meta, StoryObj } from '@storybook/react';
import { TrendingUp } from 'lucide-react';
import StatsCard from './StatsCard';

const meta: Meta<typeof StatsCard> = {
  title: 'Components/StatsCard',
  component: StatsCard,
};

export default meta;
type Story = StoryObj<typeof StatsCard>;

export const Default: Story = {
  args: {
    icon: TrendingUp,
    mainText: '1.2k',
    description: 'Sales',
  },
};

export const Fashion: Story = {
  args: {
    icon: TrendingUp,
    mainText: 'Fashion',
    description: '240 products',
  },
};
