"use client";

import React, { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import logo from "@/asset/logo.png";
import { X, Check } from "lucide-react";

// --- CONSTANTS ---
const INPUT_CLASSES = "border-b print:text-[14px] border-[#111] min-w-[50px] w-full outline-none text-center";
const SCORE_INPUT_CLASSES = "border-0 !p-0 focus:!bg-blue-300 selection:bg-blue-400 cursor-pointer focus:cursor-text print:hover:bg-white hover:bg-blue-100 focus:text-[16px] focus:font-[600] !w-full h-full transition-all duration-300 outline-none text-center font-[400]";

const CHECK_MARK_ICON = <Check size={12} />;

const GRADE_SCALE = [
  { range: "90-100", grade: "A", comment: "Distinction" },
  { range: "70-89.9", grade: "A", comment: "EXCELLENT" },
  { range: "61-69.9", grade: "B", comment: "Very Good" },
  { range: "50-59.9", grade: "C", comment: "Average" },
  { range: "40-49.9", grade: "D", comment: "Fair" },
  { range: "0-39.9", grade: "F", comment: "Poor" },
];

const TRAIT_RATING_TOOLS = [
  "5 == Excellence",
  "4 == Good",
  "3 == Fair",
  "2 == Poor",
  "1 == No observation traits",
];

// --- HELPER FUNCTIONS ---
const getGradeDetails = (score: number) => {
  if (score >= 90) return { gd: "A", cmt: "Distinction" };
  if (score >= 70) return { gd: "A", cmt: "Excellent" };
  if (score >= 60) return { gd: "B", cmt: "Very Good" };
  if (score >= 50) return { gd: "C", cmt: "Average" };
  if (score >= 40) return { gd: "D", cmt: "Fair" };
  return { gd: "F", cmt: "Poor" };
};

const roundTo = (num: number, precision: number) => {
  const factor = Math.pow(10, precision);
  return Math.round(num * factor) / factor;
};

// --- REUSABLE COMPONENTS ---
const InfoInput = ({ label, className = "", inputClassName = "" }: { label: string; className?: string; inputClassName?: string }) => (
  <div className={`flex items-end gap-[10px] ${className}`}>
    <span className="whitespace-nowrap font-[700] print:text-[10px]">{label}:</span>
    <input className={`${INPUT_CLASSES} ${inputClassName}`} />
  </div>
);

const ScoreCell = ({ value, onChange, disabled = false, className = "" }: any) => (
  <div className={`font-[500] print:h-[20px] h-[40px] ${className}`}>
    <input
      className={`${SCORE_INPUT_CLASSES} ${disabled ? "select-none selection:bg-transparent !cursor-not-allowed" : ""}`}
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
    />
  </div>
);

const DomainTable = ({ title, data, onChecked }: any) => (
    <div className="col-span-3 overflow-hidden h-max grid border-b border-r border-[#111] divide-x divide-y divide-[#111] grid-cols-12">
        <div className="font-[700] text-[8px] border-t border-l border-[#111] text-center col-span-7">{title}</div>
        {[5, 4, 3, 2, 1].map(num => <div key={num} className="font-[700] text-[8px] uppercase text-center col-span-1">{num}</div>)}
        {data.map((item: any, index: number) => (
            <React.Fragment key={item.title}>
                <div className="col-span-7 print:h-[20px] h-[40px] px-[5px] flex items-center text-[14px] print:text-[8px] font-[500]">{item.title}</div>
                {[5, 4, 3, 2, 1].map(value => (
                    <div key={value} onClick={() => onChecked(value, index)} className="font-[500] print:h-[20px] cursor-pointer hover:bg-blue-100 transition-all duration-300 h-[40px] flex justify-center items-center col-span-1">
                        {item.value === value && CHECK_MARK_ICON}
                    </div>
                ))}
            </React.Fragment>
        ))}
    </div>
);

const SummaryTable = ({ title, rows, centered = false }: { title: string; rows: { label: string; value: any }[], centered?: boolean }) => (
    <table className="col-span-3 overflow-hidden h-max border !border-[#111]" border={1}>
        <tbody>
            <tr className="border !border-[#111]">
                <td className="text-center font-[700] text-[8px] px-[5px]">{title}</td>
            </tr>
            {rows.map(row => (
                <tr key={row.label} className="border !border-[#111]">
                    {centered ? (
                        <td className="text-center text-[14px] printer print:text-[8px] !font-[500] px-[5px]">
                            {row.label}
                        </td>
                    ) : (
                        <td className="flex items-center justify-between text-[8px] px-[5px] font-[500]">
                            <span className="flex-1">{row.label}</span>
                            <span className="flex-1 flex justify-end">{row.value}</span>
                        </td>
                    )}
                </tr>
            ))}
        </tbody>
    </table>
);

// --- MAIN PAGE COMPONENT ---
export default function Home() {
  const [subjectsData, setSubjectsData] = useState<any[]>([]);
  const [affectiveDomain, setAffectiveDomain] = useState([
    { title: "Neatness", value: undefined }, { title: "Relationship with Teachers", value: undefined },
    { title: "Perseverance", value: undefined }, { title: "Attentiveness", value: undefined },
    { title: "Attitude to School work", value: undefined }, { title: "Health", value: undefined },
    { title: "Emotional Stability", value: undefined }, { title: "Helping others", value: undefined },
    { title: "Punctuality", value: undefined }, { title: "Politeness", value: undefined },
    { title: "Initiative", value: undefined }, { title: "Cooperation with Others", value: undefined },
    { title: "Leadership traits", value: undefined },
  ]);
  const [psychomotorDomain, setPsychomotorDomain] = useState([
    { title: "Sport", value: undefined }, { title: "Verbal Fluency", value: undefined },
    { title: "Hand writing", value: undefined }, { title: "Handling tools", value: undefined },
  ]);

  const handleDomainChange = useCallback((setter: React.Dispatch<React.SetStateAction<any[]>>, value: any, index: any) => {
    setter(prev => prev.map((item, idx) => idx === index ? { ...item, value } : item));
  }, []);

  const handleScoreChange = useCallback((index: number, field: string, value: string) => {
    const isCommentField = field === 'cmt';
    if (!isCommentField && isNaN(Number(value)) && value.trim() !== "") return;
    
    const processedValue = isCommentField ? value : (value.trim() === "" ? 0 : Number(value));

    setSubjectsData(prev =>
      prev.map((subject, i) => {
        if (i === index) {
          const updated = { ...subject, [field]: processedValue };
          
          if (!isCommentField) {
            updated.ttca = Math.min(40, (updated.ca1 || 0) + (updated.ca2 || 0));
            updated.tt = Math.min(100, (updated.ttca || 0) + (updated.ex || 0));
            const gradeDetails = getGradeDetails(updated.tt);
            updated.gd = gradeDetails.gd;
            // Set the default comment, but user can override it.
            updated.cmt = gradeDetails.cmt;
          }
          return updated;
        }
        return subject;
      })
    );
  }, []);

  const { totalMarksObtained, percentage, average, overallGrade } = useMemo(() => {
    const totalObtained = subjectsData.reduce((acc, subject) => acc + (subject.tt || 0), 0);
    const totalPossible = subjectsData.length * 100;
    const percent = totalPossible > 0 ? (totalObtained / totalPossible) * 100 : 0;
    
    const firstTermTotal = subjectsData.reduce((acc, subject) => acc + (subject.t1 || 0), 0);
    const secondTermTotal = subjectsData.reduce((acc, subject) => acc + (subject.ttrm || 0), 0);

    const firstTermPercent = totalPossible > 0 ? (firstTermTotal / totalPossible) * 100 : 0;
    const secondTermPercent = totalPossible > 0 ? (secondTermTotal / totalPossible) * 100 : 0;
    
    const avg = (percent + firstTermPercent + secondTermPercent) / 3;

    return {
      totalMarksObtained: totalObtained,
      percentage: percent,
      average: avg,
      overallGrade: getGradeDetails(percent).gd,
    };
  }, [subjectsData]);

  const addSubject = () => {
    setSubjectsData(prev => [...prev, { subject: "", t1: "", ttrm: "", ca1: "", ca2: "", ttca: "", ex: "", tt: "", gd: "", cmt: "" }]);
  };

  const removeSubject = useCallback((indexToRemove: number) => {
    setSubjectsData(prev => prev.filter((_, index) => index !== indexToRemove));
  }, []);

  return (
    <main className="print:text-[8px] select-none bg-white w-full text-[#111] h-full print:px-0 px-[200px] print:py-0 py-[50px] flex flex-col gap-[30px]">
      {/* Header */}
      <div className="flex w-full justify-center items-center flex-col gap-[5px]">
        <div className="flex gap-[50px] justify-between w-full">
          <div className="flex-1 print:min-w-[100px] min-w-[200px]">
            <Image height={100} width={100} alt="logo" src={logo} className="w-[80px] aspect-square" />
          </div>
          <div className="flex h-full flex-col text-center">
            <span className="uppercase text-[25px] font-[800] leading-tight">first apex schools</span>
            <span className="font-[500]">29, First Apex Avenue, Amikanle, Alagbado. Lagos State</span>
            <span className="font-[500]">TEL: 08035253353, 08035290535</span>
            <span className="font-[500]">Website: www.firstapexschools.com, E-mail: firstapexschools@yahoo.com</span>
          </div>
          <div className="flex-1 print:min-w-[100px] min-w-[200px]"></div>
        </div>
        <span className="text-[10px] uppercase font-[700]">Terminal report sheet</span>
      </div>

      {/* Student Info & Summary */}
      <div className="flex w-full items-start gap-[20px]">
        <div className="flex-1 flex flex-col gap-[10px]">
          <div className="flex items-end gap-[10px] justify-between">
            <InfoInput label="Name" className="flex-1" />
            <InfoInput label="Number of times school opened" inputClassName="max-w-[50px]" />
          </div>
          <div className="flex items-end gap-[10px] justify-between">
            <div className="flex items-end gap-[10px]">
              <InfoInput label="Student ID" inputClassName="max-w-[200px]" />
              <InfoInput label="Gender" />
              <InfoInput label="Age" inputClassName="max-w-[50px]" />
            </div>
            <InfoInput label="Number of times present" inputClassName="max-w-[50px]" />
          </div>
          <div className="flex items-end gap-[10px] justify-between">
            <div className="flex items-end gap-[10px] flex-1">
              <InfoInput label="Class" inputClassName="max-w-[100px]" />
              <InfoInput label="Session" className="flex-1" />
            </div>
            <InfoInput label="Number in class" inputClassName="max-w-[50px]" />
          </div>
        </div>
        <div className="w-[400px] print:w-[200px] print:text-[10px] print:max-w-[150px] flex-shrink-0">
          <table className="w-full border" border={1}>
            <tbody>
              <tr><td><div className="flex justify-between px-[5px] font-[700]"><span>Total marks obtainable:</span><span>{subjectsData.length * 100}</span></div></td></tr>
              <tr><td><div className="flex justify-between px-[5px] font-[700]"><span>Total marks obtained:</span><span>{totalMarksObtained}</span></div></td></tr>
              <tr><td><div className="flex justify-between px-[5px] font-[700]"><span>Percentage:</span><span>{roundTo(percentage, 2)} %</span></div></td></tr>
              <tr><td><div className="flex justify-between px-[5px] font-[700]"><span>Average:</span><span>{roundTo(average, 2)} %</span></div></td></tr>
              <tr><td><div className="flex justify-between px-[5px] font-[700]"><span>Overall Grade:</span><span>{overallGrade}</span></div></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Cognitive Domain */}
      <div className="flex w-full flex-col gap-[0px]">
        <div className="flex w-full items-center justify-between">
          <span className="font-[600]">COGNITIVE DOMAIN</span>
          <button onClick={addSubject} className="underline flex print:hidden cursor-pointer">Add subject</button>
        </div>
        <div className="w-full flex flex-col gap-[5px] ">
          <div className="grid border-b border-r border-[#111] divide-x divide-y divide-[#111] grid-cols-12">
            <div className="font-[700] text-[14px] print:text-[8px] flex justify-center items-center border-t border-l border-[#111] uppercase text-center col-span-2">
              subject
            </div>
            <div className="font-[700] text-[14px] print:text-[8px] flex justify-center items-center uppercase text-center col-span-1">
              1st term
            </div>
            <div className="font-[700] text-[14px] print:text-[8px] flex justify-center items-center uppercase text-center col-span-1">
              2nd term
            </div>
            <div className="font-[700] text-[14px] print:text-[8px] flex justify-center items-center uppercase text-center col-span-1">
              FIRST TEST
            </div>
            <div className="font-[700] text-[14px] print:text-[8px] flex justify-center items-center uppercase text-center col-span-1">
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
            <div className="font-[700] text-[14px] print:text-[8px] text-center col-span-1">100</div>
            <div className="font-[700] text-[14px] print:text-[8px] text-center col-span-1">100</div>
            <div className="font-[700] text-[14px] print:text-[8px] text-center col-span-1">10</div>
            <div className="font-[700] text-[14px] print:text-[8px] text-center col-span-1">30</div>
            <div className="font-[700] text-[14px] print:text-[8px] text-center col-span-1">40</div>
            <div className="font-[700] text-[14px] print:text-[8px] text-center col-span-1">60</div>
            <div className="font-[700] text-[14px] print:text-[8px] text-center col-span-1">100</div>
            <div className="font-[700] text-[14px] print:text-[8px] text-center col-span-1"></div>
            <div className="font-[700] text-[14px] print:text-[8px] text-center col-span-2"></div>

            {subjectsData.map((subject, index) => (
              <React.Fragment key={index}>
                <div className="col-span-2 print:h-[20px] h-[40px] flex items-center">
                  <input
                    className="border-0 px-[5px] cursor-pointer focus:cursor-text h-full transition-all duration-300 focus:!bg-blue-300 focus:text-[16px] focus:font-[600] w-full font-[600] outline-none text-start"
                    defaultValue={subject.subject}
                  />
                  <button onClick={() => removeSubject(index)} className="text-red-500 print:hidden px-2">
                    <X size={16} />
                  </button>
                </div>
                <ScoreCell className="col-span-1" value={subject.t1} onChange={(e: any) => handleScoreChange(index, "t1", e.target.value)} />
                <ScoreCell className="col-span-1" value={subject.ttrm} onChange={(e: any) => handleScoreChange(index, "ttrm", e.target.value)} />
                <ScoreCell className="col-span-1" value={subject.ca1} onChange={(e: any) => handleScoreChange(index, "ca1", e.target.value)} />
                <ScoreCell className="col-span-1" value={subject.ca2} onChange={(e: any) => handleScoreChange(index, "ca2", e.target.value)} />
                <ScoreCell className="col-span-1" value={subject.ttca} disabled />
                <ScoreCell className="col-span-1" value={subject.ex} onChange={(e: any) => handleScoreChange(index, "ex", e.target.value)} />
                <ScoreCell className="col-span-1" value={subject.tt} disabled />
                <ScoreCell className="col-span-1 uppercase" value={subject.gd} disabled />
                <ScoreCell className="col-span-2 uppercase" value={subject.cmt} onChange={(e: any) => handleScoreChange(index, "cmt", e.target.value)} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Affective/Psychomotor Domains & Grading Scale */}
      <div className="grid grid-cols-12 gap-[5px]">
        <DomainTable title="Affective domain" data={affectiveDomain} onChecked={(value: any, index: any) => handleDomainChange(setAffectiveDomain, value, index)} />
        <DomainTable title="Psychomotor domain" data={psychomotorDomain} onChecked={(value: any, index: any) => handleDomainChange(setPsychomotorDomain, value, index)} />
        <SummaryTable title="Grade Scale" rows={GRADE_SCALE.map(g => ({ label: g.range, value: `${g.grade} - ${g.comment}` }))} />
        <SummaryTable title="Trait rating tools" rows={TRAIT_RATING_TOOLS.map(t => ({ label: t, value: "" }))} centered />
      </div>

      {/* Comments & Signature */}
      <div className="flex flex-col gap-[20px]">
        <InfoInput label="Class teacher's comment" className="flex-1" inputClassName="!text-start px-[20px]" />
        <InfoInput label="HEAD TEACHER/PRINCIPAL'S COMMENT" className="flex-1" inputClassName="!text-start px-[20px]" />
        <div className="flex items-end gap-[20px] justify-between">
          <InfoInput label="This term ends" className="flex-1" inputClassName="!text-start px-[20px]" />
          <InfoInput label="Signature" className="flex-1" inputClassName="!text-start px-[20px]" />
          <InfoInput label="Date" className="flex-1" inputClassName="!text-start px-[20px]" />
        </div>
      </div>
    </main>
  );
}
