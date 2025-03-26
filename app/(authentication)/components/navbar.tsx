import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-14 px-4 bg-white
      flex items-center z-50">
      <Link className="flex items-center justify-center" href="/">
        <span className="font-bold text-xl">MokuMoku</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
          ログイン
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/register">
          登録
        </Link>
      </nav>
    </div>
  );
};
