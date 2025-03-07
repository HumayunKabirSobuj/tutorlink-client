/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Loader from "@/components/shared/Loader";
import { updateBlog } from "@/services/Blogs";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface BlogFromData {
  title: string;
  short_description: string;
  long_description: string;
}

interface BlogProps {
  blogData: {
    _id: string;
    title: string;
    short_description: string;
    long_description: string;
  };
}

export default function BlogUpdateForm({ blogData }: BlogProps) {
  const blog = blogData;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogFromData>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<BlogFromData> = async (data) => {
    const { short_description, long_description, title } = data;

    try {
      setLoading(true);

      const blogData = {
        blogId: blog._id,
        blogInfo: { title, short_description, long_description },
      };

      const result = await updateBlog(blogData);
      //   console.log(result);
      if (result?.success) {
        toast.success(result?.message);
      } else {
        toast.error(result?.message);
      }
      setLoading(false);
      //   toast.success("Blog Updated Successfully ..", { duration: 2000 });
    } catch (error) {
      setLoading(false);
      toast.error("Failed to update the blog. Please try again.", {
        duration: 2000,
      });
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col lg:flex-row p-4 gap-4">
        {/* Left Side - Profile Card (optional, you can add it here) */}

        {/* Right Side - Content */}
        <div className="w-full mx-auto space-y-6">
          {/* Add Blog Post Section */}
          <div className="rounded-lg shadow-lg bg-white p-8">
            <h3 className="text-black text-lg font-semibold mb-4 text-center">
              Update Your Blog
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-gray-700 text-sm mb-2">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-50 text-gray-800 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter blog title"
                  defaultValue={blog?.title}
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-gray-700 text-sm mb-2">
                  Short Description
                </label>
                <textarea
                  className="w-full bg-gray-50 text-gray-800 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write a short description"
                  defaultValue={blog?.short_description}
                  {...register("short_description", {
                    required: "Short description is required",
                    maxLength: {
                      value: 720,
                      message: "Short description cannot exceed 720 characters",
                    },
                  })}
                ></textarea>
                {errors.short_description && (
                  <p className="text-red-500 text-sm">
                    {errors.short_description.message}
                  </p>
                )}
              </div>

              {/* Long Description */}
              <div>
                <label className="block text-gray-700 text-sm mb-2">
                  Long Description
                </label>
                <textarea
                  className="w-full bg-gray-50 text-gray-800 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write a long description"
                  defaultValue={blog?.long_description}
                  {...register("long_description", {
                    required: "Long description is required",
                    maxLength: {
                      value: 2200,
                      message: "Long description cannot exceed 2200 characters",
                    },
                  })}
                ></textarea>
                {errors.long_description && (
                  <p className="text-red-500 text-sm">
                    {errors.long_description.message}
                  </p>
                )}
              </div>

              <div className="mt-8 text-center">
                <button
                  type="submit"
                  className="w-full lg:w-1/3 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Update Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
