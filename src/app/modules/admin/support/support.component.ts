import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Appointment} from '../../../core/models/appointment';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {PatientService} from '../../../core/services/patient.service';
import {RndService} from '../../../core/services/rnd.service';
import {AppointmentService} from '../../../core/services/appointment.service';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {SupportService} from '../../../core/services/support.service';
import * as moment from 'moment';
import {SupportTicket} from '../../../core/models/support-ticket';
import {MatDialog} from '@angular/material/dialog';
import {MarkResolvedModalComponent} from '../mark-resolved-modal/mark-resolved-modal.component';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit, AfterViewInit {
  selected = 'pending';
  data: SupportTicket[];

  displayedColumns: string[] = [
    'id',
    'status',
    'resolution',
    'email',
    'details',
    'updatedAt',
    'buttons'];

  resultsLength = 0;
  isLoadingResults = true;
  moment: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private supportService: SupportService,
              private dialog: MatDialog) {
    this.moment = moment;
  }

  update(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          if (this.selected === 'resolved') {
            return this.supportService.getTicketsByStatus('resolved');
          } else {
            return this.supportService.getTicketsByStatus('pending');
          }
        }),
        map(data => {
          this.isLoadingResults = false;
          this.resultsLength = data.length;
          console.log('Results length', this.resultsLength);
          const tickets = data as SupportTicket[];
          for (const d of tickets) {
            d.createdAt = moment(d.createdAt).format('LLL');
            d.updatedAt = moment(d.updatedAt).format('LLL');
          }

          return tickets;
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

  ngOnInit(): void {
  }

  markResolved(id: number): void {
    console.log(id);
    const ref = this.dialog.open(MarkResolvedModalComponent, {
      width: '540px',
      data: id
    });

    ref.afterClosed().subscribe(_ => {
      this.update();
    });
  }
}
