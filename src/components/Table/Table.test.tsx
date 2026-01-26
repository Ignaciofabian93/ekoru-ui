import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { Table } from './Table';

describe('Table', () => {
  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
  ];

  const data = [
    { id: 1, name: 'Alpha' },
    { id: 2, name: 'Beta' },
  ];

  it('renders header and rows', () => {
    render(<Table columns={columns} data={data} />);
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  it('renders empty message when no data', () => {
    render(<Table columns={columns} data={[]} emptyMessage="Empty" />);
    expect(screen.getByText('Empty')).toBeInTheDocument();
  });
});
