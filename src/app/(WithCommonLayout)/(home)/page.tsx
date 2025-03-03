// "use client";

import Banner from "@/components/module/commonLayout/home/Banner";
import TutoringJobs from "@/components/module/commonLayout/home/TutoringJobs";


// import { useUser } from "@/context/UserContext";

const HomePage = () => {
  // const user = useUser();
 
  return (
    <div className="container mx-auto ">
     <Banner/>
     <TutoringJobs/>
    </div>
  );
};

export default HomePage;
