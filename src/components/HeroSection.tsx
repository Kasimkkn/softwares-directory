import { TrendingUp, Globe, Building, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  totalIndustries: number;
  totalCategories: number;
}

const HeroSection = ({ totalIndustries, totalCategories }: HeroSectionProps) => {
  const stats = [
    { label: "Industries", value: totalIndustries, icon: Building },
    { label: "Categories", value: totalCategories, icon: Globe },
    { label: "Growth Sectors", value: "15+", icon: TrendingUp },
    { label: "Open Source", value: "★", icon: Star },
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        {/* Hero Content */}
        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Complete Business Software
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Directory</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Comprehensive database of business software across 65+ industries. From FinTech to AgriTech, 
            discover the perfect solutions for every business scale and market.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 text-white shadow-glow px-8 py-3"
            >
              Explore Industries
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-border hover:bg-card px-8 py-3"
              onClick={() => window.open('https://github.com', '_blank')}
            >
              Contribute on GitHub
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index}
                className="p-6 rounded-2xl bg-gradient-card border border-border shadow-card hover:shadow-card-hover transition-all duration-300 group hover:-translate-y-1 will-change-transform"
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;