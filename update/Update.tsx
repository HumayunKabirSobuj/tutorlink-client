"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EducationalInfoForm() {
  const [tab, setTab] = useState("educational");
  const form = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="container mx-auto p-6">
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid lg:grid-cols-3 grid-cols-1 gap-2 rounded-md">
          <TabsTrigger value="educational">Educational Info</TabsTrigger>
          <TabsTrigger value="tuition">Tuition Info</TabsTrigger>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
        </TabsList>

        <TabsContent value="educational">
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
                              <SelectItem value="Vocational">
                                Vocational
                              </SelectItem>
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
                              {Array.from(
                                { length: 2025 - 1995 + 1 },
                                (_, i) => (
                                  <SelectItem
                                    key={1995 + i}
                                    value={`${1995 + i}`}
                                  >
                                    {1995 + i}
                                  </SelectItem>
                                )
                              )}
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
                      Higher Secondary Education
                    </h3>
                    <FormField
                      control={form.control}
                      name="higherSecondaryInstitute"
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
                      name="higherSecondaryCurriculum"
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
                              <SelectItem value="Vocational">
                                Vocational
                              </SelectItem>
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="higherSecondaryGroup"
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
                      name="higherSecondaryPassingYear"
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
                              {Array.from(
                                { length: 2025 - 1995 + 1 },
                                (_, i) => (
                                  <SelectItem
                                    key={1995 + i}
                                    value={`${1995 + i}`}
                                  >
                                    {1995 + i}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="higherSecondaryResult"
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
                              <SelectItem value="University">
                                University
                              </SelectItem>
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
                              <SelectItem value="Madrasha">Madrasha</SelectItem>
                              <SelectItem value="Vocational">
                                Vocational
                              </SelectItem>
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
                              {Array.from(
                                { length: 2025 - 1995 + 1 },
                                (_, i) => (
                                  <SelectItem
                                    key={1995 + i}
                                    value={`${1995 + i}`}
                                  >
                                    {1995 + i}
                                  </SelectItem>
                                )
                              )}
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
