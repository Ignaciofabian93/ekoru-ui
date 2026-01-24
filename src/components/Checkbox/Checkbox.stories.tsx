import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, type CheckboxProps } from './Checkbox';
import { useState } from 'react';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const InteractiveCheckbox = (args: CheckboxProps) => {
  const [checked, setChecked] = useState(args.checked || false);
  return <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />;
};

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
  render: (args) => <InteractiveCheckbox {...args} />,
};

export const WithDescription: Story = {
  args: {
    label: 'Enable notifications',
    description: 'Receive email notifications about your account activity',
  },
  render: (args) => <InteractiveCheckbox {...args} />,
};

export const AllSizes: Story = {
  render: function Render() {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);

    return (
      <div className="space-y-4 w-full max-w-md">
        <Checkbox
          size="sm"
          label="Small checkbox"
          checked={checked1}
          onCheckedChange={setChecked1}
        />
        <Checkbox
          size="md"
          label="Medium checkbox"
          checked={checked2}
          onCheckedChange={setChecked2}
        />
        <Checkbox
          size="lg"
          label="Large checkbox"
          checked={checked3}
          onCheckedChange={setChecked3}
        />
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: function Render() {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);

    return (
      <div className="space-y-4 w-full max-w-md">
        <Checkbox
          variant="default"
          label="Default variant"
          checked={checked1}
          onCheckedChange={setChecked1}
        />
        <Checkbox
          variant="filled"
          label="Filled variant"
          checked={checked2}
          onCheckedChange={setChecked2}
        />
        <Checkbox
          variant="outline"
          label="Outline variant"
          checked={checked3}
          onCheckedChange={setChecked3}
        />
      </div>
    );
  },
};

export const CheckedState: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(true);

    return (
      <Checkbox
        label="Already checked"
        description="This checkbox starts in a checked state"
        checked={checked}
        onCheckedChange={setChecked}
      />
    );
  },
};

export const Disabled: Story = {
  args: { children: '' },
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <Checkbox label="Disabled unchecked" disabled={true} checked={false} />
      <Checkbox label="Disabled checked" disabled={true} checked={true} />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    label: 'Accept terms',
    errorMessage: 'You must accept the terms to continue',
    checked: false,
  },
  render: (args) => <InteractiveCheckbox {...args} />,
};

export const WithoutLabel: Story = {
  args: { children: '' },
  render: function Render() {
    const [checked, setChecked] = useState(false);

    return (
      <Checkbox
        checked={checked}
        onCheckedChange={setChecked}
        aria-label="Checkbox without visible label"
      />
    );
  },
};

export const FormExample: Story = {
  render: function Render() {
    const [preferences, setPreferences] = useState({
      newsletter: false,
      updates: false,
      marketing: false,
    });

    return (
      <div className="space-y-4 w-full max-w-md p-6 bg-background-secondary rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Email Preferences</h3>
        <Checkbox
          label="Newsletter"
          description="Weekly digest of articles and updates"
          checked={preferences.newsletter}
          onCheckedChange={(checked) =>
            setPreferences({ ...preferences, newsletter: checked })
          }
        />
        <Checkbox
          label="Product Updates"
          description="Important announcements about new features"
          checked={preferences.updates}
          onCheckedChange={(checked) =>
            setPreferences({ ...preferences, updates: checked })
          }
        />
        <Checkbox
          label="Marketing Communications"
          description="Promotional offers and special deals"
          checked={preferences.marketing}
          onCheckedChange={(checked) =>
            setPreferences({ ...preferences, marketing: checked })
          }
        />
      </div>
    );
  },
};

export const MultipleStates: Story = {
  render: function Render() {
    const [items, setItems] = useState([
      { id: 1, label: 'Item 1', checked: false },
      { id: 2, label: 'Item 2', checked: true },
      { id: 3, label: 'Item 3', checked: false },
      { id: 4, label: 'Item 4', checked: true },
    ]);

    const toggleItem = (id: number) => {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item
        )
      );
    };

    return (
      <div className="space-y-3 w-full max-w-md">
        {items.map((item) => (
          <Checkbox
            key={item.id}
            label={item.label}
            checked={item.checked}
            onCheckedChange={() => toggleItem(item.id)}
          />
        ))}
      </div>
    );
  },
};
