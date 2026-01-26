import type { Meta, StoryObj } from '@storybook/react';
import HeroCarousel from './HeroCarousel';

const meta: Meta<typeof HeroCarousel> = {
  title: 'Components/HeroCarousel',
  component: HeroCarousel,
};

export default meta;
type Story = StoryObj<typeof HeroCarousel>;

const banners = [
  {
    id: '1',
    title: 'Welcome to Ekoru',
    subtitle: 'Sustainable Shopping',
    description:
      'Discover eco-friendly products and join the movement for a greener planet.',
    image: 'https://placehold.co/200x200/21c55d/fff?text=Eco',
    bgColor: 'bg-green-600',
  },
  {
    id: '2',
    title: 'Shop Local',
    subtitle: 'Support Small Businesses',
    description:
      'Find unique items from local sellers and reduce your carbon footprint.',
    image: 'https://placehold.co/200x200/2563eb/fff?text=Local',
    bgColor: 'bg-blue-700',
  },
  {
    id: '3',
    title: 'Circular Economy',
    subtitle: 'Reuse & Recycle',
    description:
      'Give products a second life and help build a circular economy.',
    image: 'https://placehold.co/200x200/f59e42/fff?text=Reuse',
    bgColor: 'bg-orange-500',
  },
];

export const Default: Story = {
  args: {
    banners: [banners[0]],
  },
};

export const MultipleBanners: Story = {
  args: {
    banners,
  },
};

export const WithCustomImage: Story = {
  args: {
    banners: [banners[0]],
    ImageComponent: (props) => (
      <img
        {...props}
        style={{ border: '2px solid #21c55d', borderRadius: '50%' }}
      />
    ),
  },
};

export const SlowAutoScroll: Story = {
  args: {
    banners,
    autoScrollInterval: 8000,
  },
};
