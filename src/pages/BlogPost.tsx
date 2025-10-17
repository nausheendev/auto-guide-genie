import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Calendar, User, Clock, ArrowRight, Share2, Bookmark } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams();

  // Blog post data (would come from database in production)
  const blogPosts: Record<string, any> = {
    "when-to-replace-brake-pads": {
      title: "When to Replace Brake Pads: Complete Guide for 2024",
      description: "Learn the warning signs of worn brake pads, replacement costs, and how to maximize brake pad lifespan. Expert tips from certified mechanics.",
      author: "Mike Johnson",
      publishDate: "2024-01-15",
      readTime: "8 min read",
      category: "Maintenance",
      tags: ["Brakes", "Safety", "Maintenance"],
      image: "/placeholder.svg",
      content: [
        {
          type: "paragraph",
          text: "Brake pads are one of the most critical safety components in your vehicle. Knowing when to replace them can prevent dangerous situations and save money on costly repairs. In this comprehensive guide, we'll cover everything you need to know about brake pad replacement."
        },
        {
          type: "heading",
          text: "Warning Signs Your Brake Pads Need Replacement"
        },
        {
          type: "list",
          items: [
            "Squealing or grinding noises when braking",
            "Reduced braking responsiveness",
            "Vibration or pulsing in the brake pedal",
            "Brake warning light on dashboard",
            "Visible wear through wheel spokes",
            "Longer stopping distances"
          ]
        },
        {
          type: "heading",
          text: "How Long Do Brake Pads Last?"
        },
        {
          type: "paragraph",
          text: "Brake pad lifespan varies depending on driving habits, vehicle type, and brake pad quality. Most brake pads last between 25,000 to 70,000 miles. City driving with frequent stops wears pads faster than highway driving."
        },
        {
          type: "heading",
          text: "Brake Pad Replacement Cost"
        },
        {
          type: "paragraph",
          text: "The average cost for brake pad replacement ranges from $150 to $300 per axle. This includes parts and labor. Premium brake pads or luxury vehicles may cost more. Always get quotes from multiple mechanics to ensure fair pricing."
        },
        {
          type: "heading",
          text: "Types of Brake Pads"
        },
        {
          type: "list",
          items: [
            "Ceramic brake pads: Quietest, produce less dust, longer lifespan ($50-$100 per axle)",
            "Semi-metallic brake pads: Better heat dissipation, more durable ($30-$70 per axle)",
            "Organic brake pads: Softer, quieter, but wear faster ($20-$40 per axle)",
            "Low-metallic NAO: Good braking power, can be noisy ($30-$60 per axle)"
          ]
        },
        {
          type: "heading",
          text: "DIY vs. Professional Replacement"
        },
        {
          type: "paragraph",
          text: "While experienced DIYers can replace brake pads, professional installation ensures proper calibration and safety. Consider professional service if you're unfamiliar with brake systems or lack proper tools."
        }
      ],
      relatedServices: [
        { name: "Brake Repair", slug: "brake-repair" },
        { name: "Brake Inspection", slug: "brake-inspection" },
        { name: "Rotor Replacement", slug: "rotor-replacement" }
      ]
    },
    "summer-car-maintenance-checklist": {
      title: "Summer Car Maintenance Checklist: Keep Your Vehicle Cool",
      description: "Essential summer car maintenance tips to prevent breakdowns in hot weather. AC service, coolant checks, and tire care for summer driving.",
      author: "Sarah Williams",
      publishDate: "2024-02-20",
      readTime: "6 min read",
      category: "Seasonal",
      tags: ["Summer", "Maintenance", "Tips"],
      image: "/placeholder.svg",
      content: [
        {
          type: "paragraph",
          text: "Summer heat can be tough on your vehicle. From overheating engines to tire blowouts, hot weather creates unique challenges. Follow this checklist to keep your car running smoothly all summer long."
        },
        {
          type: "heading",
          text: "Check Your AC System"
        },
        {
          type: "paragraph",
          text: "A functioning air conditioning system is essential for summer comfort and safety. Have your AC system inspected and recharged if necessary before temperatures soar. Low refrigerant levels or compressor issues should be addressed immediately."
        },
        {
          type: "heading",
          text: "Monitor Coolant Levels"
        },
        {
          type: "paragraph",
          text: "Your engine's cooling system works overtime in summer heat. Check coolant levels regularly and look for leaks. Have the system flushed according to manufacturer recommendations (typically every 30,000 miles)."
        },
        {
          type: "heading",
          text: "Inspect Tire Pressure and Tread"
        },
        {
          type: "paragraph",
          text: "Heat causes tire pressure to increase, which can lead to blowouts. Check tire pressure weekly and maintain manufacturer-recommended levels. Inspect tread depth – worn tires are more susceptible to heat-related failures."
        }
      ],
      relatedServices: [
        { name: "AC Repair", slug: "ac-repair" },
        { name: "Coolant Flush", slug: "coolant-flush" },
        { name: "Tire Inspection", slug: "tire-inspection" }
      ]
    }
  };

  const post = blogPosts[slug || "when-to-replace-brake-pads"] || blogPosts["when-to-replace-brake-pads"];

  // Related articles
  const relatedArticles = [
    { title: "How to Check Your Oil Level", slug: "how-to-check-oil", category: "Maintenance", readTime: "5 min" },
    { title: "Warning Lights Explained", slug: "warning-lights-explained", category: "Tips", readTime: "7 min" },
    { title: "Tire Rotation Guide", slug: "tire-rotation-guide", category: "Maintenance", readTime: "6 min" }
  ];

  const canonicalUrl = `https://autogos.com/blog/${slug}`;
  const publishedDate = new Date(post.publishDate).toISOString();

  // Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "image": post.image,
    "datePublished": publishedDate,
    "dateModified": publishedDate,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "AutoGos",
      "logo": {
        "@type": "ImageObject",
        "url": "https://autogos.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | AutoGos Blog</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.image} />
        <meta property="article:published_time" content={publishedDate} />
        <meta property="article:author" content={post.author} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={post.image} />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      <SchemaMarkup
        type="breadcrumb"
        data={{
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: post.title, url: `/blog/${slug}` }
          ]
        }}
      />

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Breadcrumb */}
          <div className="container mx-auto px-4 py-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/blog">Blog</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{post.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Article Header */}
          <article className="py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                {/* Meta Info */}
                <div className="mb-6">
                  <Badge variant="secondary" className="mb-4">{post.category}</Badge>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
                  <p className="text-xl text-muted-foreground mb-6">{post.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={post.publishDate}>
                        {new Date(post.publishDate).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </time>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <Bookmark className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>

                <Separator className="mb-8" />

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                  {post.content.map((section: any, index: number) => {
                    if (section.type === "heading") {
                      return (
                        <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                          {section.text}
                        </h2>
                      );
                    }
                    if (section.type === "paragraph") {
                      return (
                        <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
                          {section.text}
                        </p>
                      );
                    }
                    if (section.type === "list") {
                      return (
                        <ul key={index} className="list-disc pl-6 mb-6 space-y-2">
                          {section.items.map((item: string, i: number) => (
                            <li key={i} className="text-muted-foreground">{item}</li>
                          ))}
                        </ul>
                      );
                    }
                    return null;
                  })}
                </div>

                {/* Tags */}
                <div className="mt-8 pt-8 border-t">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>

                {/* Related Services */}
                <div className="mt-12 pt-8 border-t">
                  <h3 className="text-2xl font-bold mb-6">Related Services</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {post.relatedServices.map((service: any) => (
                      <Link
                        key={service.slug}
                        to={`/repairs/${service.slug}`}
                        className="group"
                      >
                        <Card className="h-full hover:shadow-lg hover:border-primary transition-all">
                          <CardHeader>
                            <CardTitle className="text-lg group-hover:text-primary transition-colors">
                              {service.name}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2">
                              Find local mechanics
                              <ArrowRight className="h-4 w-4" />
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Related Articles */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedArticles.map((article) => (
                    <Link
                      key={article.slug}
                      to={`/blog/${article.slug}`}
                      className="group"
                    >
                      <Card className="h-full hover:shadow-lg hover:border-primary transition-all">
                        <CardHeader>
                          <Badge variant="secondary" className="w-fit mb-2">
                            {article.category}
                          </Badge>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                            {article.title}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            {article.readTime}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-2xl font-bold mb-4">Need This Service?</h3>
                    <p className="text-muted-foreground mb-6">
                      Find trusted local mechanics and compare prices in your area
                    </p>
                    <Button size="lg" asChild>
                      <Link to="/repairs">
                        Find Mechanics Near You
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
