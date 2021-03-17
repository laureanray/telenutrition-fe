import { Component, OnInit } from '@angular/core';
import {RND} from '../../../core/models/rnd';
import {Patient} from '../../../core/models/patient';
import {Appointment} from '../../../core/models/appointment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  rnds: RND[];
  patients: Patient[];
  appointments: Appointment[];


  constructor() { }

  ngOnInit(): void {
  }

}
