import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getCurrentUser } from "@/services/AuthService";

import { getSingleNeedTutorPost } from "@/services/NeedTutor";
import { ITuitionJob } from "@/types";
import Link from "next/link";

interface IProps {
  params: Promise<{
    id: string;
  }>;
}
const JobDetails = async ({ params }: IProps) => {
  const { id } = await params;
  const { data } = await getSingleNeedTutorPost(id);
  const tutionData: ITuitionJob = data;
  // console.log(tutionData);

  const user = await getCurrentUser();
  // console.log(user);

  return (
    <div className=" mx-auto bg-white p-6 shadow-md rounded-lg border border-gray-200 my-5">
      <h2 className="text-xl font-bold text-center text-blue-700 mb-2">
        {tutionData?.heading}
      </h2>
      <p className="text-center text-gray-600 text-sm">
        Job ID : {tutionData?._id.slice(-6)} &nbsp;
      </p>

      <p className="text-center text-gray-700 mt-2 font-medium">
        📍 {tutionData?.area}
      </p>
      <div className="text-center my-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Student Info</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] p-4">
            <DialogHeader>
              <DialogTitle className="text-center">Student Profile</DialogTitle>
            </DialogHeader>
            <div className="text-center mx-auto">
              <Avatar className="h-16 w-16 mx-auto">
                <AvatarImage
                  src={
                    tutionData?.studentId?.image ||
                    "https://github.com/shadcn.png"
                  }
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>
                <span className="font-bold">Name:</span>{" "}
                {tutionData?.studentId?.name || "N/A"}
              </p>
              <p>
                <span className="font-bold">Email:</span>{" "}
                {tutionData?.studentId?.email || "N/A"}
              </p>
              <p>
                <span className="font-bold">Phone:</span>{" "}
                {tutionData?.studentId?.phone || "N/A"}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
     {
      user && user?.role ==="tutor" &&  <div className="text-center my-4">
      <Button variant={"outline"}>Apply</Button>
    </div>
     }

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
          <strong>👨‍🏫 Preferred Tutor:</strong> {tutionData?.teacherGender}
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

        <div></div>
      </div>

      <div className="mt-4">
        <p className="font-medium">📌 Other Requirements:</p>
        <p className="text-gray-600 text-sm mt-1">
          Edexcel curriculum, Time: Morning/Afternoon, O/A level background
          tutors are requested to apply
        </p>
      </div>

      <Link
        href={"/tution-jobs"}
        className="w-full   text-white py-2 mt-4 rounded text-sm"
      >
        <Button className="w-full my-10">← Go Back To All Jobs</Button>
      </Link>
    </div>
  );
};

export default JobDetails;
