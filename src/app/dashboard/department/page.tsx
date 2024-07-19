"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
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
});

type Props = {};

function SessionIDPage({ params }: { params: { objID: string } }) {
  const router = useRouter();
  const [departments, setDepartments] = useState<any[]>([]);

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
      const response = await fetch("/api/departments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...data }),
      });
      const result = await response.json();
      if (result.success) {
        checkProgressStarter();
        router.push(`/dashboard/department`);
      } else {
        setError(result.error || "Failed to create department");
      }
    } catch (error) {
      console.error("Error creating department:", error);
      setError("An unexpected error occurred");
    }
  };

  const checkProgressStarter = () => {
    try {
      const checkProgress = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/departments`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (data.departments) {
          setDepartments(data.departments);
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

  if (!departments) {
    return <span className="text-[#888] text-sm mt-7">Loading...</span>;
  }

  return (
    <div className="w-full flex flex-col gap-[24px]">
      <div className="flex flex-col md:flex-row md:items-center w-full">
        <span className="text-[16px] w-full flex-1">
          <span className="font-[600] text-[24px]">Departments</span>
        </span>
        <div className="w-max flex justify-end items-center gap-[16px]">
          <Dialog>
            <DialogTrigger asChild>
              <button className="px-4 text-[14px] w-max py-2 bg-blue-600 rounded-full text-white hover:bg-blue-700">
                Add Departments
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add department</DialogTitle>
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
                      placeholder="e.g. Humanities"
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
        {departments.map((department: any) => (
          <div
            onClick={() => {
              router.push(
                `/dashboard/session/${params.objID}/${department._id}`
              );
            }}
            key={department.id}
            className="flex w-max gap-[8px] justify-center items-center transition-all duration-200 hover:border-zinc-500 bg-white cursor-pointer select-none hover:-translate-y-[5px] hover:shadow-md border dbg-zinc-50 text-[16px] shadow-sm rounded-lg p-[16px]"
          >
            <span className="font-[600]">{department.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SessionIDPage;
