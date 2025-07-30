import { Share2, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

interface ShareButtonProps {
  industryName: string;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline" | "ghost";
}

const ShareButton = ({ industryName, size = "default", variant = "outline" }: ShareButtonProps) => {
  const [copied, setCopied] = useState(false);

  const generateShareUrl = () => {
    const baseUrl = window.location.origin;
    const slug = industryName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    return `${baseUrl}/?industry=${encodeURIComponent(slug)}#${slug}`;
  };

  const shareUrl = generateShareUrl();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Industry link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy the URL manually.",
        variant: "destructive",
      });
    }
  };

  const shareOnLinkedIn = () => {
    const text = `Check out this comprehensive guide to ${industryName} software solutions!`;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(text)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=400');
  };

  const shareOnTwitter = () => {
    const text = `Exploring ${industryName} software solutions 🚀\n\nComprehensive database with tools, features, and examples.\n\n#BusinessSoftware #${industryName.replace(/\s+/g, '')}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className="flex items-center space-x-2">
          <Share2 className="h-4 w-4" />
          <span className="hidden sm:inline">Share</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-card border-border">
        <DropdownMenuItem 
          onClick={copyToClipboard}
          className="flex items-center space-x-2 text-foreground hover:bg-muted cursor-pointer"
        >
          {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? "Copied!" : "Copy Link"}</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={shareOnLinkedIn}
          className="flex items-center space-x-2 text-foreground hover:bg-muted cursor-pointer"
        >
          <div className="h-4 w-4 bg-blue-600 rounded" />
          <span>Share on LinkedIn</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={shareOnTwitter}
          className="flex items-center space-x-2 text-foreground hover:bg-muted cursor-pointer"
        >
          <div className="h-4 w-4 bg-sky-500 rounded" />
          <span>Share on Twitter</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareButton;