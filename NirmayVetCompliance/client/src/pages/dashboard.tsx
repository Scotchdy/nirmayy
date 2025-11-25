import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Pill, 
  Activity, 
  Users, 
  Clock, 
  Plus, 
  Search, 
  Calendar,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { MOCK_PRESCRIPTIONS, MEDICINES } from "@/lib/mock-data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { addDays, format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [withdrawalDate, setWithdrawalDate] = useState<Date | null>(null);
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [treatmentDate, setTreatmentDate] = useState("");

  const calculateWithdrawal = () => {
    if (!selectedMedicine || !treatmentDate) return;
    const med = MEDICINES.find(m => m.name === selectedMedicine);
    if (med) {
      const end = addDays(new Date(treatmentDate), med.withdrawalDays);
      setWithdrawalDate(end);
    }
  };

  const handleNewPrescription = () => {
    toast({
      title: "Prescription Created",
      description: "The prescription has been sent to the farmer for approval.",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Veterinary Dashboard</h1>
          <p className="text-muted-foreground">Overview of livestock health and compliance status.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 shadow-md hover:shadow-lg transition-all">
              <Plus className="h-4 w-4" /> New Prescription
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Prescribe Medication</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="animal-id">Animal ID</Label>
                <Input id="animal-id" placeholder="e.g. COW-247" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="medicine">Medicine</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select medicine" />
                  </SelectTrigger>
                  <SelectContent>
                    {MEDICINES.map(m => (
                      <SelectItem key={m.id} value={m.name}>{m.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="dosage">Dosage</Label>
                  <Input id="dosage" placeholder="e.g. 20ml" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration (Days)</Label>
                  <Input id="duration" type="number" placeholder="5" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleNewPrescription}>Create Prescription</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Critical Alerts Banner */}
      <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-destructive flex items-start gap-3 shadow-sm">
        <AlertTriangle className="h-5 w-5 mt-0.5 shrink-0" />
        <div>
          <h3 className="font-bold text-sm">Critical Compliance Alert</h3>
          <p className="text-sm opacity-90">MRL Violation detected in Sample #992 (Farm B). Immediate action required.</p>
        </div>
        <Button 
          variant="destructive" 
          size="sm" 
          className="ml-auto"
          onClick={() => toast({ title: "Reviewing Violation", description: "Opening case file for Sample #992..." })}
        >
          Review
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-xs hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Prescriptions</CardTitle>
            <Pill className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="shadow-xs hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliant Animals</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">1,204 / 1,280 monitored</p>
          </CardContent>
        </Card>
        <Card className="shadow-xs hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Withdrawal</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">Animals under hold</p>
          </CardContent>
        </Card>
        <Card className="shadow-xs hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Farmers Monitored</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">56</div>
            <p className="text-xs text-muted-foreground">Across 3 districts</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Main Content Column */}
        <div className="md:col-span-2 space-y-8">
          {/* Animal Treatment History */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Treatments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search Animal ID..." 
                    className="pl-9" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" onClick={() => toast({ title: "Filtered", description: "Showing results for " + (searchTerm || "all animals") })}>Filter</Button>
              </div>

              <div className="space-y-4">
                {MOCK_PRESCRIPTIONS.map((p) => (
                  <div key={p.id} className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary">{p.animalId}</span>
                        <Badge variant="outline">{p.medicine}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Farmer: {p.farmerName} • {p.startDate}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <Badge 
                          className={
                            p.compliance === "Compliant" ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200" :
                            p.compliance === "Warning" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200" :
                            "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
                          }
                        >
                          {p.compliance}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          Ends: {p.withdrawalEnd}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Compliance Status Section */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Farm Compliance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Farm A (Rajesh)</span>
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Farm B (Suresh)</span>
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Farm C (Amit)</span>
                    <XCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-2"
                    onClick={() => toast({ title: "Loading Farms", description: "Fetching comprehensive list..." })}
                  >
                    View All Farms
                  </Button>
                </div>
              </CardContent>
            </Card>

             {/* Knowledge Base Teaser */}
             <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Guidelines & Regulations</CardTitle>
              </CardHeader>
              <CardContent>
                 <ul className="list-disc list-inside text-sm space-y-2 text-muted-foreground">
                   <li>New Antimicrobial Stewardship 2025</li>
                   <li>Updated MRL Limits for Dairy</li>
                   <li>Withdrawal Period Calculation Guide</li>
                 </ul>
                 <Button 
                  variant="link" 
                  className="px-0 mt-2 h-auto"
                  onClick={() => toast({ title: "Knowledge Base", description: "Opening knowledge base in a new tab..." })}
                >
                  Access Knowledge Base &rarr;
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Withdrawal Calculator */}
          <Card className="bg-secondary/30 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-primary" />
                Withdrawal Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Medicine</Label>
                <Select onValueChange={setSelectedMedicine}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select medicine" />
                  </SelectTrigger>
                  <SelectContent>
                    {MEDICINES.map(m => (
                      <SelectItem key={m.id} value={m.name}>{m.name} ({m.withdrawalDays}d)</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Treatment Date</Label>
                <Input 
                  type="date" 
                  className="bg-background"
                  onChange={(e) => setTreatmentDate(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={calculateWithdrawal}>Calculate Safe Date</Button>
              
              {withdrawalDate && (
                <div className="rounded-md bg-green-100 p-3 text-center border border-green-200 animate-in zoom-in duration-300">
                  <p className="text-xs text-green-800 font-medium uppercase tracking-wide">Safe Marketing Date</p>
                  <p className="text-lg font-bold text-green-900">{format(withdrawalDate, 'MMM dd, yyyy')}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => toast({ title: "Update Record", description: "Opening treatment record update form..." })}
              >
                Update Treatment Record
              </Button>
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => toast({ title: "Report Issue", description: "Opening adverse reaction reporting form..." })}
              >
                Report Adverse Reaction
              </Button>
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => toast({ title: "Schedule Visit", description: "Opening calendar for scheduling..." })}
              >
                Schedule Farm Visit
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
