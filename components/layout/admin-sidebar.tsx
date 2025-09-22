"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Users,
  Package,
  Calendar,
  Settings,
  ShoppingCart,
  BarChart3,
  FileText,
  Bell,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Wrench,
  Type,
  Blocks,
  SwatchBook,
  PawPrint,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminSidebarProps {
  className?: string;
}

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: Blocks,
  },
  {
    title: "Brands",
    href: "/admin/brands",
    icon: SwatchBook,
  },
  {
    title: "Pet Types",
    href: "/admin/pet_types",
    icon: PawPrint,
  },
  // {
  //   title: "Services",
  //   href: "/admin/services",
  //   icon: Wrench,
  // },
  // {
  //   title: "Events",
  //   href: "/admin/events",
  //   icon: Calendar,
  // },
  // {
  //   title: "Analytics",
  //   href: "/admin/analytics",
  //   icon: BarChart3,
  // },
  // {
  //   title: "Reports",
  //   href: "/admin/reports",
  //   icon: FileText,
  // },
  // {
  //   title: "Notifications",
  //   href: "/admin/notifications",
  //   icon: Bell,
  // },
  // {
  //   title: "Settings",
  //   href: "/admin/settings",
  //   icon: Settings,
  // },
  // {
  //   title: "Help",
  //   href: "/admin/help",
  //   icon: HelpCircle,
  // },
];

export function AdminSidebar({ className }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const handleLogout = () => {
    document.cookie = "admin-token=; path=/; max-age=0";
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div
      className={cn(
        "flex flex-col bg-white border-r border-gray-200 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && <span className="text-lg font-bold">Admin Panel</span>}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  collapsed ? "px-2" : "px-3"
                )}
              >
                <item.icon className="w-4 h-4" />
                {!collapsed && <span className="ml-3">{item.title}</span>}
              </Button>
            </Link>
          ))}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-center text-red-600 hover:text-red-700 hover:bg-red-50",
          )}
          onClick={handleLogout}
        >
          <LogOut />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
}
