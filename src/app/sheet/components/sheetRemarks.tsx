"use client";

type Props = {};
function SheetRemarks({}: any) {
  return (
    <div className="text-[14px] w-full flex flex-col gap-[8px] flex-1 print:text-[14px]">
      <div className="flex flex-col items-start gap-[4px]">
        <input className="w-full border-b border-b-zinc-300 font-[600] outline-none dpx-[24px]" />
        <span className="text-[12px] font-[400] text-zinc-400">
          CLASS TEACHER'S COMMENT
        </span>
      </div>
      <div className="flex items-center justify-between gap-[16px]">
        <div className="flex flex-1 flex-col items-start gap-[4px]">
          <input className="w-full border-b border-b-zinc-300 font-[600] outline-none dpx-[24px]" />
          <span className="text-[12px] font-[400] text-zinc-400">HEAD TEACHER/PRINCIPAL'S COMMENT</span>
        </div>
        <div className="flex flex-col w-max items-start gap-[4px]">
          <input className="w-[180px] border-b border-b-zinc-300 font-[600] outline-none dpx-[24px]" />
          <span className="text-[12px] font-[400] text-zinc-400">SIGNATURE</span>
        </div>
      </div>
    </div>
  );
}

export default SheetRemarks;
