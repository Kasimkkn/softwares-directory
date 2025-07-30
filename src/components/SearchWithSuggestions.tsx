import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface SearchWithSuggestionsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  suggestions: string[];
  placeholder?: string;
}

const SearchWithSuggestions = ({ 
  searchQuery, 
  onSearchChange, 
  suggestions, 
  placeholder = "Search industries, software types, or companies..."
}: SearchWithSuggestionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = suggestions
        .filter(suggestion => 
          suggestion.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 8); // Limit to 8 suggestions
      setFilteredSuggestions(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setIsOpen(false);
      setFilteredSuggestions([]);
    }
  }, [searchQuery, suggestions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    onSearchChange(suggestion);
    setIsOpen(false);
  };

  const clearSearch = () => {
    onSearchChange("");
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative flex-1 max-w-xl mx-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => filteredSuggestions.length > 0 && setIsOpen(true)}
          className="pl-10 pr-10 bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-primary focus:border-primary transition-smooth"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && filteredSuggestions.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 p-2 bg-card border-border shadow-card-hover z-50 max-h-64 overflow-y-auto">
          <div className="space-y-1">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-foreground hover:bg-muted transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Search className="h-3 w-3 text-muted-foreground" />
                  <span>{suggestion}</span>
                </div>
              </button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default SearchWithSuggestions;