import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Heart, ShoppingBag, Calendar, Users } from "lucide-react";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to PetLy! 🎉
            </h1>
            <p className="text-xl text-gray-600">
              Your account has been successfully created. You're now part of the
              PetLy family!
            </p>
          </div>

          {/* Welcome Message */}
          <Card className="mb-8 shadow-xl border-0">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <span className="text-6xl mb-4 block">🐾</span>
                  <h2 className="text-2xl font-bold mb-4">You're all set!</h2>
                  <p className="text-gray-600">
                    Thank you for joining PetLy. We're excited to help you
                    provide the best care for your furry friends.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="text-center p-4">
                    <ShoppingBag className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">
                      Shop Premium Products
                    </h3>
                    <p className="text-sm text-gray-600">
                      Discover high-quality food, toys, and accessories for your
                      pets
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <Users className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Find Pet Services</h3>
                    <p className="text-sm text-gray-600">
                      Connect with veterinarians, groomers, and pet sitters in
                      your area
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <Calendar className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Join Pet Events</h3>
                    <p className="text-sm text-gray-600">
                      Participate in local pet events, competitions, and social
                      gatherings
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <Heart className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Get Expert Advice</h3>
                    <p className="text-sm text-gray-600">
                      Access pet care guides, nutrition tips, and health
                      resources
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">
              What would you like to do first?
            </h3>
            <Button size="lg" asChild>
              <Link href="/">Visit Petly</Link>
            </Button>
            <div className="inset-5 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" asChild>
                <Link href="/products">Explore Products</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services">Find Services</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/profile">Complete Profile</Link>
              </Button>
            </div>
          </div>

          {/* Additional Info */}
          {/* <div className="mt-12 p-6 bg-purple-50 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">🎁 Welcome Bonus!</h4>
            <p className="text-purple-700 text-sm mb-4">
              As a new member, you get 15% off your first order and free shipping on orders over ₹50.
            </p>
            <Button variant="outline" className="bg-white text-purple-600 border-purple-200 hover:bg-purple-50">
              Claim Your Discount
            </Button>
          </div> */}

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Need help getting started?{" "}
              <Link
                href="/help"
                className="text-purple-600 hover:text-purple-700"
              >
                Visit our Help Center
              </Link>{" "}
              or{" "}
              <Link
                href="/contact"
                className="text-purple-600 hover:text-purple-700"
              >
                contact support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
