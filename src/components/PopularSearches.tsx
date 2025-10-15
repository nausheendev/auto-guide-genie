import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface PopularSearch {
  title: string;
  url: string;
  views: string;
  trending?: boolean;
}

interface PopularSearchesProps {
  city: string;
  citySlug: string;
}

export const PopularSearches = ({ city, citySlug }: PopularSearchesProps) => {
  // Mock data - in production, fetch from analytics/database
  const popularSearches: PopularSearch[] = [
    {
      title: `Oil Change Services in ${city}`,
      url: `/repairs/${citySlug}/oil-change`,
      views: "2.4K",
      trending: true
    },
    {
      title: `Tire Rotation & Alignment in ${city}`,
      url: `/repairs/${citySlug}/tire-rotation`,
      views: "1.8K"
    },
    {
      title: `Engine Diagnostics Near ${city}`,
      url: `/repairs/${citySlug}/engine-diagnostics`,
      views: "1.5K",
      trending: true
    },
    {
      title: `Transmission Repair in ${city}`,
      url: `/repairs/${citySlug}/transmission-repair`,
      views: "1.2K"
    },
    {
      title: `AC Repair Services ${city}`,
      url: `/repairs/${citySlug}/ac-repair`,
      views: "980"
    },
    {
      title: `Battery Replacement in ${city}`,
      url: `/repairs/${citySlug}/battery-replacement`,
      views: "850"
    }
  ];

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Trending Auto Repairs in {city}</h2>
          </div>
          <p className="text-muted-foreground mb-8">
            Most searched automotive services by {city} drivers this month
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularSearches.map((search, index) => (
              <Link key={index} to={search.url} className="group">
                <Card className="h-full hover:shadow-lg transition-all duration-200 hover:border-primary/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CardTitle className="text-base leading-tight group-hover:text-primary transition-colors">
                        {search.title}
                      </CardTitle>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary flex-shrink-0" />
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <span className="text-sm font-medium">{search.views} views</span>
                      {search.trending && (
                        <Badge variant="secondary" className="text-xs">
                          Trending
                        </Badge>
                      )}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-8 p-4 bg-background rounded-lg border">
            <p className="text-sm text-muted-foreground text-center">
              Can't find what you're looking for? <Link to="/search" className="text-primary hover:underline font-medium">Search all services</Link> or <Link to="/mechanic-dashboard" className="text-primary hover:underline font-medium">get a free quote</Link> from local mechanics.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
