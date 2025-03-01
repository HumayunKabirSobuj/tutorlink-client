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
import Link from "next/link";
import { regiterStudent } from "@/services/AuthService";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

// components/StudentForm.tsx
const StudentForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(StudentFormSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const password = form.watch("password");
  const passwordConfirm = form.watch("passwordConfirm");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      //   console.log(data);

      const image = data.image;

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

      //   console.log(imageUrl);

      const studentData = {
        ...data,
        role: "student",
        image: imageUrl,
      };

      // console.log({ studentData });

      const result = await regiterStudent(studentData);
      console.log(result);
      if (result?.success) {
        toast.success(result.message);
        router.push("/login");
      } else {
        toast.error(result.message);
      }

      //   console.log(studentData);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">
              {/* Other fields */}

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name <span className="text-red-400">*</span>
                    </FormLabel>
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
                    <FormLabel>
                      Email <span className="text-red-400">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        value={field.value || ""}
                      />
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
                    <FormLabel>
                      Phone <span className="text-red-400">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value || ""}
                      />
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
                    <FormLabel>
                      Password <span className="text-red-400">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Confirm Password <span className="text-red-400">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>

                    {passwordConfirm && password !== passwordConfirm ? (
                      <FormMessage>Password does not match</FormMessage>
                    ) : (
                      <FormMessage />
                    )}
                  </FormItem>
                )}
              />

              {/* Image Upload Field */}
              <FormField
                control={form.control}
                name="image"
                render={({}) => (
                  <FormItem>
                    <FormLabel>
                      Upload Image <span className="text-red-400">*</span>
                    </FormLabel>
                    <FormControl>
                      <Controller
                        name="image"
                        control={form.control}
                        render={({ field }) => (
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0])
                            }
                          />
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <Button
                  type="submit"
                  className="w-full mb-3"
                  disabled={
                    passwordConfirm && password !== passwordConfirm
                      ? true
                      : false
                  }
                >
                  {isSubmitting ? "Registering.." : "Register"}
                </Button>
              </div>
            </div>
          </form>
          <p className="text-center text-sm mt-4 mb-2">
            Already have an account?
            <Link
              href="/login"
              className="text-blue-600 font-semibold hover:underline ml-2"
            >
              Log in here
            </Link>
          </p>
        </Form>
      </CardContent>
    </Card>
  );
};

export default StudentForm;
