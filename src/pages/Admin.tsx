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
  TrendingUp, Eye, CheckCircle, AlertCircle, Code, Pencil,
  UserPlus, Car, Globe, Plus, Edit, Trash2, Upload, Download, Mail, Bell, EyeIcon
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

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

const STAFF_MEMBERS = [
  { id: 1, name: "Sarah Admin", email: "sarah@admin.com", role: "Admin", permissions: ["All"] },
  { id: 2, name: "Mike Manager", email: "mike@admin.com", role: "Manager", permissions: ["Users", "Content", "Mechanics"] },
  { id: 3, name: "Emma Editor", email: "emma@admin.com", role: "Editor", permissions: ["Content"] }
];

const BRANDS = [
  { id: 1, name: "Toyota", models: ["Camry", "Corolla", "RAV4", "Highlander"] },
  { id: 2, name: "Honda", models: ["Civic", "Accord", "CR-V", "Pilot"] },
  { id: 3, name: "Ford", models: ["F-150", "Mustang", "Explorer", "Escape"] }
];

const COUNTRIES = [
  { id: 1, name: "United States", currency: "USD", language: "English", isActive: true },
  { id: 2, name: "United Kingdom", currency: "GBP", language: "English", isActive: true },
  { id: 3, name: "Germany", currency: "EUR", language: "German", isActive: true },
  { id: 4, name: "Japan", currency: "JPY", language: "Japanese", isActive: false }
];

const EMAIL_TEMPLATES = [
  { id: 1, name: "Email Verification Code", type: "verification", subject: "Verify your email address", lastEdited: "2 hours ago" },
  { id: 2, name: "Account Creation Confirmation", type: "welcome", subject: "Welcome to AutoRepair Guide", lastEdited: "1 day ago" },
  { id: 3, name: "Forgot Password Link", type: "password_reset", subject: "Reset your password", lastEdited: "3 days ago" },
  { id: 4, name: "Password Change Confirmation", type: "password_change", subject: "Your password has been changed", lastEdited: "5 days ago" },
  { id: 5, name: "Guide Match Notification", type: "guide_match", subject: "New repair guide matches your vehicle", lastEdited: "1 week ago" },
  { id: 6, name: "Guide Update Notification", type: "guide_update", subject: "A guide you viewed has been updated", lastEdited: "2 weeks ago" },
  { id: 7, name: "Offer Notification", type: "offer", subject: "New offer available in your area", lastEdited: "3 weeks ago" }
];

const NOTIFICATION_TEMPLATES = [
  { id: 1, name: "New Guide Match", type: "guide_match", message: "New repair guide available for your {vehicle}", enabled: true },
  { id: 2, name: "Guide Updated", type: "guide_update", message: "Guide '{guide_title}' has been updated", enabled: true },
  { id: 3, name: "Favorite Guide Updated", type: "favorite_update", message: "Your favorite guide has new information", enabled: true },
  { id: 4, name: "Offer Available", type: "offer", message: "New offer: {offer_title} - {discount}% off", enabled: true },
  { id: 5, name: "Offer in Your Area", type: "offer_location", message: "Special offer available near {location}", enabled: false }
];

