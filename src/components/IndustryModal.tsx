import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ShareButton from "./ShareButton";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Building2,
  MapPin,
  TrendingUp,
  Zap,
  Users,
  ExternalLink,
  Star,
  Globe,
  ArrowRight,
  Sparkles
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
  const isMobile = useIsMobile();

  if (!industry) return null;

  const getGrowthColor = (potential?: string) => {
    switch (potential) {
      case "Very High":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "High":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const ModalContent = () => (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
              {industry.industry}
            </h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                <span>{industry.business_types.length} business types</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="h-4 w-4" />
                <span>{industry.software_features.length} features</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <ShareButton industryName={industry.industry} size="sm" />
            {industry.growth_potential && (
              <Badge className={`${getGrowthColor(industry.growth_potential)} border text-sm px-3 py-1`}>
                <TrendingUp className="h-4 w-4 mr-2" />
                {industry.growth_potential} Growth
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Business Types */}
      <section>
        <div className="flex items-center space-x-3 mb-4 sm:mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Business Types</h2>
            <p className="text-sm text-muted-foreground">Industries and business models served</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {industry.business_types.map((type, index) => (
            <div
              key={index}
              className="group p-3 sm:p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm sm:text-base font-medium text-foreground leading-relaxed">{type}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator className="bg-border/50" />

      {/* Software Features */}
      <section>
        <div className="flex items-center space-x-3 mb-4 sm:mb-6">
          <div className="p-2 rounded-lg bg-accent/10">
            <Zap className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Key Software Features</h2>
            <p className="text-sm text-muted-foreground">Essential capabilities and functionalities</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {industry.software_features.map((feature, index) => (
            <div
              key={index}
              className="group flex items-start space-x-3 p-3 sm:p-4 rounded-lg bg-card border border-border hover:border-accent/30 transition-all duration-200"
            >
              <div className="p-1 rounded-full bg-accent/20 group-hover:bg-accent/30 transition-colors flex-shrink-0 mt-0.5">
                <div className="h-2 w-2 rounded-full bg-accent" />
              </div>
              <span className="text-sm sm:text-base text-foreground leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      <Separator className="bg-border/50" />

      {/* Examples & Companies */}
      <section>
        <div className="flex items-center space-x-3 mb-4 sm:mb-6">
          <div className="p-2 rounded-lg bg-yellow-500/10">
            <Star className="h-5 w-5 text-yellow-500" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Popular Solutions</h2>
            <p className="text-sm text-muted-foreground">Leading software providers and tools</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {industry.examples.map((example, index) => (
            <Button
              key={index}
              variant="outline"
              className="justify-between h-auto p-4 border-border hover:border-primary/50 hover:bg-primary/5 group transition-all duration-200"
              onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(example)}`, '_blank')}
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/30 group-hover:to-accent/30 transition-all">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium text-left">{example}</span>
              </div>
              <ExternalLink className="h-4 w-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </Button>
          ))}
        </div>
      </section>

      <Separator className="bg-border/50" />

      {/* Target Locations */}
      <section>
        <div className="flex items-center space-x-3 mb-4 sm:mb-6">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <MapPin className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Target Markets</h2>
            <p className="text-sm text-muted-foreground">Geographic and market segments</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {industry.target_locations.map((location, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="capitalize px-3 py-1.5 text-sm bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20 transition-colors"
            >
              <Globe className="h-3 w-3 mr-2" />
              {location.replace('_', ' ')}
            </Badge>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-primary/5 via-background to-accent/5 border border-border/50 rounded-xl p-6 sm:p-8">
        <div className="text-center space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground">
              Know more about {industry.industry}?
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Help us improve this directory by contributing additional information, tools, or corrections.
              Your expertise makes this resource better for everyone.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-medium px-6 py-3 group"
              onClick={() => window.open('https://github.com', '_blank')}
            >
              <div className="flex items-center gap-2">
                <div className="p-1 rounded bg-white/20 group-hover:bg-white/30 transition-colors">
                  <Star className="h-4 w-4" />
                </div>
                <span>Contribute on GitHub</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Button>

            <Button
              variant="outline"
              className="border-border/50 hover:bg-card hover:border-primary/30 px-6 py-3"
              onClick={() => window.open(`mailto:contribute@example.com?subject=Update for ${industry.industry}`, '_blank')}
            >
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span>Suggest Updates</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile version uses Drawer
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className="max-h-[90vh] overflow-hidden">
          <DrawerHeader className="border-b border-border/50 pb-4">
            <DrawerTitle className="text-left text-xl font-bold text-foreground">
              {industry.industry}
            </DrawerTitle>
          </DrawerHeader>

          <ScrollArea className="flex-1 px-4 pb-4">
            <div className="py-4">
              <ModalContent />
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop version uses Dialog
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden bg-background border-border p-0">
        <DialogHeader className="p-6 pb-4 border-b border-border/50">
          <DialogTitle className="text-2xl font-bold text-foreground text-left">
            {industry.industry}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 pb-6">
          <div className="py-4">
            <ModalContent />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default IndustryModal;