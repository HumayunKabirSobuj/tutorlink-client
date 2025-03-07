/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import React from "react";

const DeleteNeedTutionsPost = (id:any) => {
    // console.log(id);
  return (
    <div>
      <Button variant="outline" className="px-3 py-1 rounded-full">
        Delete
      </Button>
    </div>
  );
};

export default DeleteNeedTutionsPost;
