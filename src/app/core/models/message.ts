import {Patient} from './patient';
import {RND} from './rnd';
import {Word} from './word';

export class Message {
  id: number;
  patient: Patient;
  rnd: RND;
  message: string;
  createdAt: string;
  sender: string;
  words: Word[];
  links: string[];
}
