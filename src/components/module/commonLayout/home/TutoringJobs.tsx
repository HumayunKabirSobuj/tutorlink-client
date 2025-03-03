"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function TutoringJobs() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="w-full  px-4  mb-8">
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Section - Image */}
        <div
          className="relative w-full flex justify-center"
          data-aos="fade-right"
        >
          <Image
            src="http://res.cloudinary.com/dn7oeugls/image/upload/v1741004243/yaxthcjm04ulgnd9xodc.png" // তোমার ইমেজ URL
            alt="Tutoring Illustration"
            width={500}
            height={300}
            className="w-full max-w-md"
          />
        </div>

        {/* Right Section - Content */}
        <div className="text-center md:text-left" data-aos="fade-left">
          <h2 className="text-3xl font-bold text-gray-900">
            SEARCH TUTORING JOBS
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Find Your Tuition Jobs, in your area
          </p>

          <p className="mt-4 text-gray-700">
            Looking for interesting tuition jobs to excel your teaching
            experience? If teaching jobs interest you, then you are on the right
            place. We often have <span className="font-bold">500+</span>{" "}
            verified home tuition jobs. Whether you are starting your career or
            an expert, we can help you find your next big tuition job.
          </p>

          <div className="mt-6" data-aos="zoom-in">
            <Button className=" text-white px-6 py-3 text-lg font-medium">
              🔍 SEARCH TUITION
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
