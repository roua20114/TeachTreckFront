export class Student {
    id!: string;                 // Inherited from UserEntity
    email!: string;              // Inherited from UserEntity
    username!: string;           // Inherited from UserEntity
    firstName!: string;          // Inherited from UserEntity
    lastName!: string;           // Inherited from UserEntity
    mobile!: string;             // Inherited from UserEntity
    gender!: string;             // Inherited from UserEntity
    address!: string;            // Inherited from UserEntity
    password!: string;           // Inherited from UserEntity
    university!: string;         // Inherited from UserEntity
    profilePictureUrl!: string;  // Inherited from UserEntity
    profilePicture: any;        // Inherited from UserEntity (byte[] in backend)
    role!: string;               // Inherited from UserEntity (RoleEnumeration in backend)
    
    studyField!: string;         // Specific to Student
    name!: string;         
}
