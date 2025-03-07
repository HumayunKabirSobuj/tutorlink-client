/* eslint-disable @typescript-eslint/no-explicit-any */

import { getAllBlog } from "@/services/Blogs";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ImCross } from "react-icons/im";

export const metadata: Metadata = {
  title: "Blog Details",
};

interface IProps {
  params: Promise<{
    blogId: string;
  }>;
}

const BlogDetailsPage = async ({ params }: IProps) => {
  const blogs = await getAllBlog();
  const blogId = (await params).blogId;
  const matchBlog: any | undefined = blogs?.data.find(
    (blog: any) => blog._id === blogId
  );

  if (!matchBlog) {
    return (
      <div className="flex items-center justify-center h-screen text-white text-xl">
        Blog not found!
      </div>
    );
  }

  return (
    <div className="bg-white shadow-2xl text-gray-800 p-6 rounded-xl w-5/6 mx-auto flex flex-col gap-6 my-5">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl text-center font-bold text-gray-800  inline-block pb-2">
            Blog Details
          </h1>
        </div>
        <div>
          <Link href={"/blog"}>
            <button className="text-2xl border-2 rounded-full text-gray-800 hover:bg-gray-100 transition-all duration-300">
              <div className="p-2">
                <ImCross />
              </div>
            </button>
          </Link>
        </div>
      </div>

      {/* Blog Image */}
      <div className="w-full h-[350px] relative mb-6">
        {matchBlog.image ? (
          <Image
            className=" rounded-lg"
            src={matchBlog.image}
            alt="Blog Image"
            fill
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center rounded-lg text-white">
            No Image Available
          </div>
        )}
      </div>

      {/* Blog Details */}
      <div className="w-full flex flex-col justify-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">{matchBlog.title}</h2>
        <p className="text-sm text-gray-600">{matchBlog.long_description}</p>

        {/* Author Email - Uncomment if necessary */}
        {/* <p className="text-lg font-semibold text-green-400 pt-1">
          Email: {matchBlog.author?.email || "Not Available"}
        </p> */}
      </div>
    </div>
  );
};

export default BlogDetailsPage;
