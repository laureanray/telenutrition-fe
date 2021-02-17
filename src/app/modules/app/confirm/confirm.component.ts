import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  token = '';
  verificationResult = '';
  constructor(private route: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params.token;
      console.log(this.token);

      if (this.token !== '') {
        this.httpClient.get(environment.apiUrl + '/patients/verify/' + this.token).subscribe(res => {
          console.log(res);
          if (res) {
            this.verificationResult = 'success';
          }
        }, error => {
          this.verificationResult = 'error';
        });
      }
    });
  }

}
