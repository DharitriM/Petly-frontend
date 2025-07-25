"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Plus, AlertTriangle, CheckCircle, Info } from "lucide-react"

export default function NotificationsPage() {
  const [notifications] = useState([
    {
      id: 1,
      title: "Low Stock Alert",
      message: "Premium Dog Food is running low (5 units remaining)",
      type: "warning",
      timestamp: "2024-01-15 10:30 AM",
      read: false,
    },
    {
      id: 2,
      title: "New Order Received",
      message: "Order #ORD-123 has been placed by John Doe",
      type: "info",
      timestamp: "2024-01-15 09:45 AM",
      read: true,
    },
    {
      id: 3,
      title: "User Registration",
      message: "New user Jane Smith has registered",
      type: "success",
      timestamp: "2024-01-15 08:20 AM",
      read: false,
    },
  ])

  const [isCreatingNotification, setIsCreatingNotification] = useState(false)
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "info",
  })

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "error":
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      default:
        return <Info className="w-5 h-5 text-blue-600" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-yellow-50 border-yellow-200"
      case "success":
        return "bg-green-50 border-green-200"
      case "error":
        return "bg-red-50 border-red-200"
      default:
        return "bg-blue-50 border-blue-200"
    }
  }

  const handleCreateNotification = () => {
    console.log("Creating notification:", newNotification)
    setNewNotification({ title: "", message: "", type: "info" })
    setIsCreatingNotification(false)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-gray-600">Manage system notifications and alerts</p>
        </div>
        <Dialog open={isCreatingNotification} onOpenChange={setIsCreatingNotification}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Notification
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Notification</DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newNotification.title}
                  onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                  placeholder="Enter notification title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={newNotification.message}
                  onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                  placeholder="Enter notification message"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={newNotification.type}
                  onValueChange={(value) => setNewNotification({ ...newNotification, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsCreatingNotification(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateNotification}>Create</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Recent Notifications</span>
            <Badge variant="secondary">{notifications.filter((n) => !n.read).length} unread</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border rounded-lg ${getNotificationColor(notification.type)} ${
                  !notification.read ? "border-l-4 border-l-blue-500" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <h3 className={`font-medium ${!notification.read ? "font-semibold" : ""}`}>
                        {notification.title}
                      </h3>
                      <p className="text-gray-700 mb-2">{notification.message}</p>
                      <p className="text-sm text-gray-500">{notification.timestamp}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    {notification.read ? "Mark Unread" : "Mark Read"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
