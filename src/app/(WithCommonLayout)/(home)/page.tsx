// "use client";

import Banner from "@/components/module/commonLayout/home/Banner";
import FAQSection from "@/components/module/commonLayout/home/FAQSection";
import TuitionTypes from "@/components/module/commonLayout/home/TutionTypes";
import TutoringJobs from "@/components/module/commonLayout/home/TutoringJobs";

const HomePage = () => {
  // const user = useUser();
 
  return (
    <div className="container mx-auto ">
     <Banner/>
     <TutoringJobs/>
     <TuitionTypes/>
     <FAQSection/>
    
    </div>
  );
};

export default HomePage;
