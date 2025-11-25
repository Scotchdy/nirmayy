import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Stethoscope, ArrowRight, CheckCircle2 } from "lucide-react";
import bgImage from "@assets/generated_images/abstract_medical_technology_background_with_calm_colors.png";
import logo from "@assets/1758106860242_1764078111850.png";

export default function Login() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
    }, 1000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setLocation("/dashboard");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side - Hero Image */}
      <div className="hidden w-1/2 bg-muted lg:block relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10" />
        <img 
          src={bgImage} 
          alt="Medical Technology" 
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-12 z-20 bg-gradient-to-t from-black/60 to-transparent text-white">
          <h1 className="font-heading text-4xl font-bold mb-4">Ensuring Veterinary Compliance</h1>
          <p className="text-lg opacity-90">Traceability, safety, and stewardship in livestock medication management.</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full items-center justify-center bg-background p-8 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <img src={logo} alt="Nirmay Logo" className="h-12 w-12 object-contain" />
            </div>
            <h2 className="font-heading text-3xl font-bold tracking-tight">Welcome to Nirmay</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to your veterinarian account
            </p>
          </div>

          <Card className="border-none shadow-none">
            <CardContent className="p-0">
              {step === "phone" ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="h-12 text-lg"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send Verification Code"}
                    {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp">Verification Code</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      className="h-12 text-center text-2xl tracking-widest"
                      maxLength={6}
                    />
                    <p className="text-xs text-center text-muted-foreground">
                      Enter the code sent to {phone} <button type="button" onClick={() => setStep("phone")} className="text-primary hover:underline">Change</button>
                    </p>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base"
                    disabled={isLoading}
                  >
                    {isLoading ? "Verifying..." : "Verify & Login"}
                    {!isLoading && <CheckCircle2 className="ml-2 h-4 w-4" />}
                  </Button>
                </form>
              )}

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button variant="outline" type="button" className="w-full h-12" onClick={() => setLocation("/dashboard")}>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
