"use client";
import { useState } from "react";
import SheetSummary from "../components/sheetSummary";
import SheetTable from "../components/sheetTable";
import SheetStudentGeneralInfo from "../components/sheetStudentGeneralInfo";
import SheetHeader from "../components/sheetHeader";

type Props = {};

const scoreProgression = [
  { id: 1, name: "First test", overall_mark: 10, is_ca: true },
  { id: 2, name: "Mid-term test", overall_mark: 30, is_ca: true },
  { id: 3, name: "Exam", overall_mark: 60, is_ca: false },
];

const subjects = [
  { id: 1, name: "Mathematics" },
  { id: 2, name: "English" },
  { id: 3, name: "Civic Education" },
  { id: 4, name: "Further Mathematics" },
  { id: 5, name: "Chemistry" },
  { id: 6, name: "Biology" },
  { id: 7, name: "Book Keeping" },
  { id: 8, name: "French" },
  { id: 9, name: "Diction" },
  { id: 10, name: "Economics" },
];

const studentSubjectScore = [
  { subjects_id: 1, progression_id: 1, score: 8 }, // Mathematics, First test
  { subjects_id: 1, progression_id: 2, score: 25 }, // Mathematics, Mid-term test
  { subjects_id: 1, progression_id: 3, score: 55 }, // Mathematics, Exam
  { subjects_id: 2, progression_id: 1, score: 9 }, // English, First test
  { subjects_id: 2, progression_id: 2, score: 27 }, // English, Mid-term test
  { subjects_id: 2, progression_id: 3, score: 58 }, // English, Exam
  { subjects_id: 3, progression_id: 1, score: 7 }, // Civic Education, First test
  { subjects_id: 3, progression_id: 2, score: 22 }, // Civic Education, Mid-term test
  { subjects_id: 3, progression_id: 3, score: 50 }, // Civic Education, Exam
  { subjects_id: 4, progression_id: 1, score: 10 }, // Further Mathematics, First test
  { subjects_id: 4, progression_id: 2, score: 30 }, // Further Mathematics, Mid-term test
  { subjects_id: 4, progression_id: 3, score: 60 }, // Further Mathematics, Exam
  { subjects_id: 5, progression_id: 1, score: 6 }, // Chemistry, First test
  { subjects_id: 5, progression_id: 2, score: 18 }, // Chemistry, Mid-term test
  { subjects_id: 5, progression_id: 3, score: 45 }, // Chemistry, Exam
  { subjects_id: 6, progression_id: 1, score: 7 }, // Biology, First test
  { subjects_id: 6, progression_id: 2, score: 21 }, // Biology, Mid-term test
  { subjects_id: 6, progression_id: 3, score: 50 }, // Biology, Exam
  { subjects_id: 7, progression_id: 1, score: 9 }, // Book Keeping, First test
  { subjects_id: 7, progression_id: 2, score: 28 }, // Book Keeping, Mid-term test
  { subjects_id: 7, progression_id: 3, score: 55 }, // Book Keeping, Exam
  { subjects_id: 8, progression_id: 1, score: 8 }, // French, First test
  { subjects_id: 8, progression_id: 2, score: 24 }, // French, Mid-term test
  { subjects_id: 8, progression_id: 3, score: 50 }, // French, Exam
  { subjects_id: 9, progression_id: 1, score: 9 }, // Diction, First test
  { subjects_id: 9, progression_id: 2, score: 27 }, // Diction, Mid-term test
  { subjects_id: 9, progression_id: 3, score: 55 }, // Diction, Exam
  { subjects_id: 10, progression_id: 1, score: 8 }, // Economics, First test
  { subjects_id: 10, progression_id: 2, score: 26 }, // Economics, Mid-term test
  { subjects_id: 10, progression_id: 3, score: 54 }, // Economics, Exam
];

