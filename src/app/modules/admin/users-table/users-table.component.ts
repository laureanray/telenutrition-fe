import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {PatientService} from '../../../core/services/patient.service';
import {AdminService} from '../../../core/services/admin.service';
import {RndService} from '../../../core/services/rnd.service';
import {User} from '../../../core/models/user';
import {Patient} from '../../../core/models/patient';
import {RND} from '../../../core/models/rnd';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatSelect} from '@angular/material/select';
import * as moment from 'moment';
import {MatDialog} from '@angular/material/dialog';
import {DeleteModalComponent} from '../delete-modal/delete-modal.component';


@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UsersTableComponent implements AfterViewInit {
  selected = 'rnd';
  data: User[];

  displayedColumns: string[] = [
    'id',
    'username',
    'fullName',
    'email',
    'isConfirmed',
    'isApproved',
    'createdAt',
    'updatedAt',
    'buttons'];

  displayedColumnsPatient: string[] = [
    'id',
    'username',
    'fullName',
    'email',
    'isConfirmed',
    'createdAt',
    'updatedAt',
    'buttons'];

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private patientService: PatientService, private rndService: RndService, private dialog: MatDialog) {
  }

  update(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          if (this.selected === 'patient') {
            return this.patientService.getAllPatients();
          } else {
            return this.rndService.getAllRnds();
          }
        }),
        map(data => {
          this.isLoadingResults = false;
          this.resultsLength = data.length;
          console.log('Results length', this.resultsLength);
          const users = data as User[];
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

  delete(row): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '520px',
      data: {
        username: row.username,
        role: this.selected
      }
    });

    dialogRef.afterClosed().subscribe(s => {
      this.update();
    });
  }
}
