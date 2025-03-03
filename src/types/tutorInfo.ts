export type ITutorInfo = {
  tutorInfo: {
    name: string;
    email: string;
    phone: string;
    role: "tutor";
    image: string;
    iat: number;
    exp: number;
  };
  education?: {
    graduationCurriculum?: string;
    graduationGroup?: string;
    graduationInstituteType?: string;
    graduationPassingYear?: string;
    graduationResult?: string;
    secondaryCurriculum?: string;
    secondaryGroup?: string;
    secondaryInstitute?: string;
    secondaryPassingYear?: string;
    secondaryResult?: string;
    graduationInstitute?:string
  };
  tuition?: {
    tuitionDuration?: string;
    tuitionEndDate?: string;
    tuitionFees?: string;
    tuitionInstitute?: string;
    tuitionLevel?: string;
    tuitionStartDate?: string;
    tuitionSubject?: string;
  };
  personal?: {
    address?: string;
    email?: string;
    fatherName?: string;
    fullName?: string;
    mobileNumber?: string;
    motherName?: string;
  };
  _id: string;
  __v: number;
};
