"use client";
import { useState } from "react";
import TutorForm from "./TutorForm";
import StudentForm from "./StudentForm";

const RegisterForm = () => {


  const [userType, setUserType] = useState<"tutor" | "student">("student");

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg border-4 border-gray-400 shadow-2xl px-4 py-2 rounded-3xl">
        <h1 className="lg:text-xl lg:block hidden text-sm font-bold mb-4">
          Join TutorLink 🎓: Connect, Learn, and Teach
        </h1>
        <h1 className="lg:hidden block  text-2xl font-bold my-4">
          Join TutorLink 🎓
        </h1>
        <div className="mb-4 flex">
          <button
            onClick={() => setUserType("student")}
            className={`w-full p-2 ${
              userType === "student" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setUserType("tutor")}
            className={`w-full p-2 ${
              userType === "tutor" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            Tutor
          </button>
        </div>

        <div className="mt-4">
          {userType === "student" ? <StudentForm /> : <TutorForm />}
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
