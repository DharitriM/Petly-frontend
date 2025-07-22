import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Phone, MessageCircle, Mail, AlertTriangle, Users, BookOpen } from "lucide-react"
import Link from "next/link"

const helpCategories = [
  {
    title: "Emergency Support",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    items: [
      { name: "Emergency Contacts", href: "/help/emergency", description: "24/7 emergency veterinary contacts" },
      { name: "24/7 Helpline", href: "/help/helpline", description: "Immediate assistance hotline" },
      { name: "Poison Control", href: "/help/poison", description: "Pet poison emergency guidance" },
    ],
  },
  {
    title: "Customer Support",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    items: [
      { name: "Live Chat", href: "/help/chat", description: "Chat with our support team" },
      { name: "Order Support", href: "/help/orders", description: "Help with your orders" },
      { name: "Account Help", href: "/help/account", description: "Account and profile assistance" },
    ],
  },
  {
    title: "Information Center",
    icon: BookOpen,
    color: "text-green-600",
    bgColor: "bg-green-50",
    items: [
      { name: "FAQ", href: "/help/faq", description: "Frequently asked questions" },
      { name: "Pet Care Guides", href: "/help/guides", description: "Comprehensive pet care information" },
      { name: "Product Manuals", href: "/help/manuals", description: "Product usage instructions" },
    ],
  },
]

const quickActions = [
  { name: "Track Order", icon: "📦", href: "/orders" },
  { name: "Return Item", icon: "↩️", href: "/help/returns" },
  { name: "Find Vet", icon: "🏥", href: "/services/hospitals" },
  { name: "Pet Training", icon: "🎓", href: "/activities/training" },
]

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Help Center</h1>
        <p className="text-xl text-gray-600 mb-8">How can we help you and your pet today?</p>

        {/* Search */}
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input placeholder="Search for help articles, products, or services..." className="pl-12 py-3 text-lg" />
        </div>
      </div>

      {/* Emergency Banner */}
      <Card className="mb-8 border-red-200 bg-red-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <div>
                <h3 className="text-lg font-semibold text-red-800">Pet Emergency?</h3>
                <p className="text-red-700">Get immediate help for your pet's emergency situation</p>
              </div>
            </div>
            <Button className="bg-red-600 hover:bg-red-700" asChild>
              <Link href="/help/emergency">Emergency Help</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" asChild>
              <Link href={action.href}>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">{action.icon}</div>
                  <h3 className="font-semibold">{action.name}</h3>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* Help Categories */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {helpCategories.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${category.bgColor}`}>
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                </div>
                <span>{category.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {category.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  href={item.href}
                  className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h4 className="font-medium mb-1">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </Link>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Options */}
      <Card>
        <CardHeader>
          <CardTitle>Still Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Phone className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">Speak with our pet care experts</p>
              <Button variant="outline" asChild>
                <Link href="/help/helpline">Call Now</Link>
              </Button>
            </div>

            <div className="text-center">
              <MessageCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Chat with our support team</p>
              <Button variant="outline" asChild>
                <Link href="/help/chat">Start Chat</Link>
              </Button>
            </div>

            <div className="text-center">
              <Mail className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4">Send us a detailed message</p>
              <Button variant="outline" asChild>
                <Link href="/contact">Send Email</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
