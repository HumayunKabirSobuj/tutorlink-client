import ManageApplyTable from "@/components/module/manage-apply/ManageApplyTable";
import { getStudentApply } from "@/services/ApplyTutoringPost";
import { getAllUser, getCurrentUser } from "@/services/AuthService";
import { TGetAllUsers } from "@/types";
import React from "react";

const ManageApply = async () => {
  const user = await getCurrentUser();

  const { data } = await getAllUser();

  // console.log(data);
  // console.log(user);

  const currentUser = await data?.find(
    (oneUser: TGetAllUsers) => oneUser?.email === user?.email
  );

  //   console.log(currentUser);

  const { data: appliedData } = await getStudentApply(currentUser?._id);
//   console.log(appliedData);

  //   console.log(currentUser);
  return (
    <div>
      <h1 className="text-center font-bold text-2xl lg:text-3xl my-5">Manage Your Apply</h1>
  {/* console.log(appliedData); */}
      <ManageApplyTable studentsData={appliedData}/>
    </div>
  );
};

export default ManageApply;
