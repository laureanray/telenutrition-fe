import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NutritionToolsService} from '../../../core/services/nutrition-tools.service';
import {HttpEventType} from '@angular/common/http';
import {NutritionTool} from '../../../core/models/nutrition-tool';
import {FileService} from '../../../core/services/file.service';
import * as uuid from 'uuid';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-nutrition-tool',
  templateUrl: './add-nutrition-tool.component.html',
  styleUrls: ['./add-nutrition-tool.component.scss']
})
export class AddNutritionToolComponent implements OnInit {
  isUploading = false;
  ageGroup: any;
  group: any;
  nutritionToolsForm: FormGroup;
  isAdding = false;

  constructor(private matDialogRef: MatDialogRef<AddNutritionToolComponent>,
              private nutritionToolsService: NutritionToolsService,
              private fileService: FileService,
              private snackBar: MatSnackBar,
              private fb: FormBuilder) {

    this.nutritionToolsForm = this.fb.group({
      filename: ['', Validators.required],
      ageGroup: ['', Validators.required],
      group: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.matDialogRef.close();
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
            this.nutritionToolsForm.patchValue({
              filename
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

  add(): void {
    this.isAdding = true;

    const nt = {
      filename: this.nutritionToolsForm.controls.filename.value,
      ageGroup: this.nutritionToolsForm.controls.ageGroup.value.toUpperCase(),
      folder: this.nutritionToolsForm.controls.group.value.toUpperCase()
    } as NutritionTool;

    this.nutritionToolsService.uploadNewNutritionTool(nt)
      .subscribe(result => {
        if (result) {
          this.snackBar.open('Success!', null, {
            duration: 2000
          });

          this.isAdding = false;
          this.matDialogRef.close();
        }
      }, error => {
        this.snackBar.open('Unexpected error occurred!', null, {
          duration: 2000
        });
        this.isAdding = false;
        this.matDialogRef.close();
      });
  }

}