const gradeCommentBoard = [
  {
    id: 1,
    school_id: 1,
    min_score: 90,
    max_score: 100,
    grade: "A",
    comment: "Excellent",
  },
  {
    id: 2,
    school_id: 1,
    min_score: 80,
    max_score: 89,
    grade: "B",
    comment: "Very Good",
  },
  {
    id: 3,
    school_id: 1,
    min_score: 70,
    max_score: 79,
    grade: "C",
    comment: "Good",
  },
  {
    id: 4,
    school_id: 1,
    min_score: 60,
    max_score: 69,
    grade: "D",
    comment: "Fair",
  },
  {
    id: 5,
    school_id: 1,
    min_score: 50,
    max_score: 59,
    grade: "E",
    comment: "Pass",
  },
  {
    id: 6,
    school_id: 1,
    min_score: 0,
    max_score: 49,
    grade: "F",
    comment: "Fail",
  },
];

const affectiveDomains = {
  title: "Affective Domain",
  range: 5,
  data: [
    { name: "Neatness", value: undefined },
    { name: "Relationship with Teachers", value: undefined },
    { name: "Perseverance", value: undefined },
    { name: "Attentiveness", value: undefined },
    { name: "Attitude to School work", value: undefined },
    { name: "Health", value: undefined },
    { name: "Emotional Stability", value: undefined },
    { name: "Helping others", value: undefined },
    { name: "Punctuality", value: undefined },
    { name: "Politeness", value: undefined },
    { name: "Initiative", value: undefined },
    { name: "Cooperation with Others", value: undefined },
    { name: "Leadership traits", value: undefined },
  ],
};

const psy = {
  title: "Psyomotor Domain",
  range: 5,
  data: [
    { name: "Sport", value: undefined },
    { name: "Verbal Fluency", value: undefined },
    { name: "Hand writing", value: undefined },
    { name: "Handling tools", value: undefined },
  ],
};

const StudentGeneralData = {
  name: "Bodunde David Oluwasole",
  age: 14,
  gender: "male",
  adm: "100314",
  term: "First",
  session: "2021/2022",
  no_opened: 110,
  no_around: 100,
  class: "JSS2",
};

const schoolData = {
  name: "First Apex Schools",
  motto: "Grooming for Excellence",
  address: "29, First Apex Avenue, Amikanle Alagbado, Lagod State",
  tel: "08035253353, 08035290535",
  email: "firstapexschools@yahoo.com@gmail.com"
}

function NewSheetPage({}: Props) {
  const [scores, setScores] = useState(studentSubjectScore);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // useEffect(() => {
  //   // Function to calculate the DPI
  //   const calculateDPI = () => {
  //     const inch = 25.4; // 1 inch = 25.4 mm
  //     const dpi = window.devicePixelRatio * 96; // Approximate DPI

  //     // A4 dimensions in inches
  //     const a4WidthInches = 210 / inch;
  //     const a4HeightInches = 297 / inch;

  //     // A4 dimensions in pixels
  //     const width = a4WidthInches * dpi;
  //     const height = a4HeightInches * dpi;

  //     // Ensure the width fits within the screen
  //     const adjustedWidth = Math.min(width, window.innerWidth);
  //     const adjustedHeight = adjustedWidth * (height / width);

  //     setDimensions({ width: adjustedWidth, height: adjustedHeight });
  //   };

  //   calculateDPI();
  //   window.addEventListener('resize', calculateDPI); // Recalculate on resize

  //   return () => {
  //     window.removeEventListener('resize', calculateDPI);
  //   };
  // }, []);

  return (
    <div className="px-[20px] m-auto w-[1000px] print:w-full print:border-none p-[24px] border py-[50px] print:py-0 flex flex-col gap-[40px] print:px-0">
      <SheetHeader schoolData={schoolData}  />
      <SheetStudentGeneralInfo data={StudentGeneralData} />
      <SheetSummary
        grade_comment_board={gradeCommentBoard}
        subjects={subjects}
        student_subject_score={scores}
      />
      <SheetTable
        grade_comment_board={gradeCommentBoard}
        student_subject_score={scores}
        subjects={subjects}
        score_progression={scoreProgression}
        set_student_subject_score={setScores}
      />
      {/* <SheetTabularChecks {...affectiveDomains} />
      <SheetTabularChecks {...psy} /> */}
    </div>
  );
}

export default NewSheetPage;
