import { useState, useMemo } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AnalyticsSection from "@/components/AnalyticsSection";
import FilterSidebar from "@/components/FilterSidebar";
import IndustryCard from "@/components/IndustryCard";
import IndustryModal from "@/components/IndustryModal";
import Footer from "@/components/Footer";
import businessData from "@/data/business-software.json";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<any>(null);
  const [activeFilters, setActiveFilters] = useState({
    growthPotential: [] as string[],
    locations: [] as string[],
    categories: [] as string[]
  });

  // Extract industries from data
  const industries = useMemo(() => {
    return Object.values(businessData.industry_specific_software);
  }, []);

  // Extract filter options
  const filterOptions = useMemo(() => {
    const growthPotentials = [...new Set(industries.map(ind => ind.growth_potential).filter(Boolean))];
    const locations = [...new Set(industries.flatMap(ind => ind.target_locations))];
    const categories = [...new Set(industries.map(ind => {
      // Extract category from industry name
      if (ind.industry.toLowerCase().includes('tech')) return 'Technology';
      if (ind.industry.toLowerCase().includes('health')) return 'Healthcare';
      if (ind.industry.toLowerCase().includes('food')) return 'Food & Beverage';
      if (ind.industry.toLowerCase().includes('education')) return 'Education';
      if (ind.industry.toLowerCase().includes('retail')) return 'Retail';
      if (ind.industry.toLowerCase().includes('finance')) return 'Finance';
      return 'Other';
    }))];

    return {
      growthPotential: growthPotentials.sort(),
      locations: locations.sort(),
      categories: categories.sort()
    };
  }, [industries]);

  // Filter industries based on search and filters
  const filteredIndustries = useMemo(() => {
    return industries.filter(industry => {
      // Search filter
      const matchesSearch = searchQuery === "" || 
        industry.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        industry.business_types.some(type => type.toLowerCase().includes(searchQuery.toLowerCase())) ||
        industry.software_features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase())) ||
        industry.examples.some(example => example.toLowerCase().includes(searchQuery.toLowerCase()));

      // Growth potential filter
      const matchesGrowth = activeFilters.growthPotential.length === 0 || 
        (industry.growth_potential && activeFilters.growthPotential.includes(industry.growth_potential));

      // Location filter
      const matchesLocation = activeFilters.locations.length === 0 ||
        activeFilters.locations.some(loc => industry.target_locations.includes(loc));

      // Category filter (simplified for now)
      const matchesCategory = activeFilters.categories.length === 0 || true; // Simplified

      return matchesSearch && matchesGrowth && matchesLocation && matchesCategory;
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Hero Section */}
      <HeroSection 
        totalIndustries={businessData.metadata.total_industries}
        totalCategories={businessData.metadata.total_categories}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
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

          {/* Industries Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Industry Software Categories
              </h2>
              <p className="text-muted-foreground">
                Showing {filteredIndustries.length} of {industries.length} industries
              </p>
            </div>

            {filteredIndustries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredIndustries.map((industry, index) => (
                  <IndustryCard
                    key={index}
                    industry={industry}
                    onClick={() => setSelectedIndustry(industry)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No industries found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filters to find more results.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="text-primary hover:underline"
                  >
                    Clear all filters
                  </button>
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
