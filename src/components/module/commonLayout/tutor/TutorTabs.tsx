"use client";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import useTutorInfo from "@/hooks/useTutorInfo";
import { ITutorInfo } from "@/types";
// import { getAllTutorInfo } from "@/services/TutorInfoUpdate";

interface TutorTabsProps {
  preferredClasses: string[];
  email: string;
}

const TutorTabs = ({  email }: TutorTabsProps) => {
  // console.log(email);

  // console.log(filteredTutor);

  //  const { data } = await getAllTutorInfo();

  //  console.log(data);
  const { filteredTutor } = useTutorInfo(email as string);

  const tutorInfo: ITutorInfo = filteredTutor[0];
  // console.log(tutorInfo);

  return (
    <Tabs defaultValue="education" className="w-full">
      <TabsList className="grid w-full lg:grid-cols-3 grid-cols-1">
        <TabsTrigger value="education">Education</TabsTrigger>
        <TabsTrigger value="tution">Tutions</TabsTrigger>
        <TabsTrigger value="personal">Personal</TabsTrigger>
      </TabsList>

      <TabsContent value="education">
        {filteredTutor.length === 0 ? (
          <Card className="p-6">
            <div className="text-gray-500">Not Available yet</div>
          </Card>
        ) : (
          <Card className="p-6 space-y-4">
            {/*         
          <h3 className="font-medium mt-4">Preferred Classes</h3>
          <div className="flex flex-wrap gap-2">
          <Badge >Contact for details</Badge>
          </div> */}

            <h3 className="font-medium mt-4">Graduation Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Curriculum:</span>{" "}
                {tutorInfo?.education?.graduationCurriculum}
              </div>
              <div>
                <span className="font-medium">Group:</span>{" "}
                {tutorInfo?.education?.graduationGroup}
              </div>
              <div>
                <span className="font-medium">Institute:</span>{" "}
                {tutorInfo?.education?.graduationInstitute}
              </div>
              <div>
                <span className="font-medium">Institute Type:</span>{" "}
                {tutorInfo?.education?.graduationInstituteType}
              </div>
              <div>
                <span className="font-medium">Passing Year:</span>{" "}
                {tutorInfo?.education?.graduationPassingYear}
              </div>
              <div>
                <span className="font-medium">Result:</span>{" "}
                {tutorInfo?.education?.graduationResult}
              </div>
            </div>

            <h3 className="font-medium mt-4">
              Secondary Education Information
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Curriculum:</span>{" "}
                {tutorInfo?.education?.secondaryCurriculum}
              </div>
              <div>
                <span className="font-medium">Group:</span>{" "}
                {tutorInfo?.education?.secondaryGroup}
              </div>
              <div>
                <span className="font-medium">Institute:</span>{" "}
                {tutorInfo?.education?.secondaryInstitute}
              </div>
              <div>
                <span className="font-medium">Passing Year:</span>{" "}
                {tutorInfo?.education?.secondaryPassingYear}
              </div>
              <div>
                <span className="font-medium">Result:</span>{" "}
                {tutorInfo?.education?.secondaryResult}
              </div>
            </div>
          </Card>
        )}
      </TabsContent>
      <TabsContent value="tution">
        {filteredTutor.length === 0 ? (
          <Card className="p-6">
            <div className="text-gray-500">Not Available yet</div>
          </Card>
        ) : (
          <Card className="p-6 space-y-4">
            <h3 className="font-medium">Tution Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Salary: </span>
                {tutorInfo?.tuition?.tuitionFees}৳/month
              </div>
              <div>
                <span className="font-medium">Status:</span> Available
              </div>
            </div>

            <h3 className="font-medium mt-4">Preferred Classes</h3>
            <div>
              <Badge>Contact for more details</Badge>
            </div>

            <h3 className="font-medium mt-4">Tuition Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Duration: </span> {tutorInfo?.tuition?.tuitionDuration} Month
              </div>
              <div>
                <span className="font-medium">Start Date:</span>  {tutorInfo?.tuition?.tuitionStartDate}
              </div>
              <div>
                <span className="font-medium">End Date:</span> {tutorInfo?.tuition?.tuitionEndDate}
              </div>
              <div>
                <span className="font-medium">Fees:</span> {tutorInfo?.tuition?.tuitionFees}৳/month
              </div>
              <div>
                <span className="font-medium">Institute:</span> {tutorInfo?.tuition?.tuitionInstitute}
              </div>
              <div>
                <span className="font-medium">Level:</span> {tutorInfo?.tuition?.tuitionLevel}
              </div>
              <div>
                <span className="font-medium">Subject:</span> {tutorInfo?.tuition?.tuitionSubject}
            </div>
            </div>
          </Card>
        )}
      </TabsContent>
      <TabsContent value="personal">
        {filteredTutor.length === 0 ? (
          <Card className="p-6">
            <div className="text-gray-500">Not Available yet</div>
          </Card>
        ) : (
          <Card className="p-6 space-y-4">
          <h3 className="font-medium">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Full Name:</span> {tutorInfo?.personal?.fullName}
            </div>
            <div>
              <span className="font-medium">Father&lsquo;s Name:</span> {tutorInfo?.personal?.fatherName}
            </div>
            <div>
              <span className="font-medium">Mother&lsquo;s Name:</span> {tutorInfo?.personal?.motherName}
            </div>
            <div>
              <span className="font-medium">Mobile Number:</span> {tutorInfo?.personal?.mobileNumber}
            </div>
            <div>
              <span className="font-medium">Email:</span> {tutorInfo?.personal?.email}
            </div>
            <div>
              <span className="font-medium">Address:</span> {tutorInfo?.personal?.address}
            </div>
          </div>
        </Card>
        
        )}
      </TabsContent>

     
    </Tabs>
  );
};

export default TutorTabs;
