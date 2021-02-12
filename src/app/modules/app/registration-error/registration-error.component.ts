import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-registration-error',
  templateUrl: './registration-error.component.html',
  styleUrls: ['./registration-error.component.scss']
})
export class RegistrationErrorComponent implements OnInit {
  @Input() errorMessage: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
