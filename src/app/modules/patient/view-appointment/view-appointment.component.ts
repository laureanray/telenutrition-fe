import {Component, OnInit} from '@angular/core';
import {Appointment} from '../../../core/models/appointment';
import {ActivatedRoute} from '@angular/router';
import {AppointmentService} from '../../../core/services/appointment.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';
import {HttpEventType} from '@angular/common/http';
import {User} from '../../../core/models/user';
import * as uuid from 'uuid';
import {FileService} from '../../../core/services/file.service';
import {ProofOfPayment} from '../../../core/models/proof-of-payment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.scss']
})
export class ViewAppointmentComponent implements OnInit {
  appointment: Appointment;
  moment: any;
  environment: any;
  isUploading = false;
  progress = 0;
  message = '';
  uploadedFilePaths = [];
  filesToUpload = 0;
  doneUploaded = 0;

  constructor(private route: ActivatedRoute,
              private appointmentService: AppointmentService,
              private fileService: FileService,
              private snackBar: MatSnackBar) {
    this.moment = moment;
    this.environment = environment;
  }

  fetchCurrentAppointment(id: number): void {
    this.appointmentService.getAppointmentById(id)
      .subscribe(res => {
        this.appointment = res as Appointment;
        console.log(this.appointment);
      }, error => {
        alert(error);
      });
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    // tslint:disable-next-line:radix
    const id = parseInt(routeParams.get('id'));
    this.fetchCurrentAppointment(id);
  }

  doneCallback(): void {
    this.doneUploaded++;

    if (this.doneUploaded === this.filesToUpload) {
      console.log('Done! uploading ' + this.filesToUpload + ' files');

      for (const p of this.uploadedFilePaths) {
        this.appointment.proofOfPayments.push({
          path: p.path
        } as ProofOfPayment);
      }
      this.isUploading = false;

      this.appointmentService.addProofOfPayment(this.appointment.id, this.appointment)
        .subscribe(res => {
          if (res) {
            this.snackBar.open('Success!', undefined, {
              duration: 3000
            });
          }
        }, error => {
          this.snackBar.open('Error', undefined, {
            duration: 3000
          });
        });
    }
  }

  public uploadFile(files: any): void {
    this.isUploading = true;

    setTimeout(() => {
      console.log(files);
      if (files.length === 0) {
        return;
      } else {
        this.filesToUpload = files.length;
        for (const file of files) {
          const fileToUpload = file as File;
          const formData = new FormData();
          formData.append('file', fileToUpload, uuid.v4() + '.' + fileToUpload.type.split('/')[1]);

          this.fileService.upload(formData)
            .subscribe(event => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
              } else if (event.type === HttpEventType.Response) {
                this.message = 'Upload success.';
                const body = event.body;
                this.uploadedFilePaths.push({path: body.path});
                console.log(this.uploadedFilePaths);
                this.doneCallback();
              }
            });
        }
      }
      this.isUploading = true;
      console.log(files);
      if (files.length === 0) {
        return;
      } else {
        this.filesToUpload = files.length;
        for (const file of files) {
          const fileToUpload = file as File;
          const formData = new FormData();
          formData.append('file', fileToUpload, uuid.v4() + '.' + fileToUpload.type.split('/')[1]);

          this.fileService.upload(formData)
            .subscribe(event => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
              } else if (event.type === HttpEventType.Response) {
                this.message = 'Upload success.';
                const body = event.body;
                this.uploadedFilePaths.push({path: body.path});
                console.log(this.uploadedFilePaths);
                this.doneCallback();
              }
            });
        }
      }
    }, 1500);
  }


  fileChange(files: any): void {
    this.uploadFile(files);
  }


}
