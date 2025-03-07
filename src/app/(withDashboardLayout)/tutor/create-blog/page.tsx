/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Loader from "@/components/shared/Loader";
import { getAllUser, getCurrentUser } from "@/services/AuthService";
import { addBlog } from "@/services/Blogs";
import { TGetAllUsers } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface BlogFromData {
  title: string;
  short_description: string;
  long_description: string;
  image: FileList;
}

export default function AddBlog() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlogFromData>();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [allUser, setAllUser] = useState<TGetAllUsers[] | []>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, allUser] = await Promise.all([
          getCurrentUser(),
          getAllUser(),
        ]);

        console.log(allUser);

        setUser(userResponse);
        setAllUser(allUser?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // console.log(allUser);

  const findCurrentUser = allUser.find(
    (singleUser) => singleUser?.email === user?.email
  );

  //   console.log(findCurrentUser);
  const onSubmit: SubmitHandler<BlogFromData> = async (data) => {
    const { short_description, long_description, title } = data;

    // Your form submission logic goes here.
    try {
      setLoading(true);
      const image = data.image[0]; // Ensure this is correct
    //   console.log(image);
      const newFormData = new FormData();
      newFormData.append("file", image); // Add the image file
      newFormData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_OUPLOAD_PRESET as string
      ); // Your upload preset
      newFormData.append(
        "cloud_name",
        process.env.NEXT_PUBLIC_CLOUD_NAME as string
      ); // Not necessary for the request

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          process.env.NEXT_PUBLIC_CLOUD_NAME as string
        }/image/upload`,
        newFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = response.data.url;

      // console.log(imageUrl);

      const blogData = {
        title,
        short_description,
        long_description,
        image: imageUrl,
        tutorId: findCurrentUser?._id,
      };

      console.log(blogData);
      const res = await addBlog(blogData);
      // console.log(res);
      if (res?.success) {
        toast.success(res.message, {
          // id: toastId,
          duration: 2000,
        });
      }

      reset();

      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col lg:flex-row p-6 gap-6 h-full">
        {/* Left Side - Profile Card */}

        {/* Right Side - Content */}
        <div className="w-full  bg-white rounded-lg shadow-md p-6">
          {/* Add Blog Post Section */}
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Add New Blog Post
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                className="w-full bg-gray-50 text-gray-800 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter blog title"
                {...register("title", { required: "Title is required" })}
              />
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Short Description
              </label>
              <textarea
                className="w-full bg-gray-50 text-gray-800 border border-gray-300 rounded-lg px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your blog description..."
                {...register("short_description", {
                  required: "Blog description is required",
                  maxLength: {
                    value: 720,
                    message: "Short Description cannot exceed 720 characters",
                  },
                })}
              />
              {errors.short_description && (
                <p className="text-red-500 text-sm">
                  {errors.short_description.message}
                </p>
              )}
            </div>

            {/* Long Description */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Long Description
              </label>
              <textarea
                className="w-full bg-gray-50 text-gray-800 border border-gray-300 rounded-lg px-4 py-2 h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your blog long description..."
                {...register("long_description", {
                  required: "Long description is required",
                  maxLength: {
                    value: 2200,
                    message: "Long description cannot exceed 2200 characters",
                  },
                })}
              />
              {errors.long_description && (
                <p className="text-red-500 text-sm">
                  {errors.long_description.message}
                </p>
              )}
            </div>

            {/* Image */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Upload Image
              </label>
              {loading ? (
                <p className="text-gray-700">Uploading, please wait...</p>
              ) : (
                <input
                  {...register("image", { required: "Image is required" })}
                  type="file"
                  accept="image/*"
                  className="w-full text-gray-800 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>

            <div className="text-center mt-6">
              <button
                type="submit"
                className="w-full lg:w-1/2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition duration-300 ease-in-out"
              >
                Publish Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
