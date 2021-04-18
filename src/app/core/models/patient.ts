import {User} from './user';
import {MedicalRecord} from './medical-record';
import {Appointment} from './appointment';

export class Patient extends User{
    birthday: string;
    age: number;
    medicalRecord: MedicalRecord;
    appointments: Appointment[];
}
