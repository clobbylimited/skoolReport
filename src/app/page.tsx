"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useEffect, useState } from "react";
type Props = {};

function page({}: Props) {
  const [session, setsession] = useState<any[]>();
  const [term, setterm] = useState<any[]>();

  const loadSessionAndTerm = () => {
    axios.get("/api/session").then((res: any) => {
      if (res.data.error) {
        alert(res.data.error);

        return;
      }
      setsession(res.data);
    });

    axios.get("/api/term").then((res: any) => {
      if (res.data.error) {
        alert(res.data.error);

        return;
      }
      setterm(res.data);
    });
  };
  useEffect(() => {
    loadSessionAndTerm();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-max flex items-center justify-center gap-[10px]">
        {session ? (
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Session" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {session.map((sess) => (
                  <SelectItem value="apple">{sess.title}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        ) : (
          <Skeleton className="w-[180px] h-[35px] rounded-md" />
        )}
        {term ? (
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Term" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {term.map((tem) => (
                  <SelectItem value="apple">{tem.title}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        ) : (
          <Skeleton className="w-[180px] h-[35px] rounded-md" />
        )}
        <Button className="!rounded-full">Proceed</Button>
      </div>
    </div>
  );
}

export default page;
