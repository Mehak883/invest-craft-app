import { NavLink } from "@/components/NavLink";
import { LayoutDashboard, Wallet } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-primary">TradePro</h1>
            
            <div className="flex gap-1">
              <NavLink
                to="/"
                className="px-4 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                activeClassName="text-foreground bg-accent"
              >
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  Markets
                </div>
              </NavLink>
              
              <NavLink
                to="/portfolio"
                className="px-4 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                activeClassName="text-foreground bg-accent"
              >
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  Portfolio
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
