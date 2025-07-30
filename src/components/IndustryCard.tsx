import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TrendingUp, MapPin, Building2, ArrowRight } from "lucide-react";

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
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "High":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <Card 
      className="p-6 bg-gradient-card border-border hover:shadow-card-hover transition-all duration-300 cursor-pointer group hover:border-primary/30 hover:-translate-y-1 will-change-transform"
      onClick={onClick}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {industry.industry}
            </h3>
            <div className="flex items-center space-x-2 mt-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {industry.business_types.length} business types
              </span>
            </div>
          </div>
          
          {industry.growth_potential && (
            <Badge className={`${getGrowthColor(industry.growth_potential)} border`}>
              <TrendingUp className="h-3 w-3 mr-1" />
              {industry.growth_potential}
            </Badge>
          )}
        </div>

        {/* Business Types */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Business Types</h4>
          <div className="flex flex-wrap gap-1">
            {industry.business_types.slice(0, 3).map((type, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {type}
              </Badge>
            ))}
            {industry.business_types.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{industry.business_types.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Key Features */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Key Features</h4>
          <div className="text-sm text-foreground">
            {industry.software_features.slice(0, 2).join(" • ")}
            {industry.software_features.length > 2 && "..."}
          </div>
        </div>

        {/* Locations */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {industry.target_locations.join(", ")}
            </span>
          </div>
          
          <div className="flex items-center space-x-1 text-primary group-hover:translate-x-1 transition-transform">
            <span className="text-sm font-medium">View Details</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default IndustryCard;