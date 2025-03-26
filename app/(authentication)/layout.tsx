import { Navbar } from "./components/navbar";

const AuthenticationLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="h-full">
      <Navbar />

      <main className="pt-60 pb-20">
        {children}
      </main>
    </div>
  );
};

export default AuthenticationLayout;
