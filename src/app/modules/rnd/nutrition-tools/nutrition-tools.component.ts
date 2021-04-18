import {Component, OnInit} from '@angular/core';
import {NutritionTool} from '../../../core/models/nutrition-tool';
import {NutritionToolsService} from '../../../core/services/nutrition-tools.service';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';


@Component({
  selector: 'app-nutrition-tools',
  templateUrl: './nutrition-tools.component.html',
  styleUrls: ['./nutrition-tools.component.scss']
})
export class NutritionToolsComponent implements OnInit {
  nutritionTools: NutritionTool[];
  environment: any;
  nts: any;
  showAgeGroup = false;
  currentFolder: NutritionTool[];

  constructor(private nutritionToolsService: NutritionToolsService) {
    this.nutritionToolsService.getAllNutritionTools()
      .subscribe(res => {
        if (res) {
          this.nutritionTools = res;
          this.nts = this.nutritionTools.reduce((groups, item) => {
            const group = (groups[item.folder] || []);
            group.push(item);
            groups[item.folder] = group;
            return groups;
          }, {});

          console.log(this.nts);
        }

      });
    this.environment = environment;
  }

  ngOnInit(): void {
  }

  groupBy(collection, property): any {
    let i = 0;
    let val;
    let index;
    const values = [];
    const result = [];
    for (; i < collection.length; i++) {
      val = collection[i][property];
      index = values.indexOf(val);
      if (index > -1) {
        result[index].push(collection[i]);
      } else {
        values.push(val);
        result.push([collection[i]]);
      }
    }
    return result;
  }

  sum(obj): number {
    console.log(obj);
    let total = 0;
    for (let i = 0, len = obj.length; i < len; i++) {
      total += obj[i].hits;
    }
    return total;
  }

  showAgeGroupComp(obj): void {
    this.showAgeGroup = true;

    this.currentFolder = obj as NutritionTool[];
  }

  back(): void {
    this.showAgeGroup = false;
  }
}
