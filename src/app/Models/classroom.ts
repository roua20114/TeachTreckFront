export class Classroom {
  id!: string;
  name!: string;
  code!: string;
  link!: string;
  studentEmails: string[] = [];
  teacher!: any; 
  archived!: boolean;
  posts: any[] = [];
  homeworks: any[] = [];
isPending: any;
}
