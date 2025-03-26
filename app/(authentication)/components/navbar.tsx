import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-14 px-4 bg-white/20 backdrop-blur-lg
      flex items-center z-50">
      <Link className="flex items-center justify-center" href="/">
        <h2 className="font-bold text-3xl text-white">MokuMoku</h2>
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
