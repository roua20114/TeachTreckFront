import { Question } from "./question";

export class Exam {

    examId!: string;             
    title!: string;           
    description!: string;      
    question!: Question[]; 
    domaine!:string;

}
