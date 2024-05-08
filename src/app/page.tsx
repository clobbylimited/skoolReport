"use client";

import { useState } from "react";
import logo from "@/asset/logo.jpeg";
import Image from "next/image";

export default function Home() {
  const INnputClasses =
    "border-b border-[#111] min-w-[50px] w-full outline-none text-center";
  const scoreInput =
    "border-0 !p-0 focus:!bg-blue-300 selection:bg-blue-400 cursor-pointer focus:cursor-text print:hover:bg-white hover:bg-blue-100 focus:text-[16px] focus:font-[600] dfocus:!text-white !w-full h-full transition-all duration-300 outline-none text-center w-max font-[400]";

  const [subjectsData, setsubjectsData] = useState<any[]>([]);
  const [affectiveDomain, setaffectiveDomain] = useState<any[]>([
    { title: "Neatness", value: undefined },
    { title: "Resoning with teachers", value: undefined },
    { title: "Reservness", value: undefined },
    { title: "Attentiveness", value: undefined },
    { title: "Attitude to school work", value: undefined },
    { title: "Emotional stability", value: undefined },
    { title: "Helping others", value: undefined },
    { title: "Cooperation with others", value: undefined },
    { title: "Politeness", value: undefined },
    { title: "Puctuality", value: undefined },
  ]);
  const [psy, setpsy] = useState<any[]>([
    { title: "Sport", value: undefined },
    { title: "Verbal Fluency", value: undefined },
    { title: "Hand writing", value: undefined },
    { title: "endling tools", value: undefined },
  ]);
  const [club, setclub] = useState<any[]>([
    { title: "Language Skill", value: undefined },
  ]);
  const onAffectiveChecked = (value: any, index: any) => {
    setaffectiveDomain((prev: any) =>
      prev.map((prv: any, indx: number) => {
        if (indx === index) {
          return { ...prv, value: value };
        }
        return prv;
      })
    );
  };
  const onpsyChecked = (value: any, index: any) => {
    setpsy((prev: any) =>
      prev.map((prv: any, indx: number) => {
        if (indx === index) {
          return { ...prv, value: value };
        }
        return prv;
      })
    );
  };
  const onclubChecked = (value: any, index: any) => {
    setclub((prev: any) =>
      prev.map((prv: any, indx: number) => {
        if (indx === index) {
          return { ...prv, value: value };
        }
        return prv;
      })
    );
  };
  const checkMark = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.0}
      stroke="currentColor"
      className="w-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </svg>
  );

  const handleScoreChange = (index: any, field: any, value: any) => {
    if (!isNaN(value)) {
      if (value.trim() == "") {
        value = 0;
      }
      const updatedSubjects = subjectsData.map((subject, i) => {
        if (i === index) {
          const updatedSubject = { ...subject, [field]: Number(value) };

          // Calculate the total CA
          if (field === "ca1" || field === "ca2") {
            updatedSubject.ttca = updatedSubject.ca1 + updatedSubject.ca2;
            if (updatedSubject.ttca > 40) {
              updatedSubject.ttca = 40;
            }
          }

          // Calculate the overall total
          // if (field === "ttca" || field === "ex") {
          updatedSubject.tt =
            parseInt(updatedSubject.ttca || 0) +
            parseInt(updatedSubject.ex || 0);
          if (updatedSubject.tt > 100) {
            updatedSubject.tt = 100;
          }
          // }

          // Calculate the overall total
          if (updatedSubject.tt >= 70) {
            updatedSubject.gd = "A";
            updatedSubject.cmt = "Distinction";
          }
          if (updatedSubject.tt >= 61 && updatedSubject.tt < 70) {
            updatedSubject.gd = "B";
            updatedSubject.cmt = "Very Good";
          }
          if (updatedSubject.tt >= 51 && updatedSubject.tt < 61) {
            updatedSubject.gd = "C";
            updatedSubject.cmt = "Good";
          }
          if (updatedSubject.tt >= 45 && updatedSubject.tt < 51) {
            updatedSubject.gd = "D1";
            updatedSubject.cmt = "Average";
          }
          if (updatedSubject.tt >= 40 && updatedSubject.tt < 45) {
            updatedSubject.gd = "D2";
            updatedSubject.cmt = "Fair";
          }
          if (updatedSubject.tt <= 39) {
            updatedSubject.gd = "F";
            updatedSubject.cmt = "Poor";
          }

          return updatedSubject;
        }
        return subject;
      });

      setsubjectsData(updatedSubjects);
    }
  };

  let percent = (((
    subjectsData.reduce(
      (acc, subject) =>
        parseInt(acc) + (parseInt(subject.tt) || 0),
      0
    )
    ) / (subjectsData.length * 100)) * 100) || 0

  let average = (percent + ((subjectsData.reduce(
      (acc, subject) =>
        parseInt(acc) + (parseInt(subject.ttrm) || 0),
      0
    ) / (subjectsData.length * 100)) * 100 || 0)) / 2

    
    let grade;
    if (average >= 70) {
      grade = "A";
    }
    if (average >= 61 && average < 70) {
      grade = "B";
    }
    if (average >= 51 && average < 61) {
      grade = "C";
    }
    if (average >= 45 && average < 51) {
      grade = "D1";
    }
    if (average >= 40 && average < 45) {
      grade = "D2";
    }
    if (average <= 39) {
      grade = "F";
    }


  return (
    <main className=" text-[10px] select-none bg- w-full text-[#111] h-full print:px-[0px] px-[200px] overflow-hidden py-[50px] flex flex-col gap-[30px]">
      <div className="flex w-full justify-center items-center flex-col gap-[5px]">
        <Image
          height={100}
          width={100}
          alt="logo"
          src={logo}
          className="w-[70px] aspect-square bg-gray-300"
        />
        <span>Terminal report sheet</span>
      </div>
      <div className="flex w-full items-center gap-[20px] justify-center">
        <div className="flex-1 flex flex-col gap-[10px]">
          <div className="flex items-end gap-[20px] justify-between">
            <div className="flex-1 flex">
              <span className="whitespace-nowrap font-[600]">Name:</span>
              <input className={INnputClasses} />
            </div>
            <div className="sw-max flex">
              <span className=" whitespace-nowrap font-[600]">
                Number of times school opened:
              </span>
              <input className={INnputClasses + " w-[50px]"} />
            </div>
          </div>
          <div className="flex items-end gap-[20px] justify-between">
            <div className="flex-1 flex">
              <span className=" whitespace-nowrap font-[600]">Student ID:</span>
              <input className={INnputClasses} />
            </div>
            <div className="sw-max flex">
              <span className=" whitespace-nowrap font-[600]">Gender:</span>
              <input className={INnputClasses} />
            </div>
            <div className="sw-max flex">
              <span className=" whitespace-nowrap font-[600]">Age:</span>
              <input className={INnputClasses} />
            </div>
            <div className="sw-max flex">
              <span className=" whitespace-nowrap font-[600]">
                Number of times present:
              </span>
              <input className={INnputClasses + " w-[50px]"} />
            </div>
          </div>
          <div className="flex items-end gap-[20px] justify-between">
            <div className="flex-1 flex">
              <span className=" whitespace-nowrap font-[600]">Class:</span>
              <input className={INnputClasses} />
            </div>
            <div className="sw-max flex">
              <span className=" whitespace-nowrap font-[600]">Session:</span>
              <input className={INnputClasses} />
            </div>
            <div className="sw-max flex">
              <span className=" whitespace-nowrap font-[600]">
                Number in class:
              </span>
              <input className={INnputClasses + " w-[50px]"} />
            </div>
          </div>
          <div></div>
        </div>
        <table className="min-w-[200px] border" border={1}>
          <tbody>
            <tr className="border">
              <td>
                <div className="flex items-center justify-between px-[5px]">
                  <span className="font-[600]">Total marks obtainable:</span>
                  <span>{subjectsData.length * 100}</span>
                </div>
              </td>
            </tr>
            <tr className="border">
              <td>
                <div className="flex items-center justify-between px-[5px]">
                  <span className="font-[600]">Total marks obtained:</span>
                  <span>
                    {subjectsData.reduce(
                      (acc, subject) =>
                        parseInt(acc) + (parseInt(subject.tt) || 0),
                      0
                    )}
                  </span>
                </div>
              </td>
            </tr>
            <tr className="border">
              <td>
                <div className="flex items-center justify-between px-[5px]">
                  <span className="font-[600]">Percentage:</span>
                  <span>
                    {(((
                    subjectsData.reduce(
                      (acc, subject) =>
                        parseInt(acc) + (parseInt(subject.tt) || 0),
                      0
                    )
                    ) / (subjectsData.length * 100)) * 100) || 0} %
                  </span>
                </div>
              </td>
            </tr>
            <tr className="border">
              <td>
                <div className="flex items-center justify-between px-[5px]">
                  <span className="font-[600]">Average:</span>
                  <span>
                  {average} %
                  </span>
                </div>
              </td>
            </tr>
            <tr className="border">
              <td>
                <div className="flex items-center justify-between px-[5px]">
                  <span className="font-[600]">Overall Grade:</span>
                  <span>{grade}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex w-full flex-col gap-[0px]">
        <div className="flex w-full items-center justify-between">
          <span className="font-[600]">COGNITIVE DOMAIN</span>
          <button
            onClick={() => {
              setsubjectsData((prev: any) => [
                ...prev,
                {
                  subject: "",
                  ttrm: "",
                  ca1: "",
                  ca2: "",
                  ttca: "",
                  ex: "",
                  tt: "",
                  gd: "",
                  cmt: "",
                },
              ]);
            }}
            className="underline flex print:hidden cursor-pointer"
          >
            Add subject
          </button>
        </div>
        <div className="w-full flex flex-col gap-[30px] ">
          <div className="grid border-b border-r border-[#111] divide-x divide-y divide-[#111] grid-cols-12">
            <div className="font-[600] border-t border-l border-[#111] uppercase text-center col-span-2">
              subject
            </div>
            <div className="font-[600] uppercase text-center col-span-1">
              2nd term total
            </div>
            <div className="font-[600] uppercase text-center col-span-1">
              CA 1
            </div>
            <div className="font-[600] uppercase text-center col-span-1">
              CA 2
            </div>
            <div className="font-[600] uppercase text-center col-span-1">
              Total Ca
            </div>
            <div className="font-[600] uppercase text-center col-span-1">
              Exam
            </div>
            <div className="font-[600] uppercase text-center col-span-1">
              Total
            </div>
            <div className="font-[600] uppercase text-center col-span-2">
              Grade
            </div>
            <div className="font-[600] uppercase text-center col-span-2">
              Comment
            </div>

            <div className="font-[600] col-span-2"></div>
            <div className="font-[600] text-center  col-span-1">100</div>
            <div className="font-[600] text-center  col-span-1">10</div>
            <div className="font-[600] text-center  col-span-1">30</div>
            <div className="font-[600] text-center  col-span-1">40</div>
            <div className="font-[600] text-center  col-span-1">60</div>
            <div className="font-[600] text-center  col-span-1">100</div>
            <div className="font-[600] text-center  col-span-2"></div>
            <div className="font-[600] text-center  col-span-2"></div>

            {subjectsData.map((subject: any, index: number) => (
              <>
                <div className="col-span-2 print:h-auto h-[40px] ">
                  <input
                    className="border-0 px-[5px] cursor-pointer focus:cursor-text h-full transition-all duration-300 focus:!bg-blue-300 focus:text-[16px] focus:font-[600] w-full font-[600] outline-none text-start"
                    defaultValue={subject.subject}
                  />
                </div>
                <div className="font-[500] print:h-auto h-[40px] col-span-1">
                  <input className={scoreInput} value={subject.ttrm}
                    onChange={(e) =>
                      handleScoreChange(index, "ttrm", e.target.value)
                    } />
                </div>
                <div className="font-[500] print:h-auto h-[40px] col-span-1">
                  <input
                    className={scoreInput}
                    value={subject.ca1}
                    onChange={(e) =>
                      handleScoreChange(index, "ca1", e.target.value)
                    }
                  />
                </div>
                <div className="font-[500] print:h-auto h-[40px] col-span-1">
                  <input
                    className={scoreInput}
                    value={subject.ca2}
                    onChange={(e) =>
                      handleScoreChange(index, "ca2", e.target.value)
                    }
                  />
                </div>
                <div className="font-[500] print:h-auto h-[40px] col-span-1">
                  <input
                    className={
                      scoreInput +
                      " select-none selection:bg-transparent !cursor-not-allowed"
                    }
                    disabled
                    value={subject.ttca}
                    onChange={(e) =>
                      handleScoreChange(index, "ttca", e.target.value)
                    }
                  />
                </div>
                <div className="font-[500] print:h-auto h-[40px] col-span-1">
                  <input
                    className={scoreInput}
                    value={subject.ex}
                    onChange={(e) =>
                      handleScoreChange(index, "ex", e.target.value)
                    }
                  />
                </div>
                <div className="font-[500] print:h-auto h-[40px] col-span-1">
                  <input
                    className={
                      scoreInput +
                      " select-none selection:bg-transparent !cursor-not-allowed"
                    }
                    disabled
                    value={subject.tt}
                    onChange={(e) =>
                      handleScoreChange(index, "tt", e.target.value)
                    }
                  />
                </div>
                <div className="font-[500] print:h-auto h-[40px] col-span-2">
                  <input
                    className={
                      scoreInput +
                      " select-none selection:bg-transparent !cursor-not-allowed"
                    }
                    disabled
                    value={subject.gd}
                  />
                </div>
                <div className="font-[500] print:h-auto h-[40px] col-span-2">
                  <input
                    className={
                      scoreInput +
                      " select-none selection:bg-transparent !cursor-not-allowed"
                    }
                    disabled
                    value={subject.cmt}
                  />
                </div>
              </>
            ))}
          </div>
          <div className="grid grid-cols-12 gap-[10px]">
            <div className="col-span-3 h-max grid border-b border-r border-[#111] divide-x divide-y divide-[#111] grid-cols-12">
              <div className="font-[600] border-t border-l border-[#111] uppercase text-center col-span-7">
                Affective domain
              </div>
              <div className="font-[600] uppercase text-center col-span-1">
                5
              </div>
              <div className="font-[600] uppercase text-center col-span-1">
                4
              </div>
              <div className="font-[600] uppercase text-center col-span-1">
                3
              </div>
              <div className="font-[600] uppercase text-center col-span-1">
                2
              </div>
              <div className="font-[600] uppercase text-center col-span-1">
                1
              </div>

              {affectiveDomain.map((affective: any, index: number) => (
                <>
                  <div className="col-span-7 print:h-auto text-[9px] h-[40px] ">
                    <span>{affective.title}</span>
                  </div>
                  <div
                    onClick={() => onAffectiveChecked(5, index)}
                    className="font-[500] print:h-auto cursor-pointer hover:bg-blue-100 transition-all duration-300 h-[40px] flex justify-center items-center col-span-1"
                  >
                    {affective.value == 5 && checkMark}
                  </div>
                  <div
                    onClick={() => onAffectiveChecked(4, index)}
                    className="font-[500] print:h-auto cursor-pointer hover:bg-blue-100 transition-all duration-300 h-[40px] flex justify-center items-center col-span-1"
                  >
                    {affective.value == 4 && checkMark}
                  </div>
                  <div
                    onClick={() => onAffectiveChecked(3, index)}
                    className="font-[500] print:h-auto cursor-pointer hover:bg-blue-100 transition-all duration-300 h-[40px] flex justify-center items-center col-span-1"
                  >
                    {affective.value == 3 && checkMark}
                  </div>
                  <div
                    onClick={() => onAffectiveChecked(2, index)}
                    className="font-[500] print:h-auto cursor-pointer hover:bg-blue-100 transition-all duration-300 h-[40px] flex justify-center items-center col-span-1"
                  >
                    {affective.value == 2 && checkMark}
                  </div>
                  <div
                    onClick={() => onAffectiveChecked(1, index)}
                    className="font-[500] print:h-auto cursor-pointer hover:bg-blue-100 transition-all duration-300 h-[40px] flex justify-center items-center col-span-1"
                  >
                    {affective.value == 1 && checkMark}
                  </div>
                </>
              ))}
            </div>
            <div className="col-span-3 h-max grid border-b border-r border-[#111] divide-x divide-y divide-[#111] grid-cols-12">
              <div className="font-[600] uppercase border-t border-l border-[#111] text-center col-span-7">
                Psyohomotor domain
              </div>
              <div className="font-[600] uppercase text-center col-span-1">
                5
              </div>
              <div className="font-[600] uppercase text-center col-span-1">
                4
              </div>
              <div className="font-[600] uppercase text-center col-span-1">
                3
              </div>
              <div className="font-[600] uppercase text-center col-span-1">
                2
              </div>
              <div className="font-[600] uppercase text-center col-span-1">
                1
              </div>

              {psy.map((psy: any, index: number) => (
                <>
                  <div className="col-span-7 print:h-auto text-[9px] h-[40px] ">
                    <span>{psy.title}</span>
                  </div>
                  <div
                    onClick={() => onpsyChecked(5, index)}
                    className="font-[500] print:h-auto cursor-pointer hover:bg-blue-100 transition-all duration-300 h-[40px] flex justify-center items-center col-span-1"
                  >
                    {psy.value == 5 && checkMark}
                  </div>
                  <div
                    onClick={() => onpsyChecked(4, index)}
                    className="font-[500] print:h-auto cursor-pointer hover:bg-blue-100 transition-all duration-300 h-[40px] flex justify-center items-center col-span-1"
                  >
                    {psy.value == 4 && checkMark}
                  </div>
                  <div
                    onClick={() => onpsyChecked(3, index)}
                    className="font-[500] print:h-auto cursor-pointer hover:bg-blue-100 transition-all duration-300 h-[40px] flex justify-center items-center col-span-1"
                  >
                    {psy.value == 3 && checkMark}
                  </div>
                  <div
                    onClick={() => onpsyChecked(2, index)}
                    className="font-[500] print:h-auto cursor-pointer hover:bg-blue-100 transition-all duration-300 h-[40px] flex justify-center items-center col-span-1"
                  >
                    {psy.value == 2 && checkMark}
                  </div>
                  <div
                    onClick={() => onpsyChecked(1, index)}
                    className="font-[500] print:h-auto cursor-pointer hover:bg-blue-100 transition-all duration-300 h-[40px] flex justify-center items-center col-span-1"
                  >
                    {psy.value == 1 && checkMark}
                  </div>
                </>
              ))}
            </div>
            <div className="col-span-2 h-max grid border-b border-r border-[#111] divide-x divide-y divide-[#111] grid-cols-12">
              <div className="font-[600] border-t border-l border-[#111] uppercase text-center col-span-7">
                Others
              </div>
              <div className="font-[600] uppercase text-center col-span-1">
                5
              </div>
              <div className="font-[600] uppercase text-center col-span-1">
                4
              </div>
              <div className="font-[600] uppercase text-center col-span-1">
                3
              </div>
              <div className="font-[600] uppercase text-center col-span-1">
                2
              </div>
              <div className="font-[600] uppercase text-center col-span-1">
                1
              </div>

              {club.map((clb: any, index: number) => (
                <>
                  <div className="col-span-7 print:h-auto text-[9px] h-[40px] ">
                    <span>{clb.title}</span>
                  </div>
                  <div
                    onClick={() => onclubChecked(5, index)}
                    className="font-[500] print:h-auto cursor-pointer hover:bg-blue-100 transition-all duration-300 h-[40px] flex justify-center items-center col-span-1"
                  >
                    {clb.value == 5 && checkMark}
                  </div>
                  <div
                    onClick={() => onclubChecked(4, index)}
                    className="font-[500] print:h-auto cursor-pointer hover:bg-blue-100 transition-all duration-300 h-[40px] flex justify-center items-center col-span-1"
                  >
                    {clb.value == 4 && checkMark}
                  </div>
                  <div
                    onClick={() => onclubChecked(3, index)}
                    className="font-[500] print:h-auto cursor-pointer hover:bg-blue-100 transition-all duration-300 h-[40px] flex justify-center items-center col-span-1"
                  >
                    {clb.value == 3 && checkMark}
                  </div>
                  <div
                    onClick={() => onclubChecked(2, index)}
                    className="font-[500] print:h-auto cursor-pointer hover:bg-blue-100 transition-all duration-300 h-[40px] flex justify-center items-center col-span-1"
                  >
                    {clb.value == 2 && checkMark}
                  </div>
                  <div
                    onClick={() => onclubChecked(1, index)}
                    className="font-[500] print:h-auto cursor-pointer hover:bg-blue-100 transition-all duration-300 h-[40px] flex justify-center items-center col-span-1"
                  >
                    {clb.value == 1 && checkMark}
                  </div>
                </>
              ))}
            </div>
            <table className="col-span-2 h-max border" border={1}>
              <tbody>
                <tr className="border">
                  <td>
                    <div className="flex items-center justify-between  text-[9px] px-[5px]">
                      <span className="font-[600] flex-1">Range</span>
                      <span className="font-[600]">Grade</span>
                      <span className="font-[600] flex-1 flex justify-end">
                        Comment
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="border">
                  <td>
                    <div className="flex items-center justify-between  text-[9px] px-[5px]">
                      <span className="font-[400] flex-1">70-100</span>
                      <span className="font-[400]">A</span>
                      <span className="font-[400] flex-1 flex justify-end">
                        Distinction
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="border">
                  <td>
                    <div className="flex items-center justify-between  text-[9px] px-[5px]">
                      <span className="font-[400] flex-1">61-69</span>
                      <span className="font-[400]">B</span>
                      <span className="font-[400] flex-1 flex justify-end">
                        Very Good
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="border">
                  <td>
                    <div className="flex items-center justify-between  text-[9px] px-[5px]">
                      <span className="font-[400] flex-1">51-60</span>
                      <span className="font-[400]">C</span>
                      <span className="font-[400] flex-1 justify-end flex">
                        Good
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="border">
                  <td>
                    <div className="flex items-center justify-between  text-[9px] px-[5px]">
                      <span className="font-[400] flex-1">45-49</span>
                      <span className="font-[400]">D</span>
                      <span className="font-[400] flex-1 flex justify-end">
                        Average(D1)
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="border">
                  <td>
                    <div className="flex items-center justify-between  text-[9px] px-[5px]">
                      <span className="font-[400] flex-1">40-44</span>
                      <span className="font-[400]">D</span>
                      <span className="font-[400] flex-1 flex justify-end">
                        Fair(D2)
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="border">
                  <td>
                    <div className="flex items-center justify-between  text-[9px] px-[5px]">
                      <span className="font-[400] flex-1">0-39</span>
                      <span className="font-[400]">F</span>
                      <span className="font-[400] flex-1 flex justify-end">
                        Poor
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="col-span-2 h-max border" border={1}>
              <tbody>
                <tr className="border">
                  <td>
                    <div className="flex items-center justify-center px-[5px]">
                      <span className="font-[600]">Trait rating tools</span>
                    </div>
                  </td>
                </tr>
                <tr className="border">
                  <td>
                    <div className="flex items-center justify-center  text-[9px] px-[5px]">
                      <span className="font-[400]">5 == Excellence</span>
                    </div>
                  </td>
                </tr>
                <tr className="border">
                  <td>
                    <div className="flex items-center justify-center  text-[9px] px-[5px]">
                      <span className="font-[400]">4 == Good</span>
                    </div>
                  </td>
                </tr>
                <tr className="border">
                  <td>
                    <div className="flex items-center justify-center  text-[9px] px-[5px]">
                      <span className="font-[400]">2 == Fair</span>
                    </div>
                  </td>
                </tr>
                <tr className="border">
                  <td>
                    <div className="flex items-center justify-center  text-[9px] px-[5px]">
                      <span className="font-[400]">2 == Poor</span>
                    </div>
                  </td>
                </tr>
                <tr className="border">
                  <td>
                    <div className="flex items-center justify-center  text-[9px] px-[5px]">
                      <span className="font-[400]">
                        1 == No observation traits
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[20px]">
        <div className="flex items-end gap-[20px] justify-between">
          <div className="flex-1 items-center gap-[10px] flex">
            <span className="whitespace-nowrap uppercase font-[600]">
              Subject teachers comment:
            </span>
            <input className={INnputClasses + " !text-start px-[20px]"} />
          </div>
        </div>
        <div className="flex items-end gap-[20px] justify-between">
          <div className="flex-1 items-center gap-[10px] flex">
            <span className="whitespace-nowrap uppercase font-[600]">
              This term ends:
            </span>
            <input className={INnputClasses + " !text-start px-[20px]"} />
          </div>
          <div className="flex-1 items-center gap-[10px] flex">
            <span className="whitespace-nowrap uppercase font-[600]">
              Signature:
            </span>
            <input className={INnputClasses + " !text-start px-[20px]"} />
          </div>
          <div className="flex-1 items-center gap-[10px] flex">
            <span className="whitespace-nowrap uppercase font-[600]">
              Date:
            </span>
            <input className={INnputClasses + " !text-start px-[20px]"} />
          </div>
        </div>
      </div>
    </main>
  );
}
