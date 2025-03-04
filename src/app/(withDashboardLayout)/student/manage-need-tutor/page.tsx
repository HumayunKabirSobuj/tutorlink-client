"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getAllUser, getCurrentUser } from "@/services/AuthService";
import {
  deleteNeedNeedTutorPost,
  myNeedNeedTutorPost,
} from "@/services/NeedTutor";
import { TGetAllUsers } from "@/types";
import { toast } from "sonner";

const TableComponent = () => {
  const [postData, setPostData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getCurrentUser();
        const { data: allUserData } = await getAllUser();
        const currentUser = allUserData?.find(
          (singleUser: TGetAllUsers) => singleUser?.email === user?.email
        );

        if (currentUser?._id) {
          const { data } = await myNeedNeedTutorPost(currentUser._id);
          setPostData(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      //   console.log(id);
      const modifiedData = {
        id: id,
      };

      //   console.log(modifiedData);

      const result = await deleteNeedNeedTutorPost(modifiedData);
      //   console.log(result);
      if (result?.success) {
        toast.success(result.message);
        setPostData((prevData) => prevData.filter((item) => item._id !== id));
      } else {
        toast.error(result.message);
      }
      //   await deleteTutorPost(postId);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

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
          {loading ? (
            <tr>
              <td colSpan={3} className="text-center p-3">
                Loading...
              </td>
            </tr>
          ) : postData.length > 0 ? (
            postData.map((item) => (
              <tr key={item._id} className="border">
                <td className="border p-3">{item?.heading}</td>
                <td className="border p-3">{item?.salaryRange}</td>
                <td className="border p-3 text-center">
                  <Button
                    variant="outline"
                    className="px-3 py-1 rounded-full"
                    onClick={() => handleDelete(item?._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center p-3">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
