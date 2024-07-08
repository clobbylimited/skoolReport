import Image from "next/image";
import logo from "@/asset/logo.png";

type Props = {};

function SheetHeader({ schoolData }: any) {
  return (
    <div
      id="schoolHeader"
      className="flex justify-around items-center px-3 gap-4"
    >
      <Image
        height={100}
        width={100}
        alt="logo"
        src={logo}
        className="w-[96px] saspect-square"
      />

      <div className="grid grid-rows-auto gap-1 py-2 text-center rounded ">
        <span className="text-[24px] font-semibold uppercase">
          {schoolData.name}
        </span>
        <span className="text-[16px] print:text-[14px]">
          {`Motto: ${schoolData.motto}`} <br />
          {schoolData.address} <br />
          {`Tel: ${schoolData.tel}`} <br />
        </span>
        <span className="text-[16px] font-semibold uppercase">Report Sheet</span>
      </div>

      <img
        className="w-24 opacity-0 rounded"
        src="https://via.placeholder.com/150"
        alt="student photo"
      />
    </div>
  );
}

export default SheetHeader;
