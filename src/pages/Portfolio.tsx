import { Card } from "@/components/ui/card";
import { mockAssets, formatCurrency, formatPercentage } from "@/lib/mockData";
import { TrendingUp, TrendingDown } from "lucide-react";

const Portfolio = () => {
  // Mock portfolio data - in a real app this would come from state management or API
  const holdings = [
    { asset: mockAssets[0], quantity: 0.5, avgBuyPrice: 42000 },
    { asset: mockAssets[1], quantity: 2.5, avgBuyPrice: 2200 },
    { asset: mockAssets[2], quantity: 10, avgBuyPrice: 175 },
  ];

  const totalValue = holdings.reduce(
    (sum, holding) => sum + holding.asset.price * holding.quantity,
    0
  );

  const totalCost = holdings.reduce(
    (sum, holding) => sum + holding.avgBuyPrice * holding.quantity,
    0
  );

  const totalGainLoss = totalValue - totalCost;
  const totalGainLossPercent = ((totalValue - totalCost) / totalCost) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Portfolio</h1>
          <p className="text-muted-foreground">Track your investments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6">
            <p className="text-muted-foreground mb-2">Total Value</p>
            <p className="text-3xl font-bold text-card-foreground">{formatCurrency(totalValue)}</p>
          </Card>

          <Card className="p-6">
            <p className="text-muted-foreground mb-2">Total Cost</p>
            <p className="text-3xl font-bold text-card-foreground">{formatCurrency(totalCost)}</p>
          </Card>

          <Card className="p-6">
            <p className="text-muted-foreground mb-2">Total Gain/Loss</p>
            <div className="flex items-baseline gap-2">
              <p className={`text-3xl font-bold ${totalGainLoss >= 0 ? 'text-success' : 'text-danger'}`}>
                {formatCurrency(Math.abs(totalGainLoss))}
              </p>
              <span className={`flex items-center gap-1 ${totalGainLoss >= 0 ? 'text-success' : 'text-danger'}`}>
                {totalGainLoss >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {formatPercentage(totalGainLossPercent)}
              </span>
            </div>
          </Card>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Asset</th>
                  <th className="text-right p-4 font-semibold text-muted-foreground">Quantity</th>
                  <th className="text-right p-4 font-semibold text-muted-foreground">Avg Buy Price</th>
                  <th className="text-right p-4 font-semibold text-muted-foreground">Current Price</th>
                  <th className="text-right p-4 font-semibold text-muted-foreground">Total Value</th>
                  <th className="text-right p-4 font-semibold text-muted-foreground">Gain/Loss</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((holding) => {
                  const currentValue = holding.asset.price * holding.quantity;
                  const cost = holding.avgBuyPrice * holding.quantity;
                  const gainLoss = currentValue - cost;
                  const gainLossPercent = ((currentValue - cost) / cost) * 100;

                  return (
                    <tr key={holding.asset.id} className="border-t border-border">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{holding.asset.image}</span>
                          <div>
                            <p className="font-semibold text-card-foreground">{holding.asset.symbol}</p>
                            <p className="text-sm text-muted-foreground">{holding.asset.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-right text-card-foreground">{holding.quantity}</td>
                      <td className="p-4 text-right text-card-foreground">{formatCurrency(holding.avgBuyPrice)}</td>
                      <td className="p-4 text-right text-card-foreground">{formatCurrency(holding.asset.price)}</td>
                      <td className="p-4 text-right font-semibold text-card-foreground">{formatCurrency(currentValue)}</td>
                      <td className="p-4 text-right">
                        <div className={`flex items-center justify-end gap-1 ${gainLoss >= 0 ? 'text-success' : 'text-danger'}`}>
                          {gainLoss >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                          <span className="font-semibold">{formatCurrency(Math.abs(gainLoss))}</span>
                          <span className="text-sm">({formatPercentage(gainLossPercent)})</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Portfolio;
