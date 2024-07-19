"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {};

function SessionsPage({}: Props) {
  const router = useRouter();
  const [sessions, setSessions] = useState<any[]>();

  useEffect(() => {
    try {
      const checkProgress = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/session", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (data.sessions) {
          setSessions(data.sessions);
        }
      };

      checkProgress();
    } catch (error) {
      console.error("Error fetching setup data:", error);
    }
  }, []);

  if (!sessions) {
    return <span className="text-[#888] text-sm mt-7">Loading...</span>;
  }

  return (
    <div className="w-full flex flex-col gap-[24px]">
    <div className="flex flex-col md:flex-row md:items-center w-full">
      <span className="text-[24px] w-full flex-1">
        <span className="font-[600]">Sessions</span>
      </span>
    </div>
      <div className="flex flex-wrap gap-6">
        {sessions.map((session: any) => (
          <div
          onClick={() => {
            router.push(`/dashboard/session/${session._id}`)
          }}
            key={session.id}
            className="flex flex-col w-[200px] gap-[8px] transition-all duration-200 hover:border-zinc-500 bg-white cursor-pointer select-none hover:-translate-y-[5px] hover:shadow-md border dbg-zinc-50 text-[16px] shadow-sm rounded-lg p-[16px]"
          >
            <span className="font-[600]">{session.name}</span>
            <div className="text-gray-600 flex flex-col text-[12px] items-start">
              <span>
                <span className="font-medium">Start Date: </span>
                {new Date(session.startDate).toDateString()}
              </span>
              <span>
                <span className="font-medium">End Date: </span>
                {new Date(session.endDate).toDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SessionsPage;
