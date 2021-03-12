import {User} from './user';
import {MedicalRecord} from './medical-record';

export class Patient extends User{
    birthday: string;
    age: number;
    medicalRecord: MedicalRecord;
}
