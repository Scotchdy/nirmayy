import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FARMER_ALERTS, MOCK_PRESCRIPTIONS } from "@/lib/mock-data";
import { MessageSquare, Lock, Unlock, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function Communication() {
  const { toast } = useToast();
  const [approvedIds, setApprovedIds] = useState<number[]>([]);
  const [rejectedIds, setRejectedIds] = useState<number[]>([]);

  const handleLockToggle = (id: number) => {
    toast({
      title: "Medicine Lock Updated",
      description: `Medicine access for prescription #${id} has been toggled.`,
    });
  };

  const handleApprove = (id: number) => {
    setApprovedIds([...approvedIds, id]);
    toast({
      title: "Prescription Approved",
      description: `Prescription #${id} has been approved and sent to the farmer.`,
      variant: "default",
      className: "bg-green-50 border-green-200 text-green-900",
    });
  };

  const handleReject = (id: number) => {
    setRejectedIds([...rejectedIds, id]);
    toast({
      title: "Prescription Rejected",
      description: `Prescription #${id} has been returned for corrections.`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold">Communication & Control</h1>
        <p className="text-muted-foreground">Manage farmer interactions and control medicine usage.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Farmer Alerts Panel */}
        <div className="space-y-4">
          <h2 className="font-heading text-xl font-bold flex items-center gap-2">
            <MessageSquare className="h-5 w-5" /> Farmer Alerts
          </h2>
          <div className="space-y-4">
            {FARMER_ALERTS.map((alert) => (
              <Card key={alert.id} className="border-l-4 border-l-primary">
                <CardContent className="p-4 pt-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold">{alert.farmer}</h3>
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                    </div>
                    <Badge variant={alert.status === "Urgent" ? "destructive" : alert.status === "Resolved" ? "default" : "secondary"}>
                      {alert.status}
                    </Badge>
                  </div>
                  <p className="text-sm mb-4">{alert.message}</p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => toast({ title: "Request Sent", description: "Asked farmer for more details regarding this alert." })}
                    >
                      Request Details
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => toast({ title: "Solution Sent", description: "Standard protocol has been messaged to the farmer." })}
                    >
                      Send Solution
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Medicine Locking & Approvals */}
        <div className="space-y-8">
          {/* Medicine Locking */}
          <div className="space-y-4">
            <h2 className="font-heading text-xl font-bold flex items-center gap-2">
              <Lock className="h-5 w-5" /> Medicine Locking System
            </h2>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Active Locks</CardTitle>
                <CardDescription>Prevent cross-animal usage by locking smart dispensers.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_PRESCRIPTIONS.slice(0, 2).map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-3 border rounded-lg bg-muted/20">
                      <div>
                        <p className="font-medium text-sm">{p.medicine}</p>
                        <p className="text-xs text-muted-foreground">Assigned to: {p.animalId}</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant={p.status === "Active" ? "secondary" : "outline"}
                        className={p.status === "Active" ? "text-green-600" : "text-muted-foreground"}
                        onClick={() => handleLockToggle(p.id)}
                      >
                        {p.status === "Active" ? <Unlock className="h-4 w-4 mr-1" /> : <Lock className="h-4 w-4 mr-1" />}
                        {p.status === "Active" ? "Unlocked" : "Locked"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pending Approvals */}
          <div className="space-y-4">
            <h2 className="font-heading text-xl font-bold flex items-center gap-2">
              <Check className="h-5 w-5" /> Prescription Approvals
            </h2>
            <Card>
              <CardContent className="p-0">
                {MOCK_PRESCRIPTIONS.filter(p => p.status === "Pending Approval" && !approvedIds.includes(p.id) && !rejectedIds.includes(p.id)).map((p) => (
                  <div key={p.id} className="p-4 border-b last:border-0 animate-in fade-in slide-in-from-right-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">{p.medicine} - {p.dosage}</p>
                        <p className="text-xs text-muted-foreground">For {p.animalId} • {p.duration} days</p>
                      </div>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button 
                        size="sm" 
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => handleApprove(p.id)}
                      >
                        Approve & Push
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full text-destructive hover:bg-destructive/10"
                        onClick={() => handleReject(p.id)}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
                {MOCK_PRESCRIPTIONS.filter(p => p.status === "Pending Approval" && !approvedIds.includes(p.id) && !rejectedIds.includes(p.id)).length === 0 && (
                  <div className="p-8 text-center text-muted-foreground text-sm">
                    No pending approvals
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
