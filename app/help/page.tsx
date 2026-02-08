"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MessageSquare } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">How can we help?</h1>
        <p className="text-xl text-gray-600">
          Find answers to common questions or get in touch with our support team.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">24/7 Helpline</h3>
            <p className="text-gray-500 mb-4">Urgent medical queries?</p>
            <Button variant="outline" className="w-full">Call Now</Button>
          </CardContent>
        </Card>
        <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Email Support</h3>
            <p className="text-gray-500 mb-4">General inquiries & orders</p>
             <Button variant="outline" className="w-full">Send Email</Button>
          </CardContent>
        </Card>
        <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
           <CardContent className="pt-6">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
            <p className="text-gray-500 mb-4">Chat with our experts</p>
             <Button variant="outline" className="w-full">Start Chat</Button>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is your return policy?</AccordionTrigger>
            <AccordionContent>
              We accept returns within 30 days of purchase. Items must be unused and in original packaging. Food items cannot be returned if opened.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Do you offer international shipping?</AccordionTrigger>
            <AccordionContent>
              Currently, we only ship within the country. We are working on expanding our reach!
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How do I book a vet appointment?</AccordionTrigger>
            <AccordionContent>
              You can book an appointment through our Services page. Select "Hospitals" or "Emergency Care" and choose your preferred clinic to see available slots.
            </AccordionContent>
          </AccordionItem>
           <AccordionItem value="item-4">
            <AccordionTrigger>Are your products organic?</AccordionTrigger>
            <AccordionContent>
              We have a wide range of products including organic options. Look for the "Organic" tag on product pages.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
