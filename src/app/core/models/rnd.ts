import {User} from './user';
import {Appointment} from './appointment';

export interface File {
  id: number;
  path: string;
}

export class RND extends User {
  id: number;
  license: string;
  files: File[];
  approved: boolean;
  appointments: Appointment[];
}
