"use client";
import { useState, useEffect } from "react";
import { getNeedTutorPost } from "@/services/NeedTutor";
import { ITuitionJob } from "@/types";
import Link from "next/link";

const TuitionJobs = () => {
  const [jobs, setJobs] = useState<ITuitionJob[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getNeedTutorPost();
        console.log("Fetched Data:", data);
        const jobList = Array.isArray(data) ? data : data?.data || [];
        setJobs(jobList);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  console.table(jobs[0]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-1/4 p-4 border-r border-gray-300 bg-gray-100 min-h-screen hidden md:block">
        <h2 className="text-lg font-semibold mb-4">Advance Filter</h2>
        <input
          type="text"
          placeholder="Search by Job ID..."
          className="w-full p-2 border rounded mb-4"
        />
        <input type="date" className="w-full p-2 border rounded mb-4" />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Tuition Jobs</h1>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-500">No tuition jobs found.</p>
        ) : (
          <div className="flex flex-col  gap-4">
            {jobs.map((job) => (
              <div
                key={job?._id}
                className="border border-gray-300 rounded-lg p-4 shadow-md bg-white"
              >
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>
                    {job?.area}, {job?.district}
                  </span>
                  <span className="border px-2 py-1 rounded text-blue-500">
                    Job ID: {job?._id.slice(-6)}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-gray-800">
                  {job?.heading}
                </h2>
                <div className="flex items-center space-x-2 my-2">
                  <span className="bg-green-200 text-green-800  text-xs px-3 py-1 rounded-full">
                    🏡 {job?.tutoringType} Tutoring
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                  <p>
                    📚 <strong>Medium:</strong> {job?.medium}
                  </p>
                  <p>
                    🎓 <strong>Class:</strong> {job?.class}
                  </p>
                  <p>
                    📅 <strong>Tutoring Days:</strong> {job?.daysPerWeek}{" "}
                    Days/Week
                  </p>
                  <p>
                    👨‍🏫 <strong>Preferred Tutor:</strong> {job?.teacherGender}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 my-2">
                  <span className="bg-green-200 text-green-800 text-xs px-3 py-1 rounded-full">
                    {job?.subject}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-blue-500 text-lg font-bold">
                    {job?.salaryRange} Tk/Month
                  </p>
                  <Link href={`/tution-jobs/${job?._id}`} className="bg-green-600 text-white px-4 py-2 rounded-lg  transition">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default TuitionJobs;
