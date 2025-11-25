import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Smartphone, 
  User, 
  LogOut, 
  Menu, 
  X,
  Stethoscope
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/toaster";
import logo from "@assets/1758106860242_1764078111850.png";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Reports & Alerts", href: "/reports", icon: FileText },
    { name: "Communication", href: "/communication", icon: MessageSquare },
    { name: "Farmer Preview", href: "/farmer-preview", icon: Smartphone },
    { name: "Profile & Help", href: "/profile", icon: User },
  ];

  const NavContent = () => (
    <div className="flex h-full flex-col gap-4">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-heading text-xl font-bold text-primary">
          <img src={logo} alt="Nirmay Logo" className="h-8 w-8 object-contain" />
          <span>Nirmay</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {navigation.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t p-4">
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive">
            <LogOut className="h-4 w-4" />
            Log Out
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col md:border-r md:bg-card">
        <NavContent />
      </div>

      {/* Mobile Header */}
      <div className="flex h-16 items-center border-b bg-card px-4 md:hidden">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="-ml-2">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <NavContent />
          </SheetContent>
        </Sheet>
        <div className="ml-4 font-heading text-lg font-bold text-primary">Nirmay</div>
      </div>

      {/* Main Content */}
      <main className="md:ml-64 p-4 md:p-8">
        <div className="mx-auto max-w-6xl animate-in fade-in duration-500 slide-in-from-bottom-4">
          {children}
        </div>
      </main>
      <Toaster />
    </div>
  );
}
