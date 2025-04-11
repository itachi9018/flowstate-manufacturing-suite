
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">System Settings</h1>
        <Button>
          <SettingsIcon className="mr-2" size={16} /> Save Changes
        </Button>
      </div>
      
      <Card className="glass-card p-8 text-center">
        <div className="py-12 flex flex-col items-center">
          <SettingsIcon size={48} className="text-gray-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">System Configuration</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            Configure system settings, user permissions, notifications, and customize your FlowState experience.
          </p>
          <Button>View Settings</Button>
        </div>
      </Card>
    </Layout>
  );
};

export default Settings;
