import { render } from '@testing-library/react';
import { Skeleton } from '../components/Skeleton';

describe('Skeleton Component', () => {
  it('renders with default props', () => {
    const { container } = render(<Skeleton />);
    const div = container.firstChild as HTMLElement;
    expect(div).toBeInTheDocument();
    expect(div.style.width).toBe('100%');
    expect(div.style.height).toBe('20px');
  });

  it('applies custom dimensions', () => {
    const { container } = render(<Skeleton width="200px" height="50px" />);
    const div = container.firstChild as HTMLElement;
    expect(div.style.width).toBe('200px');
    expect(div.style.height).toBe('50px');
  });

  it('applies custom border radius', () => {
    const { container } = render(<Skeleton borderRadius="50%" />);
    const div = container.firstChild as HTMLElement;
    expect(div.style.borderRadius).toBe('50%');
  });
});
