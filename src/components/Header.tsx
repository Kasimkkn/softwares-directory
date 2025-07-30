import { Button } from "@/components/ui/button";
import { Database, ExternalLink, Github, Menu, X } from "lucide-react";
import SearchWithSuggestions from "./SearchWithSuggestions";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchSuggestions: string[];
}

const Header = ({ searchQuery, onSearchChange, searchSuggestions }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo - Responsive sizing */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-shrink-0">
            <div className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg">
              <Database className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-foreground leading-tight">
                <span className="hidden xs:inline">Business Software</span>
                <span className="xs:hidden">BizSoft</span>
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  <span className="hidden xs:inline"> Directory</span>
                  <span className="xs:hidden"> Dir</span>
                </span>
              </h1>
              <p className="text-xs text-muted-foreground font-medium hidden sm:block">
                95+ Industries • Open Source • v2.0
              </p>
              <p className="text-xs text-muted-foreground font-medium sm:hidden">
                95+ Industries • v2.0
              </p>
            </div>
          </div>

          {/* Desktop Search Bar - Hidden on mobile */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-4 xl:mx-8">
            <SearchWithSuggestions
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
              suggestions={searchSuggestions}
              placeholder="Search industries, software, or companies..."
            />
          </div>

          {/* Desktop Action Buttons - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              className="hidden lg:flex items-center gap-2 border-border/50 hover:bg-card hover:text-primary transition-all duration-200 hover:border-primary/30"
              onClick={() => window.open('https://github.com', '_blank')}
            >
              <Github className="h-4 w-4" />
              <span>Star</span>
              <ExternalLink className="h-3 w-3 opacity-60" />
            </Button>

            <Button
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-medium px-3 lg:px-4"
              onClick={() => window.open('https://github.com', '_blank')}
            >
              <span className="hidden lg:inline">Contribute</span>
              <span className="lg:hidden">+</span>
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar - Below header on small screens */}
        <div className="lg:hidden mt-3 pt-3 border-t border-border/30">
          <SearchWithSuggestions
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            suggestions={searchSuggestions}
            placeholder="Search industries, software..."
          />
        </div>
      </div>
    </header>
  );
};

export default Header;