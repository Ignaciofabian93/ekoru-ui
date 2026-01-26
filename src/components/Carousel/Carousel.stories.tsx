import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './index';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const sampleItems = [
  {
    id: '1',
    title: 'Item A',
    subtitle: 'Cool product',
    description: 'Description A',
    media: 'https://placehold.co/300x200/ddd/000?text=A',
  },
  {
    id: '2',
    title: 'Item B',
    subtitle: 'Another product',
    description: 'Description B',
    media: 'https://placehold.co/300x200/ddd/000?text=B',
  },
  {
    id: '3',
    title: 'Item C',
    subtitle: 'Nice product',
    description: 'Description C',
    media: 'https://placehold.co/300x200/ddd/000?text=C',
  },
];

export const Default: Story = {
  args: {
    header: 'Featured',
    description: 'Our top picks',
    items: sampleItems.map((item) => (
      <div
        key={item.id}
        className="w-64 bg-surface border border-border rounded-lg p-4 flex flex-col gap-2"
      >
        <div className="w-full h-36 bg-neutral/5 rounded-md overflow-hidden flex items-center justify-center">
          <img
            src={item.media}
            alt={item.title}
            className="object-contain max-h-full"
          />
        </div>
        <h3 className="font-semibold">{item.title}</h3>
        <p className="text-sm text-text-muted">{item.subtitle}</p>
        <p className="text-xs text-text-secondary mt-auto">
          {item.description}
        </p>
      </div>
    )),
  },
};

export const Compact: Story = {
  args: {
    header: 'Compact',
    items: sampleItems.map((item) => (
      <div
        key={item.id}
        className="w-48 bg-surface border border-border rounded-lg p-3"
      >
        <h4 className="font-medium">{item.title}</h4>
      </div>
    )),
    variant: 'compact',
  },
};

export const Centered: Story = {
  args: {
    header: 'Centered',
    items: sampleItems.map((item) => (
      <div
        key={item.id}
        className="w-64 bg-surface border border-border rounded-lg p-4"
      >
        <h4 className="font-medium">{item.title}</h4>
      </div>
    )),
    variant: 'centered',
  },
};
