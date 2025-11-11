import { Card } from "@/components/ui/card";
import { Asset, formatCurrency, formatPercentage } from "@/lib/mockData";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AssetCardProps {
  asset: Asset;
}

export const AssetCard = ({ asset }: AssetCardProps) => {
  const navigate = useNavigate();
  const isPositive = asset.change24h >= 0;

  return (
    <Card 
      className="p-4 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
      onClick={() => navigate(`/trade/${asset.id}`)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{asset.image}</div>
          <div>
            <h3 className="font-semibold text-card-foreground">{asset.symbol}</h3>
            <p className="text-sm text-muted-foreground">{asset.name}</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-card-foreground">
            {formatCurrency(asset.price)}
          </p>
        </div>
        
        <div className={`flex items-center gap-1 ${isPositive ? 'text-success' : 'text-danger'}`}>
          {isPositive ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          <span className="font-semibold">{formatPercentage(asset.change24h)}</span>
        </div>
      </div>
    </Card>
  );
};
