import type { Meta, StoryObj } from '@storybook/react';
import { Info } from 'lucide-react';
import AdBanner from './AdBanner';
import { Button } from '../Button';

const meta: Meta<typeof AdBanner> = {
  title: 'Components/AdBanner',
  component: AdBanner,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outlined', 'ghost'],
      description: 'The visual style variant of the ad banner',
    },
  },
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

export const Primary: Story = {
  args: {
    ...Default.args,
    variant: 'primary',
    animated: true,
  },
};

export const Secondary: Story = {
  args: {
    ...Default.args,
    variant: 'secondary',
    cta: <Button variant="secondary_outline">Subscribe</Button>,
  },
};

export const Outlined: Story = {
  args: {
    ...Default.args,
    variant: 'outlined',
    animated: false,
  },
};

export const Ghost: Story = {
  args: {
    ...Default.args,
    variant: 'ghost',
  },
};

export const NoAnimation: Story = {
  args: {
    ...Default.args,
    animated: false,
  },
};
