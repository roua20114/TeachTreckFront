import { Comment } from "./comment";

export class Post {
  id!: string;
  content!: string;
  teacherId!: string;
  classroomId!: string;
  createdAt!: Date;
  studentId!: string;
  comments: any;
  username:any;
}
