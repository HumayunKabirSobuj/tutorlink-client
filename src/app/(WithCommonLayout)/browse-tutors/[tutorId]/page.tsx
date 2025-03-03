import { Card } from "@/components/ui/card";

import Image from "next/image";
import { getAllUser } from "@/services/AuthService";
import { TGetAllUsers } from "@/types";
import TutorTabs from "@/components/module/commonLayout/tutor/TutorTabs";

interface IProps {
  params: Promise<{
    tutorId: string;
  }>;
}

const TutorProfile = async ({ params }: IProps) => {
  const preferredClasses = [
    "Class 9 (Bangla Medium)",
    "Class 8 (English Version)",
    "HSC (Science)",
  ];

  const data = await params; // Promise resolve করলাম
  const tutorId = data?.tutorId;
  const allUser = await getAllUser();
  // console.log(allUser);

  const findUser: TGetAllUsers = allUser?.data?.find(
    (user: TGetAllUsers) => user?._id === tutorId
  );

  // console.log(findUser);






  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-6  mx-auto p-6">
      {/* Left Column - Profile */}
      <div className="space-y-6 lg:col-span-2">
        <Card className="p-6 space-y-3 flex flex-col items-center text-center">
          <Image
            src={findUser?.image}
            alt="Tutor Profile"
            className="w-24 h-24 rounded-full border"
            width={300}
            height={300}
          />
          <h1 className="text-2xl font-bold ">{findUser?.name}</h1>
          <h1 className="l font-bold ">{findUser?.phone}</h1>
          <div className="text-sm">
          District:{" "}
            <span className="flex items-center text-purple-700 bg-green-100 px-3 py-1 rounded-full text-sm">
            📍 {findUser?.district}
            </span>
          </div>
          <div className="text-sm">
            Preferred Tuition Area:{" "}
            <div className="space-y-2 ">
              {findUser?.selectedThanas?.map((thana) => (
                <h1
                  className=" text-purple-700 bg-green-100  py-1 rounded-full text-sm text-center"
                  key={thana}
                >
                 📍 {thana}
                </h1>
              ))}
            </div>
          </div>

          
        </Card>
      </div>

      {/* Middle Column - Tabs & Details */}
      <div className="lg:col-span-4  space-y-6">
      <TutorTabs preferredClasses={preferredClasses} email={findUser?.email}/>
      </div>
    </div>
  );
};

export default TutorProfile;
