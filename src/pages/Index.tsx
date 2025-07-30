import AnalyticsSection from "@/components/AnalyticsSection";
import FilterSidebar from "@/components/FilterSidebar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import IndustryCard from "@/components/IndustryCard";
import IndustryModal from "@/components/IndustryModal";
import { IndustryGridSkeleton } from "@/components/SkeletonLoaders";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import businessData from "@/data/business-software.json";
import useLenis from "@/hooks/useLenis";
import { Filter, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

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

    // Create categories based on actual data structure keys
    const categoryMapping: { [key: string]: string } = {
      'retail_wholesale': 'Retail & Commerce',
      'food_beverage': 'Food & Beverage',
      'hospitality': 'Hospitality & Tourism',
      'construction': 'Construction & Engineering',
      'healthcare': 'Healthcare & Medical',
      'education': 'Education & Training',
      'beauty_wellness': 'Beauty & Wellness',
      'logistics_transport': 'Logistics & Transport',
      'manufacturing': 'Manufacturing & Industrial',
      'agriculture': 'Agriculture & Farming',
      'automotive': 'Automotive Services',
      'professional_services': 'Professional Services',
      'real_estate': 'Real Estate',
      'travel_tourism': 'Travel & Tourism',
      'religious_social': 'Religious & Social',
      'personal_services': 'Personal Services',
      'entertainment_media': 'Entertainment & Media',
      'retail_specialty': 'Specialty Retail',
      'wealthtech': 'Wealth & Finance',
      'govtech': 'Government & Public',
      'retailtech': 'Retail Technology',
      'adtech_martech': 'Marketing & Advertising',
      'traveltech': 'Travel Technology',
      'sporttech': 'Sports & Fitness',
      'femtech': `Women's Health`,
      'pettech': 'Pet & Animal Care',
      'biotech': 'Biotechnology',
      'spacetech': 'Space & Aerospace',
      'mobilitytech': 'Mobility & Transport',
      'gaming_esports': 'Gaming & eSports'
    };

    // Get categories from the actual data structure
    const dataCategories = Object.keys(businessData.industry_specific_software);
    const categories = [...new Set(dataCategories.map(key =>
      categoryMapping[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    ))];

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
      <main id="industries-section" className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar - Responsive width */}
          <aside className="lg:w-80 xl:w-96 flex-shrink-0">
            <FilterSidebar
              filters={filterOptions}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Results Header - Mobile optimized */}
            <div className="flex flex-col gap-4 mb-6 sm:mb-8">
              {/* Title and Stats */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="text-xl text-white font-bold">Software Directory</span>
                  </div>

                  {getTotalActiveFilters() > 0 && (
                    <Badge className="bg-primary/10 text-primary border-primary/20 w-fit">
                      <Filter className="h-3 w-3 mr-1" />
                      {getTotalActiveFilters()} filter{getTotalActiveFilters() !== 1 ? 's' : ''} active
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Industries Grid/List - Responsive layout */}
            {isLoading ? (
              <IndustryGridSkeleton count={6} />
            ) : filteredIndustries.length > 0 ? (
              <div className={`grid gap-4 sm:gap-6 ${viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3'
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
              /* Empty State - Mobile optimized */
              <Card className="text-center py-12 sm:py-16 bg-gradient-card border-border/50">
                <div className="max-w-md mx-auto px-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <Search className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                    No industries found
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
                    <span className="hidden sm:inline">
                      Try adjusting your search terms or filters to discover more business software categories.
                    </span>
                    <span className="sm:hidden">
                      Try different search terms or clear filters to find more results.
                    </span>
                  </p>
                  <div className="space-y-3">
                    <Button
                      onClick={handleClearFilters}
                      variant="outline"
                      className="w-full border-border/50 hover:bg-card"
                      disabled={getTotalActiveFilters() === 0}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Clear all filters
                    </Button>
                    <div className="text-xs sm:text-sm text-muted-foreground">or</div>
                    <Button
                      onClick={() => window.open('https://github.com', '_blank')}
                      className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Contribute this industry</span>
                      <span className="sm:hidden">Add Industry</span>
                    </Button>
                  </div>
                </div>
              </Card>
            )}

          </div>
        </div>
      </main>

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