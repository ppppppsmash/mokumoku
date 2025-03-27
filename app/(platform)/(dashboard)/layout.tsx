import { auth } from "@clerk/nextjs/server";
import { createUser } from "@/app/actions/user";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

const DashboardLayout = async ({
  children
}: {
  children: React.ReactNode
}) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  await createUser();

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />

        {children}
      </main>
    </SidebarProvider>

  )
}

export default DashboardLayout;
