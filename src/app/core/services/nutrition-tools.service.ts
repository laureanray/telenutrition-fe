import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NutritionTool} from '../models/nutrition-tool';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NutritionToolsService {

  constructor(private http: HttpClient) { }

  uploadNewNutritionTool(nutritionTool: NutritionTool): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/nt/new`, nutritionTool);
  }

  getAllNutritionTools(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/nt`);
  }

  getArchivedNutritionTools(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/nt/archived`);
  }
  archive(id: number): Observable<any> {
    return this.http.post(`${environment.apiUrl}/nt/archive/${id}`, {});
  }
}
