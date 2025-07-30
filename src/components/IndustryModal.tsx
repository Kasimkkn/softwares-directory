import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import ShareButton from "./ShareButton";
import { 
  Building2, 
  MapPin, 
  TrendingUp, 
  Zap, 
  Users, 
  ExternalLink,
  Star
} from "lucide-react";

interface IndustryModalProps {
  industry: {
    industry: string;
    business_types: string[];
    software_features: string[];
    examples: string[];
    target_locations: string[];
    growth_potential?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const IndustryModal = ({ industry, isOpen, onClose }: IndustryModalProps) => {
  if (!industry) return null;

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background border-border">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-foreground">
              {industry.industry}
            </DialogTitle>
            <div className="flex items-center space-x-2">
              <ShareButton industryName={industry.industry} />
              {industry.growth_potential && (
                <Badge className={`${getGrowthColor(industry.growth_potential)} border`}>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {industry.growth_potential} Growth
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-8 mt-6">
          {/* Business Types */}
          <section>
            <div className="flex items-center space-x-2 mb-4">
              <Building2 className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Business Types</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {industry.business_types.map((type, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors"
                >
                  <span className="text-sm font-medium text-foreground">{type}</span>
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* Software Features */}
          <section>
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Key Software Features</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {industry.software_features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-card border border-border"
                >
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* Examples & Companies */}
          <section>
            <div className="flex items-center space-x-2 mb-4">
              <Star className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Popular Solutions</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {industry.examples.map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="flex items-center space-x-2 border-border hover:border-primary/50 hover:bg-primary/10"
                  onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(example)}`, '_blank')}
                >
                  <span>{example}</span>
                  <ExternalLink className="h-3 w-3" />
                </Button>
              ))}
            </div>
          </section>

          <Separator />

          {/* Target Locations */}
          <section>
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Target Markets</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {industry.target_locations.map((location, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="capitalize"
                >
                  {location.replace('_', ' ')}
                </Badge>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <div className="bg-gradient-card border border-border rounded-xl p-6">
            <div className="text-center space-y-4">
              <h4 className="text-lg font-semibold text-foreground">
                Know more about {industry.industry}?
              </h4>
              <p className="text-muted-foreground">
                Help us improve this directory by contributing additional information, tools, or corrections.
              </p>
              <Button
                className="bg-gradient-primary hover:opacity-90 text-white"
                onClick={() => window.open('https://github.com', '_blank')}
              >
                Contribute on GitHub
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IndustryModal;