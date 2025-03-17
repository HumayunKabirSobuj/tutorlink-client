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
import { makeTutoringPostOrder } from "@/services/MakeOrder";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const ManageApplyTable = ({ studentsData }: { studentsData: any[] }) => {
  // console.log(studentsData);

  const handleMakePayment = async (id: string) => {
    // console.log(id);
    const modifiedData = {
      id: id,
    };

    // console.log(modifiedData);
    const result = await makeTutoringPostOrder(modifiedData);
    // console.log(result);
    window.location.replace(result.url);
  };

  return (
    <div>
      <div className="overflow-x-auto rounded-2xl border border-gray-300 my-5">
        <table className="min-w-full border border-gray-300 bg-white rounded-3xl">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-left">Heading</th>
              <th className="border p-3 text-left">Price Per Month</th>
              <th className="border p-3 text-center">Tutor</th>
              <th className="border p-3 text-center">Selected Status</th>
              <th className="border p-3 text-center">Payment Status</th>
              <th className="border p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {studentsData?.map((item) => (
              <tr key={item._id} className="border">
                <td className="border p-3">{item?.tutionId?.heading}</td>
                <td className="border p-3">{item?.tutionId?.salaryRange}</td>
                <td className="border p-3 text-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="rounded-full">
                        Tutor Info
                      </Button>
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

                <td className="border p-3 text-center">{item?.selectStatus}</td>
                <td className="border p-3 text-center">
                  {item?.paymentStatus}
                </td>
                <td className="border p-3 text-center ">

                            {
                              (item?.paymentStatus==="Not_Pay" && item?.selectStatus === "Selected" ) &&<Button
                              onClick={() => handleMakePayment(item?._id)}
                              className="flex-1 rounded-full"
                            >
                              Make Payment
                            </Button>
                            }
                            {
                              (item?.paymentStatus==="Done" && item?.selectStatus === "Selected" ) && <Button className="flex-1 rounded-full">
                              Already Paid
                            </Button>
                            }
                            

                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageApplyTable;
