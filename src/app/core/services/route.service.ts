import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private currentRoute = new BehaviorSubject('');

  constructor() {
  }

  setCurrentRoute(route: string): void{
    let r = '';
    if (route.length > 0) {
      const arr = route.split('/');
      r = arr[1];
      console.log(arr);
    }
    this.currentRoute.next(r);
  }

  getCurrentRoute(): Observable<string>{
    return this.currentRoute.asObservable();
  }
}
