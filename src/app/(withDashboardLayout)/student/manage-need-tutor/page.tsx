/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { getAllUser, getCurrentUser } from "@/services/AuthService";
import { myNeedNeedTutorPost } from "@/services/NeedTutor";
import { TGetAllUsers } from "@/types";

const TableComponent = async () => {
  const user = await getCurrentUser();
  const { data: allUserData } = await getAllUser();
  
  const currentUser = allUserData?.find(
    (singleUser: TGetAllUsers) => singleUser?.email === user?.email
  );

  const { data: postData } = currentUser?._id ? await myNeedNeedTutorPost(currentUser._id) : { data: [] };

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-300">
      <table className="min-w-full border border-gray-300 bg-white rounded-3xl">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-3 text-left">Heading</th>
            <th className="border p-3 text-left">Price-Range</th>
            <th className="border p-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {postData?.length > 0 ? (
            postData.map((item: any) => (
              <tr key={item._id} className="border">
                <td className="border p-3">{item.heading}</td>
                <td className="border p-3">{item.salaryRange}</td>
                <td className="border p-3 text-center">
                  <Button variant="outline" className="px-3 py-1 rounded-full">
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center p-3">No Data Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;