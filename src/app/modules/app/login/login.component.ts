import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {Patient} from '../../../core/models/patient';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoggingIn = false;
  loginResult = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (this.authService.currentUserValue) {
      this.router.navigate(['/patient']);
    }
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.isLoggingIn = true;
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.authService.login(username, password).subscribe(res => {
      if (res) {
        console.log(res);
        this.isLoggingIn = false;
        this.loginResult = 'success';
      }
    }, error => {
      this.isLoggingIn = false;
      this.loginResult = 'error';
      console.log(error);
      this.errorMessage = error.message;
    });
  }

}
