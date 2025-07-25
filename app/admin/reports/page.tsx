"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, TrendingUp, Users, Package } from "lucide-react"

export default function ReportsPage() {
  const [reportType, setReportType] = useState("sales")
  const [dateRange, setDateRange] = useState("last-30-days")

  const availableReports = [
    {
      id: "sales",
      title: "Sales Report",
      description: "Revenue, orders, and sales trends",
      icon: TrendingUp,
      lastGenerated: "2024-01-15",
    },
    {
      id: "customers",
      title: "Customer Report",
      description: "Customer analytics and behavior",
      icon: Users,
      lastGenerated: "2024-01-14",
    },
    {
      id: "products",
      title: "Product Report",
      description: "Product performance and inventory",
      icon: Package,
      lastGenerated: "2024-01-13",
    },
    {
      id: "inventory",
      title: "Inventory Report",
      description: "Stock levels and reorder alerts",
      icon: FileText,
      lastGenerated: "2024-01-12",
    },
  ]

  const recentReports = [
    {
      name: "Monthly Sales Summary - December 2023",
      type: "Sales",
      date: "2024-01-01",
      status: "Ready",
    },
    {
      name: "Customer Report - Q4 2023",
      type: "Customer",
      date: "2023-12-31",
      status: "Ready",
    },
    {
      name: "Product Performance - December 2023",
      type: "Product",
      date: "2023-12-30",
      status: "Processing",
    },
    {
      name: "Inventory Status - Week 52",
      type: "Inventory",
      date: "2023-12-29",
      status: "Ready",
    },
  ]

  const handleGenerateReport = () => {
    console.log(`Generating ${reportType} report for ${dateRange}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready":
        return "bg-green-100 text-green-800"
      case "Processing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Reports</h1>
        <p className="text-gray-600">Generate and download business reports</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Generator */}
        <Card>
          <CardHeader>
            <CardTitle>Generate Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales Report</SelectItem>
                  <SelectItem value="customers">Customer Report</SelectItem>
                  <SelectItem value="products">Product Report</SelectItem>
                  <SelectItem value="inventory">Inventory Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Last 7 days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 days</SelectItem>
                  <SelectItem value="last-90-days">Last 90 days</SelectItem>
                  <SelectItem value="last-year">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleGenerateReport} className="w-full">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>

        {/* Available Reports */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableReports.map((report) => (
                <div key={report.id} className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <report.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{report.title}</h3>
                      <p className="text-sm text-gray-600">{report.description}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">Last: {report.lastGenerated}</p>
                  <Button size="sm" variant="outline" className="w-full bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Report Name</th>
                  <th className="text-left py-3 px-4 font-medium">Type</th>
                  <th className="text-left py-3 px-4 font-medium">Generated</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((report, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{report.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{report.type}</td>
                    <td className="py-3 px-4">{report.date}</td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button size="sm" variant="ghost" disabled={report.status !== "Ready"}>
                        <Download className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
