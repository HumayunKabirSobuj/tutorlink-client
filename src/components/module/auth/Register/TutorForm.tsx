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
import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { districtsWithThanas } from "@/utils/BangladeshDistricts";
import { TutorFormSchema } from "./TutorFromSchema";
import { registerTutor } from "@/services/AuthService";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

// components/StudentForm.tsx
const TutorForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(TutorFormSchema),
  });
  // const form = useForm();

  // console.log(districtsWithThanas);
  const {
    formState: { isSubmitting },
  } = form;

  const password = form.watch("password");
  const passwordConfirm = form.watch("passwordConfirm");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      // console.log(data);

      const image = data.image;
      // console.log(image);
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

      const tutorData = {
        ...data,
        role: "tutor",
        image: imageUrl,
      };

      // console.log({ tutorData });
      const result = await registerTutor(tutorData);
      // console.log(result);
      if (result?.success) {
        toast.success(result.message);
        router.push("/login");
      } else {
        toast.error(result.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

              {/*  */}

              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      District <span className="text-red-400">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Your District" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {districtsWithThanas?.map((districts) => (
                          <SelectItem
                            key={districts?.district}
                            value={districts?.district}
                          >
                            {districts?.district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="thana"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Thana <span className="text-red-400">*</span>
                    </FormLabel>
                    <Select
                      disabled={!form.watch("district")}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Your Thana" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {districtsWithThanas
                          .find(
                            (district) =>
                              district.district === form.watch("district")
                          )
                          ?.thanas.map((thana) => (
                            <SelectItem key={thana} value={thana}>
                              {thana}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*  */}

              {/* থানাগুলোর Checkbox ভার্সন */}
              <FormField
                control={form.control}
                name="selectedThanas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Preferred Tuition Area{" "}
                      <span className="text-red-400">*</span>
                    </FormLabel>
                    <div className="space-y-2">
                      {districtsWithThanas
                        .find(
                          (district) =>
                            district.district === form.watch("district")
                        )
                        ?.thanas.map((thana) => (
                          <div
                            key={thana}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              checked={field.value?.includes(thana)}
                              onCheckedChange={(checked) => {
                                field.onChange(
                                  checked
                                    ? [...(field.value || []), thana]
                                    : field.value?.filter(
                                        (item: string) => item !== thana
                                      )
                                );
                              }}
                            />
                            <label className="text-sm">{thana}</label>
                          </div>
                        ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*  */}

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

export default TutorForm;
