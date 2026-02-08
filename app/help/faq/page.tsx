"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFaqs } from "@/lib/apiUtils";
import { RootState } from "@/store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Loader from "@/components/ui/loader";

export default function FAQPage() {
  const dispatch = useDispatch();
  const { faqs, loading } = useSelector((state: RootState) => state.help);

  useEffect(() => {
    fetchFaqs(dispatch);
  }, [dispatch]);

  if (loading) return <Loader />;

  // Group FAQs by category
  const groupedFaqs = faqs.reduce((acc: any, faq: any) => {
    const category = faq.category || "General";
    if (!acc[category]) acc[category] = [];
    acc[category].push(faq);
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-600">
          Find answers to common questions about Petly services and products.
        </p>
      </div>

      {Object.keys(groupedFaqs).length === 0 && !loading ? (
           <div className="text-center py-12 text-gray-500">
            No FAQs found.
          </div>
      ) : (
        <div className="space-y-8">
            {Object.entries(groupedFaqs).map(([category, categoryFaqs]: [string, any]) => (
                <div key={category}>
                    <h2 className="text-xl font-semibold mb-4 text-purple-700 border-b pb-2">{category}</h2>
                    <Accordion type="single" collapsible className="w-full">
                        {categoryFaqs.map((faq: any) => (
                        <AccordionItem key={faq.id} value={faq.id}>
                            <AccordionTrigger className="text-left font-medium text-gray-800 hover:text-purple-600">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 leading-relaxed">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            ))}
        </div>
      )}
    </div>
  );
}
