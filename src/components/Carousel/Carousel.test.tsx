import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { Carousel } from './index';

describe('Carousel', () => {
  const items = [
    {
      id: '1',
      node: <div key="1">One</div>,
    },
    {
      id: '2',
      node: <div key="2">Two</div>,
    },
  ];

  it('renders items', () => {
    render(<Carousel items={items.map((i) => i.node)} />);
    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
  });

  it('calls scrollTo when clicking arrows', async () => {
    render(<Carousel items={items.map((i) => i.node)} />);
    const container = screen.getByRole('list');
    expect(container).toBeTruthy();

    // ensure scrollTo exists in this JSDOM environment, then spy on it
    const el = container as HTMLElement & {
      scrollTo?: (options?: ScrollToOptions | number) => void;
    };
    if (typeof el.scrollTo !== 'function') {
      el.scrollTo = () => {};
    }
    const spy = vi
      .spyOn(
        el as unknown as { scrollTo: (...args: unknown[]) => unknown },
        'scrollTo'
      )
      .mockImplementation(() => {});

    // force canScrollRight true by manipulating dimensions and firing scroll event
    Object.defineProperty(container, 'scrollLeft', {
      value: 0,
      configurable: true,
    });
    Object.defineProperty(container, 'scrollWidth', {
      value: 2000,
      configurable: true,
    });
    Object.defineProperty(container, 'clientWidth', {
      value: 100,
      configurable: true,
    });
    // trigger the component's scroll handler
    container.dispatchEvent(new Event('scroll'));

    const right = await screen.findByLabelText('Scroll right');
    fireEvent.click(right);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
