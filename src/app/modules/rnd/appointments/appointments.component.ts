import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Appointment} from '../../../core/models/appointment';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {PatientService} from '../../../core/services/patient.service';
import {RndService} from '../../../core/services/rnd.service';
import {AppointmentService} from '../../../core/services/appointment.service';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import * as moment from 'moment';
import {ActivatedRoute} from '@angular/router';

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
    // 'archived',
    'schedule',
    'appointmentType',
    'paymentMethod',
    'amountDue',
    'status',
    'rnd',
    'updatedAt',
    'buttons'];

  resultsLength = 0;
  isLoadingResults = true;
  moment: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private patientService: PatientService,
              private rndService: RndService,
              private appointmentService: AppointmentService,
              private authService: AuthenticationService,
              private route: ActivatedRoute) {
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
            return this.appointmentService.getArchivedAppointmentsByRND(this.authService.currentUserValue.id);
          } else {
            return this.appointmentService.getActiveAppointmentsByRND(this.authService.currentUserValue.id);
          }
        }),
        map(data => {
          this.isLoadingResults = false;
          this.resultsLength = data.length;
          console.log('Results length', this.resultsLength);
          const appointments = data as Appointment[];
          for (const d of appointments) {
            d.createdAt = moment(d.createdAt).format('LLL');
            d.updatedAt = moment(d.updatedAt).format('LLL');
            switch (d.appointmentType) {
              case 'nutrition_counseling':
                d.appointmentType = 'Nutrition Counseling';
                break;
              case 'one_week_cycle_menu':
                d.appointmentType = 'One Week Cycle Menu';
                break;
              case 'both':
                d.appointmentType = 'Nutrition Counseling & One Week Cycle Menu';
                break;
            }
          }
          return appointments;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }

  ngAfterViewInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    // tslint:disable-next-line:radix
    const optional = routeParams.get('optional');
    // this.fetchCurrentAppointment(id);
    if (optional) {
      this.selected = 'archived';
    }

    this.update();
  }


  valueChange($event: any): void {
    this.update();
  }
}
