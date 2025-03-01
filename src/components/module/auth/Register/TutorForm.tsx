"use client"
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { districtsWithThanas } from "@/utils/BangladeshDistricts";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const TutorForm = () => {
  const form = useForm();
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedThana, setSelectedThana] = useState<string | null>(null);



  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
    setSelectedThana(null); // Reset the thana when district changes
  };

  const handleThanaChange = (thana: string) => {
    setSelectedThana(thana);
  };

  const districtOptions = districtsWithThanas.map(
    (districtData) => districtData.district
  );
  const thanasForSelectedDistrict = selectedDistrict
    ? districtsWithThanas.find(
        (districtData) => districtData.district === selectedDistrict
      )?.thanas
    : [];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      //   console.log(data);

      const tutorData = {
        ...data,
        district: selectedDistrict,
        thana: selectedThana,
        role: "turor",
      };

      console.log(tutorData);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {/* Other tutor-specific fields */}

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    required
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
                    type="email"
                    {...field}
                    value={field.value || ""}
                    required
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
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value || ""}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Thana and District */}
          

          <div className="space-y-2">
            <label className="block text-sm font-medium">District</label>
            <Select onValueChange={handleDistrictChange} required>
              <SelectTrigger className="w-full p-2 border rounded-md bg-white">
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
              <SelectContent>
                {districtOptions.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedDistrict && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">Thana</label>
              <Select
                onValueChange={handleThanaChange}
                disabled={!thanasForSelectedDistrict?.length}
                required
              >
                <SelectTrigger className="w-full p-2 border rounded-md bg-white">
                  <SelectValue placeholder="Select Thana" />
                </SelectTrigger>
                <SelectContent>
                  {thanasForSelectedDistrict?.map((thana) => (
                    <SelectItem key={thana} value={thana}>
                      {thana}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Button type="submit" className="w-full mb-3">
              Register
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
  );
};

export default TutorForm;
