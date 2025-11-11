import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockAssets, generateChartData, formatCurrency, formatLargeNumber, formatPercentage } from "@/lib/mockData";
import { PriceChart } from "@/components/PriceChart";
import { TradeModal } from "@/components/TradeModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";

const TradingView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tradeModalOpen, setTradeModalOpen] = useState(false);
  
  const asset = mockAssets.find((a) => a.id === id);

  useEffect(() => {
    if (!asset) {
      navigate("/");
    }
  }, [asset, navigate]);

  if (!asset) return null;

  const chartData = generateChartData(asset.price);
  const isPositive = asset.change24h >= 0;

  const handleTrade = (type: 'buy' | 'sell', quantity: number) => {
    console.log(`${type} ${quantity} ${asset.symbol}`);
    // In a real app, this would call an API
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Markets
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">{asset.image}</div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{asset.name}</h1>
                  <p className="text-muted-foreground">{asset.symbol}</p>
                </div>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-foreground">
                  {formatCurrency(asset.price)}
                </span>
                <span className={`flex items-center gap-1 text-xl font-semibold ${isPositive ? 'text-success' : 'text-danger'}`}>
                  {isPositive ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                  {formatPercentage(asset.change24h)}
                </span>
              </div>
            </div>

            <PriceChart data={chartData} />

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-card-foreground">Market Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground text-sm">Market Cap</p>
                  <p className="text-lg font-semibold text-card-foreground">
                    {formatLargeNumber(asset.marketCap)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">24h Volume</p>
                  <p className="text-lg font-semibold text-card-foreground">
                    {formatLargeNumber(asset.volume24h)}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-4 text-card-foreground">Trade</h2>
              <div className="space-y-4">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => setTradeModalOpen(true)}
                >
                  Buy {asset.symbol}
                </Button>
                <Button 
                  className="w-full" 
                  variant="outline" 
                  size="lg"
                  onClick={() => setTradeModalOpen(true)}
                >
                  Sell {asset.symbol}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <TradeModal
        asset={asset}
        open={tradeModalOpen}
        onOpenChange={setTradeModalOpen}
        onTrade={handleTrade}
      />
    </div>
  );
};

export default TradingView;
