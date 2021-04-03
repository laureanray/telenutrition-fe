import { Component, OnInit } from '@angular/core';
import {NutritionTool} from '../../../core/models/nutrition-tool';
import {NutritionToolsService} from '../../../core/services/nutrition-tools.service';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-nutrition-tools',
  templateUrl: './nutrition-tools.component.html',
  styleUrls: ['./nutrition-tools.component.scss']
})
export class NutritionToolsComponent implements OnInit {
  nutritionTools: Observable<NutritionTool[]>;
  environment: any;
  constructor(private nutritionToolsService: NutritionToolsService) {
    this.nutritionTools = this.nutritionToolsService.getAllNutritionTools();
    this.environment = environment;
  }

  ngOnInit(): void {
  }

}
