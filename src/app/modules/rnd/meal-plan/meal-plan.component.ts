import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import WebViewer from '@pdftron/webviewer';
import {environment} from '../../../../environments/environment';
import {AppointmentService} from '../../../core/services/appointment.service';
import {Appointment} from '../../../core/models/appointment';
import {FileService} from '../../../core/services/file.service';
import {HttpEventType} from '@angular/common/http';
import * as uuid from 'uuid';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-meal-plan',
  templateUrl: './meal-plan.component.html',
  styleUrls: ['./meal-plan.component.scss']
})
export class MealPlanComponent implements AfterViewInit, OnInit{
  @Input() appointment: Appointment;
  @ViewChild('viewer') viewer: ElementRef;
  wvInstance: any;
  isSaving = false;

  constructor(private appointmentService: AppointmentService,
              private fileService: FileService,
              private snackBar: MatSnackBar) {
  }

  async wvDocumentLoadedHandler(): Promise<void> {
    // you can access docViewer object for low-level APIs
    // and access classes defined in the WebViewer iframe

  }

  async changed(that: any): Promise<void> {

  }


  ngOnInit(): void {
    this.wvDocumentLoadedHandler = this.wvDocumentLoadedHandler.bind(this);
  }

  save(): void {
    // window.saveAs(blob, 'downloaded.pdf');
  }

  ngAfterViewInit(): void {
    const pdfToLoad = this.appointment.mealPlan ? this.appointment.mealPlan : `${environment.apiUrl}/file/files/meal-plan.pdf`;
    WebViewer({
      path: '../../lib'
    }, this.viewer.nativeElement).then(instance => {
      this.wvInstance = instance;
      // instance.setHeaderItems(header => {
      //   const items = header.getItems().filter(obj => {
      //     return obj !== header.getItems().splice(11, 1)[0];
      //   });
      //   header.update(items);
      // });
      instance.loadDocument(pdfToLoad, {
        filename: 'meal-plan.pdf'
      });
      // now you can access APIs through this.webviewer.getInstance()
      // instance.openElements(['notesPanel']);
      // see https://www.pdftron.com/documentation/web/guides/ui/apis for the full list of APIs

      // or listen to events from the viewer element
      this.viewer.nativeElement.addEventListener('pageChanged', (e) => {
        const [pageNumber] = e.detail;
        console.log(`Current page is ${pageNumber}`);
      });

      // or from the docViewer instance
      instance.docViewer.on('annotationsLoaded', () => {
        console.log('annotations loaded');
      });

      instance.docViewer.on('documentLoaded', this.wvDocumentLoadedHandler);

      // const {annotManager} = instance;
      // annotManager.on('annotationChanged', () => {
      //   this.changed(this);
      // });
    });
  }


  public blobToFile = (theBlob: Blob, fileName: string): File => {
    const b: any = theBlob;
    b.lastModifiedDate = new Date();
    b.name = fileName;

    return theBlob as File;
  };

  async saveChanges(): Promise<void> {
    this.isSaving = true;
    const {Annotations, annotManager, docViewer} = this.wvInstance;
    const doc = docViewer.getDocument();
    const xfdfString = await annotManager.exportAnnotations();
    const options = {xfdfString};
    const d = await doc.getFileData(options);
    const arr = new Uint8Array(d);
    const blob = new Blob([arr], {type: 'application/pdf'});
    const name = 'meal-plan_' + uuid.v4() + '.pdf';
    const data = new FormData();
    const file = this.blobToFile(blob, name);
    data.append('file', file, name);
    console.log(data);
    setTimeout(() => {
      this.fileService.upload(data)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            // this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event.type === HttpEventType.Response) {
            // this.message = 'Upload success.';
            const body = event.body;
            // this.uploadedFilePath = body.dbPath;
            // console.log(body);
            this.appointment.patient.roles = undefined;
            this.appointment.mealPlan = `${environment.apiUrl}/file/files/${body.path}`;
            this.appointmentService.updateAppointment(this.appointment)
              .subscribe((res: Appointment) => {
                this.appointment = res;
              }, error => {
                this.snackBar.open('Unexpected error occurred!', null, {
                  duration: 2000
                });
              });
            this.isSaving = false;
            this.snackBar.open('Uploaded!', null, {
              duration: 2000
            });

          }
        }, error => {
          console.log(data);
          console.log(error);
          this.isSaving = false;
          this.snackBar.open('Unexpected error occurred!', null, {
            duration: 2000
          });
        });
    }, 1000);

    console.log('save');
  }

}
