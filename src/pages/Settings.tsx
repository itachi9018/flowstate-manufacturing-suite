
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Globe,
  Database,
  HardDrive,
  Mail,
  LifeBuoy,
  Palette,
  Moon,
  Sun,
  Check
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [appNotifications, setAppNotifications] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState("daily");
  
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">System Settings</h1>
        <Button>
          <SettingsIcon className="mr-2" size={16} /> Save Changes
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Settings Navigation */}
        <Card className="glass-card md:col-span-3">
          <CardContent className="p-4">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              orientation="vertical" 
              className="w-full"
            >
              <TabsList className="flex flex-col items-stretch h-auto bg-transparent space-y-1">
                <TabsTrigger 
                  value="general" 
                  className="justify-start text-left px-4 py-3 data-[state=active]:bg-white/10"
                >
                  <Globe size={16} className="mr-2" /> General
                </TabsTrigger>
                <TabsTrigger 
                  value="appearance" 
                  className="justify-start text-left px-4 py-3 data-[state=active]:bg-white/10"
                >
                  <Palette size={16} className="mr-2" /> Appearance
                </TabsTrigger>
                <TabsTrigger 
                  value="account" 
                  className="justify-start text-left px-4 py-3 data-[state=active]:bg-white/10"
                >
                  <User size={16} className="mr-2" /> Account
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications" 
                  className="justify-start text-left px-4 py-3 data-[state=active]:bg-white/10"
                >
                  <Bell size={16} className="mr-2" /> Notifications
                </TabsTrigger>
                <TabsTrigger 
                  value="security" 
                  className="justify-start text-left px-4 py-3 data-[state=active]:bg-white/10"
                >
                  <Shield size={16} className="mr-2" /> Security
                </TabsTrigger>
                <TabsTrigger 
                  value="data" 
                  className="justify-start text-left px-4 py-3 data-[state=active]:bg-white/10"
                >
                  <Database size={16} className="mr-2" /> Data & Storage
                </TabsTrigger>
                <TabsTrigger 
                  value="help" 
                  className="justify-start text-left px-4 py-3 data-[state=active]:bg-white/10"
                >
                  <LifeBuoy size={16} className="mr-2" /> Help & Support
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* Settings Content */}
        <div className="md:col-span-9">
          {/* General Settings */}
          <TabsContent value="general" className="mt-0" hidden={activeTab !== "general"}>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure system-wide settings for FlowState ERP</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" defaultValue="FlowState Manufacturing, Inc." className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <div className="relative mt-1">
                      <select id="timezone" className="w-full p-2 border border-gray-300 rounded-md bg-transparent appearance-none pr-10">
                        <option value="UTC-8">Pacific Time (UTC-8)</option>
                        <option value="UTC-7">Mountain Time (UTC-7)</option>
                        <option value="UTC-6">Central Time (UTC-6)</option>
                        <option value="UTC-5">Eastern Time (UTC-5)</option>
                        <option value="UTC">UTC</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label htmlFor="address">Company Address</Label>
                  <Input id="address" defaultValue="123 Manufacturing Way" className="mt-1" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    <Input placeholder="City" defaultValue="Industryville" />
                    <Input placeholder="State/Province" defaultValue="California" />
                    <Input placeholder="Zip/Postal Code" defaultValue="90210" />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">System Language</h3>
                  <div className="flex items-center space-x-2">
                    <div className="relative mt-1">
                      <select className="w-full p-2 border border-gray-300 rounded-md bg-transparent appearance-none pr-10">
                        <option value="en-US">English (US)</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="zh">Chinese</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Changes the language across the entire system</p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Date & Time Format</h3>
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Date Format</span>
                      <div className="relative">
                        <select className="p-1 border border-gray-300 rounded-md bg-transparent appearance-none pr-8">
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Time Format</span>
                      <div className="relative">
                        <select className="p-1 border border-gray-300 rounded-md bg-transparent appearance-none pr-8">
                          <option value="12">12-hour (AM/PM)</option>
                          <option value="24">24-hour</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="mt-0" hidden={activeTab !== "appearance"}>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize the look and feel of the FlowState interface</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Theme Mode</h3>
                  <div className="flex items-center gap-8">
                    <div 
                      className={`flex flex-col items-center gap-2 cursor-pointer p-4 rounded-lg ${!isDarkMode ? 'ring-2 ring-flow-blue' : ''}`}
                      onClick={() => setIsDarkMode(false)}
                    >
                      <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-md">
                        <Sun size={32} className="text-amber-500" />
                      </div>
                      <span className="text-sm font-medium">Light Mode</span>
                      {!isDarkMode && <Check size={16} className="text-flow-blue" />}
                    </div>
                    
                    <div 
                      className={`flex flex-col items-center gap-2 cursor-pointer p-4 rounded-lg ${isDarkMode ? 'ring-2 ring-flow-blue' : ''}`}
                      onClick={() => setIsDarkMode(true)}
                    >
                      <div className="h-16 w-16 rounded-full bg-gray-800 flex items-center justify-center shadow-md">
                        <Moon size={32} className="text-indigo-300" />
                      </div>
                      <span className="text-sm font-medium">Dark Mode</span>
                      {isDarkMode && <Check size={16} className="text-flow-blue" />}
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Accent Color</h3>
                  <RadioGroup defaultValue="purple" className="grid grid-cols-5 gap-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center justify-center">
                        <RadioGroupItem value="purple" id="purple" className="sr-only" />
                        <Label
                          htmlFor="purple"
                          className="h-10 w-10 rounded-full bg-purple-500 cursor-pointer ring-offset-2 ring-offset-background ring-2 ring-transparent data-[state=checked]:ring-purple-500"
                        />
                      </div>
                      <span className="text-xs">Purple</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center justify-center">
                        <RadioGroupItem value="blue" id="blue" className="sr-only" />
                        <Label
                          htmlFor="blue"
                          className="h-10 w-10 rounded-full bg-blue-500 cursor-pointer ring-offset-2 ring-offset-background ring-2 ring-transparent data-[state=checked]:ring-blue-500"
                        />
                      </div>
                      <span className="text-xs">Blue</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center justify-center">
                        <RadioGroupItem value="green" id="green" className="sr-only" />
                        <Label
                          htmlFor="green"
                          className="h-10 w-10 rounded-full bg-green-500 cursor-pointer ring-offset-2 ring-offset-background ring-2 ring-transparent data-[state=checked]:ring-green-500"
                        />
                      </div>
                      <span className="text-xs">Green</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center justify-center">
                        <RadioGroupItem value="amber" id="amber" className="sr-only" />
                        <Label
                          htmlFor="amber"
                          className="h-10 w-10 rounded-full bg-amber-500 cursor-pointer ring-offset-2 ring-offset-background ring-2 ring-transparent data-[state=checked]:ring-amber-500"
                        />
                      </div>
                      <span className="text-xs">Amber</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center justify-center">
                        <RadioGroupItem value="red" id="red" className="sr-only" />
                        <Label
                          htmlFor="red"
                          className="h-10 w-10 rounded-full bg-red-500 cursor-pointer ring-offset-2 ring-offset-background ring-2 ring-transparent data-[state=checked]:ring-red-500"
                        />
                      </div>
                      <span className="text-xs">Red</span>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Interface Settings</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Compact Layout</p>
                      <p className="text-sm text-gray-500">Reduce spacing in tables and lists</p>
                    </div>
                    <Switch id="compact-mode" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Animation</p>
                      <p className="text-sm text-gray-500">Enable UI animations and transitions</p>
                    </div>
                    <Switch id="animations" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Glassmorphism Effects</p>
                      <p className="text-sm text-gray-500">Enable glass-like transparent UI elements</p>
                    </div>
                    <Switch id="glassmorphism" defaultChecked />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button>Save Appearance</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="mt-0" hidden={activeTab !== "notifications"}>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure how you receive alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch 
                      id="email-notifications" 
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">In-App Notifications</p>
                      <p className="text-sm text-gray-500">Show notifications within the application</p>
                    </div>
                    <Switch 
                      id="app-notifications" 
                      checked={appNotifications}
                      onCheckedChange={setAppNotifications}
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Notification Preferences</h3>
                  <div className="space-y-4">
                    {[
                      { id: "inventory", title: "Inventory Alerts", description: "Low stock and inventory changes" },
                      { id: "orders", title: "Order Updates", description: "New orders and status changes" },
                      { id: "production", title: "Production Issues", description: "Delays, errors, and machine problems" },
                      { id: "maintenance", title: "Maintenance Reminders", description: "Scheduled equipment maintenance" },
                      { id: "reports", title: "Report Generation", description: "When new reports are available" },
                    ].map(item => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                        <Switch id={`notify-${item.id}`} defaultChecked />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button>Save Notification Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data & Storage */}
          <TabsContent value="data" className="mt-0" hidden={activeTab !== "data"}>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Data & Storage Settings</CardTitle>
                <CardDescription>Configure database backups and data management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Automated Backups</h3>
                  <RadioGroup 
                    value={backupFrequency} 
                    onValueChange={setBackupFrequency} 
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="daily" id="backup-daily" />
                      <Label htmlFor="backup-daily">Daily (recommended)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekly" id="backup-weekly" />
                      <Label htmlFor="backup-weekly">Weekly</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monthly" id="backup-monthly" />
                      <Label htmlFor="backup-monthly">Monthly</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="never" id="backup-never" />
                      <Label htmlFor="backup-never">Never (not recommended)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Storage Management</h3>
                  <div className="bg-gray-100/10 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Total Storage Used</span>
                      <span className="text-sm">12.8 GB of 50 GB</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-flow-blue rounded-full" style={{ width: "25%" }}></div>
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-gray-500">
                      <span>25% used</span>
                      <span>75% available</span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Production Data</span>
                      <span>4.2 GB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Inventory Records</span>
                      <span>2.8 GB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Employee Files</span>
                      <span>1.5 GB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Financial Records</span>
                      <span>3.1 GB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Report Archives</span>
                      <span>1.2 GB</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Data Retention</h3>
                  
                  <div>
                    <Label htmlFor="retain-production">Production Records</Label>
                    <div className="relative mt-1">
                      <select id="retain-production" className="w-full p-2 border border-gray-300 rounded-md bg-transparent appearance-none pr-10">
                        <option value="1">1 Year</option>
                        <option value="2">2 Years</option>
                        <option value="5" selected>5 Years</option>
                        <option value="7">7 Years</option>
                        <option value="10">10 Years</option>
                        <option value="forever">Indefinitely</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="retain-financial">Financial Records</Label>
                    <div className="relative mt-1">
                      <select id="retain-financial" className="w-full p-2 border border-gray-300 rounded-md bg-transparent appearance-none pr-10">
                        <option value="1">1 Year</option>
                        <option value="2">2 Years</option>
                        <option value="5">5 Years</option>
                        <option value="7" selected>7 Years</option>
                        <option value="10">10 Years</option>
                        <option value="forever">Indefinitely</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline">Manual Backup</Button>
                  <Button>Save Storage Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Placeholder for other tabs */}
          {["account", "security", "help"].includes(activeTab) && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings</CardTitle>
                <CardDescription>Configure your {activeTab} settings</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col justify-center items-center py-12">
                {activeTab === "account" && <User size={48} className="text-flow-blue mb-4" />}
                {activeTab === "security" && <Shield size={48} className="text-flow-blue mb-4" />}
                {activeTab === "help" && <LifeBuoy size={48} className="text-flow-blue mb-4" />}
                <h3 className="text-xl font-semibold mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings</h3>
                <p className="text-gray-500 max-w-md text-center mb-6">
                  This section would contain detailed {activeTab} configurations and options.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
