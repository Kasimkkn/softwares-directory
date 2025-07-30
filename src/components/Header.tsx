import { Search, Github, Database } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
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

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search industries, software types, or companies..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

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