export default function Admin() {
  const [editorMode, setEditorMode] = useState<"visual" | "code">("visual");
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState<number | null>(null);
  const [emailTemplateContent, setEmailTemplateContent] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailEditorTab, setEmailEditorTab] = useState<"visual" | "html">("visual");
  const [showPreview, setShowPreview] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState<Record<number, boolean>>({
    1: true, 2: true, 3: true, 4: true, 5: false
  });

  const handleEmailTemplateSelect = (templateId: number) => {
    const template = EMAIL_TEMPLATES.find(t => t.id === templateId);
    if (template) {
      setSelectedEmailTemplate(templateId);
      setEmailSubject(template.subject);
      // Load default template content based on type
      const defaultContent = getDefaultTemplateContent(template.type);
      setEmailTemplateContent(defaultContent);
    }
  };

  const getDefaultTemplateContent = (type: string) => {
    const templates: Record<string, string> = {
      verification: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #007bff; color: white; padding: 20px; text-align: center; }
    .content { padding: 30px; background: #f9f9f9; }
    .code { font-size: 32px; font-weight: bold; color: #007bff; text-align: center; padding: 20px; background: white; border-radius: 8px; }
    .footer { text-align: center; padding: 20px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Verify Your Email</h1>
    </div>
    <div class="content">
      <p>Hello {user_name},</p>
      <p>Thank you for signing up! Please use the verification code below to verify your email address:</p>
      <div class="code">{verification_code}</div>
      <p>This code will expire in 10 minutes.</p>
    </div>
    <div class="footer">
      <p>© 2025 AutoRepair Guide. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`,
      welcome: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #007bff, #00d4ff); color: white; padding: 30px; text-align: center; }
    .content { padding: 30px; }
    .button { display: inline-block; padding: 12px 30px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #666; border-top: 1px solid #ddd; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to AutoRepair Guide!</h1>
    </div>
    <div class="content">
      <p>Hello {user_name},</p>
      <p>Your account has been successfully created. We're excited to help you with all your vehicle repair needs!</p>
      <p>Get started by:</p>
      <ul>
        <li>Adding your vehicle information</li>
        <li>Browsing repair guides</li>
        <li>Finding local mechanics</li>
      </ul>
      <a href="#" class="button">Get Started</a>
    </div>
    <div class="footer">
      <p>© 2025 AutoRepair Guide. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`,
      password_reset: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #dc3545; color: white; padding: 20px; text-align: center; }
    .content { padding: 30px; background: #fff3cd; }
    .button { display: inline-block; padding: 12px 30px; background: #dc3545; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Password Reset Request</h1>
    </div>
    <div class="content">
      <p>Hello {user_name},</p>
      <p>We received a request to reset your password. Click the button below to create a new password:</p>
      <a href="{reset_link}" class="button">Reset Password</a>
      <p>If you didn't request this, please ignore this email.</p>
      <p><small>This link expires in 1 hour.</small></p>
    </div>
    <div class="footer">
      <p>© 2025 AutoRepair Guide. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`,
      default: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #007bff; color: white; padding: 20px; text-align: center; }
    .content { padding: 30px; }
    .footer { text-align: center; padding: 20px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>AutoRepair Guide</h1>
    </div>
    <div class="content">
      <p>Hello {user_name},</p>
      <p>Your email content goes here...</p>
    </div>
    <div class="footer">
      <p>© 2025 AutoRepair Guide. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`
    };
    return templates[type] || templates.default;
  };

  const handleSaveTemplate = () => {
    toast.success("Email template saved successfully!");
  };

  const handleSendTestEmail = () => {
    toast.success("Test email sent to your email address!");
  };

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
                <TabsTrigger value="staff">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Staff
                </TabsTrigger>
                <TabsTrigger value="brands">
                  <Car className="h-4 w-4 mr-2" />
                  Brands & Models
                </TabsTrigger>
                <TabsTrigger value="localization">
                  <Globe className="h-4 w-4 mr-2" />
                  Localization
                </TabsTrigger>
                <TabsTrigger value="email-templates">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Templates
                </TabsTrigger>
                <TabsTrigger value="notifications">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
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

              {/* Staff Management Tab */}
              <TabsContent value="staff" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Staff Management</CardTitle>
                        <CardDescription>Manage staff, managers, and editors with permissions</CardDescription>
                      </div>
                      <Button>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Staff Member
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Permissions</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {STAFF_MEMBERS.map((staff) => (
                          <TableRow key={staff.id}>
                            <TableCell className="font-medium">{staff.name}</TableCell>
                            <TableCell>{staff.email}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{staff.role}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {staff.permissions.map((perm, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {perm}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button size="sm" variant="outline">
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Create New Staff Member</CardTitle>
                    <CardDescription>Add a new staff member with specific role and permissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="staff-name">Full Name</Label>
                        <Input id="staff-name" placeholder="Enter full name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="staff-email">Email</Label>
                        <Input id="staff-email" type="email" placeholder="email@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="staff-role">Role</Label>
                        <Select>
                          <SelectTrigger id="staff-role">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="editor">Editor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="staff-password">Temporary Password</Label>
                        <Input id="staff-password" type="password" placeholder="Generate password" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Permissions</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 border rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="perm-users" />
                            <label htmlFor="perm-users" className="text-sm cursor-pointer">Users</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="perm-content" />
                            <label htmlFor="perm-content" className="text-sm cursor-pointer">Content</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="perm-mechanics" />
                            <label htmlFor="perm-mechanics" className="text-sm cursor-pointer">Mechanics</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="perm-settings" />
                            <label htmlFor="perm-settings" className="text-sm cursor-pointer">Settings</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="perm-brands" />
                            <label htmlFor="perm-brands" className="text-sm cursor-pointer">Brands</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="perm-reports" />
                            <label htmlFor="perm-reports" className="text-sm cursor-pointer">Reports</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="perm-analytics" />
                            <label htmlFor="perm-analytics" className="text-sm cursor-pointer">Analytics</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="perm-all" />
                            <label htmlFor="perm-all" className="text-sm cursor-pointer font-medium">All Permissions</label>
                          </div>
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <Button className="w-full">Create Staff Member</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Brands & Models Tab */}
              <TabsContent value="brands" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Brands & Models Management</CardTitle>
                        <CardDescription>Manage vehicle brands and their models</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Bulk Import
                        </Button>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Brand
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {BRANDS.map((brand) => (
                        <div key={brand.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <Car className="h-5 w-5 text-primary" />
                              <h4 className="font-semibold text-lg">{brand.name}</h4>
                              <Badge variant="outline">{brand.models.length} models</Badge>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Plus className="h-3 w-3 mr-1" />
                                Add Model
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {brand.models.map((model, idx) => (
                              <div key={idx} className="flex items-center gap-1 px-3 py-1 bg-muted rounded-md text-sm">
                                <span>{model}</span>
                                <button className="ml-1 hover:text-destructive">
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Add New Brand</CardTitle>
                      <CardDescription>Add a single vehicle brand</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="brand-name">Brand Name</Label>
                          <Input id="brand-name" placeholder="e.g., Toyota" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="brand-models">Models (comma-separated)</Label>
                          <Input id="brand-models" placeholder="e.g., Camry, Corolla, RAV4" />
                        </div>
                        <Button className="w-full">Add Brand</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Bulk Import Brands</CardTitle>
                      <CardDescription>Upload CSV file with brands and models</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border-2 border-dashed rounded-lg p-8 text-center">
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Drag and drop CSV file or click to browse
                          </p>
                          <Input type="file" accept=".csv" className="max-w-xs mx-auto" />
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">CSV Format:</p>
                          <code className="block text-xs bg-muted p-2 rounded">
                            Brand,Model1,Model2,Model3<br/>
                            Toyota,Camry,Corolla,RAV4<br/>
                            Honda,Civic,Accord,CR-V
                          </code>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1">
                            <Download className="h-4 w-4 mr-2" />
                            Download Template
                          </Button>
                          <Button className="flex-1">Import CSV</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Localization Tab */}
              <TabsContent value="localization" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Country & Localization Settings</CardTitle>
                        <CardDescription>Manage countries, currencies, and languages</CardDescription>
                      </div>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Country
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Country</TableHead>
                          <TableHead>Currency</TableHead>
                          <TableHead>Language</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {COUNTRIES.map((country) => (
                          <TableRow key={country.id}>
                            <TableCell className="font-medium">{country.name}</TableCell>
                            <TableCell>{country.currency}</TableCell>
                            <TableCell>{country.language}</TableCell>
                            <TableCell>
                              <Badge variant={country.isActive ? "secondary" : "outline"}>
                                {country.isActive ? "Active" : "Inactive"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button size="sm" variant="outline">
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Add New Country Configuration</CardTitle>
                    <CardDescription>Configure localization settings for a new country</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="country-name">Country Name</Label>
                        <Input id="country-name" placeholder="Enter country name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country-currency">Currency</Label>
                        <Select>
                          <SelectTrigger id="country-currency">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD - US Dollar</SelectItem>
                            <SelectItem value="EUR">EUR - Euro</SelectItem>
                            <SelectItem value="GBP">GBP - British Pound</SelectItem>
                            <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                            <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                            <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country-language">Language</Label>
                        <Select>
                          <SelectTrigger id="country-language">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Spanish">Spanish</SelectItem>
                            <SelectItem value="French">French</SelectItem>
                            <SelectItem value="German">German</SelectItem>
                            <SelectItem value="Japanese">Japanese</SelectItem>
                            <SelectItem value="Chinese">Chinese</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country-status">Status</Label>
                        <Select>
                          <SelectTrigger id="country-status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="md:col-span-2">
                        <Button className="w-full">Add Country Configuration</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Email Templates Tab */}
              <TabsContent value="email-templates" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Email Templates</CardTitle>
                        <CardDescription>Manage and customize email templates sent to users</CardDescription>
                      </div>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Template
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Template Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Subject</TableHead>
                          <TableHead>Last Edited</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {EMAIL_TEMPLATES.map((template) => (
                          <TableRow key={template.id}>
                            <TableCell className="font-medium">{template.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{template.type}</Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">{template.subject}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">{template.lastEdited}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => setSelectedEmailTemplate(template.id)}
                                >
                                  <Edit className="h-3 w-3 mr-1" />
                                  Edit
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Eye className="h-3 w-3 mr-1" />
                                  Preview
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {selectedEmailTemplate && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>
                            Edit Template: {EMAIL_TEMPLATES.find(t => t.id === selectedEmailTemplate)?.name}
                          </CardTitle>
                          <CardDescription>Customize email content and styling</CardDescription>
                        </div>
                        <Button variant="outline" onClick={() => setSelectedEmailTemplate(null)}>
                          Close Editor
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email-subject">Email Subject</Label>
                        <Input 
                          id="email-subject" 
                          value={emailSubject}
                          onChange={(e) => setEmailSubject(e.target.value)}
                          placeholder="Enter email subject"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email-content">Email Content</Label>
                        <div className="border rounded-lg">
                          <Tabs value={emailEditorTab} onValueChange={(v) => setEmailEditorTab(v as "visual" | "html")}>
                            <div className="border-b px-3 flex items-center justify-between">
                              <TabsList className="h-10">
                                <TabsTrigger value="visual">Visual Editor</TabsTrigger>
                                <TabsTrigger value="html">HTML Code</TabsTrigger>
                              </TabsList>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => setShowPreview(true)}
                                className="my-2"
                              >
                                <EyeIcon className="h-4 w-4 mr-2" />
                                Preview
                              </Button>
                            </div>
                            <TabsContent value="visual" className="p-4 min-h-[400px]">
                              <div className="space-y-4">
                                <div className="p-4 border rounded-lg bg-background">
                                  <Textarea
                                    value={emailTemplateContent}
                                    onChange={(e) => setEmailTemplateContent(e.target.value)}
                                    className="min-h-[350px] font-sans"
                                    placeholder="Edit your email content here. You can use HTML tags for formatting.

Example:
<h1>Hello {user_name}!</h1>
<p>Your content goes here...</p>
<a href='{reset_link}'>Click here</a>"
                                  />
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  <p className="font-medium mb-1">Available Variables:</p>
                                  <p>{"{user_name}"}, {"{verification_code}"}, {"{reset_link}"}, {"{vehicle}"}, {"{guide_title}"}, {"{offer_title}"}, {"{discount}"}, {"{location}"}</p>
                                </div>
                              </div>
                            </TabsContent>
                            <TabsContent value="html" className="p-0">
                              <Textarea
                                value={emailTemplateContent}
                                onChange={(e) => setEmailTemplateContent(e.target.value)}
                                className="w-full min-h-[400px] p-4 font-mono text-sm bg-muted/30 border-0 rounded-none resize-none"
                                placeholder="Enter HTML code..."
                              />
                            </TabsContent>
                          </Tabs>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={handleSaveTemplate}>Save Template</Button>
                        <Button variant="outline" onClick={handleSendTestEmail}>Send Test Email</Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle>Available Variables</CardTitle>
                    <CardDescription>Use these variables in your email templates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { var: "{user_name}", desc: "User's full name" },
                        { var: "{user_email}", desc: "User's email address" },
                        { var: "{verification_code}", desc: "6-digit verification code" },
                        { var: "{reset_link}", desc: "Password reset URL" },
                        { var: "{vehicle}", desc: "User's vehicle make/model" },
                        { var: "{guide_title}", desc: "Repair guide title" },
                        { var: "{offer_title}", desc: "Offer or promotion title" },
                        { var: "{discount}", desc: "Discount percentage" },
                        { var: "{location}", desc: "User's location/area" },
                        { var: "{date}", desc: "Current date" }
                      ].map((item, idx) => (
                        <div key={idx} className="p-3 border rounded-lg">
                          <code className="text-sm font-mono text-primary">{item.var}</code>
                          <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Notification Templates</CardTitle>
                        <CardDescription>Manage in-app notification templates and triggers</CardDescription>
                      </div>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Template
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {NOTIFICATION_TEMPLATES.map((template) => (
                        <div key={template.id} className="flex items-center justify-between p-4 rounded-lg border">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-medium">{template.name}</h4>
                              <Badge variant="outline">{template.type}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{template.message}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <Label htmlFor={`notify-${template.id}`} className="text-sm">
                                {template.enabled ? "Enabled" : "Disabled"}
                              </Label>
                              <Checkbox 
                                id={`notify-${template.id}`} 
                                checked={template.enabled}
                              />
                            </div>
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Edit Notification Template</CardTitle>
                    <CardDescription>Customize notification message and trigger conditions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="notify-name">Template Name</Label>
                      <Input id="notify-name" placeholder="e.g., New Guide Match" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="notify-type">Notification Type</Label>
                      <Select>
                        <SelectTrigger id="notify-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="guide_match">Guide Match</SelectItem>
                          <SelectItem value="guide_update">Guide Update</SelectItem>
                          <SelectItem value="favorite_update">Favorite Update</SelectItem>
                          <SelectItem value="offer">Offer</SelectItem>
                          <SelectItem value="offer_location">Offer Location</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notify-message">Notification Message</Label>
                      <textarea
                        id="notify-message"
                        className="w-full min-h-[100px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter notification message with variables..."
                        defaultValue="New repair guide available for your {vehicle}"
                      />
                      <p className="text-xs text-muted-foreground">
                        Use variables: {"{vehicle}"}, {"{guide_title}"}, {"{offer_title}"}, {"{discount}"}, {"{location}"}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Trigger Conditions</Label>
                      <div className="space-y-2 p-4 border rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="trigger-new-guide" />
                          <label htmlFor="trigger-new-guide" className="text-sm cursor-pointer">
                            When new guide matches user's vehicle
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="trigger-guide-update" />
                          <label htmlFor="trigger-guide-update" className="text-sm cursor-pointer">
                            When viewed guide is updated
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="trigger-favorite" />
                          <label htmlFor="trigger-favorite" className="text-sm cursor-pointer">
                            When favorite guide changes
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="trigger-offer" />
                          <label htmlFor="trigger-offer" className="text-sm cursor-pointer">
                            When offer is available in user's area
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                      <Checkbox id="notify-enabled" defaultChecked />
                      <label htmlFor="notify-enabled" className="text-sm font-medium cursor-pointer">
                        Enable this notification template
                      </label>
                    </div>

                    <div className="flex gap-2">
                      <Button>Save Template</Button>
                      <Button variant="outline">Send Test Notification</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Configure global notification preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="text-sm font-medium">Enable All Notifications</h4>
                        <p className="text-xs text-muted-foreground">Master switch for all notifications</p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="text-sm font-medium">Notification Sound</h4>
                        <p className="text-xs text-muted-foreground">Play sound when notification arrives</p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="text-sm font-medium">Desktop Notifications</h4>
                        <p className="text-xs text-muted-foreground">Show browser notifications</p>
                      </div>
                      <Checkbox />
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

      {/* Email Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Email Preview</DialogTitle>
            <DialogDescription>
              Preview how your email will look to recipients
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium">Subject:</p>
              <p className="text-sm text-muted-foreground">{emailSubject}</p>
            </div>
            <div className="border rounded-lg p-6 bg-white">
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: emailTemplateContent
                    .replace(/\{user_name\}/g, "John Doe")
                    .replace(/\{user_email\}/g, "john@example.com")
                    .replace(/\{verification_code\}/g, "123456")
                    .replace(/\{reset_link\}/g, "https://example.com/reset-password")
                    .replace(/\{vehicle\}/g, "Toyota Camry 2020")
                    .replace(/\{guide_title\}/g, "Brake Pad Replacement")
                    .replace(/\{offer_title\}/g, "Spring Maintenance Special")
                    .replace(/\{discount\}/g, "20")
                    .replace(/\{location\}/g, "New York, NY")
                    .replace(/\{date\}/g, new Date().toLocaleDateString())
                }}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowPreview(false)}>Close</Button>
              <Button onClick={handleSendTestEmail}>Send Test Email</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
