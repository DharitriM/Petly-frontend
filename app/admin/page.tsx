"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  Eye,
  Loader,
  Blocks,
  SwatchBook,
  PawPrint,
  Activity
} from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useDispatch, useSelector } from "react-redux";
import { User } from "@/lib/interfaces/user";
import { fetchBrands, fetchCategories, fetchPetTypes, fetchProducts, fetchUsers } from "@/lib/apiUtils";
import { RootState } from "@/store";

export default function AdminDashboard() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  const { users, count: userCount } = useSelector((state: RootState) => state.user);
  const { count: productCount } = useSelector((state: RootState) => state.product);
  const { count: brandCount } = useSelector((state: RootState) => state.brand);
  const { count: categoryCount } = useSelector((state: RootState) => state.category);
  const { count: petTypeCount } = useSelector((state: RootState) => state.petType);
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const buyAnalysisData = [
    { name: "Jan", sales: 4000, revenue: 2400 },
    { name: "Feb", sales: 3000, revenue: 1398 },
    { name: "Mar", sales: 2000, revenue: 9800 },
    { name: "Apr", sales: 2780, revenue: 3908 },
    { name: "May", sales: 1890, revenue: 4800 },
    { name: "Jun", sales: 2390, revenue: 3800 },
    { name: "Jul", sales: 3490, revenue: 4300 },
  ];

  const stats = [
    {
      title: "Total Users",
      value: userCount || 0,
      change: "+10%",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Products",
      value: productCount || 0,
      change: "+5%",
      icon: Package,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Orders",
      value: "1,379",
      change: "+18%",
      icon: ShoppingCart,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Categories",
      value: categoryCount || 0,
      change: "+5%",
      icon: Blocks,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      title: "Brands",
      value: brandCount || 0,
      change: "+5%",
      icon: SwatchBook,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      title: "Pet Types",
      value: petTypeCount || 0,
      change: "+5%",
      icon: PawPrint,
      color: "text-pink-600",
      bg: "bg-pink-50",
    },
  ];

  useEffect(() => {
    fetchUsers(dispatch);
    fetchProducts(dispatch);
    fetchCategories(dispatch);
    fetchBrands(dispatch);
    fetchPetTypes(dispatch);

    async function getOrders() {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        if (data.orders) {
          setRecentOrders(data.orders.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
    getOrders();
  }, [dispatch]);

  useEffect(() => {
    users.length > 0 && setRecentUsers(users.slice(0, 5));
  }, [users]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Pending":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login/2");
        return;
      }

      const { data: profile, error } = await supabase
        .from("user_profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      if (error || !profile?.is_admin) {
        router.push("/");
        return;
      }

      setLoading(false);
    };

    checkAdmin();
  }, [router]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        <Loader className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your store.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}
                >
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">
                  {stat.change} from last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Chart */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-600" />
              Products Buy Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={buyAnalysisData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="sales" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Products Sold" />
                  <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} name="Revenue (₹)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Link href="/admin/orders">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer || order.user_id || "Guest"}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{(order.total || 0).toFixed(2)}</p>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status || "Pending"}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">No recent orders found</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Users</CardTitle>
            <Link href="/admin/users">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user: User, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">
                      {user.first_name + " " + user.last_name}
                    </p>
                    <p className="text-sm text-gray-600">{user.phone}</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-blue-500 text-white py-1">
                      {user.is_admin ? "Admin / you" : "User"}
                    </Badge>
                    <p className="text-sm text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
