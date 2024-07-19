// app/dashboard/layout.tsx
"use client";
import Breadcrumbs from "@/components/ui/breadcrumb";
import TabMenus from "@/components/ui/tabMenus";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const router = useRouter();

  const showSession = () => {
    if (status === "authenticated") {
      return (
        <button
          className="border border-solid border-black rounded"
          onClick={() => {
            signOut({ redirect: false }).then(() => {
              router.push("/");
            });
          }}
        >
          Sign Out
        </button>
      );
    } else if (status === "loading") {
      return <span className="text-[#888] text-sm mt-7">Loading...</span>;
    } else {
      router.push("/dashboard");
      return (
        <Link
          href="/auth/login"
          className="border border-solid border-black rounded"
        >
          Sign In
        </Link>
      );
    }
  };
  return (
    <main className="flex h-screen overscroll-none flex-col items-center w-screen justify-start">
      <div className="h-max border-b divide-y justify-between items-start w-full flex flex-col">
        <div className="h-[50px] px-[16px]">{showSession()}</div>
        <div className="h-[40px] flex justify-start items-center px-[16px] w-full text-[12px] text-zinc-500">
          <TabMenus
            menuList={[
              {
                name: "Home",
                route: "/dashboard",
                active: true,
              },
              {
                name: "Sessions",
                route: "/dashboard/session",
                active: true,
              },
              {
                name: "Departments",
                route: "/dashboard/department",
                active: false,
              },
              {
                name: "Classes",
                route: "/dashboard/classes",
                active: false,
              },
              {
                name: "Subjects",
                route: "/dashboard/subjects",
                active: false,
              },
              {
                name: "Grade board",
                route: "/dashboard/grade-board",
                active: false,
              },
            ]}
          />
        </div>
        <div className="h-[32px] flex justify-start items-center px-[16px] w-full text-[12px] text-zinc-500">
          <Breadcrumbs />
        </div>
      </div>
      <div className="flex justify-center items-start w-full p-[16px] flex-1 overflow-y-auto">
        {status === "authenticated" && children}
      </div>
    </main>
  );
}
