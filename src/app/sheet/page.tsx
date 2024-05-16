"use client";

import { useState } from "react";
import logo from "@/asset/logo.png";
import Image from "next/image";

export default function Home() {
  const INnputClasses =
    "border-b print:text-[14px] border-[#111] min-w-[50px] w-full outline-none text-center";
  const scoreInput =
    "border-0 !p-0 focus:!bg-blue-300 selection:bg-blue-400 cursor-pointer focus:cursor-text print:hover:bg-white hover:bg-blue-100 focus:text-[16px] focus:font-[600] dfocus:!text-white !w-full h-full transition-all duration-300 outline-none text-center w-max font-[400]";

  const [subjectsData, setsubjectsData] = useState<any[]>([]);
  const [affectiveDomain, setaffectiveDomain] = useState<any[]>([
    { title: "Neatness", value: undefined },
    { title: "Relationship with Teachers", value: undefined },
    { title: "Perseverance", value: undefined },
    { title: "Attentiveness", value: undefined },
    { title: "Attitude to School work", value: undefined },
    { title: "Health", value: undefined },
    { title: "Emotional Stability", value: undefined },
    { title: "Helping others", value: undefined },
    { title: "Punctuality", value: undefined },
    { title: "Politeness", value: undefined },
    { title: "Initiative", value: undefined },
    { title: "Cooperation with Others", value: undefined },
    { title: "Leadership traits", value: undefined },
  ]);
  const [psy, setpsy] = useState<any[]>([
    { title: "Sport", value: undefined },
    { title: "Verbal Fluency", value: undefined },
    { title: "Hand writing", value: undefined },
    { title: "Handling tools", value: undefined },
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
          if (updatedSubject.tt >= 90) {
            updatedSubject.gd = "A";
            updatedSubject.cmt = "Distinction";
          }
          if (updatedSubject.tt >= 70 && updatedSubject.tt < 89.9) {
            updatedSubject.gd = "A";
            updatedSubject.cmt = "Excellent";
          }
          if (updatedSubject.tt >= 60 && updatedSubject.tt < 69.9) {
            updatedSubject.gd = "B";
            updatedSubject.cmt = "Very Good";
          }
          if (updatedSubject.tt >= 50 && updatedSubject.tt < 59.9) {
            updatedSubject.gd = "C";
            updatedSubject.cmt = "Average";
          }
          if (updatedSubject.tt >= 40 && updatedSubject.tt < 49.9) {
            updatedSubject.gd = "D";
            updatedSubject.cmt = "Fair";
          }
          if (updatedSubject.tt <= 39.9) {
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

  let percent =
    (subjectsData.reduce(
      (acc, subject) => parseInt(acc) + (parseInt(subject.tt) || 0),
      0
    ) /
      (subjectsData.length * 100)) *
      100 || 0;

  let average =
    (percent +
      ((subjectsData.reduce(
        (acc, subject) => parseInt(acc) + (parseInt(subject.ttrm) || 0),
        0
      ) /
        (subjectsData.length * 100)) *
        100 || 0)) /
    2;

  let grade;

  let percentt =
    (subjectsData.reduce(
      (acc, subject) => parseInt(acc) + (parseInt(subject.tt) || 0),
      0
    ) /
      (subjectsData.length * 100)) *
      100 || 0;

  // if (percentt >= 70) {
  //   grade = "A";
  // }
  // if (percentt >= 61 && percentt < 69.9) {
  //   grade = "B";
  // }
  // if (percentt >= 50 && percentt < 59.9) {
  //   grade = "C";
  // }
  // if (percentt >= 40 && percentt < 49.9) {
  //   grade = "D";
  // }
  // if (percentt <= 39.9) {
  //   grade = "F";
  // }

  if (percentt >= 90) {
    grade = "A";
  }
  if (percentt >= 70 && percentt < 89.9) {
    grade = "A";
  }
  if (percentt >= 60 && percentt < 69.9) {
    grade = "B";
  }
  if (percentt >= 50 && percentt < 59.9) {
    grade = "C";
  }
  if (percentt >= 40 && percentt < 49.9) {
    grade = "D";
  }
  if (percentt <= 39.9) {
    grade = "F";
  }

  function roundTo(num: number, precision: number) {
    const factor = Math.pow(10, precision);
    return Math.round(num * factor) / factor;
  }

  return (
    <main className=" print:text-[8px] select-none bg- w-full text-[#111] h-full print:px-[0px] px-[200px] overflow-hidden print:py-0 py-[50px] flex flex-col gap-[30px]">
      <div className="flex w-full justify-center items-center flex-col gap-[5px]">
        <div className="flex gap-[50px] justify-between w-full">
          <div className="flex-1 print:min-w-[100px] min-w-[200px]">
            <Image
              height={100}
              width={100}
              alt="logo"
              src={logo}
              className="w-[80px] aspect-square"
            />
          </div>
          <div className="flex h-full flex-col text-center">
            <span className="uppercase text-[25px] font-[800] leading-tight">
              first apex schools
            </span>
            <span className="font-[500]">
              29, First Apex Avenue, Amikanle ,Alagbado. Lagos State
            </span>
            <span className="font-[500]">TEL: 08035253353, 08035290535</span>
            <span className="font-[500]">
              Website: www.firstapexschools.com, E-mail:
              firstapexschools@yahoo.com
            </span>
          </div>
          <div className="flex-1  print:min-w-[100px] min-w-[200px]"></div>
        </div>
        <span className="text-[10px] uppercase font-[700]">
          Terminal report sheet
        </span>
      </div>
      <div className="flex w-full items-center gap-[20px] justify-end">
        <div className="dflex-1 w-max flex flex-col gap-[10px]">
          <div className="flex items-end gap-[10px] justify-between">
            <div className="flex-1 flex items-end">
              <span className=" whitespace-nowrap font-[700] print:text-[10px]">
                Name:
              </span>
              <input className={INnputClasses} />
            </div>
            <div className="sw-max flex items-end">
              <span className="  whitespace-nowrap font-[700] print:text-[10px]">
                Number of times school opened:
              </span>
              <input className={INnputClasses + " max-w-[50px]"} />
            </div>
          </div>
          <div className="flex items-end gap-[10px] justify-between">
            <div className="flex-1 flex items-end">
              <span className="  whitespace-nowrap font-[700] print:text-[10px]">
                Student ID:
              </span>
              <input className={INnputClasses + " max-w-[200px]"} />
            </div>
            <div className="sw-max flex items-end">
              <span className="  whitespace-nowrap font-[700] print:text-[10px]">
                Gender:
              </span>
              <input className={INnputClasses + " w-full"} />
            </div>
            <div className="sw-max flex items-end">
              <span className="  whitespace-nowrap font-[700] print:text-[10px]">
                Age:
              </span>
              <input className={INnputClasses + " max-w-[50px]"} />
            </div>
            <div className="sw-max flex items-end">
              <span className="  whitespace-nowrap font-[700] print:text-[10px] items-end">
                Number of times present:
              </span>
              <input className={INnputClasses + " max-w-[50px]"} />
            </div>
          </div>
          <div className="flex items-end gap-[10px] justify-between">
            <div className="min-w-[100px] flex items-end">
              <span className="  whitespace-nowrap font-[700] print:text-[10px]">
                Class:
              </span>
              <input className={INnputClasses + " max-w-[100px]"} />
            </div>
            <div className="sw-max flex-1 flex items-end">
              <span className="  whitespace-nowrap font-[700] print:text-[10px]">
                Session:
              </span>
              <input className={INnputClasses} />
            </div>
            <div className="sw-max flex items-end">
              <span className="  whitespace-nowrap font-[700] print:text-[10px]">
                Number in class:
              </span>
              <input className={INnputClasses + " max-w-[50px]"} />
            </div>
          </div>
          <div></div>
        </div>
        <table
          className="w-[400px] print:w-[200px] print:text-[10px] print:max-w-[150px] border"
          border={1}
        >
          <tbody>
            <tr className="border !border-[#111]">
              <td>
                <div className="flex items-center justify-between px-[5px]">
                  <span className="font-[700]">Total marks obtainable:</span>
                  <span>{subjectsData.length * 100}</span>
                </div>
              </td>
            </tr>
            <tr className="border !border-[#111]">
              <td>
                <div className="flex items-center justify-between px-[5px]">
                  <span className="font-[700]">Total marks obtained:</span>
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
            <tr className="border !border-[#111]">
              <td>
                <div className="flex items-center justify-between px-[5px]">
                  <span className="font-[700]">Percentage:</span>
                  <span>{roundTo(percentt, 2)} %</span>
                </div>
              </td>
            </tr>
            {/* <tr className="border !border-[#111]">
              <td>
                <div className="flex items-center justify-between px-[5px]">
                  <span className="font-[700]">Average:</span>
                  <span>{roundTo(average, 2)} %</span>
                </div>
              </td>
            </tr> */}
            <tr className="border !border-[#111]">
              <td>
                <div className="flex items-center justify-between px-[5px]">
                  <span className="font-[700]">Overall Grade:</span>
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
        <div className="w-full flex flex-col gap-[5px] ">
          <div className="grid border-b border-r border-[#111] divide-x divide-y divide-[#111] grid-cols-12">
            <div className="font-[700] text-[14px] print:text-[8px] flex justify-center items-center border-t border-l border-[#111] uppercase text-center col-span-2">
              subject
            </div>
            {/* <div className="font-[700] text-[14px] print:text-[8px] flex justify-center items-center uppercase text-center col-span-1">
              2nd term total
            </div> */}
            <div className="font-[700] text-[14px] print:text-[8px] flex justify-center items-center uppercase text-center col-span-2">
              FIRST TEST/NOTE ASSESSMENT
            </div>
            <div className="font-[700] text-[14px] print:text-[8px] flex justify-center items-center uppercase text-center col-span-2">
              MID TERM TEST
            </div>
            <div className="font-[700] text-[14px] print:text-[8px] flex justify-center items-center uppercase text-center col-span-1">
              TOTAL CA
            </div>
            <div className="font-[700] text-[14px] print:text-[8px] flex justify-center items-center uppercase text-center col-span-1">
              Exam
            </div>
            <div className="font-[700] text-[14px] print:text-[8px] flex justify-center items-center uppercase text-center col-span-1">
              Total
            </div>
            <div className="font-[700] text-[14px] print:text-[8px] flex justify-center items-center uppercase text-center col-span-1">
              Grade
            </div>
            <div className="font-[700] text-[14px] print:text-[8px] flex justify-center items-center uppercase text-center col-span-2">
              SUBJECT TEACHER'S COMMENTS
            </div>

            <div className="font-[700] text-[14px] print:text-[8px] col-span-2"></div>
            {/* <div className="font-[700] text-[14px] print:text-[8px] text-center  col-span-1">
              100
            </div> */}
            <div className="font-[700] text-[14px] print:text-[8px] text-center  col-span-2">
              10
            </div>
            <div className="font-[700] text-[14px] print:text-[8px] text-center  col-span-2">
              30
            </div>
            <div className="font-[700] text-[14px] print:text-[8px] text-center  col-span-1">
              40
            </div>
            <div className="font-[700] text-[14px] print:text-[8px] text-center  col-span-1">
              60
            </div>
            <div className="font-[700] text-[14px] print:text-[8px] text-center  col-span-1">
              100
            </div>
            <div className="font-[700] text-[14px] print:text-[8px] text-center  col-span-1"></div>
            <div className="font-[700] text-[14px] print:text-[8px] text-center  col-span-2"></div>

            {subjectsData.map((subject: any, index: number) => (
              <>
                <div className="col-span-2 print:h-[20px] h-[40px] ">
                  <input
                    className="border-0 px-[5px] cursor-pointer focus:cursor-text h-full transition-all duration-300 focus:!bg-blue-300 focus:text-[16px] focus:font-[600] w-full font-[600] outline-none text-start"
                    defaultValue={subject.subject}
                  />
                </div>
                {/* <div className="font-[500] print:h-[20px] h-[40px] col-span-1">
                  <input
                    className={scoreInput}
                    value={subject.ttrm}
                    onChange={(e) =>
                      handleScoreChange(index, "ttrm", e.target.value)
                    }
                  />
                </div> */}
                <div className="font-[500] print:h-[20px] h-[40px] col-span-2">
                  <input
                    className={scoreInput}
                    value={subject.ca1}
                    onChange={(e) =>
                      handleScoreChange(index, "ca1", e.target.value)
                    }
                  />
                </div>
                <div className="font-[500] print:h-[20px] h-[40px] col-span-2">
                  <input
                    className={scoreInput}
                    value={subject.ca2}
                    onChange={(e) =>
                      handleScoreChange(index, "ca2", e.target.value)
                    }
                  />
                </div>
                <div className="font-[500] print:h-[20px] h-[40px] col-span-1">
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
                <div className="font-[500] print:h-[20px] h-[40px] col-span-1">
                  <input
                    className={scoreInput}
                    value={subject.ex}
                    onChange={(e) =>
                      handleScoreChange(index, "ex", e.target.value)
                    }
                  />
                </div>
                <div className="font-[500] print:h-[20px] h-[40px] col-span-1">
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
                <div className="font-[500] print:h-[20px] h-[40px] col-span-1">
                  <input
                    className={
                      scoreInput +
                      " select-none selection:bg-transparent uppercase !cursor-not-allowed"
                    }
                    disabled
                    value={subject.gd}
                  />
                </div>
                <div className="font-[500] print:h-[20px] h-[40px] col-span-2">
                  <input
                    className={
                      scoreInput +
                      " select-none selection:bg-transparent uppercase !cursor-not-allowed"
                    }
                    disabled
                    value={subject.cmt}
                  />
                </div>
              </>
            ))}
          </div>
          <div className="grid grid-cols-12 gap-[5px]">
            <div className="col-span-3 overflow-hidden h-max grid border-b border-r border-[#111] divide-x divide-y divide-[#111] grid-cols-12">
              <div className="font-[700] text-[8px] border-t border-l border-[#111] text-center col-span-7">
                Affective domain
              </div>
              <div className="font-[700] text-[8px] uppercase text-center col-span-1">
                5
              </div>
              <div className="font-[700] text-[8px] uppercase text-center col-span-1">
                4
              </div>
              <div className="font-[700] text-[8px] uppercase text-center col-span-1">
                3
              </div>
              <div className="font-[700] text-[8px] uppercase text-center col-span-1">
                2
              </div>
              <div className="font-[700] text-[8px] uppercase text-center col-span-1">
                1
              </div>

              {affectiveDomain.map((affective: any, index: number) => (
                <>
                  <div className="col-span-7 print:h-[20px] h-[40px] ">
                    <span className="px-[5px] print:pt-[5px] !flex justify-start item-center h-full text-[14px] printer print:text-[8px] !font-[500]">
                      {affective.title}
                    </span>
                  </div>
                  <div
                    onClick={() => onAffectiveChecked(5, index)}
                    className="font-[500] print:h-[20px] cursor-pointer hover:bg-blue-100 transition-all duration-300 h-[40px] flex justify-center items-center col-span-1"
                  >
                    {affective.value == 5 && checkMark}
                  </div>
                  <div
                    onClick={() => onAffectiveChecked(4, index)}
                    className="font-[500] print:h-[20px] cursor-pointer hover:bg-blue-100 transition-all duration-300 h-[40px] flex justify-center items-center col-span-1"
                  >
                    {affective.value == 4 && checkMark}
                  </div>
                  <div
                    onClick={() => onAffectiveChecked(3, index)}
                    className="font-[500] print:h-[20px] cursor-pointer hover:bg-blue-100 transition-all duration-300 h-[40px] flex justify-center items-center col-span-1"
                  >
                    {affective.value == 3 && checkMark}
                  </div>
                  <div
                    onClick={() => onAffectiveChecked(2, index)}
                    className="font-[500] print:h-[20px] cursor-pointer hover:bg-blue-100 transition-all duration-300 h-[40px] flex justify-center items-center col-span-1"
                  >
                    {affective.value == 2 && checkMark}
                  </div>
                  <div
                    onClick={() => onAffectiveChecked(1, index)}
                    className="font-[500] print:h-[20px] cursor-pointer hover:bg-blue-100 transition-all duration-300 h-[40px] flex justify-center items-center col-span-1"
                  >
                    {affective.value == 1 && checkMark}
                  </div>
                </>
              ))}
            </div>
            <div className="col-span-3 overflow-hidden h-max grid border-b border-r border-[#111] divide-x divide-y divide-[#111] grid-cols-12">
              <div className="font-[700] text-[8px] border-t border-l border-[#111] text-center col-span-7 ">
                Psyohomotor domain
              </div>
              <div className="font-[700] text-[8px] uppercase text-center col-span-1">
                5
              </div>
              <div className="font-[700] text-[8px] uppercase text-center col-span-1">
                4
              </div>
              <div className="font-[700] text-[8px] uppercase text-center col-span-1">
                3
              </div>
              <div className="font-[700] text-[8px] uppercase text-center col-span-1">
                2
              </div>
              <div className="font-[700] text-[8px] uppercase text-center col-span-1">
                1
              </div>

              {psy.map((psy: any, index: number) => (
                <>
                  <div className="col-span-7 print:h-[20px] text-[14px] printer print:text-[8px] !font-[500] h-[40px] ">
                    <span className="px-[5px] print:pt-[5px] !flex justify-start item-center h-full">
                      {psy.title}
                    </span>
                  </div>
                  <div
                    onClick={() => onpsyChecked(5, index)}
                    className="font-[500] print:h-[20px] cursor-pointer hover:bg-blue-100 transition-all duration-300 h-[40px] flex justify-center items-center col-span-1"
                  >
                    {psy.value == 5 && checkMark}
                  </div>
                  <div
                    onClick={() => onpsyChecked(4, index)}
                    className="font-[500] print:h-[20px] cursor-pointer hover:bg-blue-100 transition-all duration-300 h-[40px] flex justify-center items-center col-span-1"
                  >
                    {psy.value == 4 && checkMark}
                  </div>
                  <div
                    onClick={() => onpsyChecked(3, index)}
                    className="font-[500] print:h-[20px] cursor-pointer hover:bg-blue-100 transition-all duration-300 h-[40px] flex justify-center items-center col-span-1"
                  >
                    {psy.value == 3 && checkMark}
                  </div>
                  <div
                    onClick={() => onpsyChecked(2, index)}
                    className="font-[500] print:h-[20px] cursor-pointer hover:bg-blue-100 transition-all duration-300 h-[40px] flex justify-center items-center col-span-1"
                  >
                    {psy.value == 2 && checkMark}
                  </div>
                  <div
                    onClick={() => onpsyChecked(1, index)}
                    className="font-[500] print:h-[20px] cursor-pointer hover:bg-blue-100 transition-all duration-300 h-[40px] flex justify-center items-center col-span-1"
                  >
                    {psy.value == 1 && checkMark}
                  </div>
                </>
              ))}
            </div>
            <table
              className="col-span-3 overflow-hidden h-max border !border-[#111]"
              border={1}
            >
              <tbody>
                <tr className="border !border-[#111]">
                  <td>
                    <div className="flex items-center justify-between  text-[8px] px-[5px]">
                      <span className="font-[700] text-[8px] flex-1">
                        Range
                      </span>
                      <span className="font-[700] text-[8px]">Grade</span>
                      <span className="font-[700] text-[8px] flex-1 flex justify-end">
                        Comment
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="border !border-[#111]">
                  <td>
                    <div className="flex items-center justify-between  text-[8px] px-[5px]">
                      <span className="font-[400] text-[14px] printer print:text-[8px] !font-[500] flex-1">
                        90-100
                      </span>
                      <span className="font-[400] text-[14px] printer print:text-[8px] !font-[500]">
                        A
                      </span>
                      <span className="font-[400] text-[14px] printer print:text-[8px] !font-[500] flex-1 flex justify-end uppercase">
                        Distinction
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="flex items-center justify-between  text-[8px] px-[5px]">
                      <span className="font-[400] text-[14px] printer print:text-[8px] !font-[500] flex-1">
                        70-89.9
                      </span>
                      <span className="font-[400] text-[14px] printer print:text-[8px] !font-[500]">
                        A
                      </span>
                      <span className="font-[400] text-[14px] printer print:text-[8px] !font-[500] flex-1 flex justify-end uppercase">
                        EXCELLENT
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="border !border-[#111]">
                  <td>
                    <div className="flex items-center justify-between  text-[8px] px-[5px]">
                      <span className="font-[400] text-[14px] printer print:text-[8px] !font-[500] flex-1">
                        61-69.9
                      </span>
                      <span className="font-[400] text-[14px] printer print:text-[8px] !font-[500]">
                        B
                      </span>
                      <span className="font-[400] text-[14px] printer print:text-[8px] !font-[500] flex-1 flex justify-end uppercase">
                        Very Good
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="border !border-[#111]">
                  <td>
                    <div className="flex items-center justify-between  text-[8px] px-[5px]">
                      <span className="font-[400] text-[14px] printer print:text-[8px] !font-[500] flex-1">
                        50-59.9
                      </span>
                      <span className="font-[400] text-[14px] printer print:text-[8px] !font-[500]">
                        C
                      </span>
                      <span className="font-[400] text-[14px] printer print:text-[8px] !font-[500] flex-1 flex justify-end uppercase">
                        Average
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="border !border-[#111]">
                  <td>
                    <div className="flex items-center justify-between  text-[8px] px-[5px]">
                      <span className="font-[400] text-[14px] printer print:text-[8px] !font-[500] flex-1">
                        40-49.9
                      </span>
                      <span className="font-[400] text-[14px] printer print:text-[8px] !font-[500]">
                        D
                      </span>
                      <span className="font-[400] text-[14px] printer print:text-[8px] !font-[500] flex-1 flex justify-end uppercase">
                        Fair
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="border !border-[#111]">
                  <td>
                    <div className="flex items-center justify-between  text-[8px] px-[5px]">
                      <span className="font-[400] text-[14px] printer print:text-[8px] !font-[500] flex-1">
                        0-39.9
                      </span>
                      <span className="font-[400] text-[14px] printer print:text-[8px] !font-[500]">
                        F
                      </span>
                      <span className="font-[400] text-[14px] printer print:text-[8px] !font-[500] flex-1 flex justify-end uppercase">
                        Poor
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              className="col-span-3 overflow-hidden h-max border border-[#111]"
              border={1}
            >
              <tbody>
                <tr className="border !border-[#111]">
                  <td>
                    <div className="flex items-center justify-center px-[5px]">
                      <span className="font-[700] text-[8px]">
                        Trait rating tools
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="border !border-[#111]">
                  <td>
                    <div className="flex items-center justify-center  text-[8px] px-[5px]">
                      <span className="font-[400] text-[14px] printer print:text-[8px] !font-[500]">
                        5 == Excellence
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="border !border-[#111]">
                  <td>
                    <div className="flex items-center justify-center  text-[8px] px-[5px]">
                      <span className="font-[400] text-[14px] printer print:text-[8px] !font-[500]">
                        4 == Good
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="border !border-[#111]">
                  <td>
                    <div className="flex items-center justify-center  text-[8px] px-[5px]">
                      <span className="font-[400] text-[14px] printer print:text-[8px] !font-[500]">
                        3 == Fair
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="border !border-[#111]">
                  <td>
                    <div className="flex items-center justify-center  text-[8px] px-[5px]">
                      <span className="font-[400] text-[14px] printer print:text-[8px] !font-[500]">
                        2 == Poor
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="border !border-[#111]">
                  <td>
                    <div className="flex items-center justify-center  text-[8px] px-[5px]">
                      <span className="font-[400] text-[14px] printer print:text-[8px] !font-[500]">
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
              Class teacher's comment:
            </span>
            <input className={INnputClasses + " !text-start px-[20px]"} />
          </div>
        </div>
        <div className="flex items-end gap-[20px] justify-between">
          <div className="flex-1 items-center gap-[10px] flex">
            <span className="whitespace-nowrap uppercase font-[600]">
              HEAD TEACHER/PRINCIPAL'S COMMENt:
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
