import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileBarChart, Download, AlertOctagon, ExternalLink, Beaker } from "lucide-react";

export default function Reports() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold">Reports & Alerts</h1>
        <p className="text-muted-foreground">Generate compliance reports and review lab results.</p>
      </div>

      <Tabs defaultValue="alerts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="alerts">Alerts & Violations</TabsTrigger>
          <TabsTrigger value="reports">Generated Reports</TabsTrigger>
          <TabsTrigger value="lab">Lab Results</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-destructive/50 bg-destructive/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertOctagon className="h-5 w-5" />
                  MRL Violation
                </CardTitle>
                <CardDescription>Farm B - Sample #992</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">Antibiotic residue detected above legal limits in milk sample.</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="destructive" className="w-full">Take Action</Button>
                  <Button size="sm" variant="outline" className="w-full bg-white">Contact</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-600">
                  <Clock className="h-5 w-5" />
                  Overdue Withdrawal
                </CardTitle>
                <CardDescription>Farm A - Animal BUF-103</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">Marked as 'Clear' by farmer but calculation suggests 2 more days needed.</p>
                <div className="flex gap-2">
                  <Button size="sm" className="w-full">Review Case</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {["Treatment Summary", "Compliance Status", "Farmer-Specific Report"].map((report) => (
              <Card key={report}>
                <CardHeader>
                  <CardTitle className="text-lg">{report}</CardTitle>
                  <CardDescription>Monthly generated report</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="h-4 w-4" /> Download PDF
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="lab">
          <Card>
            <CardHeader>
              <CardTitle>Recent Lab Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted text-muted-foreground">
                    <tr>
                      <th className="p-4 font-medium">Sample ID</th>
                      <th className="p-4 font-medium">Farmer ID</th>
                      <th className="p-4 font-medium">Date</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: "SMP-001", farmer: "F-102", date: "2025-11-24", status: "Clear" },
                      { id: "SMP-002", farmer: "F-105", date: "2025-11-23", status: "Violation" },
                      { id: "SMP-003", farmer: "F-102", date: "2025-11-22", status: "Pending" },
                    ].map((row) => (
                      <tr key={row.id} className="border-t">
                        <td className="p-4">{row.id}</td>
                        <td className="p-4">{row.farmer}</td>
                        <td className="p-4">{row.date}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            row.status === "Clear" ? "bg-green-100 text-green-800" :
                            row.status === "Violation" ? "bg-red-100 text-red-800" :
                            "bg-yellow-100 text-yellow-800"
                          }`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <Button size="sm" variant="ghost">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { Clock } from "lucide-react";
