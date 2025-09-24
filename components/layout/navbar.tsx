"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Heart,
  ShoppingCart,
  User,
  Menu,
  Search,
  ChevronDown,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "@/store/slices/searchSlice";
import { toast } from "sonner";

const servicesMenu = [
  {
    title: "Healthcare",
    items: [
      { name: "Emergency Hospitals", href: "/services/hospitals", icon: "🏥" },
      { name: "Diet Plans", href: "/services/diet", icon: "🍽️" },
      { name: "Medicine Tracker", href: "/services/medicine", icon: "💊" },
      { name: "Bath Schedule", href: "/services/bath", icon: "🛁" },
      { name: "Pet Keeper Services", href: "/services/keeper", icon: "👨‍⚕️" },
    ],
  },
];

const activitiesMenu = [
  {
    title: "Events & Training",
    items: [
      { name: "Local Pet Events", href: "/activities/events", icon: "🎉" },
      { name: "Training Centers", href: "/activities/training", icon: "🎓" },
      {
        name: "Participation History",
        href: "/activities/history",
        icon: "📋",
      },
      {
        name: "Pet Competitions",
        href: "/activities/competitions",
        icon: "🏆",
      },
    ],
  },
];

const helpMenu = [
  {
    title: "Emergency Support",
    items: [
      { name: "Emergency Contacts", href: "/help/emergency", icon: "🚨" },
      { name: "24/7 Helpline", href: "/help/helpline", icon: "📞" },
      { name: "Live Chat", href: "/help/chat", icon: "💬" },
      { name: "FAQ", href: "/help/faq", icon: "❓" },
    ],
  },
];

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    setIsOpen(false);
    toast.success("Logged out successfully");
    localStorage.clear();
    router.push("/auth/login");
  };

  const handleSearch = () => {
    if (search === "") return;
    dispatch(setSearchTerm(search.trim()));
  };

  useEffect(() => {
    const userProfile = JSON.parse(
      localStorage.getItem("userProfile") as string
    );
    setUserData(userProfile);
    if (userProfile) {
      setIsAdmin(userProfile?.is_admin);
    }
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      {isAdmin ? (
        <div className="container w-[2110px] max-w-[3000px] px-8">
          <div className="flex items-center justify-between h-[7.8vh]">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-300 to-pink-300 rounded-full flex items-center justify-center">
                <span className="font-bold text-lg">🐾</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                PetLy Admin
              </span>
            </div>
            <div className="flex flex-end items-center hover:text-purple-600 transition-colors">
              <h2>Hello Admin</h2>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-purple-600 transition-colors">
                  <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  side="bottom"
                  align="end"
                  sideOffset={8}
                  className="w-30 text-center"
                >
                  <DropdownMenuItem
                    asChild
                    className="justify-center w-full cursor-pointer hover:bg-gray-100"
                  >
                    <button onClick={() => router.push("/admin/profile")}>
                      Profile
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="justify-center w-full cursor-pointer hover:bg-gray-100"
                  >
                    <button onClick={handleLogout}>Logout</button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-[7.8vh]">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="font-bold text-lg">🐾</span>
              </div>
              <span className="text-xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                PetLy
              </span>
            </Link>
            <div className="hidden lg:flex items-center space-x-8">
              <Link
                href="/contact"
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                Contact
              </Link>

              <Link
                href="/products"
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                Products
              </Link>

              {/* Services Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-purple-600 transition-colors">
                  Services <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                  {servicesMenu[0].items.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link href={item.href} className="flex items-center">
                        <span className="mr-2">{item.icon}</span>
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Activities Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-purple-600 transition-colors">
                  Activities <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                  {activitiesMenu[0].items.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link href={item.href} className="flex items-center">
                        <span className="mr-2">{item.icon}</span>
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                href="/settings"
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                Settings
              </Link>

              {/* Help Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-purple-600 transition-colors">
                  Help <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                  {helpMenu[0].items.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link href={item.href} className="flex items-center">
                        <span className="mr-2">{item.icon}</span>
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                {!showSearch ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden md:flex"
                    onClick={() => setShowSearch(true)}
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                ) : (
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      placeholder="Search product..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      className="w-[200px] md:w-[300px]"
                      autoFocus
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSearch(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              {userData && (
                <>
                  <Link href="/wishlist">
                    <Button variant="ghost" size="sm" className="relative">
                      <Heart className="h-4 w-4" />
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                        3
                      </Badge>
                    </Button>
                  </Link>

                  <Link href="/cart">
                    <Button variant="ghost" size="sm" className="relative">
                      <ShoppingCart className="h-4 w-4" />
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                        2
                      </Badge>
                    </Button>
                  </Link>
                </>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      userData ? handleLogout() : router.push("/auth/login")
                    }
                    className="cursor-pointer"
                  >
                    {userData ? "Logout" : "Login"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="lg:hidden">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col space-y-4 mt-8">
                    <Link href="/contact" className="text-lg font-medium">
                      Contact
                    </Link>
                    <Link href="/products" className="text-lg font-medium">
                      Products
                    </Link>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Services</h3>
                      {servicesMenu[0].items.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block pl-4 py-2 text-gray-600"
                        >
                          {item.icon} {item.name}
                        </Link>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Activities</h3>
                      {activitiesMenu[0].items.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block pl-4 py-2 text-gray-600"
                        >
                          {item.icon} {item.name}
                        </Link>
                      ))}
                    </div>

                    <Link href="/settings" className="text-lg font-medium">
                      Settings
                    </Link>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Help</h3>
                      {helpMenu[0].items.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block pl-4 py-2 text-gray-600"
                        >
                          {item.icon} {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
