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
import useTutorInfo from "@/hooks/useTutorInfo";
import { updateTurorInfo } from "@/services/TutorInfoUpdate";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const EducationalInfoForm = () => {
  const { user } = useUser();
  const { filteredTutor } = useTutorInfo(user?.email as string);

  const EducationSchema = z.object({
    graduationCurriculum: z.string(),
    graduationGroup: z.string(),
    graduationInstituteType: z.string(),
    graduationPassingYear: z.string(),
    graduationResult: z.string(),
    secondaryCurriculum: z.string(),
    secondaryGroup: z.string(),
    secondaryInstitute: z.string(),
    secondaryPassingYear: z.string(),
    secondaryResult: z.string(),
  });

  console.log(filteredTutor[0]?.education?.graduationCurriculum);

  const defaultValues = {
    graduationCurriculum: filteredTutor[0]?.education?.graduationCurriculum as string || "", 
    graduationGroup: filteredTutor[0]?.education?.graduationGroup as string || "",
    graduationInstituteType: 'Public',
    graduationPassingYear: '2022',
    graduationResult: 'A+',
    secondaryCurriculum: 'Science',
    secondaryGroup: 'Math',
    secondaryInstitute: 'XYZ School',
    secondaryPassingYear: '2018',
    secondaryResult: 'A',
  };
  const form = useForm({
    resolver: zodResolver(EducationSchema),
    defaultValues,
  });

  
  console.log(filteredTutor[0]);
  const onSubmit = async (data: FieldValues) => {
    try {
      const modifiedData = {
        tutorInfo: { ...user },
        education: {
          ...data,
        },
      };

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
                <h3 className="font-semibold text-center">
                  Secondary Education
                </h3>
                <FormField
                  control={form.control}
                  name="secondaryInstitute"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institute Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Your Secondy Intitute Name"
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
                  name="secondaryCurriculum"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Curriculum</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Curriculum" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Bangla">Bangla</SelectItem>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Madrasha">Madrasha</SelectItem>
                          <SelectItem value="Vocational">Vocational</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="secondaryGroup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Group" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Science">Science</SelectItem>
                          <SelectItem value="Arts">Arts</SelectItem>
                          <SelectItem value="Commerce">Commerce</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="secondaryPassingYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passing Year</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Passing Year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from({ length: 2025 - 1995 + 1 }, (_, i) => (
                            <SelectItem key={1995 + i} value={`${1995 + i}`}>
                              {1995 + i}
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
                  name="secondaryResult"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Result</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Result"
                          type="number"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Card>

              <Card className="p-4 space-y-4">
                <h3 className="font-semibold text-center">
                  Graduation / Bachelor / Diploma
                </h3>

                <FormField
                  control={form.control}
                  name="graduationInstituteType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institute Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Institute Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Polytechnic Institute">
                            Polytechnic Institute
                          </SelectItem>
                          <SelectItem value="University">University</SelectItem>
                          <SelectItem value=" National University">
                            National University
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="graduationCurriculum"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Curriculum</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Curriculum" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Bangla">Bangla</SelectItem>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Technical">Technical</SelectItem>
                          <SelectItem value="Madrasha">Madrasha</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="graduationGroup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Group" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Science">Science</SelectItem>
                          <SelectItem value="Arts">Arts</SelectItem>
                          <SelectItem value="Commerce">Commerce</SelectItem>
                          <SelectItem value="Technical">Technical</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="graduationPassingYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passing Year</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Passing Year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from({ length: 2025 - 1995 + 1 }, (_, i) => (
                            <SelectItem key={1995 + i} value={`${1995 + i}`}>
                              {1995 + i}
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
                  name="graduationResult"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Result</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Result CGPA"
                          type="number"
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

export default EducationalInfoForm;
