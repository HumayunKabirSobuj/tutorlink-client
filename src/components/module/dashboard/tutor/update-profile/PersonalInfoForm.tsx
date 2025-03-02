"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import { updateTurorInfo } from "@/services/TutorInfoUpdate";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const PersonalInfoForm = () => {
  const PersonalInfoSchema = z.object({
    fullName: z.string().min(1, "Full Name is required"),
    fatherName: z.string().min(1, "Father's Name is required"),
    motherName: z.string().min(1, "Mother's Name is required"),
    mobileNumber: z
      .string()
      .length(11, "Numbers length must be required at 11 characters"),
    email: z.string().email("Invalid Email Address"),
    address: z.string().min(1, "Address is required"),
  });

  const form = useForm({
    resolver: zodResolver(PersonalInfoSchema),
  });
  const { user } = useUser();
  const [isEditable, setIsEditable] = useState(false);  // Editable state for toggle

  const onSubmit = async (data: FieldValues) => {
    try {
      const modifiedData = {
        tutorInfo: { ...user },
        personal: { ...data },
      };

      const result = await updateTurorInfo(modifiedData);
      if (result?.success) {
        toast.success(result?.message);
        setIsEditable(false); // Disable editing after saving
      } else {
        toast.error(result?.message); // Show error message if update fails
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Card>
        <CardContent className="p-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <Card className="p-4 space-y-4">
                <h3 className="font-semibold text-center">Personal Information</h3>
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Your Full Name"
                          type="text"
                          {...field}
                          value={field.value || ""}
                          disabled={!isEditable} // Disable field if not editable
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fatherName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Father&apos;s Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Your Father's Name"
                          type="text"
                          {...field}
                          value={field.value || ""}
                          disabled={!isEditable} // Disable field if not editable
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="motherName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mother&apos;s Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Your Mother's Name"
                          type="text"
                          {...field}
                          value={field.value || ""}
                          disabled={!isEditable} // Disable field if not editable
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Your Mobile Number"
                          type="text"
                          {...field}
                          value={field.value || ""}
                          disabled={!isEditable} // Disable field if not editable
                        />
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
                        <Input
                          placeholder="Enter Your Email"
                          type="email"
                          {...field}
                          value={field.value || ""}
                          disabled={!isEditable} // Disable field if not editable
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Your Address"
                          type="text"
                          {...field}
                          value={field.value || ""}
                          disabled={!isEditable} // Disable field if not editable
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Card>
              <div>
                {isEditable ? (
                  <Button type="submit" className="w-full">
                    Save
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={() => setIsEditable(true)} // Enable editing
                    className="w-full"
                  >
                    Edit
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalInfoForm;
