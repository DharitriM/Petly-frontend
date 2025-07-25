"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, Package, ShoppingCart, DollarSign } from "lucide-react"

export default function AnalyticsPage() {
  const metrics = [
    {
      title: "Total Revenue",
      value: "$128,450",
      change: "+18.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Total Orders",
      value: "1,379",
      change: "+12.5%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-blue-600",
    },
    {
      title: "Active Users",
      value: "2,847",
      change: "+8.1%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Products Sold",
      value: "5,234",
      change: "-2.3%",
      trend: "down",
      icon: Package,
      color: "text-orange-600",
    },
  ]

  const salesData = [
    { month: "Jan", sales: 12000 },
    { month: "Feb", sales: 15000 },
    { month: "Mar", sales: 18000 },
    { month: "Apr", sales: 22000 },
    { month: "May", sales: 25000 },
    { month: "Jun", sales: 28000 },
  ]

  const topProducts = [
    { name: "Premium Dog Food", sales: 1250, revenue: 37500 },
    { name: "Cat Litter Box", sales: 890, revenue: 26700 },
    { name: "Dog Toy Set", sales: 756, revenue: 22680 },
    { name: "Pet Carrier", sales: 634, revenue: 19020 },
  ]

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-gray-600">Track your business performance and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                </div>
                <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {metric.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {metric.change} from last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesData.map((data, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{data.month}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${data.sales.toLocaleString()}</p>
                    <div className="w-24 h-2 bg-gray-200 rounded-full mt-1">
                      <div
                        className="h-2 bg-blue-500 rounded-full"
                        style={{ width: `${(data.sales / 30000) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sales} sold</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${product.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
