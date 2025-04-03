/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { use, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getAllUser, getCurrentUser } from "@/services/AuthService";
import {  TGetAllUsers } from "@/types";
import Link from "next/link";
import { toast } from "sonner";
import { ApplyTutoringPost, getSingleTutoringPost } from "@/services/TutoringPost";
import { ITuitionRequest } from "@/types/TutionRequest";

interface IProps {
  params: Promise<{
    id: string;
  }>;
}

const JobDetails = ({ params }: IProps) => {
  const { id } = use(params); // use() দিয়ে params resolve করা হয়েছে
  const [tutionData, setTutionData] = useState<ITuitionRequest | null>(null);
  const [user, setUser] = useState<any>(null);
  const [allUser, setAllUser] = useState<TGetAllUsers[] | []>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tutionResponse, userResponse, allUser] = await Promise.all([
          getSingleTutoringPost(id),
          getCurrentUser(),
          getAllUser(),
        ]);

        // console.log(allUser);

        setTutionData(tutionResponse.data);
        setUser(userResponse);
        setAllUser(allUser?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  // console.log(allUser);

  const findCurrentUser = allUser.find(
    (singleUser) => singleUser?.email === user?.email
  );

  // console.log(findCurrentUser);

  const handleApply = async (tutionData: any) => {
    // console.log(tutionData);
    const modifiedData = {
      tutionId: tutionData?._id,
      tutorId: tutionData?.tutorId?._id,
      studentId: findCurrentUser?._id,
    };

    // console.log(modifiedData);

    try {
      const result = await ApplyTutoringPost(modifiedData);
      // console.log(result);
      if (result?.success) {
        toast.success(result?.message);
      } else {
        toast.error(result?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto bg-white p-6 shadow-md rounded-lg border border-gray-200 mt-20">
      <h2 className="text-xl font-bold text-center text-blue-700 mb-2">
        {tutionData?.heading}
      </h2>
      <p className="text-center text-gray-600 text-sm">
        Job ID : {tutionData?._id.slice(-6)} &nbsp;
      </p>
      <p className="text-center text-gray-700 mt-2 font-medium">
        📍 {tutionData?.area} , {tutionData?.district}
      </p>
      <div className="text-center my-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Tutor Info</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] p-4">
            <DialogHeader>
              <DialogTitle className="text-center">Tutor Profile</DialogTitle>
            </DialogHeader>
            <div className="text-center mx-auto">
              <Avatar className="h-16 w-16 mx-auto">
                <AvatarImage
                  src={
                    tutionData?.tutorId?.image ||
                    "https://github.com/shadcn.png"
                  }
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>
                <span className="font-bold">Name:</span>{" "}
                {tutionData?.tutorId?.name || "N/A"}
              </p>
              <p>
                <span className="font-bold">Email:</span>{" "}
                {tutionData?.tutorId?.email || "N/A"}
              </p>
              <p>
                <span className="font-bold">Phone:</span>{" "}
                {tutionData?.tutorId?.phone || "N/A"}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {user && user?.role === "student" && (
        <div className="text-center my-4">
          <Button variant="outline" onClick={() => handleApply(tutionData)}>
            Apply
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4 text-sm text-gray-700">
        <p>
          <strong>📘 Medium:</strong> {tutionData?.medium}
        </p>
        <p>
          <strong>🏫 Class:</strong> {tutionData?.class}
        </p>
        <p>
          <strong>👦 Student Gender:</strong> {tutionData?.studentGender}
        </p>

        <p>
          <strong>📅 Tutoring Days:</strong> {tutionData?.daysPerWeek}
        </p>
        <p>
          <strong>⏰ Tutoring Time:</strong> {tutionData?.tutoringTime}
        </p>
        <p>
          <strong>👥 No. of Students:</strong> {tutionData?.numberOfStudent}
        </p>
        <p>
          <strong>💰 Salary:</strong> {tutionData?.salaryRange}
        </p>
      </div>

      <div className="mt-4">
        <p className="font-medium">📚 Subjects:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="bg-green-500 text-white px-3 py-1 rounded text-xs">
            {tutionData?.subject}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <p className="font-medium">📌 Other Requirements:</p>
        <p className="text-gray-600 text-sm mt-1">
          Edexcel curriculum, Time: Morning/Afternoon, O/A level background
          tutors are requested to apply
        </p>
      </div>

      <Link href={"/tution-request"}>
        <Button className="w-full my-10">← Go Back To All Tution Request</Button>
      </Link>
    </div>
  );
};

export default JobDetails;
