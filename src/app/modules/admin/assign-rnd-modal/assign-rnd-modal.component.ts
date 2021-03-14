import {AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppointmentService} from '../../../core/services/appointment.service';
import {RndService} from '../../../core/services/rnd.service';
import {RND} from '../../../core/models/rnd';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {MatSelect} from '@angular/material/select';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-assign-rnd-modal',
  templateUrl: './assign-rnd-modal.component.html',
  styleUrls: ['./assign-rnd-modal.component.scss']
})
export class AssignRndModalComponent implements OnInit, AfterViewInit, OnDestroy {
  isAssigning = false;
  /** list of rnds */
  protected rnds: RND[] = [];

  /** control for the selected rnd */
  public rndCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public rndFilterCtrl: FormControl = new FormControl();

  /** list of rnds filtered by search keyword */
  public filteredRNDs: ReplaySubject<RND[]> = new ReplaySubject<RND[]>(1);

  @ViewChild('singleSelect', {static: true}) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
    // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();

  selectedRND: RND;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AssignedNodesOptions>,
    private appointmentService: AppointmentService,
    private rndService: RndService,
    private snackBar: MatSnackBar) {
    this.rndService.getAllRnds()
      .subscribe(rnds => {
        this.rnds = rnds as RND[];
      });

    this.rndCtrl.valueChanges
      .subscribe(value => {
        // console.log(value);
        this.selectedRND = value;
      });
  }

  ngAfterViewInit(): void {
    this.setInitialValue();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Sets the initial value after the filteredRNDs are loaded initially
   */
  protected setInitialValue(): void {
    this.filteredRNDs
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredRNDs are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: RND, b: RND) => a && b && a.id === b.id;
      });
  }

  protected filterRNDs(): void {
    if (!this.rnds) {
      return;
    }
    // get the search keyword
    let search = this.rndFilterCtrl.value;
    if (!search) {
      this.filteredRNDs.next(this.rnds.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the rnds
    this.filteredRNDs.next(
      this.rnds.filter(rnd => {
        return rnd.firstName.toLowerCase().indexOf(search) > -1 || rnd.lastName.toLowerCase().indexOf(search) > -1;
      })
    );
  }


  ngOnInit(): void {
    this.rndCtrl.setValue(this.rnds[10]);

    // load the initial rnd list
    this.filteredRNDs.next(this.rnds.slice());

    // listen for search field value changes
    this.rndFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterRNDs();
      });
  }

  assign(): void {
    this.isAssigning = true;
    this.data.appointment.rnd = {
      id: this.selectedRND.id
    } as RND;
    this.data.appointment.status = 'SCHEDULED';
    setTimeout(() => {
      this.appointmentService.updateAppointment(this.data.appointment)
        .subscribe(res => {
          if (res) {
            this.snackBar.open('Success!', undefined, {
              duration: 3000
            });
            this.dialogRef.close();
          }
        }, error => {
          this.snackBar.open('Unexpected Error Occurred!', undefined, {
            duration: 3000
          });
          this.dialogRef.close();
        });
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
