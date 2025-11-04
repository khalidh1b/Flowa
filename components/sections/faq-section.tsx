"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    value: "item-1",
    question: "How does AI receipt scanning work?",
    answer:
      "Flowa uses Google Gemini API to analyze your receipt images and automatically extract transaction details like merchant name, amount, date, and category. Simply upload a photo, and our AI does the rest with 95% accuracy.",
  },
  {
    value: "item-2",
    question: "Who is Flowa for?",
    answer:
      "Flowa is designed for anyone who wants to take control of their finances. Whether you're a busy professional, freelancer, small business owner, or simply looking to manage personal expenses better, Flowa helps you track, analyze, and optimize your spending effortlessly.",
  },
  {
    value: "item-3",
    question: "Is Flowa free?",
    answer:
      "Yes! Flowa offers a free tier with core features including receipt scanning, basic transaction tracking, and monthly insights. For advanced features like unlimited receipts, multi-currency support, and detailed analytics, we working to bring you affordable premium plans.",
  },
  {
    value: "item-4",
    question: "Is my financial data secure?",
    answer:
      "Absolutely. We use bank-level encryption to protect your data both in transit and at rest. All financial information is encrypted, and we never share your data with unauthorized third parties. Your privacy and security are our top priorities.",
  },
  {
    value: "item-5",
    question: "What currencies are supported?",
    answer:
      "Flowa supports over 100 currencies including USD, EUR, JPY, GBP, CAD, AUD, and many more. The platform automatically handles currency conversion and display, making it perfect for international transactions and travelers.",
  },
  {
    value: "item-6",
    question: "Can I export my transaction data?",
    answer:
      "Yes! You can export your transaction history and financial reports in various formats including CSV and PDF. This makes it easy to share with accountants, use for tax preparation, or integrate with other financial tools.",
  },
];

const FaqSection = () => {
  return (
    <div className="z-10 mx-auto mt-24 flex w-full max-w-4xl flex-col gap-10 px-8 lg:mt-48">
      <h2 className="w-fit text-4xl font-medium leading-tight tracking-[-1.28px] text-[#263043] lg:text-5xl">
        Frequently asked questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item) => (
          <AccordionItem
            key={item.value}
            value={item.value}
            className="w-full overflow-hidden border-b border-black/10"
          >
            <AccordionTrigger className="py-6 text-left font-normal text-[#263043] hover:no-underline lg:text-xl">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              <div className="pb-6 pt-0">
                <p className="max-w-3xl leading-[1.4] text-[#8C929D]">
                  {item.answer}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FaqSection;