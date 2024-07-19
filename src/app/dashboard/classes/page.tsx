"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Props = {};

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
});


function ClassesPage({}: Props) {
  const router = useRouter();
  const [classes, setClasses] = useState<any[]>();

  useEffect(() => {
    try {
      const checkProgress = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/class", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (data.classes) {
          setClasses(data.classes);
        }
      };

      checkProgress();
    } catch (error) {
      console.error("Error fetching setup data:", error);
    }
  }, []);


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState("");

  const onSubmit = async (data: any) => {
    // console.log(data)
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/class/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...data }),
      });
      const result = await response.json();
      if (result.success) {
        reset()
        checkProgressStarter();
        router.push(`/dashboard/classes/`);
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
        const response = await fetch("/api/class", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (data.classes) {
          setClasses(data.classes);
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

  if (!classes) {
    return <span className="text-[#888] text-sm mt-7">Loading...</span>;
  }

  return (
    <div className="w-full flex flex-col gap-[24px]">
    <div className="flex flex-col md:flex-row md:items-center w-full">
      <span className="text-[16px] w-full flex-1">
        <span className="font-[600] text-[24px]">Classes</span>
      </span>
      <div className="w-max flex justify-end items-center gap-[16px]">

        <Dialog>
          <DialogTrigger asChild>
            <button className="px-4 text-[14px] w-max py-2 bg-blue-600 rounded-full text-white hover:bg-blue-700">
              Add Class
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add class</DialogTitle>
              {/* <DialogDescription>
                Create a tern under the session:{" "}
                <span className="font-[600]">{sessionData.name}</span>
              </DialogDescription> */}
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
                    placeholder="e.g. SSS 3"
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
      <div className="flex flex-wrap gap-6">
        {classes.map((cls: any) => (
          <div
          onClick={() => {
            router.push(`/dashboard/classes/${cls._id}`)
          }}
            key={cls.id}
            className="flex flex-col w-[200px] gap-[8px] transition-all duration-200 hover:border-zinc-500 bg-white cursor-pointer select-none hover:-translate-y-[5px] hover:shadow-md border dbg-zinc-50 text-[16px] shadow-sm rounded-lg p-[16px]"
          >
            <span className="font-[600]">{cls.name}</span>
            <div className="text-gray-600 flex flex-col text-[12px] items-start">
              <span>
                <span className="font-medium">Students: </span>
                {23}
              </span>
              {/* <span>
                <span className="font-medium">End Date: </span>
                {new Date(cls.endDate).toDateString()}
              </span> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClassesPage;
