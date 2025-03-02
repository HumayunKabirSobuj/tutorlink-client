import { Button } from "@/components/ui/button";
import Image from "next/image";

const TutorDetails= async({params}:{params:{tutorId:string}}) => {
  // Fake Tutor Data
  const tutor = {
    _id: "123456",
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/45.jpg", // Random profile image
    district: "Dhaka",
    subjects: ["Mathematics", "Physics", "English"],
    experience: "5+ years teaching high school students",
    bio: "Passionate tutor with a strong background in mathematics and physics. Dedicated to helping students excel in their studies.",
    contact: "johndoe@example.com",
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Tutor Image */}
      <Image
        className="w-full h-96 "
        src={tutor.image}
        alt={tutor.name}
        width={500}
        height={300}
      />

      <div className="p-6">
        {/* Name & Location */}
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          {tutor.name}
        </h2>
        <p className="text-gray-600 text-center mt-1">📍 {tutor.district}</p>

        {/* Subjects */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700">Subjects:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {tutor.subjects.map((subject) => (
              <span
                key={subject}
                className="px-3 py-1 text-sm text-purple-700 bg-purple-100 rounded-full"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700">Experience:</h3>
          <p className="text-gray-600">{tutor.experience}</p>
        </div>

        {/* Bio */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700">About:</h3>
          <p className="text-gray-600">{tutor.bio}</p>
        </div>

        {/* Contact Button */}
        <div className="mt-6 text-center">
          <Button className="w-full text-white py-2 rounded-md transition bg-blue-600 hover:bg-blue-700">
            <a href={`mailto:${tutor.contact}`}>Contact Tutor</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TutorDetails;
