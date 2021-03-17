import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../core/models/user';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {PatientService} from '../../../core/services/patient.service';
import {RndService} from '../../../core/services/rnd.service';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import * as moment from 'moment';
import {AppointmentService} from '../../../core/services/appointment.service';
import {Appointment} from '../../../core/models/appointment';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements AfterViewInit {
  selected = 'active';
  data: Appointment[];

  displayedColumns: string[] = [
    'id',
    'patient',
    'schedule',
    'paymentMethod',
    'status',
    'updatedAt',
    'buttons'];

  resultsLength = 0;
  isLoadingResults = true;
  moment: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private patientService: PatientService,
              private rndService: RndService,
              private appointmentService: AppointmentService) {
    this.moment = moment;
  }

  update(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          if (this.selected === 'archived') {
            return this.appointmentService.getAllArchivedAppointments();
          } else {
            return this.appointmentService.getAllActiveAppointments();
          }
        }),
        map(data => {
          this.isLoadingResults = false;
          this.resultsLength = data.length;
          console.log('Results length', this.resultsLength);
          const users = data as Appointment[];
          for (const d of users) {
            d.createdAt = moment(d.createdAt).format('LLL');
            d.updatedAt = moment(d.updatedAt).format('LLL');
          }
          return users;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }

  ngAfterViewInit(): void {
    this.update();
  }


  valueChange($event: any): void {
    this.update();
  }
}
