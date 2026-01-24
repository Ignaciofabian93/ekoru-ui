import type { Meta, StoryObj } from '@storybook/react';
import { Select, type SelectProps } from './Select';
import { MapPin, Tag, Package } from 'lucide-react';
import { useState } from 'react';

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outline'],
      description: 'The visual style variant of the select',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the select',
    },
    width: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
      description: 'The width of the select container',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the select is read-only',
    },
    searchEnabled: {
      control: 'boolean',
      description: 'Whether to enable search functionality',
    },
    showColorIcon: {
      control: 'boolean',
      description: 'Whether to show color icons',
    },
    dropdownDirection: {
      control: 'select',
      options: ['up', 'down'],
      description: 'Direction for dropdown expansion',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const countryOptions = [
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Spain', value: 'es' },
  { label: 'Italy', value: 'it' },
  { label: 'Japan', value: 'jp' },
  { label: 'China', value: 'cn' },
  { label: 'Australia', value: 'au' },
];

const categoryOptions = [
  { label: 'Electronics', value: 'electronics' },
  { label: 'Clothing', value: 'clothing' },
  { label: 'Food & Beverage', value: 'food' },
  { label: 'Home & Garden', value: 'home' },
  { label: 'Sports & Outdoors', value: 'sports' },
];

const colorOptions = [
  { label: 'Red', value: 'red', iconColor: '#EF4444' },
  { label: 'Blue', value: 'blue', iconColor: '#3B82F6' },
  { label: 'Green', value: 'green', iconColor: '#10B981' },
  { label: 'Yellow', value: 'yellow', iconColor: '#F59E0B' },
  { label: 'Purple', value: 'purple', iconColor: '#8B5CF6' },
  { label: 'White', value: 'white', iconColor: '#FFFFFF' },
  { label: 'Black', value: 'black', iconColor: '#000000' },
];

// Interactive wrapper component
const InteractiveSelect = (args: SelectProps) => {
  const [value, setValue] = useState<string | number>('');
  return <Select {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <InteractiveSelect {...args} />,
  args: {
    placeholder: 'Select an option...',
    options: countryOptions,
    variant: 'default',
  },
};

export const WithLabel: Story = {
  render: (args) => <InteractiveSelect {...args} />,
  args: {
    label: 'Country',
    placeholder: 'Choose your country',
    options: countryOptions,
  },
};

export const WithLeftIcon: Story = {
  render: (args) => <InteractiveSelect {...args} />,
  args: {
    label: 'Location',
    placeholder: 'Select location',
    leftIcon: MapPin,
    options: countryOptions,
  },
};

export const WithError: Story = {
  render: (args) => <InteractiveSelect {...args} />,
  args: {
    label: 'Category',
    placeholder: 'Select a category',
    leftIcon: Tag,
    options: categoryOptions,
    errorMessage: 'Please select a category',
  },
};

export const Disabled: Story = {
  render: (args) => <InteractiveSelect {...args} />,
  args: {
    label: 'Category',
    placeholder: 'Not available',
    leftIcon: Package,
    options: categoryOptions,
    disabled: true,
  },
};

export const ReadOnly: Story = {
  render: (args) => <InteractiveSelect {...args} />,
  args: {
    label: 'Selected Category',
    options: categoryOptions,
    readOnly: true,
    value: 'electronics',
  },
};

export const WithColorIcons: Story = {
  render: (args) => <InteractiveSelect {...args} />,
  args: {
    label: 'Color',
    placeholder: 'Choose a color',
    options: colorOptions,
    showColorIcon: true,
  },
};

export const NoSearch: Story = {
  render: (args) => <InteractiveSelect {...args} />,
  args: {
    label: 'Category',
    placeholder: 'Select category',
    options: categoryOptions,
    searchEnabled: false,
  },
};

export const DropdownUp: Story = {
  render: (args) => <InteractiveSelect {...args} />,
  args: {
    label: 'Country',
    placeholder: 'Select country',
    options: countryOptions,
    dropdownDirection: 'up',
  },
  decorators: [
    (Story) => (
      <div style={{ marginTop: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const FilledVariant: Story = {
  render: (args) => <InteractiveSelect {...args} />,
  args: {
    label: 'Country',
    placeholder: 'Select country',
    variant: 'filled',
    options: countryOptions,
    leftIcon: MapPin,
  },
};

export const OutlineVariant: Story = {
  render: (args) => <InteractiveSelect {...args} />,
  args: {
    label: 'Category',
    placeholder: 'Select category',
    variant: 'outline',
    options: categoryOptions,
    leftIcon: Tag,
  },
};

export const SmallSize: Story = {
  render: (args) => <InteractiveSelect {...args} />,
  args: {
    label: 'Size',
    placeholder: 'Small select',
    size: 'sm',
    options: categoryOptions,
  },
};

export const LargeSize: Story = {
  render: (args) => <InteractiveSelect {...args} />,
  args: {
    label: 'Size',
    placeholder: 'Large select',
    size: 'lg',
    options: categoryOptions,
  },
};

export const AllSizes: Story = {
  render: () => {
    const AllSizesComponent = () => {
      const [smallValue, setSmallValue] = useState<string | number>('');
      const [mediumValue, setMediumValue] = useState<string | number>('');
      const [largeValue, setLargeValue] = useState<string | number>('');

      return (
        <div className="space-y-6">
          <Select
            label="Small"
            size="sm"
            options={categoryOptions}
            value={smallValue}
            onChange={setSmallValue}
            placeholder="Small select"
          />
          <Select
            label="Medium"
            size="md"
            options={categoryOptions}
            value={mediumValue}
            onChange={setMediumValue}
            placeholder="Medium select"
          />
          <Select
            label="Large"
            size="lg"
            options={categoryOptions}
            value={largeValue}
            onChange={setLargeValue}
            placeholder="Large select"
          />
        </div>
      );
    };
    return <AllSizesComponent />;
  },
};

export const AllVariants: Story = {
  render: () => {
    const AllVariantsComponent = () => {
      const [defaultValue, setDefaultValue] = useState<string | number>('');
      const [filledValue, setFilledValue] = useState<string | number>('');
      const [outlineValue, setOutlineValue] = useState<string | number>('');

      return (
        <div className="space-y-6">
          <Select
            label="Default"
            variant="default"
            options={categoryOptions}
            value={defaultValue}
            onChange={setDefaultValue}
            placeholder="Default variant"
            leftIcon={Package}
          />
          <Select
            label="Filled"
            variant="filled"
            options={categoryOptions}
            value={filledValue}
            onChange={setFilledValue}
            placeholder="Filled variant"
            leftIcon={Package}
          />
          <Select
            label="Outline"
            variant="outline"
            options={categoryOptions}
            value={outlineValue}
            onChange={setOutlineValue}
            placeholder="Outline variant"
            leftIcon={Package}
          />
        </div>
      );
    };
    return <AllVariantsComponent />;
  },
};

export const DifferentWidths: Story = {
  render: () => {
    const DifferentWidthsComponent = () => {
      const [value1, setValue1] = useState<string | number>('');
      const [value2, setValue2] = useState<string | number>('');
      const [value3, setValue3] = useState<string | number>('');
      const [value4, setValue4] = useState<string | number>('');

      return (
        <div className="space-y-6">
          <Select
            label="Small Width"
            width="sm"
            options={categoryOptions}
            value={value1}
            onChange={setValue1}
            placeholder="33% width"
          />
          <Select
            label="Medium Width"
            width="md"
            options={categoryOptions}
            value={value2}
            onChange={setValue2}
            placeholder="50% width"
          />
          <Select
            label="Large Width"
            width="lg"
            options={categoryOptions}
            value={value3}
            onChange={setValue3}
            placeholder="66% width"
          />
          <Select
            label="Full Width"
            width="full"
            options={categoryOptions}
            value={value4}
            onChange={setValue4}
            placeholder="100% width"
          />
        </div>
      );
    };
    return <DifferentWidthsComponent />;
  },
};

export const EkoruExample: Story = {
  name: '🌱 Ekoru Form Example',
  render: () => {
    const EkoruExampleComponent = () => {
      const [country, setCountry] = useState<string | number>('');
      const [category, setCategory] = useState<string | number>('');
      const [color, setColor] = useState<string | number>('');

      return (
        <div className="max-w-md space-y-6 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold">Sustainable Product Filter</h3>
          <Select
            label="Shipping Location"
            placeholder="Select your country"
            leftIcon={MapPin}
            options={countryOptions}
            value={country}
            onChange={setCountry}
          />
          <Select
            label="Product Category"
            placeholder="Choose category"
            leftIcon={Tag}
            options={categoryOptions}
            value={category}
            onChange={setCategory}
          />
          <Select
            label="Product Color"
            placeholder="Pick a color"
            options={colorOptions}
            showColorIcon={true}
            value={color}
            onChange={setColor}
          />
        </div>
      );
    };
    return <EkoruExampleComponent />;
  },
};
