import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { toast } = useToast();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold">Profile & Settings</h1>
        <p className="text-muted-foreground">Manage your account details and application preferences.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Profile Card */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold border-4 border-white shadow-lg">
                DR
              </div>
              <CardTitle>Dr. Aditi Sharma</CardTitle>
              <CardDescription>Senior Veterinarian</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" /> aditi.sharma@nirmay.vet
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" /> +91 98765 43210
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" /> District Veterinary Hospital, Anand
              </div>
              <Button 
                className="w-full mt-4" 
                variant="outline"
                onClick={() => toast({ title: "Edit Profile", description: "Profile editing is disabled in this demo." })}
              >
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Settings */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" /> Security & Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Current Password</Label>
                <Input type="password" value="********" readOnly />
              </div>
              <div className="grid gap-2">
                <Label>New Password</Label>
                <Input type="password" placeholder="Enter new password" />
              </div>
              <Button onClick={() => toast({ title: "Success", description: "Password has been updated successfully." })}>
                Update Password
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive daily summaries of critical alerts.</p>
                </div>
                <div className="h-6 w-11 rounded-full bg-primary p-1 cursor-pointer" onClick={() => toast({ title: "Setting Updated", description: "Email notifications preference saved." })}>
                  <div className="h-4 w-4 rounded-full bg-white translate-x-5 transition-transform" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">SMS Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get instant SMS for MRL violations.</p>
                </div>
                <div className="h-6 w-11 rounded-full bg-primary p-1 cursor-pointer" onClick={() => toast({ title: "Setting Updated", description: "SMS alerts preference saved." })}>
                  <div className="h-4 w-4 rounded-full bg-white translate-x-5 transition-transform" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
