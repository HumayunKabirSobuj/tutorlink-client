"use client";
import { useState } from "react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import person1 from "@/assets/images/person1.png";
import person2 from "@/assets/images/person2.png";
import person3 from "@/assets/images/person3.png";
import person4 from "@/assets/images/person4.png";
import person5 from "@/assets/images/person5.png";
import person6 from "@/assets/images/person6.png";
import icon1 from "@/assets/images/icon1.png";
import icon2 from "@/assets/images/icon2.png";
import icon3 from "@/assets/images/icon3.png";
import icon4 from "@/assets/images/icon4.png";
import icon5 from "@/assets/images/icon5.png";

const AboutUsPage = () => {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = [
    "All",
    "Founder",
    "Co-founder",
    "Authors",
    "Publisher",
    "Senior Author",
  ];

  const team = [
    {
      name: "Nayemul Karim",
      role: "Founder & Chief Editor",
      category: "Founder",
      img: person1,
    },
    {
      name: "Shezan Mahmud",
      role: "Co-founder & Operations Head",
      category: "Co-founder",
      img: person2,
    },
    {
      name: "Mahbubul Karim",
      role: "Lead Publisher",
      category: "Publisher",
      img: person3,
    },
    {
      name: "Ayesha Siddiqah",
      role: "Creative Director",
      category: "Authors",
      img: person4,
    },
    {
      name: "Latisha Miles",
      role: "Publisher",
      category: "Publisher",
      img: person5,
    },
    {
      name: "Robert Fox",
      role: "Senior Author",
      category: "Senior Author",
      img: person6,
    },
  ];

  const filteredTeam =
    activeTab === "All"
      ? team
      : team.filter((member) => member.category === activeTab);

  return (
    <div className="container mx-auto px-5 bg-white">
      <h1 className="text-black text-4xl font-semibold text-center mb-12">
        Meet Our Team
      </h1>

      {/* Tabs */}
      <div className="flex justify-center mb-12">
        <div className="flex gap-4 p-3 rounded-full shadow-lg bg-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full transition duration-300 ${
                activeTab === tab
                  ? "text-black bg-gray-300 border border-purple-500"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        {filteredTeam.map((member, index) => (
          <div
            key={index}
            className="relative rounded-2xl bg-white shadow-lg border-2 border-blue-500 p-4"
          >
            <Image
              src={member.img}
              alt={member.name}
              className="w-full rounded-2xl"
            />
            <div className="absolute bottom-4 left-4 bg-white text-black p-3 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{member.name}</h2>
              <p className="text-gray-600">{member.role}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="p-8 md:p-12 lg:p-16 rounded-lg flex flex-col lg:flex-row items-center justify-between gap-10 mt-12">
        <div className="rounded-[30px] w-full h-[350px] bg-gradient-to-r from-[#5C258D] to-[#4389A2] shadow-lg text-white flex-1 py-5 flex flex-col justify-center items-center ">
          <h3 className="text-2xl font-semibold">Still Have A Question?</h3>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Image src={icon1} alt="" width={20} height={20} />
            <Image src={icon2} alt="" width={20} height={20} />
            <Image src={icon3} alt="" width={20} height={20} />
            <Image src={icon4} alt="" width={20} height={20} />
            <Image src={icon5} alt="" width={20} height={20} />
          </div>
        </div>

        <form className="space-y-4 flex-1 w-full">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter your name..."
              className="w-full p-3 rounded-md bg-gray-200 text-black placeholder-gray-600"
            />
            <input
              type="email"
              placeholder="Enter your email..."
              className="w-full p-3 rounded-md bg-gray-200 text-black placeholder-gray-600"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter your number..."
              className="w-full p-3 rounded-md bg-gray-200 text-black placeholder-gray-600"
            />
            <select className="w-full p-3 rounded-md bg-gray-200 text-black">
              <option value="">Choose services</option>
              <option value="support">Support</option>
              <option value="inquiry">Inquiry</option>
              <option value="other">Other</option>
            </select>
          </div>

          <textarea
            placeholder="Message..."
            className="w-full p-3 rounded-md bg-gray-200 text-black placeholder-gray-600"
          ></textarea>

          <button className="w-full text-lg text-white font-semibold rounded-full bg-gradient-to-r from-blue-500 to-purple-500 py-2">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default AboutUsPage;
