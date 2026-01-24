import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import EnvironmentalImpactModal from './EnvironmentalImpactModal';
import { Button } from '../Button/Button';
import type { EnvironmentalImpactModalProps } from './EnvironmentalImpactModal';

const meta = {
  title: 'Components/EnvironmentalImpactModal',
  component: EnvironmentalImpactModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EnvironmentalImpactModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component to handle modal state
const ModalWrapper = (args: Omit<EnvironmentalImpactModalProps, 'isOpen' | 'onClose'>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Ver Impacto Ambiental</Button>
      <EnvironmentalImpactModal
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

const sampleImpact = {
  totalCo2SavingsKG: 12.5,
  totalWaterSavingsLT: 450,
  materialBreakdown: [
    {
      materialType: 'Algodón',
      percentage: 60,
      weightKG: 0.3,
      co2SavingsKG: 7.5,
      waterSavingsLT: 270,
    },
    {
      materialType: 'Poliéster',
      percentage: 30,
      weightKG: 0.15,
      co2SavingsKG: 3.75,
      waterSavingsLT: 135,
    },
    {
      materialType: 'Elastano',
      percentage: 10,
      weightKG: 0.05,
      co2SavingsKG: 1.25,
      waterSavingsLT: 45,
    },
  ],
};

export const Default: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    environmentalImpact: sampleImpact,
  },
};

export const SingleMaterial: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    environmentalImpact: {
      totalCo2SavingsKG: 8.2,
      totalWaterSavingsLT: 320,
      materialBreakdown: [
        {
          materialType: 'Algodón Orgánico',
          percentage: 100,
          weightKG: 0.5,
          co2SavingsKG: 8.2,
          waterSavingsLT: 320,
        },
      ],
    },
  },
};

export const HighImpact: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    environmentalImpact: {
      totalCo2SavingsKG: 45.8,
      totalWaterSavingsLT: 1850,
      materialBreakdown: [
        {
          materialType: 'Denim',
          percentage: 70,
          weightKG: 1.2,
          co2SavingsKG: 32.06,
          waterSavingsLT: 1295,
        },
        {
          materialType: 'Algodón',
          percentage: 25,
          weightKG: 0.4,
          co2SavingsKG: 11.45,
          waterSavingsLT: 462.5,
        },
        {
          materialType: 'Elastano',
          percentage: 5,
          weightKG: 0.08,
          co2SavingsKG: 2.29,
          waterSavingsLT: 92.5,
        },
      ],
    },
  },
};

export const LowImpact: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    environmentalImpact: {
      totalCo2SavingsKG: 2.5,
      totalWaterSavingsLT: 95,
      materialBreakdown: [
        {
          materialType: 'Nylon',
          percentage: 80,
          weightKG: 0.1,
          co2SavingsKG: 2.0,
          waterSavingsLT: 76,
        },
        {
          materialType: 'Spandex',
          percentage: 20,
          weightKG: 0.025,
          co2SavingsKG: 0.5,
          waterSavingsLT: 19,
        },
      ],
    },
  },
};

export const ManyMaterials: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    environmentalImpact: {
      totalCo2SavingsKG: 18.7,
      totalWaterSavingsLT: 720,
      materialBreakdown: [
        {
          materialType: 'Algodón',
          percentage: 40,
          weightKG: 0.25,
          co2SavingsKG: 7.48,
          waterSavingsLT: 288,
        },
        {
          materialType: 'Poliéster',
          percentage: 25,
          weightKG: 0.16,
          co2SavingsKG: 4.675,
          waterSavingsLT: 180,
        },
        {
          materialType: 'Lino',
          percentage: 15,
          weightKG: 0.09,
          co2SavingsKG: 2.805,
          waterSavingsLT: 108,
        },
        {
          materialType: 'Viscosa',
          percentage: 10,
          weightKG: 0.06,
          co2SavingsKG: 1.87,
          waterSavingsLT: 72,
        },
        {
          materialType: 'Elastano',
          percentage: 10,
          weightKG: 0.06,
          co2SavingsKG: 1.87,
          waterSavingsLT: 72,
        },
      ],
    },
  },
};

export const NoMaterialBreakdown: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    environmentalImpact: {
      totalCo2SavingsKG: 10.0,
      totalWaterSavingsLT: 400,
      materialBreakdown: [],
    },
  },
};

export const LargeNumbers: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    environmentalImpact: {
      totalCo2SavingsKG: 125.8,
      totalWaterSavingsLT: 5250,
      materialBreakdown: [
        {
          materialType: 'Algodón Industrial',
          percentage: 85,
          weightKG: 5.2,
          co2SavingsKG: 106.93,
          waterSavingsLT: 4462.5,
        },
        {
          materialType: 'Poliéster Reciclado',
          percentage: 15,
          weightKG: 0.9,
          co2SavingsKG: 18.87,
          waterSavingsLT: 787.5,
        },
      ],
    },
  },
};
