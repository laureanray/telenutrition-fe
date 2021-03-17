import {RND} from './rnd';
import {Patient} from './patient';
import {ProofOfPayment} from './proof-of-payment';

export class Appointment {
  id: number;
  rnd: RND;
  patient: Patient;
  paymentMethod: string;
  status: string;
  schedule: string;
  currentMedications: string;
  complaints: string;
  archived: string;
  amountDue: number;
  createdAt: string;
  updatedAt: string;
  appointmentType: string;
  proofOfPayments: ProofOfPayment[];
}
