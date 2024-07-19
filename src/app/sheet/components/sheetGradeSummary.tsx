"use client";

type Props = {};
function SheetGradeSummary({ grade_comment_board }: any) {
  return (
    <table
      border={1}
      className="table-auto text-[14px] print:text-[10px] w-max border border-collapse"
    >
      <tbody>
        {grade_comment_board.map((single_grade_comment_board: any) => (
          <tr className="border-b">
            <td className="flex px-[20px] p-[8px] text-start uppercase dborder-r">
              {`${single_grade_comment_board.min_score} - ${single_grade_comment_board.max_score}`}
            </td>
            <td className="px-[20px] border font-[700]">{single_grade_comment_board.grade}</td>
            <td className="px-[20px]">{single_grade_comment_board.comment}</td>
          </tr>
        ))}
      </tbody>
      <tbody className="hidden">
        <tr>
          <td className="border p-[8px] font-[700] text-start uppercase border-b">
            <span className="font-[400] mr-[8px]">Marks Obtainable:</span>{" "}
            {"obtainable"}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default SheetGradeSummary;
