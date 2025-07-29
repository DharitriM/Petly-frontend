import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Mail } from "lucide-react"
import Link from "next/link"

export default function CheckoutSuccessPage() {
  const orderNumber = "PH-" + Math.random().toString(36).substr(2, 9).toUpperCase()
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-green-600 mb-4">Order Confirmed!</h1>
          <p className="text-xl text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold mb-2">Order Details</h3>
                <p className="text-gray-600">
                  Order Number: <span className="font-medium">{orderNumber}</span>
                </p>
                <p className="text-gray-600">
                  Order Date: <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </p>
                <p className="text-gray-600">
                  Total Amount: <span className="font-medium">₹109.97</span>
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Delivery Information</h3>
                <p className="text-gray-600">
                  Estimated Delivery: <span className="font-medium">{estimatedDelivery}</span>
                </p>
                <p className="text-gray-600">
                  Shipping Method: <span className="font-medium">Standard Delivery</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center p-6">
            <Mail className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Confirmation Email</h3>
            <p className="text-sm text-gray-600">
              A confirmation email has been sent to your email address with order details.
            </p>
          </Card>

          <Card className="text-center p-6">
            <Package className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Order Processing</h3>
            <p className="text-sm text-gray-600">
              Your order is being prepared and will be shipped within 1-2 business days.
            </p>
          </Card>

          <Card className="text-center p-6">
            <Truck className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Track Your Order</h3>
            <p className="text-sm text-gray-600">You'll receive tracking information once your order ships.</p>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/orders">
            <Button size="lg">View Order Details</Button>
          </Link>
          <Link href="/products">
            <Button size="lg" variant="outline">
              Continue Shopping
            </Button>
          </Link>
        </div>

        <div className="mt-8 p-6 bg-purple-50 rounded-lg">
          <h3 className="font-semibold text-purple-800 mb-2">What's Next?</h3>
          <p className="text-purple-700 text-sm">
            Keep an eye on your email for shipping updates. If you have any questions about your order, feel free to
            contact our customer support team.
          </p>
        </div>
      </div>
    </div>
  )
}
