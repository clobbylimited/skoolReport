"use client";

import { useRouter } from "next/navigation";

type Props = {};

function page({}: Props) {
  const router = useRouter()
  router.push("/auth/login")

  return (
    <div className="flex justify-center items-center h-screen">
      
    </div>
  );
}

export default page;
