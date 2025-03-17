/* eslint-disable @typescript-eslint/no-explicit-any */

import { getAllBlog } from "@/services/Blogs";
import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkSquareAlt } from "react-icons/fa";



const BlogPage = async () => {
  const blogs = await getAllBlog();

  return (
    <div className="container mx-auto bg-white">
      <div className="flex items-center justify-center lg:pb-16 pb-5">
        <h1 className="text-2xl md:text-3xl text-center font-bold text-gray-800 inline-block pb-2 mt-10">
          All Blogs
        </h1>
      </div>
      <div className="space-y-10 lg:space-y-12">
        {blogs?.data?.map((blog: any) => (
          <div
            key={blog._id}
            className="flex gap-6 flex-col lg:flex-row lg:px-12 px-4 py-6 shadow-lg rounded-xl border border-gray-200 hover:shadow-2xl transition duration-300 ease-in-out"
          >
            <div className="w-full lg:w-[30%] overflow-hidden rounded-xl flex items-center justify-center mb-4 lg:mb-0">
              <Image
                className="object-cover rounded-xl"
                src={blog?.image}
                alt="Blog Image"
                height={400}
                width={600}
              />
            </div>
            <div className="w-full lg:w-[70%]">
              <div className="flex items-center justify-between gap-4 flex-col md:flex-row">
                <h2 className="text-2xl text-center md:text-left font-semibold text-gray-800">
                  {blog?.title}
                </h2>
                <div className="flex text-blue-600 lg:gap-7 gap-4 lg:mr-7 mt-2 lg:mt-0">
                  <Link href={`/blog/${blog?._id}`}>
                    <p className="inline-flex items-center hover:text-blue-800 duration-200 text-nowrap">
                      Details
                      <FaExternalLinkSquareAlt className="mb-[2px] ml-2" />
                    </p>
                  </Link>
                </div>
              </div>
              <p className="text-justify pt-4 text-gray-600">
                {blog?.short_description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
