import type { Meta, StoryObj } from '@storybook/react';
import { Pagination, type PaginationProps } from './Pagination';
import { useState } from 'react';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

const InteractivePagination = (args: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage || 1);
  const [itemsPerPage, setItemsPerPage] = useState(args.itemsPerPage || 10);

  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      itemsPerPage={itemsPerPage}
      onItemsPerPageChange={setItemsPerPage}
    />
  );
};

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: () => {},
  },
  render: (args) => <InteractivePagination {...args} />,
};

export const AllVariants: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: () => {},
  },
  render: function Render() {
    const [page1, setPage1] = useState(1);
    const [page2, setPage2] = useState(1);
    const [page3, setPage3] = useState(1);

    return (
      <div className="space-y-8 w-full">
        <div>
          <p className="text-sm text-foreground-tertiary mb-2">Default</p>
          <Pagination
            variant="default"
            currentPage={page1}
            totalPages={10}
            onPageChange={setPage1}
            showItemsPerPage={false}
          />
        </div>
        <div>
          <p className="text-sm text-foreground-tertiary mb-2">Primary</p>
          <Pagination
            variant="primary"
            currentPage={page2}
            totalPages={10}
            onPageChange={setPage2}
            showItemsPerPage={false}
          />
        </div>
        <div>
          <p className="text-sm text-foreground-tertiary mb-2">Outline</p>
          <Pagination
            variant="outline"
            currentPage={page3}
            totalPages={10}
            onPageChange={setPage3}
            showItemsPerPage={false}
          />
        </div>
      </div>
    );
  },
};

export const AllSizes: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: () => {},
  },
  render: function Render() {
    const [page1, setPage1] = useState(1);
    const [page2, setPage2] = useState(1);
    const [page3, setPage3] = useState(1);

    return (
      <div className="space-y-8 w-full">
        <div>
          <p className="text-sm text-foreground-tertiary mb-2">Small</p>
          <Pagination
            size="sm"
            currentPage={page1}
            totalPages={10}
            onPageChange={setPage1}
            showItemsPerPage={false}
          />
        </div>
        <div>
          <p className="text-sm text-foreground-tertiary mb-2">Medium</p>
          <Pagination
            size="md"
            currentPage={page2}
            totalPages={10}
            onPageChange={setPage2}
            showItemsPerPage={false}
          />
        </div>
        <div>
          <p className="text-sm text-foreground-tertiary mb-2">Large</p>
          <Pagination
            size="lg"
            currentPage={page3}
            totalPages={10}
            onPageChange={setPage3}
            showItemsPerPage={false}
          />
        </div>
      </div>
    );
  },
};

export const WithItemsPerPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 20,
    itemsPerPage: 10,
    showItemsPerPage: true,
    onPageChange: () => {},
  },
  render: (args) => <InteractivePagination {...args} />,
};

export const WithoutIcons: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    showIcons: false,
    showItemsPerPage: false,
    onPageChange: () => {},
  },
  render: (args) => <InteractivePagination {...args} />,
};

export const WithoutPageInfo: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    showPageInfo: false,
    showItemsPerPage: false,
    onPageChange: () => {},
  },
  render: (args) => <InteractivePagination {...args} />,
};

export const CustomLabels: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    previousLabel: 'Anterior',
    nextLabel: 'Siguiente',
    showItemsPerPage: false,
    onPageChange: () => {},
  },
  render: (args) => <InteractivePagination {...args} />,
};

export const CustomPageInfo: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    pageInfoTemplate: 'Página {current} de {total}',
    showItemsPerPage: false,
    onPageChange: () => {},
  },
  render: (args) => <InteractivePagination {...args} />,
};

export const CustomItemsPerPageOptions: Story = {
  args: {
    currentPage: 1,
    totalPages: 50,
    itemsPerPage: 20,
    itemsPerPageOptions: [20, 40, 60, 80],
    showItemsPerPage: true,
    onPageChange: () => {},
  },
  render: (args) => <InteractivePagination {...args} />,
};

export const FullFeatured: Story = {
  args: {
    currentPage: 1,
    totalPages: 25,
    itemsPerPage: 10,
    variant: 'primary',
    size: 'md',
    showItemsPerPage: true,
    showPageInfo: true,
    showIcons: true,
    onPageChange: () => {},
  },
  render: (args) => <InteractivePagination {...args} />,
};

export const TableExample: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: () => {},
  },
  render: function Render() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Simulate data
    const totalItems = 87;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
      <div className="w-full max-w-4xl space-y-4">
        <div className="border border-input-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-background-secondary">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({
                length: Math.min(
                  itemsPerPage,
                  totalItems - (currentPage - 1) * itemsPerPage
                ),
              }).map((_, idx) => {
                const itemId = (currentPage - 1) * itemsPerPage + idx + 1;
                return (
                  <tr key={itemId} className="border-t border-input-border">
                    <td className="px-4 py-3 text-sm">{itemId}</td>
                    <td className="px-4 py-3 text-sm">User {itemId}</td>
                    <td className="px-4 py-3 text-sm">
                      user{itemId}@example.com
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-2 py-1 text-xs rounded-full bg-success/10 text-success">
                        Active
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
          variant="default"
        />
      </div>
    );
  },
};

export const MinimalEdgeCases: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: () => {},
  },
  render: function Render() {
    const [_page, _setPage] = useState(1);

    return (
      <div className="space-y-8 w-full">
        <div>
          <p className="text-sm text-foreground-tertiary mb-2">
            Single page (disabled navigation)
          </p>
          <Pagination
            currentPage={1}
            totalPages={1}
            onPageChange={() => {}}
            showItemsPerPage={false}
          />
        </div>
        <div>
          <p className="text-sm text-foreground-tertiary mb-2">
            Last page (next disabled)
          </p>
          <Pagination
            currentPage={10}
            totalPages={10}
            onPageChange={() => {}}
            showItemsPerPage={false}
          />
        </div>
      </div>
    );
  },
};
