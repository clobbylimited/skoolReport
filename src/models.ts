import { Schema, model, Types, models } from 'mongoose';

// User Schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['admin', 'teacher', 'student'], default: 'student' },
  school: { type: Types.ObjectId, ref: 'School' },
  isActive: { type: Boolean, default: true },
});

// School Schema
const schoolSchema = new Schema({
  name: { type: String, required: true },
  address: String,
  phoneNumber: String,
  email: { type: String, required: true, unique: true },
  adminUser: { type: Types.ObjectId, ref: 'User' },
  activeTerm: { type: Types.ObjectId, ref: 'Term', default: null },
});

// Student Schema
const studentSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: Date,
  class: { type: Types.ObjectId, ref: 'Class' },
  isActive: { type: Boolean, default: true },
});

// Class Schema
const classSchema = new Schema({
  name: { type: String, required: true },
  school: { type: Types.ObjectId, ref: 'School', required: true },
//   department: { type: Types.ObjectId, ref: 'Department' },
});

// Department Schema
const departmentSchema = new Schema({
  name: { type: String, required: true },
  school: { type: Types.ObjectId, ref: 'School', required: true },
});

// Subject Schema
const subjectSchema = new Schema({
  name: { type: String, required: true },
  school: { type: Types.ObjectId, ref: 'School', required: true },
  department: { type: Types.ObjectId, ref: 'Department' },
  class: { type: Types.ObjectId, ref: 'Class' },
});

// Score Progression Schema
const scoreProgressionSchema = new Schema({
  name: { type: String, required: true },
  overallMark: { type: Number, required: true },
  isCA: { type: Boolean, default: true },
  school: { type: Types.ObjectId, ref: 'School', required: true },
});

// Student Subject Score Schema
const studentSubjectScoreSchema = new Schema({
  student: { type: Types.ObjectId, ref: 'Student', required: true },
  subject: { type: Types.ObjectId, ref: 'Subject', required: true },
  scoreProgression: { type: Types.ObjectId, ref: 'ScoreProgression', required: true },
  score: { type: Number, required: true },
  term: { type: Types.ObjectId, ref: 'Term', required: true },
});

// Grade Comment Board Schema
const gradeCommentBoardSchema = new Schema({
  school: { type: Types.ObjectId, ref: 'School', required: true },
  minScore: { type: Number, required: true },
  maxScore: { type: Number, required: true },
  grade: { type: String, required: true },
  comment: { type: String, required: true },
});

// Term Schema
const termSchema = new Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  session: { type: Types.ObjectId, ref: 'Session', required: true },
  school: { type: Types.ObjectId, ref: 'School', required: true },
});

// Session Schema
const sessionSchema = new Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  school: { type: Types.ObjectId, ref: 'School', required: true },
});

// Create and export models
export const User = models.User || model('User', userSchema);
export const School = models.School || model('School', schoolSchema);
export const Student = models.Student || model('Student', studentSchema);
export const Classes = models.Class || model('Class', classSchema);
export const Department = models.Department || model('Department', departmentSchema);
export const Subject = models.Subject || model('Subject', subjectSchema);
export const ScoreProgression = models.ScoreProgression || model('ScoreProgression', scoreProgressionSchema);
export const StudentSubjectScore = models.StudentSubjectScore || model('StudentSubjectScore', studentSubjectScoreSchema);
export const GradeCommentBoard = models.GradeCommentBoard || model('GradeCommentBoard', gradeCommentBoardSchema);
export const Term = models.Term || model('Term', termSchema);
export const Session = models.Session || model('Session', sessionSchema);