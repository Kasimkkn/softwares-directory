import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  totalIndustries: number;
  totalCategories: number;
}

const HeroSection = ({ totalIndustries, totalCategories }: HeroSectionProps) => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto text-center max-w-4xl">
        {/* Clean Headline */}
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
          Business Software
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Directory</span>
        </h1>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{totalIndustries}+</div>
            <div className="text-sm text-muted-foreground">Industries</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{totalCategories}</div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;