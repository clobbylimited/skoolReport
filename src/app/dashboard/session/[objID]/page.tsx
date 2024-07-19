"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Define the schema using Yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  startDate: yup.date().required("Start Date is required"),
  endDate: yup.date().required("End Date is required"),
});

type Props = {};

function SessionIDPage({ params }: { params: { objID: string } }) {
  const router = useRouter();
  const [sessionData, setSessionData] = useState<any>();
  const [termsDate, setTermsDate] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState("");

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/term/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...data, session: params.objID }),
      });
      const result = await response.json();
      if (result.success) {
        checkProgressStarter();
        router.push(`/dashboard/session/${params.objID}/`);
      } else {
        setError(result.error || "Failed to create term");
      }
    } catch (error) {
      console.error("Error creating term:", error);
      setError("An unexpected error occurred");
    }
  };
  const checkProgressStarter = () => {
    try {
      const checkProgress = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/session/${params.objID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (data.session) {
          setSessionData(data.session);
        }

        if (data.terms) {
          setTermsDate(data.terms);
        }
      };

      checkProgress();
    } catch (error) {
      console.error("Error fetching setup data:", error);
    }
  };

  useEffect(() => {
    checkProgressStarter();
  }, []);

  if (!sessionData) {
    return <span className="text-[#888] text-sm mt-7">Loading...</span>;
  }

  return (
    <div className="w-full flex flex-col gap-[24px]">
      <div className="flex flex-col md:flex-row md:items-center w-full">
        <span className="text-[16px] w-full flex-1">
          Session:{" "}
          <span className="font-[600] text-[24px]">{sessionData.name}</span>
        </span>
        <div className="w-max flex justify-end items-center gap-[16px]">
          <button className="px-4 text-[14px] w-max py-2 text-zinc-700 hover:bg-zinc-50 border rounded-full">
            Edit Session
          </button>

          <Dialog>
            <DialogTrigger asChild>
              <button className="px-4 text-[14px] w-max py-2 bg-blue-600 rounded-full text-white hover:bg-blue-700">
                Add Term
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add term</DialogTitle>
                <DialogDescription>
                  Create a tern under the session:{" "}
                  <span className="font-[600]">{sessionData.name}</span>
                </DialogDescription>
              </DialogHeader>
              <div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid gap-4 py-4"
                >
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      {...register("name")}
                      id="name"
                      placeholder="e.g. THIRD TERM"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Start Date
                    </Label>
                    <Input
                      {...register("startDate")}
                      type="date"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      End Date
                    </Label>
                    <Input
                      {...register("endDate")}
                      type="date"
                      className="col-span-3"
                    />
                  </div>
                  <DialogFooter>
                    <button
                      type="submit"
                      className="px-4 text-[14px] w-max py-2 bg-blue-600 rounded-full text-white hover:bg-blue-700"
                    >
                      Submit
                    </button>
                  </DialogFooter>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="w-full flex flex-wrap gap-[24px]">
      {termsDate.map((term: any) => (
        <div
          onClick={() => {
            // router.push(`/dashboard/session/${params.objID}/${term._id}`);
          }}
          key={term.id}
          className="flex flex-col w-[200px] gap-[8px] transition-all duration-200 hover:border-zinc-500 bg-white cursor-pointer select-none hover:-translate-y-[5px] hover:shadow-md border dbg-zinc-50 text-[16px] shadow-sm rounded-lg p-[16px]"
        >
          <span className="font-[600]">{term.name}</span>
          <div className="text-gray-600 flex flex-col text-[12px] items-start">
            <span>
              <span className="font-medium">Start Date: </span>
              {new Date(term.startDate).toDateString()}
            </span>
            <span>
              <span className="font-medium">End Date: </span>
              {new Date(term.endDate).toDateString()}
            </span>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default SessionIDPage;
