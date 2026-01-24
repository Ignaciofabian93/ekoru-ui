import type { Meta, StoryObj } from '@storybook/react';
import { Textarea, type TextareaProps } from './Textarea';
import { useState } from 'react';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outline'],
    },
    textSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    width: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

const InteractiveTextarea = (args: TextareaProps) => {
  const [value, setValue] = useState(args.value || '');
  return (
    <Textarea
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
  render: (args) => <InteractiveTextarea {...args} />,
};

export const WithLabel: Story = {
  args: {
    label: 'Message',
    placeholder: 'Type your message here...',
  },
  render: (args) => <InteractiveTextarea {...args} />,
};

export const AllVariants: Story = {
  render: function Render() {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');

    return (
      <div className="space-y-4 w-full max-w-2xl">
        <Textarea
          variant="default"
          label="Default variant"
          placeholder="Default textarea..."
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
        />
        <Textarea
          variant="filled"
          label="Filled variant"
          placeholder="Filled textarea..."
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
        />
        <Textarea
          variant="outline"
          label="Outline variant"
          placeholder="Outline textarea..."
          value={value3}
          onChange={(e) => setValue3(e.target.value)}
        />
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: function Render() {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');

    return (
      <div className="space-y-4 w-full max-w-2xl">
        <Textarea
          textSize="sm"
          label="Small size"
          placeholder="Small textarea..."
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
        />
        <Textarea
          textSize="md"
          label="Medium size"
          placeholder="Medium textarea..."
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
        />
        <Textarea
          textSize="lg"
          label="Large size"
          placeholder="Large textarea..."
          value={value3}
          onChange={(e) => setValue3(e.target.value)}
        />
      </div>
    );
  },
};

export const WithCharCount: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    maxLength: 200,
    showCharCount: true,
  },
  render: (args) => <InteractiveTextarea {...args} />,
};

export const WithError: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter description...',
    errorMessage: 'Description is required',
    value: '',
  },
  render: (args) => <InteractiveTextarea {...args} />,
};

export const Disabled: Story = {
  args: {
    label: 'Disabled textarea',
    placeholder: 'This is disabled...',
    disabled: true,
    value: 'This textarea is disabled and cannot be edited',
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Read-only textarea',
    readOnly: true,
    value:
      'This textarea is read-only and cannot be edited, but can be selected',
  },
};

export const DifferentWidths: Story = {
  render: function Render() {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');

    return (
      <div className="space-y-4 w-full">
        <Textarea
          width="sm"
          label="Small width (1/3)"
          placeholder="Small width..."
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
        />
        <Textarea
          width="md"
          label="Medium width (1/2)"
          placeholder="Medium width..."
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
        />
        <Textarea
          width="lg"
          label="Large width (2/3)"
          placeholder="Large width..."
          value={value3}
          onChange={(e) => setValue3(e.target.value)}
        />
        <Textarea
          width="full"
          label="Full width"
          placeholder="Full width..."
          value={value4}
          onChange={(e) => setValue4(e.target.value)}
        />
      </div>
    );
  },
};

export const FormExample: Story = {
  args: { children: '' },
  render: function Render() {
    const [comment, setComment] = useState('');
    const [feedback, setFeedback] = useState('');

    return (
      <div className="space-y-6 w-full max-w-2xl p-6 bg-background-secondary rounded-lg">
        <h3 className="text-lg font-semibold">Feedback Form</h3>
        <Textarea
          label="Comments"
          placeholder="Share your thoughts..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={500}
          showCharCount={true}
        />
        <Textarea
          label="Additional Feedback"
          placeholder="Any other suggestions?"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          variant="filled"
          textSize="sm"
        />
      </div>
    );
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: 'Pre-filled content',
    value:
      'This is some pre-filled content that appears in the textarea by default.\n\nIt can span multiple lines and demonstrates how the textarea handles existing text.',
  },
  render: (args) => <InteractiveTextarea {...args} />,
};
