import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, DollarSign, ExternalLink, Github, Globe2, TrendingUp, Users, Zap } from "lucide-react";

import businessData from "@/data/business-software.json";

const AnalyticsSection = () => {
  // Extract data from JSON
  const { market_insights } = businessData;

  // Map high growth sectors with icons and descriptions
  const growthSectors = market_insights.high_growth_sectors.map((sector, index) => {
    const iconMap: { [key: string]: any } = {
      "AI & Machine Learning platforms": { icon: Zap, description: "Intelligent automation & analytics", growth: "+189%" },
      "FinTech & DeFi platforms": { icon: DollarSign, description: "Digital payments & finance", growth: "+156%" },
      "HealthTech & Telemedicine": { icon: Globe2, description: "Remote healthcare & wellness tech", growth: "+134%" },
      "CleanTech & Climate solutions": { icon: TrendingUp, description: "Renewable energy & sustainability", growth: "+98%" },
      "EdTech & Remote learning": { icon: Globe2, description: "Online education & skill development", growth: "+87%" },
      "Cybersecurity solutions": { icon: Zap, description: "Data protection & threat intelligence", growth: "+76%" },
      "MobilityTech & Autonomous systems": { icon: TrendingUp, description: "Smart transportation & logistics", growth: "+65%" },
      "SpaceTech & Satellite services": { icon: Globe2, description: "Space infrastructure & communications", growth: "+54%" }
    };

    const sectorData = iconMap[sector] || {
      icon: TrendingUp,
      description: "Emerging technology sector",
      growth: "+50%"
    };

    return {
      name: sector.split(' &')[0], // Shorten names for display
      growth: sectorData.growth,
      icon: sectorData.icon,
      trend: "Very High",
      description: sectorData.description
    };
  });


  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "Very High":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "High":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "High Growth":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Emerging":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      default:
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background to-card/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="md:container md:mx-auto relative">
        <div className="md:text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <BarChart3 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Market Intelligence</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Industry Analytics &
            <span className="text-gradient-primary"> Growth Trends</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Data-driven insights into the fastest-growing business software sectors and emerging market opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-12">
          {/* High Growth Sectors */}
          <Card className="py-4 px-2 md:p-8 bg-gradient-card border-border/50 hover:shadow-card-hover transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base md:text-xl font-bold text-foreground">High Growth Sectors 2025</h3>
                  <p className="text-sm text-muted-foreground">Top {growthSectors.length} fastest growing industries</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {growthSectors.map((sector, index) => {
                  const IconComponent = sector.icon;
                  return (
                    <div key={index} className="group p-4 rounded-xl bg-background/50 border border-border/50 hover:border-primary/30 transition-all duration-200 hover:bg-background/80">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-gradient-primary">
                            <IconComponent className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {sector.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {sector.description}
                            </div>
                          </div>
                        </div>
                        <div className="flex max-md:flex-col items-center gap-3">
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary">{sector.growth}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>

        {/* Additional Data Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Emerging Technologies */}
          <Card className="py-4 px-2 md:p-6 bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Zap className="h-4 w-4 text-purple-400" />
                </div>
                <h4 className="font-semibold text-foreground">Emerging Tech</h4>
              </div>
              <div className="text-2xl font-bold text-purple-400 mb-2">
                {market_insights.emerging_tech_categories.length}+
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Next-gen technologies including {market_insights.emerging_tech_categories.slice(0, 2).join(", ")}
            </p>
          </Card>

          {/* Geographic Markets */}
          <Card className="py-4 px-2 md:p-6 bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Globe2 className="h-4 w-4 text-blue-400" />
                </div>
                <h4 className="font-semibold text-foreground">Global Markets</h4>
              </div>
              <div className="text-2xl font-bold text-blue-400 mb-2">
                {market_insights.geographic_opportunities.developing_markets.length}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              High-potential markets: {market_insights.geographic_opportunities.developing_markets.slice(0, 2).join(", ")}
            </p>
          </Card>

          {/* Business Categories */}
          <Card className="py-4 px-2 md:p-6 bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-yellow-500/10">
                  <BarChart3 className="h-4 w-4 text-yellow-400" />
                </div>
                <h4 className="font-semibold text-foreground">Business Scales</h4>
              </div>
              <div className="text-2xl font-bold text-yellow-400 mb-2">
                4
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              From micro businesses to large enterprises
            </p>
          </Card>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Untapped Markets Detail */}
          <Card className="py-4 px-2 md:p-6 bg-gradient-card border-border/50 hover:shadow-card-hover transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🎯</span>
              <h4 className="font-semibold text-foreground">Untapped Opportunities</h4>
            </div>
            <div className="flex max-md:flex-col md:flex-wrap gap-4">
              {market_insights.untapped_markets.map((market, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-background/30 hover:bg-background/50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm text-foreground capitalize">{market}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Challenges & Solutions */}
          <Card className="py-4 px-2 md:p-6 bg-gradient-card border-border/50 hover:shadow-card-hover transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">⚡</span>
              <h4 className="font-semibold text-foreground">Key Challenges</h4>
            </div>
            <div className="flex max-md:flex-col md:flex-wrap gap-4">
              {market_insights.digital_adoption_challenges.map((challenge, index) => (
                <div key={index} className="flex items-start gap-3 p-2 rounded-lg bg-background/30 hover:bg-background/50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-orange-400 mt-1.5 flex-shrink-0" />
                  <span className="text-sm text-foreground leading-relaxed">{challenge}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <Card className="py-4 px-2 md:p-8 bg-gradient-to-r from-primary/5 via-background to-accent/5 border-border/50 md:text-center">
        <div className="md:max-w-2xl md:mx-auto">
          <Users className="h-12 w-12 text-primary md:mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Join the Community
          </h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Want to contribute market data, add your industry insights, or help improve this directory?
            Join our growing community of contributors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-gradient-primary hover:opacity-90 text-white font-medium px-6 py-3 group"
              onClick={() => window.open('https://github.com', '_blank')}
            >
              <Github className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
              Contribute on GitHub
              <ExternalLink className="h-3 w-3 ml-2 opacity-60" />
            </Button>
            <Button
              variant="outline"
              className="border-border/50 hover:bg-card hover:border-primary/30 px-6 py-3"
              onClick={() => window.open('https://github.com', '_blank')}
            >
              Add Industry Data
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default AnalyticsSection;