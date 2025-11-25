import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Bell, Pill, Calendar, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { MOCK_PRESCRIPTIONS } from "@/lib/mock-data";

export default function FarmerPreview() {
  const activeMeds = MOCK_PRESCRIPTIONS.filter(p => p.status === "Active" || p.status === "Pending Approval");

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 h-[800px] flex flex-col">
        
        {/* Mobile Header */}
        <div className="bg-primary p-6 text-white pt-12">
          <div className="flex justify-between items-center mb-6">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full">
                <ArrowLeft className="h-6 w-6" />
              </Button>
            </Link>
            <h1 className="text-lg font-bold">Nirmay Farmer</h1>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full relative">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-primary"></span>
            </Button>
          </div>
          <div>
            <p className="opacity-80 text-sm">Welcome back,</p>
            <h2 className="text-2xl font-bold">Rajesh Kumar</h2>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          
          {/* Status Overview */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
              <p className="text-blue-600 font-bold text-2xl">12</p>
              <p className="text-blue-800 text-sm font-medium">Healthy Animals</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
              <p className="text-orange-600 font-bold text-2xl">2</p>
              <p className="text-orange-800 text-sm font-medium">Under Treatment</p>
            </div>
          </div>

          {/* Active Treatments */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4 text-lg">Active Treatments</h3>
            <div className="space-y-4">
              {activeMeds.map(med => (
                <Card key={med.id} className="rounded-xl border-none shadow-sm bg-white border border-gray-100">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <Pill className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{med.medicine}</h4>
                          <p className="text-sm text-gray-500">{med.animalId} • {med.dosage}</p>
                        </div>
                      </div>
                      <Badge variant={med.status === "Active" ? "default" : "outline"} className={med.status === "Active" ? "bg-green-600" : "text-orange-600 border-orange-200 bg-orange-50"}>
                        {med.status === "Active" ? "Active" : "Pending"}
                      </Badge>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Until {med.withdrawalEnd}</span>
                      </div>
                      <span className="font-medium text-primary">View Schedule</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Action Banner */}
          <div className="bg-gray-900 text-white rounded-xl p-5">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-lg">Report Issue</p>
                <p className="text-gray-400 text-sm">Contact veterinarian instantly</p>
              </div>
              <Button size="icon" className="rounded-full bg-white text-gray-900 hover:bg-gray-200">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
