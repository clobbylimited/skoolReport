// app/dashboard/setup/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Timelines from "@/components/ui/timeline";

export default function SetupWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const [steps, setSteps] = useState<any[]>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    try {
      const checkProgress = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/setup/check", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        // console.log(data.steps)
        if (data.steps) {
          setSteps(data.steps);
        }

        if (data.currentIndex) {
          setCurrentIndex(data.currentIndex);
        }
      };

      checkProgress();
    } catch (error) {
      console.error("Error fetching setup data:", error);
    }
  }, []);

  if (!steps) {
    return <span className="text-[#888] text-sm mt-7">Loading...</span>;
  }

  return (
    <div className="max-w-md m-auto flex flex-col gap-[16px]">
      <h1 className="text-[24px] text-center w-full">School Setup Wizard</h1>

      <Timelines items={steps} direction="y" />

      <button
        onClick={() => router.push(steps[currentIndex].route)}
        className="px-4 text-[14px] py-2 bg-blue-600 rounded-full text-white hover:bg-blue-700"
      >
        {currentStep === steps.length - 1
          ? "Finish Setup"
          : `Go to ${steps[currentIndex].title}`}
      </button>
    </div>
  );
}
