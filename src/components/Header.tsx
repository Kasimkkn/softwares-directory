import { Button } from "@/components/ui/button";
import { Database, ExternalLink, Github } from "lucide-react";
import SearchWithSuggestions from "./SearchWithSuggestions";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchSuggestions: string[];
}

const Header = ({ searchQuery, onSearchChange, searchSuggestions }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo - More modern */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg">
                <Database className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Business Software
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Directory</span>
              </h1>
              <p className="text-xs text-muted-foreground font-medium">
                65+ Industries • Open Source • v2.0
              </p>
            </div>
          </div>

          {/* Enhanced Search Bar - Now takes more space */}
          <div className="flex-1 max-w-2xl mx-8">
            <SearchWithSuggestions
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
              suggestions={searchSuggestions}
              placeholder="Search industries, software, or companies..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex items-center gap-2 border-border/50 hover:bg-card hover:text-primary transition-all duration-200 hover:border-primary/30"
              onClick={() => window.open('https://github.com', '_blank')}
            >
              <Github className="h-4 w-4" />
              <span>Star</span>
              <ExternalLink className="h-3 w-3 opacity-60" />
            </Button>

            <Button
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-medium px-4"
              onClick={() => window.open('https://github.com', '_blank')}
            >
              <span className="hidden sm:inline">Contribute</span>
              <span className="sm:hidden">+</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;