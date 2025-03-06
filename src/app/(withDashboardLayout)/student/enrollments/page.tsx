import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { studentEnrollCourse } from "@/services/ApplyNeedTutorPost";
import { getAllUser, getCurrentUser } from "@/services/AuthService";
import { TGetAllUsers } from "@/types";

const MyEnrollments = async () => {
  const user = await getCurrentUser();

  const { data } = await getAllUser();

  //   console.log(data);
  //   console.log(user);

  const currentUser = await data?.find(
    (oneUser: TGetAllUsers) => oneUser?.email === user?.email
  );

//   console.log(currentUser);

  const {data:enrollData} = await studentEnrollCourse(currentUser?._id);
//   console.log(enrollData);

  if (!Array.isArray(enrollData) || enrollData.length === 0) {
    return (
      <p className="text-center text-red-500 font-semibold mt-5">
        No Data Available
      </p>
    );
  }



  return (
    <div>
      <h1 className="text-2xl font-bold text-center lg:text-3xl">
        My Enrollments
      </h1>
      <div className="overflow-x-auto rounded-2xl border border-gray-300 my-5">
        <table className="min-w-full border border-gray-300 bg-white rounded-3xl">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-left">Heading</th>
              <th className="border p-3 text-left">Price Per Month</th>
              <th className="border p-3 text-center">Tutor</th>
              <th className="border p-3 text-center">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {enrollData?.map((item) => (
              <tr key={item._id} className="border">
                <td className="border p-3">{item?.tutionId?.heading}</td>
                <td className="border p-3">{item?.tutionId?.salaryRange}</td>
                <td className="border p-3 text-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="rounded-full">Tutor Info</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] p-4">
                      <DialogHeader>
                        <DialogTitle className="text-center">
                          Tutor Profile
                        </DialogTitle>
                      </DialogHeader>
                      <div className="text-center mx-auto">
                        <Avatar className="h-16 w-16 mx-auto">
                          <AvatarImage
                            src={
                              item?.tutorId?.image ||
                              "https://github.com/shadcn.png"
                            }
                          />
                          <AvatarFallback>Tutor</AvatarFallback>
                        </Avatar>
                        <p>
                          <span className="font-bold">Name:</span>{" "}
                          {item?.tutorId?.name || "N/A"}
                        </p>
                        <p>
                          <span className="font-bold">Email:</span>{" "}
                          {item?.tutorId?.email || "N/A"}
                        </p>
                        <p>
                          <span className="font-bold">Phone:</span>{" "}
                          {item?.tutorId?.phone || "N/A"}
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </td>

                <td className="border p-3 text-center">{item?.paymentStatus}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEnrollments;
