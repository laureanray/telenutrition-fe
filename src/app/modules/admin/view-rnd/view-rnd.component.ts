import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RndService} from '../../../core/services/rnd.service';
import {RND} from '../../../core/models/rnd';
import {environment} from '../../../../environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-view-rnd',
  templateUrl: './view-rnd.component.html',
  styleUrls: ['./view-rnd.component.scss']
})
export class ViewRndComponent implements OnInit {
  rnd: RND;
  environment: any;
  moment: any;
  constructor(private route: ActivatedRoute,
              private rndService: RndService) {
    this.moment = moment;
  }

  ngOnInit(): void {
    this.environment = environment;
    const routeParams = this.route.snapshot.paramMap;
    const username = routeParams.get('username');

    this.rndService.getRND(username)
      .subscribe(res => {
        console.log(res);
        this.rnd = res as RND;
      }, error => {
        console.log(error);
      });

  }

}
