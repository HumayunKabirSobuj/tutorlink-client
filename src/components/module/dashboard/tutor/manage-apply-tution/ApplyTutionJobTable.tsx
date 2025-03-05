/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ApplyTutionJobTable = ({ tutorsData }: { tutorsData: any[] }) => {
  console.log(tutorsData);
  if (!Array.isArray(tutorsData) || tutorsData.length === 0) {
    return (
      <p className="text-center text-red-500 font-semibold mt-5">
        No Data Available
      </p>
    );
  }
  return (
    <div>
      <div className="overflow-x-auto rounded-2xl border border-gray-300 my-5">
        <table className="min-w-full border border-gray-300 bg-white rounded-3xl">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-left">Heading</th>
              <th className="border p-3 text-left">Price Per Month</th>
              <th className="border p-3 text-center">Student</th>
              <th className="border p-3 text-center">Select Status</th>
              <th className="border p-3 text-center">Payment Status</th>
              <th className="border p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {tutorsData?.map((item) => (
              <tr key={item._id} className="border">
                <td className="border p-3">{item?.tutionId?.heading}</td>
                <td className="border p-3">{item?.tutionId?.salaryRange}</td>
                {/* <td className="border p-3 text-center">
              <Button
                variant="outline"
                className="px-3 py-1 rounded-full"
                onClick={() => handleDelete(item?._id)}
              >
                Delete
              </Button>
            </td> */}
                <td className="border p-3 text-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="rounded-full">Student Info</Button>
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
                          <AvatarFallback>CN</AvatarFallback>
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

                <td className="border p-3 text-center">{item?.selectStatus}</td>
                <td className="border p-3 text-center">{item?.selectStatus}</td>
                <td className="border p-3 text-center">
                    <Button className="rounded-full" variant={"outline"}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplyTutionJobTable;
