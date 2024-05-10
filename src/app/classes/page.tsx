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
import Folder from "@/asset/folder.svg";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

function ClassesPage({}: Props) {
  const [createOpened, setcreateOpened] = useState(false);
  const [loadingCreate, setloadingCreate] = useState(false);
  const [className, setclassName] = useState("");
  const [classes, setclasses] = useState<any[]>();

  const createClasses = () => {
    if (className != "") {
      setloadingCreate(true);
      axios
        .post("/api/classes", {
          name: className,
        })
        .then((res: any) => {
          loadClasses();
          setcreateOpened(false);
          alert(res.data.message);
        })
        .finally(() => {
          setloadingCreate(false);
        });
    } else {
      alert("Enter a name");
    }
  };

  const loadClasses = () => {
    setloadingCreate(true);
    axios
      .get("/api/classes")
      .then((res: any) => {
        console.log(res.data)
        setclasses(res.data);
      })
      .finally(() => {
        setloadingCreate(false);
      });
  };

  useEffect(() => {
    loadClasses();
  }, []);

  return (
    <div className="w-full flex flex-col gap-[30px] p-[20px]">
      <div className="w-full flex justify-end">
        <Dialog open={createOpened} onOpenChange={setcreateOpened}>
          {/* <DialogTrigger className="rounded-full"> */}
          <Button
            onClick={() => setcreateOpened(true)}
            className="rounded-full"
          >
            Add Class
          </Button>
          {/* </DialogTrigger> */}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a class</DialogTitle>
            </DialogHeader>
            {loadingCreate ? (
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
                    onChange={(e: any) => setclassName(e.target.value)}
                    className="w-full px-[20px] rounded-xl shadow-none h-[45px]"
                    placeholder="Class Name"
                  />
                </div>
                <div className="flex justify-end items-center">
                  <Button
                    disabled={loadingCreate}
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
      <div className="w-full h-max grid gap-[30px] grid-cols-6">
        {classes ? (
          classes.map((clas: any) => (
            <div className="flex flex-col justify-center items-center gap-[5px] text-[14px] font-[400]">
              <Link href={"classes/" + clas._id }>
                <Image
                  src={Folder}
                  width={100}
                  height={100}
                  className=" hover:scale-[110%] w-[100px] cursor-pointer aspect-square"
                  alt="folder image"
                />
              </Link>
              <span className=" cursor-pointer hover:underline underline-offset-2">
                {clas.name}
              </span>
            </div>
          ))
        ) : (
          <>
            {Array.from({ length: 6 }, (_, index) => (
              <div className="flex flex-col justify-center items-center gap-[5px] text-[14px] font-[400]">
                <Skeleton
                  key={index}
                  className="w-[100px] aspect-square rounded-2xl"
                />
                <Skeleton
                  key={index}
                  className="w-[70px] h-[10px] rounded-2xl"
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default ClassesPage;
