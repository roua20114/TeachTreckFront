import { Classroom } from "./classroom";

export class Courses {
    courseId!: string;
    title!: string;
    description!: string;
    courseType!: string;
    filePath!: string;
    classroom!:Classroom;
    classroomId!:string;
    teacher: any;
    // comments!: any[];
    
}
