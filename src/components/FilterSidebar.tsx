import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChevronDown, ChevronUp, Filter, MapPin, Sliders, Tag, TrendingUp, X } from "lucide-react";
import { useState } from "react";

interface FilterSidebarProps {
  filters: {
    locations: string[];
    categories: string[];
  };
  activeFilters: {
    growthPotential: string[];
    locations: string[];
    categories: string[];
  };
  onFilterChange: (filterType: string, values: string[]) => void;
  onClearFilters: () => void;
}

const FilterSidebar = ({
  filters,
  activeFilters,
  onFilterChange,
  onClearFilters
}: FilterSidebarProps) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    locations: true,
    categories: true,
    growth: false
  });

  const toggleFilter = (filterType: string, value: string) => {
    const currentValues = activeFilters[filterType as keyof typeof activeFilters];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];

    onFilterChange(filterType, newValues);
  };

  const getTotalActiveFilters = () => {
    return Object.values(activeFilters).flat().length;
  };

  const getGrowthColor = (growth: string) => {
    switch (growth) {
      case "Very High":
        return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20";
      case "High":
        return "border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20";
      case "Medium":
        return "border-yellow-500/30 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20";
      default:
        return "border-border bg-card hover:bg-muted text-foreground";
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  const handleClearFilters = () => {
    onClearFilters();
    setSheetOpen(false);
  };

  const FilterSection = ({
    title,
    filterType,
    options,
    icon: Icon,
    sectionKey,
    isMobile = false
  }: {
    title: string;
    filterType: string;
    options: string[];
    icon: any;
    sectionKey: string;
    isMobile?: boolean;
  }) => (
    <Collapsible
      open={expandedSections[sectionKey as keyof typeof expandedSections]}
      onOpenChange={() => toggleSection(sectionKey)}
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted/50 rounded-lg transition-colors">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-foreground text-sm sm:text-base">{title}</h3>
          {getTotalActiveFilters() > 0 && activeFilters[filterType as keyof typeof activeFilters].length > 0 && (
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs ml-2">
              {activeFilters[filterType as keyof typeof activeFilters].length}
            </Badge>
          )}
        </div>
        {expandedSections[sectionKey as keyof typeof expandedSections] ?
          <ChevronUp className="h-4 w-4 text-muted-foreground" /> :
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        }
      </CollapsibleTrigger>

      <CollapsibleContent className="space-y-2 mt-2">
        <div className={`${isMobile ? 'max-h-48' : 'max-h-40 sm:max-h-60'} overflow-y-auto space-y-1.5 px-2`}>
          {options.slice(0, 20).map((option) => {
            const isActive = activeFilters[filterType as keyof typeof activeFilters].includes(option);
            const colorClass = filterType === 'growthPotential' ? getGrowthColor(option) :
              isActive ? "border-primary/30 bg-primary/10 text-primary" : "border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground";

            return (
              <button
                key={option}
                onClick={() => toggleFilter(filterType, option)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 border ${colorClass} flex items-center justify-between group`}
              >
                <span className="font-medium truncate">{option.replace('_', ' ')}</span>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  {isActive && (
                    <div className="h-2 w-2 rounded-full bg-current" />
                  )}
                  {filterType === 'growthPotential' && (
                    <TrendingUp className="h-3 w-3 opacity-60" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
        {options.length > 20 && (
          <div className="text-xs text-muted-foreground text-center py-2">
            +{options.length - 20} more options
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );

  const FilterContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={`${isMobile ? 'h-full flex flex-col' : ''}`}>
      {/* Header */}
      {!isMobile && (
        <div className="flex items-center justify-between mb-4 sm:mb-6 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <h2 className="text-base sm:text-lg font-bold text-foreground">Filters</h2>
          </div>
          {getTotalActiveFilters() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive h-8 px-2 sm:px-3"
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="text-xs sm:text-sm">Clear</span>
            </Button>
          )}
        </div>
      )}

      {/* Active Filters Summary */}
      {getTotalActiveFilters() > 0 && (
        <div className={`${isMobile ? 'mb-6' : 'mb-4 sm:mb-6'} p-3 bg-primary/5 border border-primary/10 rounded-lg flex-shrink-0`}>
          <div className="text-sm font-medium text-foreground mb-2">Active Filters</div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters).map(([type, values]) =>
              values.map((value) => (
                <Badge
                  key={`${type}-${value}`}
                  className="bg-primary/10 text-primary border-primary/20 text-xs h-7 px-2"
                >
                  <span className="truncate max-w-32">{value}</span>
                  <button
                    onClick={() => toggleFilter(type, value)}
                    className="ml-1 hover:text-destructive transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))
            )}
          </div>
        </div>
      )}

      {/* Filter Sections */}
      <div className={`space-y-4 sm:space-y-6 ${isMobile ? 'overflow-y-auto flex-1 pb-6' : 'overflow-y-auto flex-1 pr-2 -mr-2'}`}>
        <Separator className="bg-border/50" />

        <FilterSection
          title="Target Markets"
          filterType="locations"
          options={filters.locations}
          icon={MapPin}
          sectionKey="locations"
          isMobile={isMobile}
        />

        <Separator className="bg-border/50" />

        <FilterSection
          title="Categories"
          filterType="categories"
          options={filters.categories}
          icon={Tag}
          sectionKey="categories"
          isMobile={isMobile}
        />

        <Separator className="bg-border/50" />

        <FilterSection
          title="Growth Potential"
          filterType="growthPotential"
          options={["Very High", "High", "Medium"]}
          icon={TrendingUp}
          sectionKey="growth"
          isMobile={isMobile}
        />
      </div>

      {/* Footer */}
      {!isMobile && (
        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-border/50 flex-shrink-0">
          <div className="text-xs text-muted-foreground text-center">
            Showing results based on your filter selection
          </div>
        </div>
      )}

      {/* Mobile Footer Actions */}
      {isMobile && (
        <div className="flex-shrink-0 p-4 border-t border-border/50 bg-background/80 backdrop-blur-sm">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleClearFilters}
              className="flex-1 border-border/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
              disabled={getTotalActiveFilters() === 0}
            >
              <X className="h-4 w-4 mr-2" />
              Clear All
            </Button>
            <Button
              onClick={() => setSheetOpen(false)}
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white"
            >
              Apply Filters
              {getTotalActiveFilters() > 0 && (
                <Badge className="ml-2 bg-white/20 text-white border-white/20 text-xs">
                  {getTotalActiveFilters()}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile/Tablet Filter Sheet Trigger */}
      <div className="lg:hidden mb-4 sm:mb-6">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between border-border/50 hover:bg-card h-12 text-base"
            >
              <div className="flex items-center gap-3">
                <Sliders className="h-5 w-5" />
                <span className="font-medium">Filters</span>
                {getTotalActiveFilters() > 0 && (
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                    {getTotalActiveFilters()}
                  </Badge>
                )}
              </div>
              <Filter className="h-5 w-5 text-muted-foreground" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-full sm:w-[400px] p-0 overflow-hidden"
          >
            <SheetHeader className="p-6 pb-4 border-b border-border/50">
              <SheetTitle className="flex items-center gap-3 text-left">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Filter className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-foreground">Filters</div>
                  <div className="text-sm text-muted-foreground font-normal">
                    Refine your search results
                  </div>
                </div>
              </SheetTitle>
            </SheetHeader>

            <div className="h-[calc(100%-5rem)] p-6 pt-4">
              <FilterContent isMobile={true} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filter Panel */}
      <div className="hidden lg:block">
        <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-border/50 sticky top-24 min-h-screen overflow-hidden flex flex-col">
          <FilterContent />
        </Card>
      </div>
    </>
  );
};

export default FilterSidebar; 