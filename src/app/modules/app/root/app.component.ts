import {Component} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {RouteService} from '../../../core/services/route.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aklatan';
  page = '/';
  routeObservable: Observable<string>;

  constructor(private router: Router, private routeService: RouteService) {
    this.routeObservable = this.routeService.getCurrentRoute();

    this.routeObservable.subscribe(r => console.log(r))
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.page = event.url;
        this.routeService.setCurrentRoute(this.page);
      }
    });
  }
}
