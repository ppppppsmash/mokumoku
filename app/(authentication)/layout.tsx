import { Navbar } from "./components/navbar";
import { ThreeDMarquee } from "./components/marquee";
import { images } from "@/config";

const AuthenticationLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="h-full">
      <Navbar />

      <main>
        {children}
      </main>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-10">
        <ThreeDMarquee images={images} />
      </div>
    </div>
  );
};

export default AuthenticationLayout;
