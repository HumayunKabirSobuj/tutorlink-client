"use client";
import EducationalInfoForm from "@/components/module/dashboard/tutor/update-profile/EducationalInfoForm";
import PersonalInfoForm from "@/components/module/dashboard/tutor/update-profile/PersonalInfoForm";
import TuitionInfoForm from "@/components/module/dashboard/tutor/update-profile/TutionInfoForm";
import { useState } from "react";

const TutorUpdateForm = () => {
  const [userType, setUserType] = useState<"educational" | "tuition" |"personal">("educational");

  return (
    <div className="min-h-screen flex justify-center p-4 ">
      <div className="w-full   px-4 py-2 ">
        <h1 className="lg:text-xl lg:block hidden text-sm font-bold mb-4">
          Update Profile Info 🎓
        </h1>
        <h1 className="lg:hidden block  text-2xl font-bold my-4">
          Update Profile Info 🎓
        </h1>
        <div className="mb-4 flex md:flex-row flex-col">
          <button
            onClick={() => setUserType("educational")}
            className={`w-full p-2 ${
              userType === "educational" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            Educational Info
          </button>
          <button
            onClick={() => setUserType("tuition")}
            className={`w-full p-2 ${
              userType === "tuition" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
           Tuition Info
          </button>
          <button
            onClick={() => setUserType("personal")}
            className={`w-full p-2 ${
              userType === "personal" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
           Personal Info
          </button>
        </div>

        <div className="mt-4">
          {userType === "educational" && <EducationalInfoForm />}
          {userType === "tuition" && <TuitionInfoForm />}
          {userType === "personal" && <PersonalInfoForm />}
        </div>
      </div>
    </div>
  );
};

export default TutorUpdateForm;
