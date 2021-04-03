import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SupportTicket} from '../../../core/models/support-ticket';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SupportService} from '../../../core/services/support.service';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import * as moment from 'moment';
import {NutritionTool} from '../../../core/models/nutrition-tool';
import {NutritionToolsService} from '../../../core/services/nutrition-tools.service';
import {HttpEventType} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {MedicalRecord} from '../../../core/models/medical-record';
import {FileService} from '../../../core/services/file.service';
import * as uuid from 'uuid';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-nutrition-tools',
  templateUrl: './nutrition-tools.component.html',
  styleUrls: ['./nutrition-tools.component.scss']
})
export class NutritionToolsComponent implements OnInit, AfterViewInit {
  selected = 'active';
  data: NutritionTool[];
  isUploading = false;

  displayedColumns: string[] = [
    'id',
    'filename',
    'hits',
    'updatedAt'];

  resultsLength = 0;
  isLoadingResults = true;
  moment: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private nutritionToolsService: NutritionToolsService,
              private fileService: FileService,
              private snackBar: MatSnackBar) {
    this.moment = moment;
  }

  update(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          if (this.selected === 'active') {
            return this.nutritionToolsService.getAllNutritionTools();
          } else {
            return this.nutritionToolsService.getArchivedNutritionTools();
          }
        }),
        map(data => {
          this.isLoadingResults = false;
          this.resultsLength = data.length;
          console.log('Results length', this.resultsLength);
          const nts = data as NutritionTool[];
          for (const d of nts) {
            d.createdAt = moment(d.createdAt).format('LLL');
            d.updatedAt = moment(d.updatedAt).format('LLL');
          }
          return nts;
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

  fileChange(files: FileList): void {
    this.isUploading = true;
    if (files.length === 0) {
      return;
    }

    const fileToUpload = files[0] as File;
    const formData = new FormData();
    const filename = fileToUpload.name.split('.')[0] + '___' + uuid.v4() + '.' + fileToUpload.type.split('/')[1];
    console.log(filename);
    formData.append('file', fileToUpload, filename);

    setTimeout(() => {
      this.fileService.upload(formData)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            // this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event.type === HttpEventType.Response) {
            const body = event.body;
            this.isUploading = false;
            const nt = new NutritionTool();
            nt.filename = filename;

            this.nutritionToolsService.uploadNewNutritionTool(nt)
              .subscribe(result => {
                if (result) {
                  this.snackBar.open('Success!', null, {
                    duration: 2000
                  });

                  this.update();
                }
              }, error => {
                this.snackBar.open('Unexpected error occurred!', null, {
                  duration: 2000
                });
              });
          }
        }, error => {
          this.isUploading = false;
          this.snackBar.open('Unexpected error occurred!', null, {
            duration: 2000
          });
        });
    }, 1000);
  }
}
