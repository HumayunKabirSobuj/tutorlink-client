"use client";

import { useForm, Controller, FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { districtsWithThanas } from "@/utils/BangladeshDistricts";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { getAllUser } from "@/services/AuthService";
import { TGetAllUsers } from "@/types";
import { addNeedTutorPost } from "@/services/NeedTutor";
import { toast } from "sonner";

const AddNeedTutorForm = () => {
  const { control, register, handleSubmit, watch, reset } = useForm();
  const [users, setUsers] = useState<TGetAllUsers[] | []>([]);

  const { user } = useUser();
  // console.log(user);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUser(); // সরাসরি call করলাম
      // console.log(data);

      setUsers(data?.data);
    };

    fetchUsers();
  }, []);

  // console.log(users?.data);

  // console.log(users);
  const findUser = users?.find(
    (oneUser: TGetAllUsers) => oneUser?.email === user?.email
  );

  // console.log({ findUser });

  const onSubmit = async (data: FieldValues) => {
    // console.table(data);

    try {
      const modifiedData = {
        studentId: findUser?._id,
        ...data,
      };

      const result = await addNeedTutorPost(modifiedData);
      // console.log(result);
      if (result?.success) {
        toast.success(result?.message);
        reset();
      } else {
        toast.error(result?.message);
      }

      // console.log(modifiedData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="mx-auto">
      <CardHeader>
        <CardTitle>Student Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            {/* Student Name */}
            <div>
              <Label htmlFor="heading">Heading</Label>
              <Input
                id="heading"
                {...register("heading")}
                placeholder="Enter Heading Here"
                required
              />
            </div>

            {/* Number of Student */}
            <div>
              <Label htmlFor="numberOfStudent">Number of Student</Label>
              {/* <Input id="numberOfStudent" type="number" {...register("numberOfStudent")} placeholder="Ex: 1" /> */}
              <Controller
                name="numberOfStudent"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Number Of Student" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Student Gender */}
            <div>
              <Label>Student Gender</Label>
              <Controller
                name="studentGender"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Institute */}
            <div>
              <Label htmlFor="institute">Institute</Label>
              <Input
                id="institute"
                {...register("institute")}
                placeholder="Enter Student Institue Name"
                required
              />
            </div>

            {/* District */}
            <div>
              <Label>District</Label>
              <Controller
                name="district"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select District" />
                    </SelectTrigger>
                    <SelectContent>
                      {districtsWithThanas.map((district) => (
                        <SelectItem
                          key={district.district}
                          value={district.district}
                        >
                          {district.district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Area */}
            <div>
              <Label>Area</Label>
              <Controller
                name="area"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!watch("district")}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Area" />
                    </SelectTrigger>
                    <SelectContent>
                      {districtsWithThanas
                        .find(
                          (district) => district.district === watch("district")
                        )
                        ?.thanas.map((thana) => (
                          <SelectItem key={thana} value={thana}>
                            {thana}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Medium */}
            <div>
              <Label>Medium</Label>
              <Controller
                name="medium"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Medium" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bangla">Bangla</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Class */}
            <div>
              <Label>Class</Label>
              <Controller
                name="class"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8">Class 8</SelectItem>
                      <SelectItem value="9">Class 9</SelectItem>
                      <SelectItem value="10">Class 10</SelectItem>
                      <SelectItem value="HSC">HSC</SelectItem>
                      <SelectItem value="Diploma">Diploma</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Subject */}
            <div>
              <Label>Subject</Label>
              {/* <Input {...register("subject")} placeholder="Enter Subjects" /> */}
              <Controller
                name="subject"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Class 8 Subject">
                        Class 8 Subject
                      </SelectItem>
                      <SelectItem value="Class 9 Subject">
                        Class 9 Subject
                      </SelectItem>
                      <SelectItem value="Class 10 Subject">
                        Class 10 Subject
                      </SelectItem>
                      <SelectItem value="HSC Subject">HSC Subjct</SelectItem>
                      <SelectItem value="Diploma Subject">
                        Diploma Subject
                      </SelectItem>
                      <SelectItem value="ICT">ICT</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Tutoring Type */}
            <div>
              <Label>Tutoring Type</Label>
              <Controller
                name="tutoringType"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select One" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">Home Tutoring</SelectItem>
                      <SelectItem value="online">Online Tutoring</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Teacher Gender */}
            <div>
              <Label>Preferred Teacher Gender</Label>
              <Controller
                name="teacherGender"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Days Per Week */}
            <div>
              <Label>Days Per Week</Label>
              {/* <Input type="number" {...register("daysPerWeek")} placeholder="Enter Days Per Week" /> */}
              <Controller
                name="daysPerWeek"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Days Per Week" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Tutoring Time */}
            <div>
              <Label>Tutoring Time</Label>
              <Input required type="time" {...register("tutoringTime")} />
            </div>

            {/* Salary Range */}
            <div>
              <Label>Salary Range</Label>

              <Controller
                name="salaryRange"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Salary Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5000-6000">5000-6000</SelectItem>
                      <SelectItem value="6000-7000">6000-7000</SelectItem>
                      <SelectItem value="7000-8000">7000-8000</SelectItem>
                      <SelectItem value="8000-10000">8000-10000</SelectItem>
                      <SelectItem value="10000-12500">10000-12500</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="text-center">
            <Button type="submit" className="w-full lg:w-2/3 my-5">
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddNeedTutorForm;
