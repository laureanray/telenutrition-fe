import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  public passwordResetForm: FormGroup;
  isProcessing = false;

  constructor(private fb: FormBuilder) {
    this.passwordResetForm = this.fb.group({
      username: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.isProcessing = true;

  }
}
