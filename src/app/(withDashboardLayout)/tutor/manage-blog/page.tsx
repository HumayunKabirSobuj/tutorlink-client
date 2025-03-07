/* eslint-disable @typescript-eslint/no-explicit-any */

import DeleteBlogButton from "@/components/module/dashboard/tutor/Blog/DeleteBlogButton";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/services/AuthService";
import { getAllBlog } from "@/services/Blogs";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Manage Blog",
};

const ManageBlogPage = async () => {
  const user = await getCurrentUser();

  if (!user?.email) {
    return [];
  }

  const blogs = await getAllBlog();
  const matchBlog = blogs?.data?.filter(
    (blog: any) => blog?.tutorId?.email === user.email
  );

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg ">
        <h3 className="text-black text-3xl font-semibold mb-6 text-center">
          Manage Your Blogs
        </h3>
       

        <div className="overflow-x-auto rounded-2xl border border-gray-300 my-5">
          <table className="min-w-full border border-gray-300 bg-white rounded-3xl">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left">Image</th>
                <th className="border p-3 text-left">Title</th>
                <th className="border p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {matchBlog?.map((row: any) => (
                <tr key={row._id} className="border">
                  <td className="border p-3">
                    <Image
                      src={row.image}
                      alt="Blog Image"
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </td>
                  <td className="border p-3"> {row?.title}</td>
                  <td className="border p-3 space-y-2">
                    <Button className="w-full">
                      <Link href={`/tutor/update-blog/${row?._id}`}>
                        UPDATE
                      </Link>
                    </Button>
                    <DeleteBlogButton id={row?._id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBlogPage;
