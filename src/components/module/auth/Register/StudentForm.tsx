"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  Controller,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudentFormSchema } from "./StudentFormSchema";
import axios from "axios";
import Loader from "../../shared/Loader";

// components/StudentForm.tsx
const StudentForm = () => {
  const form = useForm({
    resolver: zodResolver(StudentFormSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      //   console.log(data);

      const image = data.image;

      const newFormData = new FormData();
      newFormData.append("file", image); // Add the image file
      newFormData.append("upload_preset", process.env.NEXT_PUBLIC_OUPLOAD_PRESET as string); // Your upload preset
      newFormData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME as string); // Not necessary for the request

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME as string}/image/upload`,
        newFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = response.data.url;

      //   console.log(imageUrl);

      const studentData = {
        ...data,
        role: "student",
        image: imageUrl,
      };

      console.log({ studentData });

      //   console.log(studentData);
    } catch (error: any) {
      console.error(error);
    }
  };

  if (isSubmitting) {
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {/* Other fields */}

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="number" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload Field */}
          <FormField
            control={form.control}
            name="image"
            render={({}) => (
              <FormItem>
                <FormLabel>Upload Image</FormLabel>
                <FormControl>
                  <Controller
                    name="image"
                    control={form.control}
                    render={({ field }) => (
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                      />
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Button type="submit" className="w-full mb-3">
              Register
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default StudentForm;
