import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X, Filter } from "lucide-react";

interface FilterSidebarProps {
  filters: {
    growthPotential: string[];
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

  const FilterSection = ({ 
    title, 
    filterType, 
    options 
  }: { 
    title: string; 
    filterType: string; 
    options: string[] 
  }) => (
    <div className="space-y-3">
      <h3 className="font-medium text-foreground">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => {
          const isActive = activeFilters[filterType as keyof typeof activeFilters].includes(option);
          return (
            <button
              key={option}
              onClick={() => toggleFilter(filterType, option)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "hover:bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {option}
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
          className="w-full justify-between"
        >
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {getTotalActiveFilters() > 0 && (
              <Badge variant="secondary" className="text-xs">
                {getTotalActiveFilters()}
              </Badge>
            )}
          </div>
        </Button>
      </div>

      {/* Filter Panel */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block`}>
        <div className="bg-gradient-card border border-border rounded-2xl p-6 sticky top-24">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Filters</h2>
            {getTotalActiveFilters() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>

          {/* Active Filters Summary */}
          {getTotalActiveFilters() > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {Object.entries(activeFilters).map(([type, values]) =>
                  values.map((value) => (
                    <Badge
                      key={`${type}-${value}`}
                      variant="secondary"
                      className="text-xs"
                    >
                      {value}
                      <button
                        onClick={() => toggleFilter(type, value)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))
                )}
              </div>
              <Separator className="mt-4" />
            </div>
          )}

          {/* Filter Sections */}
          <div className="space-y-6">
            <FilterSection
              title="Growth Potential"
              filterType="growthPotential"
              options={filters.growthPotential}
            />
            
            <Separator />
            
            <FilterSection
              title="Target Locations"
              filterType="locations"
              options={filters.locations}
            />
            
            <Separator />
            
            <FilterSection
              title="Categories"
              filterType="categories"
              options={filters.categories}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;