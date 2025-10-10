import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search as SearchIcon, Filter, Clock, DollarSign, TrendingUp } from "lucide-react";

const SEARCH_RESULTS = [
  {
    id: 1,
    title: "Oil Change",
    vehicle: "Universal",
    category: "Maintenance",
    difficulty: "Easy",
    time: "30 mins",
    cost: "$40-60",
    views: "15.2k",
    rating: 4.9
  },
  {
    id: 2,
    title: "Brake Pad Replacement",
    vehicle: "Toyota Camry 2020",
    category: "Brakes",
    difficulty: "Medium",
    time: "2 hours",
    cost: "$150-300",
    views: "12.8k",
    rating: 4.8
  },
  {
    id: 3,
    title: "Battery Replacement",
    vehicle: "Universal",
    category: "Electrical",
    difficulty: "Easy",
    time: "15 mins",
    cost: "$100-200",
    views: "10.5k",
    rating: 4.7
  },
  {
    id: 4,
    title: "Air Filter Replacement",
    vehicle: "Universal",
    category: "Maintenance",
    difficulty: "Easy",
    time: "10 mins",
    cost: "$20-40",
    views: "9.3k",
    rating: 4.9
  },
  {
    id: 5,
    title: "Spark Plug Replacement",
    vehicle: "Honda Accord 2019",
    category: "Engine",
    difficulty: "Medium",
    time: "1.5 hours",
    cost: "$80-150",
    views: "8.7k",
    rating: 4.6
  },
  {
    id: 6,
    title: "Tire Rotation",
    vehicle: "Universal",
    category: "Maintenance",
    difficulty: "Easy",
    time: "45 mins",
    cost: "$30-50",
    views: "7.9k",
    rating: 4.8
  }
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [difficulty, setDifficulty] = useState("all");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container">
          <div className="space-y-6">
            {/* Search Header */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">Search Repair Guides</h1>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search by repair type, problem, or vehicle..."
                    className="pl-10 h-12"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button size="lg" className="md:w-auto">
                  <SearchIcon className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Filter className="h-4 w-4" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="All categories" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="brakes">Brakes</SelectItem>
                        <SelectItem value="engine">Engine</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="suspension">Suspension</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Difficulty</label>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="All levels" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sort By</label>
                    <Select defaultValue="relevance">
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="popular">Most Popular</SelectItem>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Count */}
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing <span className="font-medium text-foreground">{SEARCH_RESULTS.length}</span> results
              </p>
              <Button variant="outline" size="sm">
                Clear Filters
              </Button>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SEARCH_RESULTS.map((result) => (
                <Link key={result.id} to={`/guide/${result.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="secondary">{result.category}</Badge>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{result.views}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{result.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{result.vehicle}</p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Difficulty:</span>
                        <Badge 
                          variant={result.difficulty === "Easy" ? "secondary" : result.difficulty === "Medium" ? "outline" : "default"}
                        >
                          {result.difficulty}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Time:</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span className="font-medium">{result.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Est. Cost:</span>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          <span className="font-medium">{result.cost}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm pt-2 border-t">
                        <span className="text-muted-foreground">Rating:</span>
                        <span className="font-bold text-warning">{result.rating} ⭐</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center pt-8">
              <div className="flex items-center gap-2">
                <Button variant="outline" disabled>Previous</Button>
                <Button variant="default">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
