/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { setTutorSelected } from "@/services/ApplyNeedTutorPost";
import { makeNeedTutionOrder } from "@/services/MakeOrder";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

const ApplyTutorCard = ({ tutorsData }: { tutorsData: any[] }) => {
  //   console.log("tutorsData:", Array.isArray(tutorsData), tutorsData);

  if (!Array.isArray(tutorsData) || tutorsData.length === 0) {
    return (
      <p className="text-center text-red-500 font-semibold mt-5">
        No Data Available
      </p>
    );
  }

  const handleSelectTutor = async (id: any) => {
    const modifiedData = {
      selectStatus: "Selected",
    };
    // console.log(id);

    // console.log(modifiedData);
    try {
      const result = await setTutorSelected(id, modifiedData);
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

  const alreadySelectedTutor = tutorsData.find(
    (tutor) => tutor?.selectStatus === "Selected"
  );

  // console.log(alreadySelectedTutor);

  const handleMakePayment = async (id: string) => {
    // console.log(id);
    const modifiedData = {
      id: id,
    };

    // console.log(modifiedData);
    const result = await makeNeedTutionOrder(modifiedData);
    console.log(result);
    window.location.replace(result.url);
  };

  return (
    <div>
      <h1 className="text-center text-2xl my-5 font-bold">Applicant Here</h1>
      <div className="grid grid-cols-1  lg:grid-cols-3 gap-5">
        {tutorsData.map((tutor) => (
          <Card
            key={tutor._id}
            className="p-4 shadow-lg rounded-2xl text-center"
          >
            <Image
              src={tutor?.tutorId?.image}
              alt={tutor?.tutorId?.name}
              width={96}
              height={96}
              priority
              className="mx-auto h-24 w-24 rounded-full border-2 border-gray-300"
            />
            <CardContent className="mt-4">
              <h2 className="text-lg font-semibold">{tutor?.tutorId?.name}</h2>
              <p className="text-gray-600">{tutor?.tutorId?.role}</p>
              <p className="text-sm text-gray-500">{tutor?.tutorId?.email}</p>
              <p className="text-sm text-gray-500">{tutor?.tutorId?.phone}</p>
              <p className="text-sm text-gray-500">
                {tutor?.tutorId?.thana}, {tutor?.tutorId?.district}
              </p>
              <div className="mt-4  flex items-center gap-2">
                <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
                  <Link href={`/browse-tutors/${tutor?.tutorId?._id}`}>
                    View Profile
                  </Link>
                </Button>
                {tutor?.selectStatus === "Selected" ? (
                  <Button
                    onClick={() => handleMakePayment(tutor?._id)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                  >
                    Make Payment
                  </Button>
                ) : (
                  <div>
                    {!alreadySelectedTutor && (
                      <Button
                        onClick={() => handleSelectTutor(tutor?._id)}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                      >
                        Make Selected
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ApplyTutorCard;
