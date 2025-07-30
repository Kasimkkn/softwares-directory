import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Globe2, Zap, DollarSign } from "lucide-react";

const AnalyticsSection = () => {
  const growthSectors = [
    { name: "FinTech", growth: "+156%", icon: DollarSign, trend: "Very High" },
    { name: "HealthTech", growth: "+134%", icon: Zap, trend: "Very High" },
    { name: "EdTech", growth: "+89%", icon: Globe2, trend: "High" },
    { name: "CleanTech", growth: "+78%", icon: TrendingUp, trend: "High" },
  ];

  const marketInsights = [
    "Street vendors and cart sellers represent an untapped market",
    "Rural agricultural services show high potential",
    "AI & ML platforms experiencing explosive growth",
    "Blockchain & Web3 technologies gaining momentum"
  ];

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "Very High":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "High":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Market Analytics & <span className="bg-gradient-primary bg-clip-text text-transparent">Growth Trends</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Data-driven insights into the fastest-growing business software sectors and emerging opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Growth Sectors */}
          <Card className="p-8 bg-gradient-card border-border shadow-card">
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary" />
              High Growth Sectors 2025
            </h3>
            <div className="space-y-4">
              {growthSectors.map((sector, index) => {
                const IconComponent = sector.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border hover:border-primary/30 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <IconComponent className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{sector.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-primary font-semibold">{sector.growth}</span>
                      <Badge className={`${getTrendColor(sector.trend)} border text-xs`}>
                        {sector.trend}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Market Insights */}
          <Card className="p-8 bg-gradient-card border-border shadow-card">
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
              <Globe2 className="h-5 w-5 mr-2 text-primary" />
              Market Insights
            </h3>
            <div className="space-y-4">
              {marketInsights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 rounded-xl bg-background/50 border border-border">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-foreground text-sm leading-relaxed">{insight}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Card className="inline-block p-6 bg-gradient-card border-border shadow-card">
            <p className="text-muted-foreground mb-4">
              Want to contribute market data or add your industry insights?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button 
                className="px-6 py-2 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                onClick={() => window.open('https://github.com', '_blank')}
              >
                Add Industry Data
              </button>
              <button 
                className="px-6 py-2 border border-border text-foreground hover:bg-card rounded-lg transition-colors"
                onClick={() => window.open('https://github.com', '_blank')}
              >
                View on GitHub
              </button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsSection;