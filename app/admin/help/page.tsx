"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, Book, MessageCircle, Mail, Phone } from "lucide-react"
import { useState } from "react"

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const faqItems = [
    {
      id: "1",
      question: "How do I add a new product?",
      answer: "Go to Products section, click 'Add Product', fill in the details, and save.",
      category: "Products",
    },
    {
      id: "2",
      question: "How can I manage users?",
      answer: "Navigate to Users section to view, edit, or manage user accounts.",
      category: "Users",
    },
    {
      id: "3",
      question: "How do I process orders?",
      answer: "In Orders section, view orders and update their status as needed.",
      category: "Orders",
    },
    {
      id: "4",
      question: "How do I create events?",
      answer: "Go to Events section, click 'Create Event', and fill in event details.",
      category: "Events",
    },
  ]

  const contactOptions = [
    {
      title: "Email Support",
      contact: "admin-support@pethome.com",
      icon: Mail,
      available: "24/7",
    },
    {
      title: "Phone Support",
      contact: "+1 (555) 123-4567",
      icon: Phone,
      available: "Mon-Fri 9AM-6PM",
    },
    {
      title: "Live Chat",
      contact: "Available in admin panel",
      icon: MessageCircle,
      available: "Mon-Fri 9AM-6PM",
    },
  ]

  const filteredFAQ = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Help Center</h1>
        <p className="text-gray-600">Find answers and get support</p>
      </div>

      {/* Search */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search for help topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 text-lg h-12"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FAQ */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {filteredFAQ.map((item) => (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center space-x-3">
                        <span>{item.question}</span>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Book className="w-4 h-4 mr-2" />
                  User Guide
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Book className="w-4 h-4 mr-2" />
                  Video Tutorials
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contactOptions.map((option, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                        <option.icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{option.title}</h3>
                        <p className="text-sm font-medium">{option.contact}</p>
                        <Badge variant="outline" className="mt-1">
                          {option.available}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
