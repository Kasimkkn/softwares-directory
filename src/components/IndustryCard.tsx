import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TrendingUp, MapPin, Building2, ArrowRight, Zap, Users } from "lucide-react";

interface IndustryCardProps {
  industry: {
    industry: string;
    business_types: string[];
    software_features: string[];
    examples: string[];
    target_locations: string[];
    growth_potential?: string;
  };
  onClick: () => void;
}

const IndustryCard = ({ industry, onClick }: IndustryCardProps) => {
  const getGrowthColor = (potential?: string) => {
    switch (potential) {
      case "Very High":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "High":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Medium":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };


  return (
    <Card
      className="group relative p-6 bg-gradient-to-br from-card to-card/80 border-border/50 hover:border-primary/30 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 overflow-hidden"
      onClick={onClick}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative space-y-4">
        {/* Header with Growth Badge */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                {industry.industry}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span>{industry.business_types.length} business types</span>
            </div>
          </div>

          {industry.growth_potential && (
            <Badge className={`${getGrowthColor(industry.growth_potential)} border font-medium`}>
              <TrendingUp className="h-3 w-3 mr-1" />
              {industry.growth_potential}
            </Badge>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {industry.target_locations.slice(0, 2).join(", ")}
              {industry.target_locations.length > 2 && ` +${industry.target_locations.length - 2}`}
            </span>
          </div>

          <div className="flex items-center gap-1 text-primary group-hover:translate-x-1 transition-transform">
            <span className="text-sm font-medium">Explore</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default IndustryCard;