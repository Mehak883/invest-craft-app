import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatLargeNumber,
  formatPercentage,
  generateChartData,
  mockAssets,
} from '../lib/mockData';

describe('mockData utilities', () => {
  describe('formatCurrency', () => {
    it('formats positive numbers correctly', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
    });

    it('formats zero correctly', () => {
      expect(formatCurrency(0)).toBe('$0.00');
    });

    it('formats negative numbers correctly', () => {
      expect(formatCurrency(-1234.56)).toBe('-$1,234.56');
    });
  });

  describe('formatLargeNumber', () => {
    it('formats trillions correctly', () => {
      expect(formatLargeNumber(1500000000000)).toBe('$1.50T');
    });

    it('formats billions correctly', () => {
      expect(formatLargeNumber(2500000000)).toBe('$2.50B');
    });

    it('formats millions correctly', () => {
      expect(formatLargeNumber(3500000)).toBe('$3.50M');
    });

    it('formats thousands correctly', () => {
      expect(formatLargeNumber(4500)).toBe('$4.50K');
    });

    it('formats small numbers as currency', () => {
      expect(formatLargeNumber(100)).toBe('$100.00');
    });
  });

  describe('formatPercentage', () => {
    it('formats positive percentages with plus sign', () => {
      expect(formatPercentage(5.25)).toBe('+5.25%');
    });

    it('formats negative percentages correctly', () => {
      expect(formatPercentage(-3.75)).toBe('-3.75%');
    });

    it('formats zero correctly', () => {
      expect(formatPercentage(0)).toBe('+0.00%');
    });
  });

  describe('generateChartData', () => {
    it('generates correct number of data points', () => {
      const data = generateChartData(1000, 30);
      expect(data).toHaveLength(31); // 30 days + today
    });

    it('generates data with correct structure', () => {
      const data = generateChartData(1000, 5);
      data.forEach((point) => {
        expect(point).toHaveProperty('date');
        expect(point).toHaveProperty('price');
        expect(typeof point.date).toBe('string');
        expect(typeof point.price).toBe('number');
      });
    });

    it('generates prices within reasonable range', () => {
      const basePrice = 1000;
      const data = generateChartData(basePrice, 30);
      data.forEach((point) => {
        expect(point.price).toBeGreaterThan(basePrice * 0.7);
        expect(point.price).toBeLessThan(basePrice * 1.3);
      });
    });
  });

  describe('mockAssets', () => {
    it('has correct structure', () => {
      expect(mockAssets).toBeInstanceOf(Array);
      expect(mockAssets.length).toBeGreaterThan(0);
    });

    it('each asset has required properties', () => {
      mockAssets.forEach((asset) => {
        expect(asset).toHaveProperty('id');
        expect(asset).toHaveProperty('symbol');
        expect(asset).toHaveProperty('name');
        expect(asset).toHaveProperty('price');
        expect(asset).toHaveProperty('change24h');
        expect(asset).toHaveProperty('marketCap');
        expect(asset).toHaveProperty('volume24h');
        expect(asset).toHaveProperty('image');
      });
    });

    it('all asset ids are unique', () => {
      const ids = mockAssets.map((asset) => asset.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });
});
