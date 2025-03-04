

export type ITuitionJob = {
  _id: string;
  heading: string;
  institute: string;
  tutoringTime: string; // Format: "HH:MM"
  numberOfStudent: string;
  studentGender: "male" | "female" | "other";
  district: string;
  area: string;
  medium: string;
  class: string;
  subject: string;
  tutoringType: string;
  teacherGender: string;
  daysPerWeek: string;
  salaryRange: string;
  selectedThanas: string[];
  studentId: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    isDeactivate: boolean;
    image: string; 
    createdAt: string; // ISO date format
    updatedAt: string; // ISO date format
    __v: number;
  }; // Array of student objects
  __v: number;
};
