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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/context/UserContext";
import { updateTurorInfo } from "@/services/TutorInfoUpdate";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const TuitionInfoForm = () => {
  const TuitionSchema = z.object({
    tuitionInstitute: z.string(),
    tuitionSubject: z.string(),
    tuitionLevel: z.string(),
    tuitionDuration: z.string(),
    tuitionFees: z.string(),
    tuitionStartDate: z.string(),
    tuitionEndDate: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(TuitionSchema),
  });
const { user } = useUser();
  const onSubmit = async(data: FieldValues) => {
    // console.log("Form Data:", data);
    try {
      const modifiedData = {
        tutorInfo: { ...user },
        tuition: {
          ...data,
        },
      };
      // console.log(modifiedData)

      const result = await updateTurorInfo(modifiedData);
      // console.log(result);
      if (result?.success) {
        toast.success(result?.message);
      } else {
        toast.success(result?.message);
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
                <h3 className="font-semibold text-center">Tuition Information</h3>
                <FormField
                  control={form.control}
                  name="tuitionInstitute"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institute Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Tuition Institute Name"
                          type="text"
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
                  name="tuitionSubject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Tuition Subject"
                          type="text"
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
                  name="tuitionLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Education Level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Primary">Primary</SelectItem>
                          <SelectItem value="Secondary">Secondary</SelectItem>
                          <SelectItem value="Higher Secondary">
                            Higher Secondary
                          </SelectItem>
                          <SelectItem value="University">University</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tuitionDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (Months)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Duration"
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
                  name="tuitionFees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fees (Per Month)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Tuition Fees"
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
                  name="tuitionStartDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="YYYY-MM-DD"
                          type="date"
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
                  name="tuitionEndDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="YYYY-MM-DD"
                          type="date"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Card>

              <Button type="submit" className="w-full">
                Save
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TuitionInfoForm;