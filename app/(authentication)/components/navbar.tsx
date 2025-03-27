import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Navbar = () => {
  return (
    <div className="fixed top-10 w-full h-14 px-4 flex items-center z-50">
      <Link className="flex items-center justify-center" href="/">
        <h2 className="font-bold text-3xl text-white">
          <Image src="/logo.png" alt="logo" width={240} height={32} />
        </h2>
      </Link>
      <div className="ml-auto flex gap-4 sm:gap-6">
        <Button size="sm" variant="outline" asChild>
          <Link href="/sign-in">
            ログイン
          </Link>
        </Button>
        <Button size="sm" asChild>
          <Link href="/sign-up">
            登録
          </Link>
        </Button>
      </div>
    </div>
  );
};
