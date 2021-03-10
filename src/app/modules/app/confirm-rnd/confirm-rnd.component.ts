import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-confirm-rnd',
  templateUrl: './confirm-rnd.component.html',
  styleUrls: ['./confirm-rnd.component.scss']
})
export class ConfirmRndComponent implements OnInit {
  token = '';
  result = '';
  constructor(private route: ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params.token;
      console.log(this.token);
      if (this.token !== '') {
        this.http.get(`${environment.apiUrl}/rnd/verify/${this.token}`)
          .subscribe(res => {
            if (res) {
              this.result = 'success';
              console.log(res);
            }
          }, error => {
            this.result = 'error';
            console.log(error);
          });
      }
    });
  }

}
