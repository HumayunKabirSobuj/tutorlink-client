"use client"; // এই লাইনটি ফাইলের একদম শুরুতে রাখুন

import { Button } from "@/components/ui/button";
import { getAllUser } from "@/services/AuthService";
import { TGetAllUsers } from "@/types";
import { districtsWithThanas } from "@/utils/BangladeshDistricts";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const BrowseTutorsPage = () => {
  const [tutors, setTutors] = useState<TGetAllUsers[] | []>([]);
  const [searchName, setSearchName] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All");

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUser();

      // Ensure response.data exists and is an array
      const users = Array.isArray(response.data) ? response.data : [];
      const filteredTutors = users.filter(
        (user: TGetAllUsers) => user.role === "tutor"
      );
      setTutors(filteredTutors);
    };

    fetchUsers();
  }, []);

  const filteredTutors = tutors.filter(
    (tutor) =>
      tutor.name.toLowerCase().includes(searchName.toLowerCase()) &&
      (selectedDistrict === "All" ||
        selectedDistrict === "" ||
        tutor.district === selectedDistrict)
  );
  return (
    <div>
      <h1 className="font-bold text-2xl lg:text-3xl text-center  lg:hidden block my-10">
        All Tutors 🎓
      </h1>

      <div className="flex flex-col lg:flex-row gap-5">
        <aside className="lg:w-1/4 w-full p-4 border-r space-y-5 border-gray-300 bg-gray-100 lg:min-h-screen ">
          <h2 className="text-lg font-semibold mb-4">Advance Filter</h2>
          <div>
            <h1 className="font-medium">Search By Name</h1>
            <input
              type="text"
              placeholder="Search by Name"
              className="p-2 border rounded w-full "
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>

          {/* District Filter (Select Dropdown) */}
         <div>
          <h1 className="font-medium">Filter By District</h1>
         <select
            className="p-2 border rounded w-full"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            <option value="">All</option>

            {districtsWithThanas.map((districts) => (
              <option key={districts?.district} value={districts?.district}>
                {districts?.district}
              </option>
            ))}
          </select>
         </div>
        </aside>

        <div className="flex-1">
          <h1 className="font-bold text-2xl lg:text-3xl text-center mt-5 lg:block hidden">
            All Tutors 🎓
          </h1>

          {/* Tutors List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5 lg:my-10">
            {filteredTutors?.map((tutor) => (
              <div
                key={tutor?._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden w-full"
              >
                <Image
                  className="w-full h-80 p-4 rounded-3xl"
                  src={tutor?.image}
                  alt="Profile"
                  width={500}
                  height={200}
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 text-center">
                    {tutor?.name}
                  </h2>

                  <div className="flex justify-center mt-2">
                    <span className="flex items-center text-purple-700 bg-green-100 px-3 py-1 rounded-full text-sm">
                      📍 {tutor?.district}
                    </span>
                  </div>
                  <div className="mt-4">
                    <Link href={`/browse-tutors/${tutor?._id}`}>
                      <Button className="w-full text-white py-2 rounded-md transition">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseTutorsPage;
