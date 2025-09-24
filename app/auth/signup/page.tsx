"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  ArrowLeft,
  Check,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

    // Step 2: Pet Info
    hasPets: "",
    pets: [{ name: "", type: "", age: "", breed: "" }],

    // Step 3: Preferences
    interests: [] as string[],
    newsletter: false,
    terms: false,
    privacy: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (
    field: string,
    value: string | boolean | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  type PetField = "name" | "type" | "age" | "breed";

  const handlePetChange = (index: number, field: PetField, value: string) => {
    const updatedPets = [...formData.pets];
    updatedPets[index][field] = value;
    setFormData({ ...formData, pets: updatedPets });
  };

  const addPet = () => {
    setFormData({
      ...formData,
      pets: [...formData.pets, { name: "", type: "", age: "", breed: "" }],
    });
  };

  const removePet = (index: number) => {
    const updatedPets = formData.pets.filter((_, i) => i !== index);
    setFormData({ ...formData, pets: updatedPets });
  };

  const handleInterestToggle = (interest: string) => {
    const newInterests = formData.interests.includes(interest)
      ? formData.interests.filter((i) => i !== interest)
      : [...formData.interests, interest];
    handleInputChange("interests", newInterests);
  };

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s\-$$$$]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.hasPets) {
      newErrors.hasPets = "Please select if you have pets";
    }

    if (formData.hasPets === "yes") {
      formData.pets.forEach((pet, idx) => {
        if (!pet.type) newErrors[`petType_${idx}`] = "Please select your pet type";
        if (!pet.name.trim()) newErrors[`petName_${idx}`] = "Pet name is required";
        if (!pet.age) newErrors[`petAge_${idx}`] = "Pet age is required";
        if (!pet.breed) newErrors[`petBreed_${idx}`] = "Pet breed is required";
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.terms) {
      newErrors.terms = "You must accept the Terms of Service";
    }
    if (!formData.privacy) {
      newErrors.privacy = "You must accept the Privacy Policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;

    if (currentStep === 1) isValid = validateStep1();
    else if (currentStep === 2) isValid = validateStep2();
    else if (currentStep === 3) isValid = validateStep3();

    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else if (isValid && currentStep === 3) {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // Step 1: Sign up the user
      const { data: authData, error: signUpError } = await supabase.auth.signUp(
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (signUpError) {
        setErrors({ general: signUpError.message });
        setIsLoading(false);
        return;
      }

      // 👇 Automatically sign in right after sign-up
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (signInError) {
        setErrors({ general: signInError.message });
        setIsLoading(false);
        return;
      }

      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      const userId = sessionData?.session?.user?.id;

      // const userId = authData.user?.id;
      if (!userId) {
        // setErrors({ general: "User ID not returned from Supabase." });
        setErrors({ general: "User session not established." });
        setIsLoading(false);
        return;
      }
      localStorage.setItem("authData", JSON.stringify(authData?.user));

      // Step 2: Insert user profile in `user_profiles` table
      const { error: insertError } = await supabase
        .from("user_profiles")
        .insert({
          id: userId,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          has_pets: formData.hasPets,
          pets: formData.hasPets === "yes" ? formData.pets : null,
          interests: formData.interests,
          newsletter: formData.newsletter,
        });

      if (insertError) {
        setErrors({ general: insertError.message });
        setIsLoading(false);
        return;
      }

      // ✅ Success!
      window.location.href = "/auth/welcome";
    } catch (error) {
      setErrors({ general: "Failed to create account. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider: string) => {
    console.log(`Sign up with ${provider}`);
  };

  const progressPercentage = (currentStep / 3) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back to Home */}
        {/* <Link
          href="/"
          className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link> */}

        <div className="max-w-md mx-auto">
          {/* Logo and Welcome */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">🐾</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">PetLy</span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Join PetLy
            </h1>
            <p className="text-gray-600">Create your account to get started</p>
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl text-center">
                Step {currentStep} of 3
              </CardTitle>
              <Progress value={progressPercentage} className="w-full" />
            </CardHeader>
            <CardContent className="space-y-6">
              {errors.general && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {errors.general}
                </div>
              )}

              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  {/* Social Signup Buttons */}
                  {/* <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => handleSocialSignup("google")}
                    >
                      <Image
                        src="/placeholder.svg?height=20&width=20"
                        alt="Google"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      Sign up with Google
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => handleSocialSignup("facebook")}
                    >
                      <Image
                        src="/placeholder.svg?height=20&width=20"
                        alt="Facebook"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      Sign up with Facebook
                    </Button>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Or sign up with email</span>
                    </div>
                  </div> */}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          className={`pl-10 ${
                            errors.firstName ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      {errors.firstName && (
                        <p className="text-sm text-red-600">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-red-600">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={`pl-10 ${
                          errors.email ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="phone"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className={`pl-10 ${
                          errors.phone ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className={`pl-10 pr-10 ${
                          errors.password ? "border-red-500" : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-600">{errors.password}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Must contain uppercase, lowercase, number, and be 8+
                      characters
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          handleInputChange("confirmPassword", e.target.value)
                        }
                        className={`pl-10 pr-10 ${
                          errors.confirmPassword ? "border-red-500" : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-600">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Pet Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold mb-2">
                      Tell us about your pets
                    </h3>
                    <p className="text-gray-600 text-sm">
                      This helps us personalize your experience
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Do you currently have pets?</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        type="button"
                        variant={
                          formData.hasPets === "yes" ? "secondary" : "outline"
                        }
                        className="w-full bg-transparent"
                        onClick={() => handleInputChange("hasPets", "yes")}
                      >
                        Yes, I have pets
                      </Button>
                      <Button
                        type="button"
                        variant={
                          formData.hasPets === "no" ? "default" : "outline"
                        }
                        className="w-full bg-transparent"
                        onClick={() => handleInputChange("hasPets", "no")}
                      >
                        No, not yet
                      </Button>
                    </div>
                    {errors.hasPets && (
                      <p className="text-sm text-red-600">{errors.hasPets}</p>
                    )}
                  </div>

                  {formData.hasPets === "yes" && (
                    <>
                      {formData.pets.map((pet, index) => (
                        <div
                          key={index}
                          className="border rounded-md p-4 space-y-3 mb-4"
                        >
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold">Pet {index + 1}</h4>
                            {formData.pets.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removePet(index)}
                                className="text-red-500 text-sm"
                              >
                                Remove
                              </button>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label>What type of pet do you have?</Label>
                            <Select
                              value={pet.type}
                              onValueChange={(value) =>
                                handlePetChange(index, "type", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select pet type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="dog">Dog</SelectItem>
                                <SelectItem value="cat">Cat</SelectItem>
                                <SelectItem value="bird">Bird</SelectItem>
                                <SelectItem value="rabbit">Rabbit</SelectItem>
                                <SelectItem value="fish">Fish</SelectItem>
                                <SelectItem value="hamster">Hamster</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>Pet's name</Label>
                            <Input
                              value={pet.name}
                              onChange={(e) =>
                                handlePetChange(index, "name", e.target.value)
                              }
                              placeholder="e.g., Luna, Max"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Pet's age</Label>
                            <Select
                              value={pet.age}
                              onValueChange={(value) =>
                                handlePetChange(index, "age", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select age range" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="puppy-kitten">
                                  Puppy/Kitten (0-1 year)
                                </SelectItem>
                                <SelectItem value="young">
                                  Young (1-3 years)
                                </SelectItem>
                                <SelectItem value="adult">
                                  Adult (3-7 years)
                                </SelectItem>
                                <SelectItem value="senior">
                                  Senior (7+ years)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>Breed (optional)</Label>
                            <Input
                              value={pet.breed}
                              onChange={(e) =>
                                handlePetChange(index, "breed", e.target.value)
                              }
                              placeholder="e.g., Labrador, Persian"
                            />
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={addPet}
                        className="text-blue-600 underline text-sm"
                      >
                        + Add another pet
                      </button>
                    </>
                  )}

                  {formData.hasPets === "no" && (
                    <div className="text-center p-6 bg-purple-50 rounded-lg">
                      <span className="text-4xl mb-3 block">🐾</span>
                      <h4 className="font-semibold mb-2">
                        Planning to get a pet?
                      </h4>
                      <p className="text-sm text-gray-600">
                        That's wonderful! We'll help you prepare with guides,
                        products, and services for new pet parents.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Preferences */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold mb-2">Almost done!</h3>
                    <p className="text-gray-600 text-sm">
                      Set your preferences to complete your account
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Label>
                      What are you interested in? (Select all that apply)
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        "Pet Products",
                        "Veterinary Services",
                        "Pet Training",
                        "Grooming Services",
                        "Pet Events",
                        "Pet Sitting",
                        "Pet Nutrition",
                        "Pet Insurance",
                      ].map((interest) => (
                        <Button
                          key={interest}
                          type="button"
                          variant={
                            formData.interests.includes(interest)
                              ? "secondary"
                              : "outline"
                          }
                          className="w-full text-sm bg-transparent"
                          onClick={() => handleInterestToggle(interest)}
                        >
                          {formData.interests.includes(interest) && (
                            <Check className="w-4 h-4 mr-2" />
                          )}
                          {interest}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={formData.newsletter}
                        onCheckedChange={(checked) =>
                          handleInputChange("newsletter", checked as boolean)
                        }
                      />
                      <Label htmlFor="newsletter" className="text-sm">
                        Send me pet care tips, product updates, and special
                        offers
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.terms}
                        onCheckedChange={(checked) =>
                          handleInputChange("terms", checked as boolean)
                        }
                        className={errors.terms ? "border-red-500" : ""}
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          className="text-purple-600 hover:text-purple-700"
                        >
                          Terms of Service
                        </Link>
                      </Label>
                    </div>
                    {errors.terms && (
                      <p className="text-sm text-red-600">{errors.terms}</p>
                    )}

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="privacy"
                        checked={formData.privacy}
                        onCheckedChange={(checked) =>
                          handleInputChange("privacy", checked as boolean)
                        }
                        className={errors.privacy ? "border-red-500" : ""}
                      />
                      <Label htmlFor="privacy" className="text-sm">
                        I agree to the{" "}
                        <Link
                          href="/privacy"
                          className="text-purple-600 hover:text-purple-700"
                        >
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                    {errors.privacy && (
                      <p className="text-sm text-red-600">{errors.privacy}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-3">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1 bg-transparent"
                  >
                    Back
                  </Button>
                )}
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex-1"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Creating Account..."
                    : currentStep === 3
                    ? "Create Account"
                    : "Next"}
                </Button>
              </div>

              {currentStep === 1 && (
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                      href="/auth/login"
                      className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
