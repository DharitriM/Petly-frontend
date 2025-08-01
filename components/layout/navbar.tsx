"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Heart, ShoppingCart, User, Menu, Search, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"

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
]

const activitiesMenu = [
  {
    title: "Events & Training",
    items: [
      { name: "Local Pet Events", href: "/activities/events", icon: "🎉" },
      { name: "Training Centers", href: "/activities/training", icon: "🎓" },
      { name: "Participation History", href: "/activities/history", icon: "📋" },
      { name: "Pet Competitions", href: "/activities/competitions", icon: "🏆" },
    ],
  },
]

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
]

export default function Navbar() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const handleLogout = () => {
    setIsOpen(false)
    router.push("/auth/login")
    localStorage.clear()
    console.log("User logged out")
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🐾</span>
            </div>
            <span className="text-xl font-bold text-gray-900">PetHome</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/contact" className="text-gray-700 hover:text-purple-600 transition-colors">
              Contact
            </Link>

            <Link href="/products" className="text-gray-700 hover:text-purple-600 transition-colors">
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

            <Link href="/settings" className="text-gray-700 hover:text-purple-600 transition-colors">
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
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Search className="h-4 w-4" />
            </Button>

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
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
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
                      <Link key={item.name} href={item.href} className="block pl-4 py-2 text-gray-600">
                        {item.icon} {item.name}
                      </Link>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Activities</h3>
                    {activitiesMenu[0].items.map((item) => (
                      <Link key={item.name} href={item.href} className="block pl-4 py-2 text-gray-600">
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
                      <Link key={item.name} href={item.href} className="block pl-4 py-2 text-gray-600">
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
    </nav>
  )
}
