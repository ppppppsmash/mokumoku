import { SignUp } from "@clerk/nextjs";
import { createUser } from "@/app/actions/user";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  await createUser();

  return <SignUp />
};
