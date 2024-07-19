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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Define the schema using Yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  startDate: yup.date().required("Start Date is required"),
  endDate: yup.date().required("End Date is required"),
});

type Props = {};

function SessionIDPage({ params }: { params: { objID: string } }) {
  const router = useRouter();
  const [classData, setClassData] = useState<any>();
  const [subjectData, setSubjectData] = useState<any[]>([]);
  const [studentData, setStudentData] = useState<any[]>([]);
  const [departmentsData, setDepartmentsData] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [subjectsToSave, setSubjectsToSave] = useState<
    { name: string; department: string | null; class: string }[]
  >([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState("");

  const onSubmit = async () => {
    console.log(subjectsToSave);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/class/bulk-add-subject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ subjects: subjectsToSave }),
      });
      const result = await response.json();
      if (result.success) {
        checkProgressStarter();
        setSubjectsToSave([])
        // router.push(`/dashboard/session/${params.objID}/`);
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
        const response = await fetch(`/api/class/${params.objID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (data.class) {
          setClassData(data.class);
        }

        if (data.subjects) {
          setSubjectData(data.subjects);
        }

        if (data.subjects) {
          setSubjectData(data.subjects);
        }

        if (data.departments) {
          setDepartmentsData(data.departments);
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

  if (!classData) {
    return <span className="text-[#888] text-sm mt-7">Loading...</span>;
  }

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleSaveSubject = (e: any) => {
    e.preventDefault();
    if (inputValue.trim() === "") return; // Prevent adding empty items
    if (inputValue.includes(";")) {
      setSubjectsToSave([
        ...subjectsToSave,
        ...inputValue.split(";").map((value) => ({
          name: value.trim(),
          department: departmentsData[0]._id,
          class: classData._id,
        })),
      ]);
    } else {
      setSubjectsToSave([
        ...subjectsToSave,
        {
          name: inputValue,
          department: departmentsData[0]._id,
          class: classData._id,
        },
      ]);
    }

    setInputValue("");
  };

  return (
    <div className="w-full flex flex-col gap-[24px]">
      <div className="flex flex-col md:flex-row md:items-center w-full">
        <span className="text-[16px] w-full flex-1">
          Class:{" "}
          <span className="font-[600] text-[24px]">{classData.name}</span>
        </span>
        <div className="w-max flex justify-end items-center gap-[16px]">
          <Dialog>
            <DialogTrigger asChild>
              <button className="px-4 text-[14px] w-max py-2 text-zinc-700 hover:bg-zinc-50 border rounded-full">
                Add Subject
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add subject</DialogTitle>
                <DialogDescription>
                  Create a subjecr under the class:{" "}
                  <span className="font-[600]">{classData.name}</span>
                </DialogDescription>
              </DialogHeader>
              <div>
                <div
                  // onSubmit={handleSubmit(onSubmit)}
                  className="grid gap-[24px] py-4"
                >
                  <form
                    onSubmit={handleSaveSubject}
                    className="grid grid-cols-4 items-center gap-4"
                  >
                    <Input
                      value={inputValue}
                      id="name"
                      onChange={handleInputChange}
                      placeholder="Type a subject & click 'Enter'"
                      className="col-span-full"
                    />
                  </form>

                  <ul className="max-h-[200px] overflow-y-auto">
                    {subjectsToSave.map((subjectToSave, index) => (
                      <li key={index} className="mb-2">
                        <div className="w-full flex items-center gap-[16px] justify-between">
                          <span className="text-[14px] font-[600] text-zinc-500">
                            {subjectToSave.name}
                          </span>
                          <div className="flex items-center justify-between gap-[16px]">
                            <Select
                              onValueChange={(val: any) => {
                                setSubjectsToSave((prev: any) =>
                                  prev.map((prv: any, indx: number) => {
                                    if (indx === index) {
                                      return {
                                        ...prv,
                                        department: val,
                                      };
                                    }
                                    return prv;
                                  })
                                );
                              }}
                              defaultValue={departmentsData[0]?._id}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a Department" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Departments</SelectLabel>
                                  {departmentsData.map((departmentData) => (
                                    <SelectItem value={departmentData._id}>
                                      {departmentData.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <svg
                              onClick={() => {
                                setSubjectsToSave((prev: any) =>
                                  prev.filter(
                                    (prv: any, indx: number) => indx != index
                                  )
                                );
                              }}
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              className="stroke-[#595959] hover:stroke-red-600 cursor-pointer"
                            >
                              <path
                                fill="none"
                                stroke-linecap="round"
                                stroke-width="1.5"
                                d="M9.17 4a3.001 3.001 0 0 1 5.66 0m5.67 2h-17m14.874 9.4c-.177 2.654-.266 3.981-1.131 4.79c-.865.81-2.195.81-4.856.81h-.774c-2.66 0-3.99 0-4.856-.81c-.865-.809-.953-2.136-1.13-4.79l-.46-6.9m13.666 0l-.2 3M9.5 11l.5 5m4.5-5l-.5 5"
                              />
                            </svg>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <DialogFooter>
                    <button
                      onClick={() => onSubmit()}
                      type="submit"
                      className="px-4 text-[14px] w-max py-2 bg-blue-600 rounded-full text-white hover:bg-blue-700"
                    >
                      Submit
                    </button>
                  </DialogFooter>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <button className="px-4 text-[14px] w-max py-2 bg-blue-600 rounded-full text-white hover:bg-blue-700">
                Add Student
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add term</DialogTitle>
                <DialogDescription>
                  Create a tern under the session:{" "}
                  <span className="font-[600]">{classData.name}</span>
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
        <div className="w-full flex flex-wrap gap-[40px] items-center text-left text-gray-500 dark:text-gray-400">
          {subjectData.map((subject: any) => (
            <div className="flex select-none items-center gap-[16px]">
              <div className="flex justify-start items-center gap-[8px]">
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5 text-green-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  ></path>
                </svg>
                <span className="text-[14px]">{subject.name}</span>
              </div>
              <Badge variant={"secondary"} className="rounded-full">{subject.department.name}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SessionIDPage;
