import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';
import { BrowserRouter } from 'react-router-dom';
import { AssetCard } from '../components/AssetCard';
import { Asset } from '../lib/mockData';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockAsset: Asset = {
  id: '1',
  symbol: 'BTC',
  name: 'Bitcoin',
  price: 43250.50,
  change24h: 2.45,
  marketCap: 846000000000,
  volume24h: 28500000000,
  image: '₿',
};

describe('AssetCard', () => {
  it('renders asset information correctly', () => {
    render(
      <BrowserRouter>
        <AssetCard asset={mockAsset} />
      </BrowserRouter>
    );

    expect(screen.getByText('BTC')).toBeInTheDocument();
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('$43,250.50')).toBeInTheDocument();
    expect(screen.getByText('+2.45%')).toBeInTheDocument();
  });

  it('displays positive change with green color', () => {
    render(
      <BrowserRouter>
        <AssetCard asset={mockAsset} />
      </BrowserRouter>
    );

    const changeElement = screen.getByText('+2.45%');
    expect(changeElement).toHaveClass('text-success');
  });

  it('displays negative change with red color', () => {
    const negativeAsset = { ...mockAsset, change24h: -1.5 };
    render(
      <BrowserRouter>
        <AssetCard asset={negativeAsset} />
      </BrowserRouter>
    );

    const changeElement = screen.getByText('-1.50%');
    expect(changeElement).toHaveClass('text-danger');
  });

  it('navigates to trading view on click', () => {
    render(
      <BrowserRouter>
        <AssetCard asset={mockAsset} />
      </BrowserRouter>
    );

    const card = screen.getByText('Bitcoin').closest('.cursor-pointer');
    if (card) {
      fireEvent.click(card);
      expect(mockNavigate).toHaveBeenCalledWith('/trade/1');
    }
  });
});
