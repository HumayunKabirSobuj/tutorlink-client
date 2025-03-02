import Navbar from "@/components/module/shared/Navbar";


const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto">
    <Navbar/>
      <main className="min-h-screen">{children}</main>
    </div>
  );
};

export default CommonLayout;
