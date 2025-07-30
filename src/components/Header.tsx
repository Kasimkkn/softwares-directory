import { Github, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchWithSuggestions from "./SearchWithSuggestions";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchSuggestions: string[];
}

const Header = ({ searchQuery, onSearchChange, searchSuggestions }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-primary shadow-glow">
              <Database className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Business Software Directory</h1>
              <p className="text-sm text-muted-foreground">65+ Industries • Open Source</p>
            </div>
          </div>

          {/* Enhanced Search Bar with Suggestions */}
          <SearchWithSuggestions
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            suggestions={searchSuggestions}
          />

          {/* GitHub Link */}
          <Button
            variant="outline"
            className="flex items-center space-x-2 border-border hover:bg-card hover:text-primary transition-smooth"
            onClick={() => window.open('https://github.com', '_blank')}
          >
            <Github className="h-4 w-4" />
            <span className="hidden md:inline">Contribute</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;