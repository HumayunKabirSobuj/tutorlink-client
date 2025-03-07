"use client";
import { Button } from "@/components/ui/button";
import { DeleteBlog } from "@/services/Blogs";
import { toast } from "sonner";

const DeleteBlogButton = (id: { id: string }) => {
  const handleDeleteButton = async (blogId: { id: string }) => {
    // console.log(blogId);
    const res = await DeleteBlog(blogId);
    toast.success(res.message, { duration: 2000 });
  };
  // console.log(id);

  return (
    <div>
      <Button className="w-full" onClick={() => handleDeleteButton(id)}>DELETE</Button>
    </div>
  );
};

export default DeleteBlogButton;
