import ApplyTutionJobTable from "@/components/module/dashboard/tutor/manage-apply-tution/ApplyTutionJobTable";
import { getTutorApply } from "@/services/ApplyNeedTutorPost";
import { getAllUser, getCurrentUser } from "@/services/AuthService";
import { TGetAllUsers } from "@/types";

const ManageApplyTution = async () => {
  const user = await getCurrentUser();

  const { data } = await getAllUser();

  //   console.log(data);
  //   console.log(user);

  const currentUser = await data?.find(
    (oneUser: TGetAllUsers) => oneUser?.email === user?.email
  );

  //   console.log(currentUser);

  const applyPost = await getTutorApply(currentUser?._id);

//   console.log(applyPost);
  return (
    <div>
      <h1 className="text-center text-xl font-bold">Manage Tution Job Application</h1>
      <ApplyTutionJobTable tutorsData={applyPost?.data}/>
    </div>
  );
};

export default ManageApplyTution;
