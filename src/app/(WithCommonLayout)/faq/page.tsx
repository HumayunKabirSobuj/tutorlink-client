"use client";
import { useState } from "react";

const faqs = [
  {
    category: "Tutoring",
    questions: [
      { q: "How do I find a tutor?", a: "You can search for tutors based on subject, rating, and availability." },
      { q: "Can I choose a specific tutor?", a: "Yes, you can view tutor profiles and select one based on your preference." },
      { q: "What subjects are available?", a: "We offer tutoring in a wide range of subjects including math, science, and languages." },
      { q: "How do I schedule a session?", a: "You can book a session through the tutor’s profile or our scheduling system." },
      { q: "Are tutors qualified?", a: "All tutors go through a verification process before being listed on our platform." },
      { q: "Can I have a trial session?", a: "Yes, some tutors offer a free or discounted trial session." },
      { q: "What if my tutor is unavailable?", a: "You can reschedule or choose another tutor from our list." },
      { q: "Do you offer group tutoring?", a: "Yes, some tutors offer group sessions at discounted rates." },
      { q: "How do I communicate with my tutor?", a: "We provide a built-in chat and video call feature." },
      { q: "Can I request a tutor outside my subject?", a: "Yes, you can explore tutors from different categories." },
    ],
  },
  {
    category: "Payments",
    questions: [
      { q: "How are payments processed?", a: "Payments are processed securely through our payment gateway." },
      { q: "Do I need to pay in advance?", a: "Yes, payments are required before booking a session." },
      { q: "Are refunds available?", a: "Refunds are available if you cancel within our policy period." },
      { q: "What payment methods do you accept?", a: "We accept credit/debit cards, PayPal, and other online payment options." },
      { q: "Is there a subscription option?", a: "Yes, you can choose a subscription plan for discounted rates." },
      { q: "Are there any hidden fees?", a: "No, all fees are displayed before you confirm your booking." },
      { q: "Can I tip my tutor?", a: "Yes, you can leave a tip as a token of appreciation." },
      { q: "Do you offer financial aid?", a: "We offer scholarships and discounts for eligible students." },
      { q: "What if I’m double charged?", a: "Contact our support team for assistance." },
      { q: "Can I pay in installments?", a: "Yes, some sessions offer installment payment options." },
    ],
  },
  {
    category: "Account Management",
    questions: [
      { q: "How do I create an account?", a: "Click on sign-up and follow the instructions to create your account." },
      { q: "Can I change my email?", a: "Yes, you can update your email from the settings page." },
      { q: "How do I reset my password?", a: "Click on ‘Forgot Password’ and follow the steps to reset it." },
      { q: "Can I delete my account?", a: "Yes, you can request account deletion from your profile settings." },
      { q: "How do I update my profile?", a: "Go to ‘My Profile’ and make the necessary changes." },
      { q: "What if I forget my username?", a: "You can recover your username via email verification." },
      { q: "Can I have multiple accounts?", a: "No, each user is allowed only one account." },
      { q: "How do I change my subscription plan?", a: "You can upgrade or downgrade your plan from the settings page." },
      { q: "Why is my account suspended?", a: "Accounts may be suspended due to policy violations." },
      { q: "How do I contact support?", a: "You can reach out to support via email or live chat." },
    ],
  },
];

const FAQPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-6 py-10 w-full lg:w-2/3">
      <h1 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>

      {/* Tab Buttons */}
      <div className="flex justify-center mb-6">
        {faqs.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedTab(index)}
            className={`px-6 py-2 mx-2 text-lg font-medium ${selectedTab === index ? "bg-green-500 text-white" : "bg-gray-200"}`}
          >
            {category.category}
          </button>
        ))}
      </div>

      {/* FAQ Content */}
      <div className="space-y-4">
        {faqs[selectedTab].questions.map((item, qIndex) => {
          const isOpen = openIndex === qIndex;
          return (
            <div key={qIndex} className="border rounded-lg p-4 bg-white shadow">
              <button
                onClick={() => toggleQuestion(qIndex)}
                className="w-full flex justify-between text-left font-medium text-lg"
              >
                {item.q}
                <span className="text-green-500 font-bold text-xl">{isOpen ? "-" : "+"}</span>
              </button>
              {isOpen && <p className="mt-2 text-gray-600">{item.a}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQPage;
