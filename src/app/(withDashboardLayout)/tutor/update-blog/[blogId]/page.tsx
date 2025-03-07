/* eslint-disable @typescript-eslint/no-explicit-any */

import BlogUpdateFrom from "@/components/module/dashboard/tutor/Blog/BlogUpdateFrom";
import { getAllBlog } from "@/services/Blogs";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Update Blog",
};

interface IProps {
  params: Promise<{
    blogId: string;
  }>;
}
const UpdateBlog = async ({ params }: IProps) => {
  // console.log(await params);

  const blogs = await getAllBlog();
  // console.log(blogs?.data);
  const blogId = (await params).blogId;
  const matchBlog = blogs?.data?.find((blog: any) => blog._id === blogId);

  //   console.log(matchBlog);
  return (
    <div>
      <BlogUpdateFrom blogData={matchBlog} />
    </div>
  );
};

export default UpdateBlog;
