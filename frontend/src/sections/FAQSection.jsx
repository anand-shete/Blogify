import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  const faqs = [
    {
      question: "What is Blogify?",
      answer:
        "Blogify is a clean, backend-powered blogging platform that makes it easy to create and share blogs. Built for performance and reliability using Node.js, Express, and MongoDB.",
    },
    {
      question: "Is it free to use?",
      answer:
        "Yes, Blogify is completely free with no tiers or hidden charges. All features are available to every user without any cost.",
    },
    {
      question: "Can I insert videos and images in my Blogs?",
      answer:
        "Yes. Our TinyMCE editor supports images, videos, GIFs, links, and other embedded content formats. It's flexible and easy to use.",
    },
    {
      question: "Can I edit or delete my blogs later?",
      answer:
        "Yes, you can update or delete any of your published blogs anytime. Full control stays with the author.",
    },
  ];

  return (
    <section className="bg-white px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Frequently Asked Questions</h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-xl leading-relaxed">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-lg leading-relaxed">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
