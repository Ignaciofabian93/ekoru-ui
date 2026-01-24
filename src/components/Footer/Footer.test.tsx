import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';

describe('Footer', () => {
  it('renders brand and description', () => {
    render(<Footer brand={<span>EKORU</span>} description="Eco marketplace" />);
    expect(screen.getByText('EKORU')).toBeInTheDocument();
    expect(screen.getByText('Eco marketplace')).toBeInTheDocument();
  });

  it('renders social links', () => {
    render(
      <Footer
        socialLinks={[
          <a key="tw" href="#">
            Twitter
          </a>,
          <a key="ig" href="#">
            Instagram
          </a>,
        ]}
      />
    );

    expect(screen.getByText('Twitter')).toBeInTheDocument();
    expect(screen.getByText('Instagram')).toBeInTheDocument();
  });

  it('renders explore, community and legal sections with items', () => {
    render(
      <Footer
        exploreItems={[
          <a key="home" href="#">
            Home
          </a>,
        ]}
        communityItems={[
          <a key="forum" href="#">
            Forum
          </a>,
        ]}
        legalItems={[
          <a key="terms" href="#">
            Terms
          </a>,
        ]}
      />
    );

    expect(screen.getByText('Explore')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();

    expect(screen.getByText('Community')).toBeInTheDocument();
    expect(screen.getByText('Forum')).toBeInTheDocument();

    expect(screen.getByText('Legal')).toBeInTheDocument();
    expect(screen.getByText('Terms')).toBeInTheDocument();
  });

  it('supports custom section labels', () => {
    render(
      <Footer
        exploreLabel="Browse"
        communityLabel="People"
        legalLabel="Policies"
        exploreItems={[
          <a key="a" href="#">
            X
          </a>,
        ]}
        communityItems={[
          <a key="b" href="#">
            Y
          </a>,
        ]}
        legalItems={[
          <a key="c" href="#">
            Z
          </a>,
        ]}
      />
    );

    expect(screen.getByText('Browse')).toBeInTheDocument();
    expect(screen.getByText('People')).toBeInTheDocument();
    expect(screen.getByText('Policies')).toBeInTheDocument();
  });

  it('does not render section headings when items are not provided', () => {
    render(<Footer />);

    expect(screen.queryByText('Explore')).toBeNull();
    expect(screen.queryByText('Community')).toBeNull();
    expect(screen.queryByText('Legal')).toBeNull();
  });

  it('renders provided copyright text', () => {
    render(<Footer copyRightText="Test copyright" />);
    expect(screen.getByText(/Test copyright/)).toBeInTheDocument();
  });

  it('renders default copyright with current year', () => {
    const year = new Date().getFullYear();
    render(<Footer />);
    // should include year and default text
    expect(screen.getByText(new RegExp(String(year)))).toBeInTheDocument();
    expect(screen.getByText(/All rights reserved\./)).toBeInTheDocument();
  });
});
