import Link from "next/link";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";


const textFont = Poppins({
  subsets: ["latin"],
  weight: [
    "100", "200", "300", "400", "500", "600", "700", "800", "900"
  ]
});

const AuthenticationPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center justify-center flex-col">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-6xl text-center tect-neutral-800 mb-6">
            目標達成して、共に祝おう
          </h1>
          <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit mx-auto text-center">
            日々の目標を設定し、進捗を追跡<br />仲間と一緒に成長しましょう
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
