/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTutorSellCourseForNeedTutor } from "@/services/ApplyNeedTutorPost";
import { getTutorSellCourseForApplyTutoringPost } from "@/services/ApplyTutoringPost";
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

// Pie Chart Data (Course Performance)
const coursePerformanceData = [
  { name: "Highly Rated", value: 5 },
  { name: "Moderate", value: 3 },
  { name: "Needs Improvement", value: 2 },
];

const COLORS = ["#4CAF50", "#FFC107", "#F44336"];

// Bar Chart Data (Monthly Revenue)
const revenueData = [
  { month: "Jan", earnings: 200 },
  { month: "Feb", earnings: 450 },
  { month: "Mar", earnings: 600 },
  { month: "Apr", earnings: 800 },
  { month: "May", earnings: 750 },
];

// Line Chart Data (Student Engagement)
const engagementData = [
  { month: "Jan", students: 30 },
  { month: "Feb", students: 50 },
  { month: "Mar", students: 70 },
  { month: "Apr", students: 90 },
  { month: "May", students: 110 },
];

// Pie Chart Data (Top Courses)
const topCoursesData = [
  { name: "React Basics", value: 150 },
  { name: "Node.js Mastery", value: 120 },
  { name: "UI/UX Design", value: 100 },
];

export default function TutorDashboard() {
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
            getTutorSellCourseForNeedTutor(currentUser?._id),
            getTutorSellCourseForApplyTutoringPost(currentUser?._id),
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

  // console.log(needTutionsCourse);
  const totalTutionsCourseEarning = tutionsCourse.reduce((sum, course) => {
    return sum + Number(course.tutionId.salaryRange);
  }, 0);
  const totalNeedTutionsCourseEarning = needTutionsCourse.reduce(
    (sum, course) => {
      return sum + Number(course.tutionId.salaryRange);
    },
    0
  );

  // console.log(totalTutionsCourseEarning,totalNeedTutionsCourseEarning);

  const totalStudentOfTutionsCourse = tutionsCourse.reduce((sum, course) => {
    return sum + Number(course.tutionId.numberOfStudent);
  }, 0);
  const totalStudentOfNeedTutionsCourse = needTutionsCourse.reduce(
    (sum, course) => {
      return sum + Number(course.tutionId.numberOfStudent);
    },
    0
  );

  // console.log(totalStudentOfNeedTutionsCourse);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Tutor Dashboard
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-600">
              {totalStudentOfTutionsCourse + totalStudentOfNeedTutionsCourse}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">
              Total Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-600">
              {totalTutionsCourseEarning + totalNeedTutionsCourseEarning} BDT{" "}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">
              Courses Published
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-purple-600">
              {tutionsCourse?.length + needTutionsCourse?.length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart (Course Performance) */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">
              Course Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={coursePerformanceData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {coursePerformanceData.map((_, index) => (
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

        {/* Bar Chart (Monthly Revenue) */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">
              Monthly Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <XAxis dataKey="month" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="earnings" fill="#4CAF50" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Line Chart (Student Engagement) */}
      <div className="mt-8">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">
              Student Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <XAxis dataKey="month" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="students"
                  stroke="#FF5722"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Courses */}
      <div className="mt-8">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">
              Top Performing Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={topCoursesData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {topCoursesData.map((_, index) => (
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
    </div>
  );
}
