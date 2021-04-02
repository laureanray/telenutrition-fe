import {Patient} from './patient';
import {RND} from './rnd';

export class Message {
  id: number;
  patient: Patient;
  rnd: RND;
  message: string;
  createdAt: string;
  sender: string;
}
