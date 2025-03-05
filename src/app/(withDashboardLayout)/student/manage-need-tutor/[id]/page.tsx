import { getTutorNeedPostApplicantInfo } from "@/services/ApplyNeedTutorPost";
import ApplyTutorCard from "@/components/module/manage-need-tutor/ApplyTutorCard";
interface IProps {
  params: Promise<{
    id: string;
  }>;
}

const TutorProfileCard = async ({ params }: IProps) => {
  //   console.log(await params);

  

  const { id } = await params;
  //   console.log(id);

  const { data } = await getTutorNeedPostApplicantInfo(id);
  //   console.log(data);

  return (
    <div>
      <ApplyTutorCard tutorsData={data} />
    </div>
  );
};

export default TutorProfileCard;
