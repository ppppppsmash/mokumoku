const ClerkLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="h-[100svh] flex flex-col items-center justify-center">
      {children}
    </div>
  );
};

export default ClerkLayout;
