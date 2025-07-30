import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

interface HeroSectionProps {
  totalIndustries: number;
  totalCategories: number;
}

const HeroSection = ({ totalIndustries, totalCategories }: HeroSectionProps) => {
  return (
    <section className="pt-6 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Background Gradients */}
      <div className="absolute top-20 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-accent/10 rounded-full blur-3xl" />

      <div className="max-md:px-4 md:container mx-auto md:text-center max-w-5xl relative">
        {/* Badge - Responsive sizing */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-6">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-xs sm:text-sm font-medium text-primary">Open Source Directory</span>
        </div>

        {/* Main Headline - Responsive text sizing */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
          <span className="block sm:inline">Business Software</span>
          <span className="block sm:inline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {" "}Directory
          </span>
        </h1>

        {/* Description - Responsive text and spacing */}
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl md:mx-auto leading-relaxed">
          <span className="hidden sm:inline">
            Discover the perfect software solutions for your business across 65+ industries.
            From micro businesses to enterprises, find tools that scale with your needs.
          </span>
          <span className="sm:hidden">
            Find the perfect software for your business across 65+ industries and all business sizes.
          </span>
        </p>

        {/* Stats Grid - Responsive layout */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto mb-8 sm:mb-12">
          {/* Industries Stat */}
          <div className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-card border border-border/50 hover:border-primary/30 transition-all duration-300 group">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
              {totalIndustries}+
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground font-medium">
              <span className="hidden sm:inline">Industries</span>
              <span className="sm:hidden">Industries</span>
            </div>
          </div>

          {/* Categories Stat */}
          <div className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-card border border-border/50 hover:border-accent/30 transition-all duration-300 group">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
              {totalCategories}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground font-medium">
              <span className="hidden sm:inline">Categories</span>
              <span className="sm:hidden">Categories</span>
            </div>
          </div>

          {/* Business Scales Stat */}
          <div className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-card border border-border/50 hover:border-yellow-500/30 transition-all duration-300 group">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
              4
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground font-medium">
              <span className="hidden sm:inline">Business Scales</span>
              <span className="sm:hidden">Scales</span>
            </div>
          </div>

          {/* Open Source Stat */}
          <div className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-card border border-border/50 hover:border-green-500/30 transition-all duration-300 group">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
              100%
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground font-medium">
              <span className="hidden sm:inline">Open Source</span>
              <span className="sm:hidden">Open</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons - Responsive layout */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-medium px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-glow hover:shadow-card-hover transition-all duration-300"
            onClick={() => {
              document.getElementById('industries-section')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }}
          >
            <span className="hidden sm:inline">Explore Industries</span>
            <span className="sm:hidden">Explore Now</span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-border/50 hover:bg-card hover:text-primary hover:border-primary/30 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-all duration-300"
            onClick={() => window.open('https://github.com', '_blank')}
          >
            <Github className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            <span className="hidden sm:inline">Star on GitHub</span>
            <span className="sm:hidden">GitHub</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;