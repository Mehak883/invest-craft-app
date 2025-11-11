import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Asset, formatCurrency } from "@/lib/mockData";
import { toast } from "@/hooks/use-toast";

interface TradeModalProps {
  asset: Asset;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTrade: (type: 'buy' | 'sell', quantity: number) => void;
}

export const TradeModal = ({ asset, open, onOpenChange, onTrade }: TradeModalProps) => {
  const [quantity, setQuantity] = useState<string>("1");

  const handleTrade = (type: 'buy' | 'sell') => {
    const qty = parseFloat(quantity);
    if (isNaN(qty) || qty <= 0) {
      toast({
        title: "Invalid quantity",
        description: "Please enter a valid quantity",
        variant: "destructive",
      });
      return;
    }

    onTrade(type, qty);
    setQuantity("1");
    onOpenChange(false);
    
    toast({
      title: `${type === 'buy' ? 'Bought' : 'Sold'} ${asset.symbol}`,
      description: `Successfully ${type === 'buy' ? 'bought' : 'sold'} ${qty} ${asset.symbol} at ${formatCurrency(asset.price)}`,
    });
  };

  const total = parseFloat(quantity) * asset.price;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Trade {asset.symbol}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy">Buy</TabsTrigger>
            <TabsTrigger value="sell">Sell</TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="buy-quantity">Quantity</Label>
              <Input
                id="buy-quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>

            <div className="rounded-lg bg-muted p-4">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Price</span>
                <span className="font-semibold">{formatCurrency(asset.price)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="font-bold text-lg">{formatCurrency(total)}</span>
              </div>
            </div>

            <Button 
              className="w-full" 
              onClick={() => handleTrade('buy')}
              disabled={!quantity || parseFloat(quantity) <= 0}
            >
              Buy {asset.symbol}
            </Button>
          </TabsContent>

          <TabsContent value="sell" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sell-quantity">Quantity</Label>
              <Input
                id="sell-quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>

            <div className="rounded-lg bg-muted p-4">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Price</span>
                <span className="font-semibold">{formatCurrency(asset.price)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="font-bold text-lg">{formatCurrency(total)}</span>
              </div>
            </div>

            <Button 
              className="w-full" 
              variant="destructive"
              onClick={() => handleTrade('sell')}
              disabled={!quantity || parseFloat(quantity) <= 0}
            >
              Sell {asset.symbol}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
