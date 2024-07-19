"use client"

type Props = {};
function SheetTable({
  subjects,
  grade_comment_board,
  subject_id_editable,
  previous_term_in_session,
  score_progression,
  student_subject_score,
  set_student_subject_score
}: any) {
  const caProgressions = score_progression.filter(
    (progress: any) => progress.is_ca == true
  );
  const handleScoreChange = (e: any, progressionId: any, subjectId: any) => {
    const updatedScores = student_subject_score.map((ssc: any) => {
      if (ssc.progression_id === progressionId && ssc.subjects_id === subjectId) {
        return { ...ssc, score: e.target.value };
      }
      return ssc;
    });
    set_student_subject_score(updatedScores);
  };


  const findScore = (progressionId: any, subjectId: any) => {
    const foundScore = student_subject_score.find(
      (ssc: any) => ssc.progression_id === progressionId && ssc.subjects_id === subjectId
    );
    return foundScore ? foundScore.score : '';
  };
  // .map((progress: any) => progress.id);

  return (
    <table
      border={1}
      className="table-auto text-[14px] print:text-[10px] w-full border border-collapse"
    >
      <thead className=" uppercase">
        <tr>
          <th className="border px-[10px]">Subjests</th>
          {previous_term_in_session && (
            <th className="border px-[10px]">{previous_term_in_session}</th>
          )}
          {score_progression.map(
            (scoreTypes: any) =>
              scoreTypes.is_ca && (
                <th className="border px-[10px]">{scoreTypes.name}</th>
              )
          )}
          <th className="border px-[10px]">Total CA</th>
          {score_progression.map(
            (scoreTypes: any) =>
              !scoreTypes.is_ca && (
                <th className="border px-[10px]">{scoreTypes.name}</th>
              )
          )}
          <th className="border px-[10px]">Total</th>
          <th className="border px-[10px]">Grade</th>
          <th className="border px-[10px]">Subject teacher's comment</th>
        </tr>
        <tr>
          <th className="border dw-[200px]"></th>
          {previous_term_in_session && <th className="border">100</th>}
          {score_progression.map(
            (scoreTypes: any) =>
              scoreTypes.is_ca && (
                <th className="border">{scoreTypes.overall_mark}</th>
              )
          )}
          <th className="border">
            {caProgressions.reduce(
              (accumulator: any, currentValue: any) =>
                parseFloat(accumulator || 0) +
                parseFloat(currentValue?.overall_mark || 0),
              0
            )}
          </th>
          {score_progression.map(
            (scoreTypes: any) =>
              !scoreTypes.is_ca && (
                <th className="border">{scoreTypes.overall_mark}</th>
              )
          )}
          <th className="border">100</th>
          <th className="border"></th>
          <th className="border"></th>
        </tr>
      </thead>
      <tbody>
        {subjects.map((subject: any, index: number) => (
          <tr>
            <td className={`${subjects.length - 1 == index ? "border-none" : "border-b"} flex p-[8px] text-start uppercase dborder-b dborder-r dw-[200px]`}>
              {subject.name}
            </td>
            {previous_term_in_session && (
              <td className="border p-0">
                <input
                  type="number"
                  className="w-full h-full border-0 text-center outline-none"
                />
              </td>
            )}
            {score_progression.map(
              (scoreTypes: any) =>
                scoreTypes.is_ca && (
                  <td className="border p-0 dw-[150px] cursor-text focus-within:bg-zinc-100 transition-all duration-300">
                    <input
                      type="number"
                      className="w-full h-full border-0 text-center outline-none bg-transparent"
                      defaultValue={findScore(scoreTypes.id, subject.id)}
                      onChange={(e) => handleScoreChange(e, scoreTypes.id, subject.id)}
                    />
                  </td>
                )
            )}
            <td className="border text-center">
              {student_subject_score
                .filter((score: any) =>
                  caProgressions.find(
                    (caProgression: any) =>
                      caProgression.id == score.progression_id &&
                      score.subjects_id == subject.id
                  )
                )
                .reduce(
                  (accumulator: any, currentValue: any) =>
                    parseFloat(accumulator || 0) +
                    parseFloat(currentValue?.score || 0),
                  0
                )}
            </td>
            {score_progression.map(
              (scoreTypes: any) =>
                !scoreTypes.is_ca && (
                  <td className="border !p-0 dw-[150px] cursor-text focus-within:bg-zinc-100 transition-all duration-300">
                    <input
                      type="number"
                      className="w-full !h-full border-0 text-center outline-none bg-transparent"
                      defaultValue={findScore(scoreTypes.id, subject.id)}
                      onChange={(e) => handleScoreChange(e, scoreTypes.id, subject.id)}
                    />
                  </td>
                )
            )}
            <td className="border text-center">
              {student_subject_score
                .filter((score: any) => score.subjects_id == subject.id)
                .reduce(
                  (accumulator: any, currentValue: any) =>
                    parseFloat(accumulator || 0) +
                    parseFloat(currentValue?.score || 0),
                  0
                )}
            </td>
            <td className="border text-center">
              {
                grade_comment_board.find((grade: any) => {
                  const totalSubjectScore = student_subject_score
                    .filter((score: any) => score.subjects_id === subject.id)
                    .reduce((accumulator: number, currentValue: any) => {
                      return accumulator + parseFloat(currentValue.score || 0);
                    }, 0);

                  return (
                    totalSubjectScore >= grade.min_score &&
                    totalSubjectScore <= grade.max_score
                  );
                })?.grade
              }
            </td>
            <td className="border text-center">
              {
                grade_comment_board.find((grade: any) => {
                  const totalSubjectScore = student_subject_score
                    .filter((score: any) => score.subjects_id === subject.id)
                    .reduce((accumulator: number, currentValue: any) => {
                      return accumulator + parseFloat(currentValue.score || 0);
                    }, 0);

                  return (
                    totalSubjectScore >= grade.min_score &&
                    totalSubjectScore <= grade.max_score
                  );
                })?.comment
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SheetTable;
