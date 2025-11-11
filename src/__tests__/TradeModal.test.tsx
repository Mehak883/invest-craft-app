import { describe, it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';
import { TradeModal } from '../components/TradeModal';
import { Asset } from '../lib/mockData';

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

describe('TradeModal', () => {
  it('renders buy and sell tabs', () => {
    const mockOnTrade = vi.fn();
    const mockOnOpenChange = vi.fn();

    render(
      <TradeModal
        asset={mockAsset}
        open={true}
        onOpenChange={mockOnOpenChange}
        onTrade={mockOnTrade}
      />
    );

    expect(screen.getByText('Trade BTC')).toBeInTheDocument();
    expect(screen.getByText('Buy')).toBeInTheDocument();
    expect(screen.getByText('Sell')).toBeInTheDocument();
  });

  it('calculates total correctly', () => {
    const mockOnTrade = vi.fn();
    const mockOnOpenChange = vi.fn();

    render(
      <TradeModal
        asset={mockAsset}
        open={true}
        onOpenChange={mockOnOpenChange}
        onTrade={mockOnTrade}
      />
    );

    const quantityInput = screen.getByLabelText('Quantity') as HTMLInputElement;
    fireEvent.change(quantityInput, { target: { value: '2' } });

    const expectedTotal = mockAsset.price * 2;
    expect(screen.getByText(`$${expectedTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`)).toBeInTheDocument();
  });

  it('calls onTrade with correct parameters on buy', async () => {
    const mockOnTrade = vi.fn();
    const mockOnOpenChange = vi.fn();

    render(
      <TradeModal
        asset={mockAsset}
        open={true}
        onOpenChange={mockOnOpenChange}
        onTrade={mockOnTrade}
      />
    );

    const quantityInput = screen.getByLabelText('Quantity');
    fireEvent.change(quantityInput, { target: { value: '1.5' } });

    const buyButton = screen.getByText('Buy BTC');
    fireEvent.click(buyButton);

    await waitFor(() => {
      expect(mockOnTrade).toHaveBeenCalledWith('buy', 1.5);
    });
  });

  it('prevents trading with invalid quantity', async () => {
    const mockOnTrade = vi.fn();
    const mockOnOpenChange = vi.fn();

    render(
      <TradeModal
        asset={mockAsset}
        open={true}
        onOpenChange={mockOnOpenChange}
        onTrade={mockOnTrade}
      />
    );

    const quantityInput = screen.getByLabelText('Quantity');
    fireEvent.change(quantityInput, { target: { value: '-1' } });

    const buyButton = screen.getByText('Buy BTC');
    fireEvent.click(buyButton);

    await waitFor(() => {
      expect(mockOnTrade).not.toHaveBeenCalled();
    });
  });
});
