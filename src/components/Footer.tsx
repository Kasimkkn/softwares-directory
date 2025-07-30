import { Github, Database, Heart, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    project: [
      { name: "Documentation", href: "#" },
      { name: "API Reference", href: "#" },
      { name: "Changelog", href: "#" },
      { name: "Contributing Guide", href: "#" }
    ],
    community: [
      { name: "GitHub Issues", href: "https://github.com" },
      { name: "Feature Requests", href: "#" },
      { name: "Discord", href: "#" },
      { name: "LinkedIn", href: "#" }
    ],
    resources: [
      { name: "Industry Reports", href: "#" },
      { name: "Market Analysis", href: "#" },
      { name: "Business Tools", href: "#" },
      { name: "Startup Resources", href: "#" }
    ]
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-xl bg-gradient-primary shadow-glow">
                <Database className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Business Software Directory</h3>
                <p className="text-sm text-muted-foreground">Open Source</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Comprehensive database of business software across 65+ industries. 
              Built by the community, for the community.
            </p>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.open('https://github.com', '_blank')}
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-4 w-4" />
                <span className="text-sm">Star on GitHub</span>
              </button>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Project</h4>
            <ul className="space-y-2">
              {links.project.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
                  >
                    {link.name}
                    {link.href.startsWith('http') && <ExternalLink className="h-3 w-3 ml-1" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Community</h4>
            <ul className="space-y-2">
              {links.community.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
                  >
                    {link.name}
                    {link.href.startsWith('http') && <ExternalLink className="h-3 w-3 ml-1" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2">
              {links.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
                  >
                    {link.name}
                    {link.href.startsWith('http') && <ExternalLink className="h-3 w-3 ml-1" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>© {currentYear} Business Software Directory</span>
            <span>•</span>
            <span>Version 2.0</span>
            <span>•</span>
            <span>Last Updated: July 30, 2025</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>by the open source community</span>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-lg bg-background border border-border">
            <div className="text-2xl font-bold text-primary">65+</div>
            <div className="text-xs text-muted-foreground">Industries</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-background border border-border">
            <div className="text-2xl font-bold text-primary">8</div>
            <div className="text-xs text-muted-foreground">Categories</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-background border border-border">
            <div className="text-2xl font-bold text-primary">15+</div>
            <div className="text-xs text-muted-foreground">Growth Sectors</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-background border border-border">
            <div className="text-2xl font-bold text-primary">100%</div>
            <div className="text-xs text-muted-foreground">Open Source</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;