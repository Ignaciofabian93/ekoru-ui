import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import HeroCarousel from './HeroCarousel';

describe('HeroCarousel', () => {
  const banners = [
    {
      id: '1',
      title: 'Banner 1',
      subtitle: 'Sub 1',
      description: 'Desc 1',
      image: 'img1.png',
      bgColor: 'bg-green-600',
    },
    {
      id: '2',
      title: 'Banner 2',
      subtitle: 'Sub 2',
      description: 'Desc 2',
      image: 'img2.png',
      bgColor: 'bg-blue-700',
    },
  ];

  it('renders the first banner by default', () => {
    render(<HeroCarousel banners={banners} />);
    expect(screen.getByText('Banner 1')).toBeInTheDocument();
    expect(screen.getByText('Sub 1')).toBeInTheDocument();
  });

  it('navigates to next and previous banners', () => {
    render(<HeroCarousel banners={banners} />);
    const nextBtn = screen.getByLabelText('Next banner');
    fireEvent.click(nextBtn);
    expect(screen.getByText('Banner 2')).toBeInTheDocument();
    const prevBtn = screen.getByLabelText('Previous banner');
    fireEvent.click(prevBtn);
    expect(screen.getByText('Banner 1')).toBeInTheDocument();
  });

  it('renders custom image component if provided', () => {
    const CustomImg = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
      <img data-testid="custom-img" {...props} />
    );
    render(<HeroCarousel banners={[banners[0]]} ImageComponent={CustomImg} />);
    expect(screen.getByTestId('custom-img')).toBeInTheDocument();
  });
});
