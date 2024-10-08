import { Question } from "./question";
import { Student } from "./student";

export class Answer {
    answerId!: string;    // The unique ID for the answer
  questions!: Question;  // The question related to this answer
  student!: Student;    // The student who provided the answer
  answer!: string;
} 
