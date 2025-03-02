import { getAllTutorInfo } from "@/services/TutorInfoUpdate";
import { ITutorInfo } from "@/types";
import { useState, useEffect } from "react";

const useTutorInfo = (email: string) => {
  const [tutorInformation, setTutorInformation] = useState<ITutorInfo[] | []>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await getAllTutorInfo();
        setTutorInformation(data); // Data set
      } catch (error: any) {
        setError(error.message || "Error fetching tutor information");
        console.error("Error fetching tutor info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter the tutorInformation array based on the provided email
  const filteredTutor = tutorInformation.filter(
    (tutor) => tutor.tutorInfo.email === email
  );

  return { tutorInformation, filteredTutor, loading, error };
};

export default useTutorInfo;
