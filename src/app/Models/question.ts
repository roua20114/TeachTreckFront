import { Option } from "./option";

export class Question {
    question!: string;     // Text of the question
    options!: Option[];        // Array of answer options
    answer!: string; 
}
