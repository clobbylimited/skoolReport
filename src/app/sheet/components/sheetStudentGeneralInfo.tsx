"use client";

type Props = {};
function SheetStudentGeneralInfo({data}: any) {
  return (
    <table
      border={1}
      className="table-auto text-[14px] print:text-[10px] w-full border border-collapse"
    >
      <tbody>
        <tr>
          <td className="border p-[8px] text-start uppercase border-b">
            <span className="font-[700]">session:</span> {data.session}
          </td>
          <td className="border p-[8px] text-start uppercase border-b">
            <span className="font-[700]">term:</span> {data.term}
          </td>
          <td className="border p-[8px] text-start uppercase border-b">
            <span className="font-[700]">admission no:</span> {data.adm}
          </td>
        </tr>
        <tr>
          <td className="border p-[8px] text-start uppercase border-b">
            <span className="font-[700]">Name of student:</span> {data.name}
          </td>
          <td className="border p-[8px] text-start uppercase border-b">
            <span className="font-[700]">class:</span> {data.class}
          </td>
          <td className="border p-[8px] text-start uppercase border-b">
            <span className="font-[700]">gender:</span> {data.gender}
          </td>
        </tr>
        <tr>
          <td className="border p-[8px] text-start uppercase border-b">
            <span className="font-[700]">Age:</span> {data.age}
          </td>
          <td className="border p-[8px] text-start uppercase border-b">
          <span className="font-[700]">TIMES SCHOOL OPENED:</span> {data.no_opened}
          </td>
          <td className="border p-[8px] text-start uppercase border-b">
          <span className="font-[700]">TIME PRESENT:</span> {data.no_around}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default SheetStudentGeneralInfo;
