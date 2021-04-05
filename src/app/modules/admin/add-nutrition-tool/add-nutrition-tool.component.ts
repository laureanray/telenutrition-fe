import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NutritionToolsService} from '../../../core/services/nutrition-tools.service';

@Component({
  selector: 'app-add-nutrition-tool',
  templateUrl: './add-nutrition-tool.component.html',
  styleUrls: ['./add-nutrition-tool.component.scss']
})
export class AddNutritionToolComponent implements OnInit {

  constructor(private matDialogRef: MatDialogRef<AddNutritionToolComponent>,
              private nutritionToolsService: NutritionToolsService) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.matDialogRef.close();
  }

  approve(): void {

  }
}
