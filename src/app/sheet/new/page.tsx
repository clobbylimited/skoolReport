import SheetTable from "../components/sheetTable";

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

function NewSheetPage({}: Props) {
  return (
    <div>
      <SheetTable
        grade_comment_board={gradeCommentBoard}
        student_subject_score={studentSubjectScore}
        subjects={subjects}
        score_progression={scoreProgression}
      />
    </div>
  );
}

export default NewSheetPage;
