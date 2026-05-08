import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // In a real app, you would integrate OpenAI or Gemini here.
    // For now, we return a simulated smart response based on keywords.
    const lowerMsg = message.toLowerCase();
    let reply = "I'm Petly's AI assistant. I can help you find products, understand pet care, or guide you through your orders. How can I help?";

    if (lowerMsg.includes("order") || lowerMsg.includes("track")) {
      reply = "You can track your order by visiting the Orders section in your profile. Do you need help finding a specific order ID?";
    } else if (lowerMsg.includes("dog") || lowerMsg.includes("cat")) {
      reply = "We have an amazing selection of premium toys and food for both dogs and cats. Check out our Products page and use the Pet Type filter!";
    } else if (lowerMsg.includes("shipping") || lowerMsg.includes("delivery")) {
      reply = "We offer free shipping on orders over ₹50! Standard delivery takes 3-5 business days.";
    } else if (lowerMsg.includes("return") || lowerMsg.includes("refund")) {
      reply = "We accept returns within 30 days of purchase for unused items. Please contact our support if you'd like to initiate a return.";
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process chat message" }, { status: 500 });
  }
}
