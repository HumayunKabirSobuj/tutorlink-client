import ApplyStudentCard from "@/components/module/manage-tution-post/ApplyStudentCard";
import { getTutoringPostApplicant } from "@/services/ApplyTutoringPost";

interface IProps {
  params: Promise<{
    id: string;
  }>;
}

const page = async ({ params }: IProps) => {
  // console.log(await params);
  const { id } = await params;

  const {data} = await getTutoringPostApplicant(id);
//   console.log(data);
  return (
    <div>
      <ApplyStudentCard studentsData={data} />
    </div>
  );
};

export default page;
