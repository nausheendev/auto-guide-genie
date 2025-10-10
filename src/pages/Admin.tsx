import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, FileText, Users, Wrench, Settings, 
  TrendingUp, Eye, CheckCircle, AlertCircle, Code, Pencil
} from "lucide-react";

const STATS = {
  totalGuides: 1247,
  activeUsers: 8532,
  guidesToday: 342,
  successRate: 94
};

const RECENT_GUIDES = [
  { id: 1, title: "Brake Pad Replacement", status: "Published", views: 2543, rating: 4.8 },
  { id: 2, title: "Oil Change", status: "Published", views: 1892, rating: 4.9 },
  { id: 3, title: "Battery Replacement", status: "Draft", views: 0, rating: 0 },
  { id: 4, title: "Spark Plug Replacement", status: "Review", views: 156, rating: 4.6 }
];

const RECENT_USERS = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "Active", credits: 3 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Active", credits: 2 },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "Blocked", credits: 0 },
  { id: 4, name: "Alice Williams", email: "alice@example.com", status: "Active", credits: 3 }
];

export default function Admin() {
  const [editorMode, setEditorMode] = useState<"visual" | "code">("visual");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage guides, users, and system settings</p>
              </div>
              <Button variant="accent">
                <FileText className="h-4 w-4 mr-2" />
                Create New Guide
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Guides</CardDescription>
                  <CardTitle className="text-3xl">{STATS.totalGuides}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1 text-sm text-success">
                    <TrendingUp className="h-4 w-4" />
                    <span>+12% this month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Active Users</CardDescription>
                  <CardTitle className="text-3xl">{STATS.activeUsers}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1 text-sm text-success">
                    <TrendingUp className="h-4 w-4" />
                    <span>+8% this month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Guides Today</CardDescription>
                  <CardTitle className="text-3xl">{STATS.guidesToday}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    <span>Live views</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Success Rate</CardDescription>
                  <CardTitle className="text-3xl">{STATS.successRate}%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1 text-sm text-success">
                    <CheckCircle className="h-4 w-4" />
                    <span>Excellent</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="content">
                  <FileText className="h-4 w-4 mr-2" />
                  Content
                </TabsTrigger>
                <TabsTrigger value="users">
                  <Users className="h-4 w-4 mr-2" />
                  Users
                </TabsTrigger>
                <TabsTrigger value="mechanics">
                  <Wrench className="h-4 w-4 mr-2" />
                  Mechanics
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Latest system events</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="flex items-start gap-3 p-3 rounded-lg border">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <FileText className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <p className="text-sm font-medium">New guide created</p>
                              <p className="text-xs text-muted-foreground">2 minutes ago</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>System Status</CardTitle>
                      <CardDescription>Service health monitoring</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg border">
                          <span className="text-sm font-medium">AI Service</span>
                          <Badge className="bg-success text-success-foreground">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Operational
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg border">
                          <span className="text-sm font-medium">Database</span>
                          <Badge className="bg-success text-success-foreground">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Operational
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg border">
                          <span className="text-sm font-medium">API</span>
                          <Badge className="bg-success text-success-foreground">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Operational
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Content Tab */}
              <TabsContent value="content" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Guide Management</CardTitle>
                        <CardDescription>Manage and edit repair guides</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant={editorMode === "visual" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setEditorMode("visual")}
                        >
                          <Pencil className="h-4 w-4 mr-2" />
                          Visual Editor
                        </Button>
                        <Button 
                          variant={editorMode === "code" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setEditorMode("code")}
                        >
                          <Code className="h-4 w-4 mr-2" />
                          Code Editor
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {RECENT_GUIDES.map((guide) => (
                        <div key={guide.id} className="flex items-center justify-between p-4 rounded-lg border">
                          <div className="flex-1">
                            <h4 className="font-medium">{guide.title}</h4>
                            <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {guide.views} views
                              </span>
                              {guide.rating > 0 && (
                                <span className="flex items-center gap-1">
                                  ⭐ {guide.rating}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={
                              guide.status === "Published" ? "secondary" : 
                              guide.status === "Review" ? "outline" : "default"
                            }>
                              {guide.status}
                            </Badge>
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {editorMode === "visual" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Visual Editor</CardTitle>
                      <CardDescription>Drag-and-drop content editor with live preview</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="border-2 border-dashed rounded-lg p-12 text-center">
                        <Pencil className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Visual editor interface would appear here</p>
                        <p className="text-sm text-muted-foreground mt-2">Select a guide to edit</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {editorMode === "code" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Code Editor</CardTitle>
                      <CardDescription>Edit guide content using JSON/Markdown</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="border-2 border-dashed rounded-lg p-12 text-center bg-muted/30">
                        <Code className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Code editor interface would appear here</p>
                        <p className="text-sm text-muted-foreground mt-2">Select a guide to edit</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Users Tab */}
              <TabsContent value="users" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage user accounts and permissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {RECENT_USERS.map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-4 rounded-lg border">
                          <div className="flex-1">
                            <h4 className="font-medium">{user.name}</h4>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-sm">
                              <span className="text-muted-foreground">Credits: </span>
                              <span className="font-medium">{user.credits}</span>
                            </div>
                            <Badge variant={user.status === "Active" ? "secondary" : "destructive"}>
                              {user.status}
                            </Badge>
                            <Button size="sm" variant="outline">
                              Manage
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Mechanics Tab */}
              <TabsContent value="mechanics" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Mechanic Management</CardTitle>
                    <CardDescription>Manage mechanic listings and approvals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed rounded-lg p-12 text-center">
                      <Wrench className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Mechanic management interface</p>
                      <Button className="mt-4" variant="outline">
                        Add New Mechanic
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>System Settings</CardTitle>
                    <CardDescription>Configure AI, credits, and site settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg border">
                        <div>
                          <h4 className="font-medium">AI Configuration</h4>
                          <p className="text-sm text-muted-foreground">API keys and generation limits</p>
                        </div>
                        <Button variant="outline">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg border">
                        <div>
                          <h4 className="font-medium">Credit System</h4>
                          <p className="text-sm text-muted-foreground">Daily limits and reset timing</p>
                        </div>
                        <Button variant="outline">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg border">
                        <div>
                          <h4 className="font-medium">Maintenance Mode</h4>
                          <p className="text-sm text-muted-foreground">Enable/disable site access</p>
                        </div>
                        <Button variant="outline">Configure</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
