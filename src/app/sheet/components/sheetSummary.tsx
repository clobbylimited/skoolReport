"use client";

type Props = {};
function SheetSummary({
  grade_comment_board,
  subject_id_editable,
  flip,
  previous_term_in_session,
  subjects,
  student_subject_score,
}: any) {
  const obtainable = subjects.length * 100;
  const obtained = student_subject_score.reduce(
    (accumulator2: any, currentValue2: any) =>
      parseFloat(accumulator2 || 0) + parseFloat(currentValue2?.score || 0),
    0
  );

  function roundTo(num: number, precision: number) {
    const factor = Math.pow(10, precision);
    return Math.round(num * factor) / factor;
  }

  const termPercent = roundTo((obtained / obtainable) * 100, 2);

  return (
    <table
      border={1}
      className="table-auto text-[14px] print:text-[10px] border border-collapse"
    >
      {flip ? (
        <tbody>
          <tr className="border-b">
            <td className="flex p-[8px] text-start uppercase border-r">
              Marks Obtainable
            </td>
            <td className="px-[8px]">{obtainable}</td>
          </tr>
          <tr className="border-b">
            <td className="flex p-[8px] text-start uppercase border-r">
              Marks Obtained
            </td>
            <td className="px-[8px]">{obtained}</td>
          </tr>
          <tr className="border-b">
            <td className="flex p-[8px] text-start uppercase border-r">
              Percentage
            </td>
            <td className="px-[8px]">{termPercent}%</td>
          </tr>
          {previous_term_in_session && (
            <tr className="border-b">
              <td className="flex p-[8px] text-start uppercase border-r">
                Culmmulative Percentage
              </td>
              <td className="px-[8px]"></td>
            </tr>
          )}
          <tr>
            <td className="flex p-[8px] text-start uppercase border-r">
              Grade
            </td>
            <td className="px-[8px]">
              {
                grade_comment_board.find(
                  (grade: any) =>
                    termPercent >= grade.min_score &&
                    termPercent <= grade.max_score
                )?.grade
              }
            </td>
          </tr>
        </tbody>
      ) : (
        <tbody>
          <tr>
            <td className="border p-[8px] font-[700] text-start uppercase border-b">
              <span className="font-[400] mr-[8px]">Marks Obtainable:</span> {obtainable}
            </td>
            <td className="border p-[8px] font-[700] text-start uppercase border-b">
              <span className="font-[400] mr-[8px]">Marks Obtained:</span> {obtained}
            </td>
            <td className="border p-[8px] font-[700] text-start uppercase border-b">
              <span className="font-[400] mr-[8px]">Percentage:</span> {termPercent}%
            </td>
            {previous_term_in_session && (<td className="border p-[8px] text-start uppercase border-b">
              <span className="font-[400] mr-[8px]">Percentage:</span> {termPercent}%
            </td>)}
            <td className="border p-[8px] font-[700] text-start uppercase border-b">
              <span className="font-[400] mr-[8px]">Grade:</span> 
              {
                grade_comment_board.find(
                  (grade: any) =>
                    termPercent >= grade.min_score &&
                    termPercent <= grade.max_score
                )?.grade
              }
            </td>
          </tr>
        </tbody>
      )}
    </table>
  );
}

export default SheetSummary;
