import Link from "next/link";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { Medal } from "lucide-react";

import { cn } from "@/lib/utils";
import { Navbar } from "./components/navbar";
const textFont = Poppins({
  subsets: ["latin"],
  weight: [
    "100", "200", "300", "400", "500", "600", "700", "800", "900"
  ]
});

const AuthenticationPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            目標達成して、共に祝おう
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
            日々の目標を設定し、進捗を追跡。仲間と一緒に成長しましょう。
          </p>
        </div>
        <div className="space-x-4">
          <Link href="/register">
            <button>今すぐ始める</button>
          </Link>
          <Link href="/about">
            <button>詳細を見る</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
