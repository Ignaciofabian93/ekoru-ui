import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
};

export default meta;
type Story = StoryObj<typeof Table>;

const columns = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  {
    key: 'price',
    header: 'Price',
    render: (value: unknown) => `$${value as number}`,
  },
];

const data = [
  { id: 1, name: 'Item A', price: 12.5 },
  { id: 2, name: 'Item B', price: 7.9 },
  { id: 3, name: 'Item C', price: 19.0 },
];

export const Default: Story = {
  args: {
    columns,
    data,
    striped: true,
    hover: true,
  },
};

export const Outlined: Story = {
  args: {
    columns,
    data,
    variant: 'outlined',
    striped: false,
    hover: true,
  },
};

export const EmptyState: Story = {
  args: {
    columns,
    data: [],
    emptyMessage: 'No products found',
  },
};
