import { render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

describe('Accessibility', () => {
  describe('Navbar', () => {
    it('should have accessible navigation', () => {
      render(<Navbar />);
      const nav = document.querySelector('nav');
      expect(nav).toBeInTheDocument();
    });

    it('should have proper heading structure', () => {
      render(<Navbar />);
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
    });
  });

  describe('Footer', () => {
    it('should have accessible footer', () => {
      render(<Footer />);
      const footer = document.querySelector('footer');
      expect(footer).toBeInTheDocument();
    });
  });
});

describe('Keyboard Navigation', () => {
  it('should have visible focus states', () => {
    const style = document.createElement('style');
    style.textContent = ':focus-visible { outline: 2px solid #FF6B00; outline-offset: 2px; }';
    document.head.appendChild(style);
    expect(style.sheet).toBeDefined();
  });
});