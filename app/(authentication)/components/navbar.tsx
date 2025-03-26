import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <Link className="flex items-center justify-center" href="/">
        <span className="font-bold text-xl">GoalTracker</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
          ログイン
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/register">
          登録
        </Link>
      </nav>
    </header>
  );
};
