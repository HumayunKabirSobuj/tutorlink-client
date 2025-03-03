"use client"
import { useState } from "react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toggleAccordion = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How can I find a tutor?",
      answer:
        "You can search for tutors based on subjects, location, and experience. Simply browse through our tutor profiles and contact the one that fits your needs.",
    },
    {
      question: "How do I apply for tuition jobs?",
      answer:
        "If you are a tutor, you can register on our platform and apply for available tuition jobs. Ensure your profile is complete for better visibility.",
    },
    {
      question: "Are the tutors verified?",
      answer:
        "Yes, we conduct a verification process for tutors to ensure quality and safety for students.",
    },
    {
      question: "Can I schedule online tuition classes?",
      answer:
        "Absolutely! You can coordinate with your tutor to arrange online classes at your convenience.",
    },
    {
      question: "Is there any registration fee?",
      answer:
        "Registration for students is completely free. Tutors may have to pay a small fee for premium features.",
    },
  ];

  return (
    <div className="p-8 min-h-screen ">
      {/* Section Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
        <p className="text-gray-600 mt-2">Find answers to common questions about our platform.</p>
      </div>

      <div className="w-full md:w-2/3 mx-auto">
        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-300">
              <button
                className="flex justify-between items-center w-full py-4 text-left focus:outline-none text-lg font-medium"
                onClick={() => toggleAccordion(index)}
              >
                <span>{faq.question}</span>
                <span className="text-green-500">
                  {openIndex === index ? "▲" : "▼"}
                </span>
              </button>
              {openIndex === index && (
                <p className="text-gray-500 pb-4">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
