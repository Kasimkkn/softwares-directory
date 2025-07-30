import { useState, useMemo } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AnalyticsSection from "@/components/AnalyticsSection";
import FilterSidebar from "@/components/FilterSidebar";
import IndustryCard from "@/components/IndustryCard";
import IndustryModal from "@/components/IndustryModal";
import Footer from "@/components/Footer";
import { IndustryGridSkeleton } from "@/components/SkeletonLoaders";
import { Search, Filter, LayoutGrid, List, SortAsc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useLenis from "@/hooks/useLenis";
import businessData from "@/data/business-software.json";

const Index = () => {
  // Initialize smooth scrolling
  useLenis();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilters, setActiveFilters] = useState({
    growthPotential: [] as string[],
    locations: [] as string[],
    categories: [] as string[]
  });

  // Extract industries from data
  const industries = useMemo(() => {
    return Object.values(businessData.industry_specific_software);
  }, []);

  // Generate search suggestions
  const searchSuggestions = useMemo(() => {
    const suggestions = new Set<string>();

    industries.forEach(industry => {
      suggestions.add(industry.industry);
      industry.business_types.forEach(type => suggestions.add(type));
      industry.software_features.forEach(feature => {
        const shortFeature = feature.split(' ').slice(0, 3).join(' ');
        if (shortFeature.length > 5) suggestions.add(shortFeature);
      });
      industry.examples.forEach(example => suggestions.add(example));
    });

    return Array.from(suggestions).sort();
  }, [industries]);

  // Extract filter options
  const filterOptions = useMemo(() => {
    const locations = [...new Set(industries.flatMap(ind => ind.target_locations))];
    const categories = [...new Set(industries.map(ind => {
      if (ind.industry.toLowerCase().includes('tech')) return 'Technology';
      if (ind.industry.toLowerCase().includes('health')) return 'Healthcare';
      if (ind.industry.toLowerCase().includes('food')) return 'Food & Beverage';
      if (ind.industry.toLowerCase().includes('education')) return 'Education';
      if (ind.industry.toLowerCase().includes('retail')) return 'Retail';
      if (ind.industry.toLowerCase().includes('finance')) return 'Finance';
      return 'Other';
    }))];

    return {
      locations: locations.sort(),
      categories: categories.sort()
    };
  }, [industries]);

  // Filter industries
  const filteredIndustries = useMemo(() => {
    return industries.filter(industry => {
      const matchesSearch = searchQuery === "" ||
        industry.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        industry.business_types.some(type => type.toLowerCase().includes(searchQuery.toLowerCase())) ||
        industry.software_features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase())) ||
        industry.examples.some(example => example.toLowerCase().includes(searchQuery.toLowerCase()));


      const matchesLocation = activeFilters.locations.length === 0 ||
        activeFilters.locations.some(loc => industry.target_locations.includes(loc));

      const matchesCategory = activeFilters.categories.length === 0 || true;

      return matchesSearch && matchesLocation && matchesCategory;
    });
  }, [industries, searchQuery, activeFilters]);

  const handleFilterChange = (filterType: string, values: string[]) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: values
    }));
  };

  const handleClearFilters = () => {
    setActiveFilters({
      growthPotential: [],
      locations: [],
      categories: []
    });
  };

  const getTotalActiveFilters = () => {
    return Object.values(activeFilters).flat().length;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchSuggestions={searchSuggestions}
      />

      {/* Hero Section */}
      <HeroSection
        totalIndustries={businessData.metadata.total_industries}
        totalCategories={businessData.metadata.total_categories}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <FilterSidebar
              filters={filterOptions}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Business Software Directory
                </h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>
                    Showing <span className="font-semibold text-foreground">{filteredIndustries.length}</span> of {industries.length} industries
                  </span>
                  {getTotalActiveFilters() > 0 && (
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      {getTotalActiveFilters()} filters active
                    </Badge>
                  )}
                </div>
              </div>

              {/* View Controls */}
              <div className="flex items-center gap-2">
                <div className="flex items-center border border-border/50 rounded-lg p-1 bg-card/50">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="h-8 px-3"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="h-8 px-3"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Industries Grid/List */}
            {isLoading ? (
              <IndustryGridSkeleton count={6} />
            ) : filteredIndustries.length > 0 ? (
              <div className={`grid gap-6 ${viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                : 'grid-cols-1'
                }`}>
                {filteredIndustries.map((industry, index) => (
                  <IndustryCard
                    key={index}
                    industry={industry}
                    onClick={() => setSelectedIndustry(industry)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No industries found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search terms or filters to discover more business software categories.
                  </p>
                  <div className="space-y-3">
                    <Button
                      onClick={handleClearFilters}
                      variant="outline"
                      className="w-full border-border/50 hover:bg-card"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Clear all filters
                    </Button>
                    <p className="text-sm text-muted-foreground">or</p>
                    <Button
                      onClick={() => window.open('https://github.com', '_blank')}
                      className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white"
                    >
                      Contribute this industry
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Load More / Pagination could go here */}
            {filteredIndustries.length > 0 && (
              <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-4 p-4 bg-card/50 border border-border/50 rounded-lg">
                  <span className="text-sm text-muted-foreground">
                    Found everything you need?
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('https://github.com', '_blank')}
                    className="border-border/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                  >
                    Add Missing Industry
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <AnalyticsSection />

      {/* Industry Detail Modal */}
      <IndustryModal
        industry={selectedIndustry}
        isOpen={!!selectedIndustry}
        onClose={() => setSelectedIndustry(null)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;