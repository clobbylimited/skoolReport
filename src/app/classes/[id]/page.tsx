"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import SendAnimation from "@/asset/load.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {};

function StudentsSubjectPage({ params }: { params: { id: string } }) {
  const [createOpened, setcreateOpened] = useState(false);
  const [loadingCreateStudent, setloadingCreateStudent] = useState(false);
  const [loadingSubjectCreate, setloadingSubjectCreate] = useState(false);
  const [Name, setName] = useState("");
  const [Gender, setGender] = useState("");
  const [Age, setAge] = useState("");
  const [StudentID, setStudentID] = useState("");

  const [Students, setStudents] = useState<any[]>([]);

  const createClasses = () => {
    if (Name == "") {
      alert("Enter a name");
      return;
    }
    if (Gender == "") {
      alert("Enter gender");
      return;
    }
    if (Age == "") {
      alert("Enter age");
      return;
    }
    if (StudentID == "") {
      alert("Enter Student ID");
      return;
    }

    setloadingCreateStudent(true);
    axios
      .post("/api/students", {
        name: Name,
        age: Age,
        gender: Gender,
        student_id: StudentID,
        class_id: params.id,
      })
      .then((res: any) => {
        loadStudents();
        setcreateOpened(false);
        alert(res.data.message);
      })
      .finally(() => {
        setloadingCreateStudent(false);
      });
  };

  const loadStudents = () => {
    // setloadingCreate(true);
    axios
      .get("/api/students")
      .then((res: any) => {
        setStudents(res.data);
      })
      .finally(() => {
        // setloadingCreate(false);
      });
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div className="w-full flex flex-col gap-[30px] p-[20px]">
      <div className="w-full gap-[20px] flex justify-end">
        <Dialog open={createOpened} onOpenChange={setcreateOpened}>
          {/* <DialogTrigger className="rounded-full"> */}
          <Button
            variant={"outline"}
            onClick={() => setcreateOpened(true)}
            className="rounded-full"
          >
            Add Subject
          </Button>
          {/* </DialogTrigger> */}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a class</DialogTitle>
            </DialogHeader>
            {loadingSubjectCreate ? (
              <div className="w-full flex justify-center items-center">
                <Lottie
                  animationData={SendAnimation}
                  className="w-[200px]"
                  loop={true}
                />
              </div>
            ) : (
              <div className="flex py-[20px] gap-[30px] flex-col items-end justify-center">
                <div className="flex w-full flex-col gap-1">
                  <Input
                    onChange={(e: any) => setName(e.target.value)}
                    className="w-full px-[20px] rounded-xl shadow-none h-[45px]"
                    placeholder="Class Name"
                  />
                </div>
                <div className="flex justify-end items-center">
                  <Button
                    disabled={loadingSubjectCreate}
                    onClick={() => createClasses()}
                    className="rounded-full"
                  >
                    Create
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
        <Dialog open={createOpened} onOpenChange={setcreateOpened}>
          {/* <DialogTrigger className="rounded-full"> */}
          <Button
            onClick={() => setcreateOpened(true)}
            className="rounded-full"
          >
            Add Student
          </Button>
          {/* </DialogTrigger> */}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a Student</DialogTitle>
            </DialogHeader>
            {loadingCreateStudent ? (
              <div className="w-full flex justify-center items-center">
                <Lottie
                  animationData={SendAnimation}
                  className="w-[200px]"
                  loop={true}
                />
              </div>
            ) : (
              <div className="flex py-[20px] gap-[30px] flex-col items-end justify-center">
                <div className="flex w-full flex-col gap-1">
                  <Input
                    onChange={(e: any) => setName(e.target.value)}
                    className="w-full px-[20px] rounded-xl shadow-none h-[45px]"
                    placeholder="Name"
                  />
                </div>
                <div className="flex w-full flex-col gap-1">
                  <Input
                    onChange={(e: any) => setGender(e.target.value)}
                    className="w-full px-[20px] rounded-xl shadow-none h-[45px]"
                    placeholder="Gender"
                  />
                </div>
                <div className="flex w-full flex-col gap-1">
                  <Input
                    onChange={(e: any) => setAge(e.target.value)}
                    className="w-full px-[20px] rounded-xl shadow-none h-[45px]"
                    placeholder="Age"
                  />
                </div>
                <div className="flex w-full flex-col gap-1">
                  <Input
                    onChange={(e: any) => setStudentID(e.target.value)}
                    className="w-full px-[20px] rounded-xl shadow-none h-[45px]"
                    placeholder="Student ID"
                  />
                </div>
                <div className="flex justify-end items-center">
                  <Button
                    disabled={loadingCreateStudent}
                    onClick={() => createClasses()}
                    className="rounded-full"
                  >
                    Create
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <div className=" w-full flex justify-end items-start gap-[30px]">
        <Accordion type="single" collapsible className="w-[300px]">
          {Students.map((clas: any, index) => (
            <AccordionItem className="border-b-0 mb-[20px]" value={JSON.stringify(index)}>
              <AccordionTrigger className="rounded-2xl bg-zinc-100 px-[20px]">
                {clas.name}
              </AccordionTrigger>
              <AccordionContent className="p-[20px] !border-b-0 !border-0">
                <div style={{ whiteSpace: "pre-wrap" }}>
                  <code>{JSON.stringify(clas, null, 2)}</code>
                </div>
                {/* {JSON.stringify(clas)} */}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Accordion type="single" collapsible className="w-[300px]">
          {Students.map((clas: any, index) => (
            <AccordionItem className="border-b-0 mb-[20px]" value={JSON.stringify(index)}>
              <AccordionTrigger className="rounded-2xl bg-zinc-100 px-[20px]">
                {clas.name}
              </AccordionTrigger>
              <AccordionContent className="p-[20px] !border-b-0 !border-0">
                <div style={{ whiteSpace: "pre-wrap" }}>
                  <code>{JSON.stringify(clas, null, 2)}</code>
                </div>
                {/* {JSON.stringify(clas)} */}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default StudentsSubjectPage;
