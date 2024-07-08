"use client";

type Props = {};
function SheetTabularChecks({ title, range, data }: any) {
  return (
    <table
      border={1}
      className="table-auto text-[14px] print:text-[12px] w-full border border-collapse"
    >
      <thead className=" uppercase">
        <tr>
          <th className="border px-[10px]">{title}</th>
          {Array.from({ length: range }, (_, index) => range - index).map(
            (number) => (
              <th className="border">{number}</th>
            )
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((dat: any) => (
          <tr className="border-b">
            <th className="flex p-[8px] text-start uppercase">
              {dat.name}
            </th>

            {Array.from({ length: range }, (_, index) => range - index).map(
              (number) => (
                <td className="border">
                  {dat.value == number ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="black"
                        d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z"
                      />
                    </svg>
                  ) : (
                    ""
                  )}
                </td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SheetTabularChecks;
