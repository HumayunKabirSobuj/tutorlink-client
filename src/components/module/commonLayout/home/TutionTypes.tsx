'use client';

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const tuitionTypes = [
  {
    title: "Home Tutoring",
    subtitle: "Looking for one-to-one classes?",
    description:
      "It’s a unique opportunity to learn in the home with your expected future in different categories everything is in favor of your need.",
    image: "http://res.cloudinary.com/dn7oeugls/image/upload/v1741005671/nihwyenbhsotihhhm4ht.png",
    aos: "fade-up",
  },
  {
    title: "Online Tutoring",
    subtitle: "Are you left with any doubts?",
    description:
      "Connect with the best tutors from anywhere and take online classes by using different tools. Make your life easier with this process.",
    image: "http://res.cloudinary.com/dn7oeugls/image/upload/v1741005394/iwa3qbulq3bj4fnns7ut.png",
    aos: "fade-up",
  },
  {
    title: "Group Tutoring",
    subtitle: "Need the Competitive & Affordable experience?",
    description:
      "A group of students can fully fill their hunger for learning within more affordable tuition fees. Get the opportunity of learning with knowledge sharing!",
    image: "http://res.cloudinary.com/dn7oeugls/image/upload/v1741005782/bnt7ku9rvj73n7owdaby.png",
    aos: "fade-up",
  },
];

export default function TuitionTypes() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="w-full py-16  px-4 md:px-16 text-center">
      <h2 className="text-3xl font-bold text-gray-900">Tuition Types</h2>
      <p className="text-lg text-gray-600 mt-2">
        Find the Best Tuition Type which suits you most
      </p>
      
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {tuitionTypes.map((type, index) => (
          <Card key={index} className="shadow-lg p-6" data-aos={type.aos}>
            <CardContent className="flex flex-col items-center">
              <Image src={type.image} alt={type.title} width={200} height={150} />
              <h3 className="text-xl font-semibold mt-4">{type.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{type.subtitle}</p>
              <p className="text-gray-700 mt-2 text-center">{type.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}