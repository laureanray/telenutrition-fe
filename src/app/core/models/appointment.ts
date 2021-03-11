import {RND} from './rnd';
import {Patient} from './patient';

export class Appointment {
  id: number;
  assignedRND: RND;
  patient: Patient;
  paymentMethod: string;
  status: string;
  schedule: string;
  currentMedications: string;
  complaints: string;
}
