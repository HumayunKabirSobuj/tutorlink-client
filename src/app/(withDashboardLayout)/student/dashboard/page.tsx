/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { studentEnrollCourse } from "@/services/ApplyNeedTutorPost";
import { studentTutoringEnrollCourse } from "@/services/ApplyTutoringPost";
import { getAllUser, getCurrentUser } from "@/services/AuthService";
import { TGetAllUsers } from "@/types";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Pie,
  PieChart,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  Cell,
  XAxis,
  YAxis,
} from "recharts";

// Pie Chart Data (Course Completion Status)
const pieData = [
  { name: "Completed", value: 8 },
  { name: "In Progress", value: 4 },
  { name: "Pending", value: 3 },
];

const COLORS = ["#4CAF50", "#FF9800", "#F44336"];

// Bar Chart Data (Courses Enrolled Over Time)
const barData = [
  { name: "Jan", courses: 2 },
  { name: "Feb", courses: 3 },
  { name: "Mar", courses: 4 },
  { name: "Apr", courses: 6 },
  { name: "May", courses: 5 },
];

// Line Chart Data (Learning Progress)
const progressData = [
  { month: "Jan", progress: 30 },
  { month: "Feb", progress: 45 },
  { month: "Mar", progress: 60 },
  { month: "Apr", progress: 80 },
  { month: "May", progress: 95 },
];

// New Feature: Course Categories Stats
const categoryData = [
  { name: "Web Dev", value: 5 },
  { name: "AI/ML", value: 3 },
  { name: "Marketing", value: 4 },
];

// New Feature: Weekly Study Hours
const studyHoursData = [
  { day: "Mon", hours: 2 },
  { day: "Tue", hours: 3 },
  { day: "Wed", hours: 4 },
  { day: "Thu", hours: 2 },
  { day: "Fri", hours: 5 },
  { day: "Sat", hours: 1 },
  { day: "Sun", hours: 3 },
];

export default function StudentDashboard() {
  const [tutionsCourse, setTutionsCourse] = useState<any[]>([]);
  const [needTutionsCourse, setNeedTutionsCourse] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getCurrentUser();
        const { data: allUserData } = await getAllUser();
        const currentUser = allUserData?.find(
          (singleUser: TGetAllUsers) => singleUser?.email === user?.email
        );

        // console.log(currentUser);
        if (currentUser?._id) {
          const [tutionsCourse, needTutionsCourse] = await Promise.all([
            studentEnrollCourse(currentUser?._id),
            studentTutoringEnrollCourse(currentUser?._id),
          ]);

          setTutionsCourse(tutionsCourse?.data);
          setNeedTutionsCourse(needTutionsCourse?.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } 
    };

    fetchData();
  }, []);

  // console.log(tutionsCourse,needTutionsCourse);


  const totalTutionsCourseSalary = tutionsCourse.reduce((sum, course) => {
    return sum + Number(course.tutionId.salaryRange);
  }, 0);
  const totalNeedTutionsCourseSalary = needTutionsCourse.reduce((sum, course) => {
    return sum + Number(course.tutionId.salaryRange);
  }, 0);


  // console.log(totalTutionsCourseSalary,totalNeedTutionsCourseSalary);



  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Student Dashboard
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">
              Total Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-600">{tutionsCourse?.length + needTutionsCourse?.length}</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">
              Total Buy Price
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-600">{totalTutionsCourseSalary+totalNeedTutionsCourseSalary} BDT</p>
          </CardContent>
        </Card>

        
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">
              Course Completion Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">
              Courses Enrolled Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="courses" fill="#4CAF50" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Line Chart */}
      <div className="mt-8">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">
              Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>
                <XAxis dataKey="month" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="progress"
                  stroke="#FF5722"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Course Categories Stats */}
      <div className="mt-8">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">
              Course Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {categoryData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Study Hours Bar Chart */}
      <div className="mt-8">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">
              Weekly Study Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={studyHoursData}>
                <XAxis dataKey="day" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hours" fill="#007BFF" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
