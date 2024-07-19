// Example usage in a Server Component (app/students/page.tsx)

// import { connectToDatabase } from '../../../utils/dbConnect';

// async function getStudents() {
//   const db = await connectToDatabase();
//   return db.collection('students').find({}).toArray();
// }

export default async function StudentsPage() {
  const students = [] || await getStudents();
  console.log(students)

  return (
    <div>
      <h1>Students {JSON.stringify(students)}</h1>
      {/* <ul>
        {students.map((student) => (
          <li key={student._id.toString()}>{student.name}</li>
        ))}
      </ul> */}
    </div>
  );
}