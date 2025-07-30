import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Filter, MapPin, Sliders, Tag, TrendingUp, X } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false);

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

  const FilterSection = ({
    title,
    filterType,
    options,
    icon: Icon
  }: {
    title: string;
    filterType: string;
    options: string[];
    icon: any;
  }) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <div className="space-y-2">
        {options.map((option) => {
          const isActive = activeFilters[filterType as keyof typeof activeFilters].includes(option);
          const colorClass = filterType === 'growthPotential' ? getGrowthColor(option) :
            isActive ? "border-primary/30 bg-primary/10 text-primary" : "border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground";

          return (
            <button
              key={option}
              onClick={() => toggleFilter(filterType, option)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 border ${colorClass} flex items-center justify-between group`}
            >
              <span className="font-medium">{option}</span>
              {isActive && (
                <div className="h-2 w-2 rounded-full bg-current" />
              )}
              {filterType === 'growthPotential' && (
                <TrendingUp className="h-3 w-3 opacity-60" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full justify-between border-border/50 hover:bg-card"
        >
          <div className="flex items-center gap-2">
            <Sliders className="h-4 w-4" />
            <span>Filters</span>
            {getTotalActiveFilters() > 0 && (
              <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                {getTotalActiveFilters()}
              </Badge>
            )}
          </div>
        </Button>
      </div>

      {/* Filter Panel */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block`}>
        <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-border/50 sticky top-24">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">Filters</h2>
            </div>
            {getTotalActiveFilters() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>

          {/* Active Filters Summary */}
          {getTotalActiveFilters() > 0 && (
            <div className="mb-6 p-3 bg-primary/5 border border-primary/10 rounded-lg">
              <div className="text-sm font-medium text-foreground mb-2">Active Filters</div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(activeFilters).map(([type, values]) =>
                  values.map((value) => (
                    <Badge
                      key={`${type}-${value}`}
                      className="bg-primary/10 text-primary border-primary/20 text-xs"
                    >
                      {value}
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
          <div className="space-y-6">
            <Separator className="bg-border/50" />

            <FilterSection
              title="Target Markets"
              filterType="locations"
              options={filters.locations}
              icon={MapPin}
            />

            <Separator className="bg-border/50" />

            <FilterSection
              title="Categories"
              filterType="categories"
              options={filters.categories}
              icon={Tag}
            />
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-border/50">
            <div className="text-xs text-muted-foreground text-center">
              Showing results based on your filter selection
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default FilterSidebar;