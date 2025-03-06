export type ITuitionRequest = {
    _id: string;
    area: string;
    class: string;
    daysPerWeek: string;
    district: string;
    heading: string;
    medium: string;
    numberOfStudent: string;
    salaryRange: string;
    studentGender: string;
    subject: string;
    tutoringTime: string;
    tutoringType: string;
    isDeleted?: boolean;
    tutorId: {
      _id: string;
      email: string;
      image: string;
      name: string;
      password: string;
      passwordConfirm: string;
      phone: string;
      role: string;
      isDeactivate?:boolean
      thana?: string;
      district?: string;
      selectedThanas?:string[]
      __v: number;
    }; // Array of student objects
    __v: number;
  };
  