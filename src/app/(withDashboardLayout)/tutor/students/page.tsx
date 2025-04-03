/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getTutorSellCourseForNeedTutor } from "@/services/ApplyNeedTutorPost";
import { getTutorSellCourseForApplyTutoringPost } from "@/services/ApplyTutoringPost";
import { getAllUser, getCurrentUser } from "@/services/AuthService";
import { TGetAllUsers } from "@/types";

const Students = async () => {
  const user = await getCurrentUser();

  const { data } = await getAllUser();

  // console.log(data);
  // console.log(user);

  const currentUser = await data?.find(
    (oneUser: TGetAllUsers) => oneUser?.email === user?.email
  );

  // console.log(currentUser);

  const {data:TutorSellDataForNeedTutor} = await getTutorSellCourseForNeedTutor(currentUser?._id);
  const {data:TutorSellDataForTutoringPost} = await getTutorSellCourseForApplyTutoringPost(currentUser?._id);

  // console.log(TutorSellDataForTutoringPost,TutorSellDataForNeedTutor);

  return (
    <div>
      <div>
        <h1 className="text-center font-bold text-2xl lg:text-3xl">
          All Students
        </h1>
        <div className="overflow-x-auto rounded-2xl border border-gray-300 my-5">
        <table className="min-w-full border border-gray-300 bg-white rounded-3xl">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-left">Heading</th>
              <th className="border p-3 text-left">Price Per Month</th>
              <th className="border p-3 text-center">Student Profile</th>
              <th className="border p-3 text-center">Total Student</th>
              <th className="border p-3 text-center">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {TutorSellDataForNeedTutor?.map((item:any) => (
              <tr key={item._id} className="border">
                <td className="border p-3">{item?.tutionId?.heading}</td>
                <td className="border p-3">{item?.tutionId?.salaryRange}</td>
                <td className="border p-3 text-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="rounded-full">Student Profile</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] p-4">
                      <DialogHeader>
                        <DialogTitle className="text-center">
                         Student Profile
                        </DialogTitle>
                      </DialogHeader>
                      <div className="text-center mx-auto">
                        <Avatar className="h-16 w-16 mx-auto">
                          <AvatarImage
                            src={
                              item?.studentId?.image ||
                              "https://github.com/shadcn.png"
                            }
                          />
                          <AvatarFallback>Student</AvatarFallback>
                        </Avatar>
                        <p>
                          <span className="font-bold">Name:</span>{" "}
                          {item?.studentId?.name || "N/A"}
                        </p>
                        <p>
                          <span className="font-bold">Email:</span>{" "}
                          {item?.studentId?.email || "N/A"}
                        </p>
                        <p>
                          <span className="font-bold">Phone:</span>{" "}
                          {item?.studentId?.phone || "N/A"}
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </td>

                <td className="border p-3 text-center">{item?.tutionId?.numberOfStudent}</td>
                <td className="border p-3 text-center">{item?.paymentStatus}</td>
               
              </tr>
            ))}
          </tbody>
          <tbody>
            {TutorSellDataForTutoringPost?.map((item:any) => (
              <tr key={item._id} className="border">
                <td className="border p-3">{item?.tutionId?.heading}</td>
                <td className="border p-3">{item?.tutionId?.salaryRange}</td>
                <td className="border p-3 text-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="rounded-full">Student Profile</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] p-4">
                      <DialogHeader>
                        <DialogTitle className="text-center">
                         Student Profile
                        </DialogTitle>
                      </DialogHeader>
                      <div className="text-center mx-auto">
                        <Avatar className="h-16 w-16 mx-auto">
                          <AvatarImage
                            src={
                              item?.studentId?.image ||
                              "https://github.com/shadcn.png"
                            }
                          />
                          <AvatarFallback>Student</AvatarFallback>
                        </Avatar>
                        <p>
                          <span className="font-bold">Name:</span>{" "}
                          {item?.studentId?.name || "N/A"}
                        </p>
                        <p>
                          <span className="font-bold">Email:</span>{" "}
                          {item?.studentId?.email || "N/A"}
                        </p>
                        <p>
                          <span className="font-bold">Phone:</span>{" "}
                          {item?.studentId?.phone || "N/A"}
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </td>

                <td className="border p-3 text-center">{item?.tutionId?.numberOfStudent}</td>
                <td className="border p-3 text-center">{item?.paymentStatus}</td>
               
              </tr>
            ))}
          </tbody>
          
        </table>
      </div>
      </div>
    </div>
  );
};

export default Students;
