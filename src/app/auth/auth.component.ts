import { User } from './../core/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtService } from './../core/services/jwt.service';
import { AuthService } from './../core/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;
  title = '';
  isResultsLoading = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private jwtService: JwtService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initForm();
    this.title = this.router.url === '/login' ? 'Login' : 'Signup';
  }

  private initForm() {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ''
    });
  }

  onSubmit() {
    if (this.title === 'Signup') {
      this.signup();
    }
    else {
      this.login();
    }
  }

  private signup() {
    this.isResultsLoading = true;
    this.authService.signup(this.authForm.value).subscribe(data => {
      this.snackBar.open('Signup successful', 'Success', {duration: 3000});
      this.router.navigate(['/login']);
    }, err => this.errorHandler(err, 'Ooops, something went wrong'),
    () => this.isResultsLoading = false);
  }

  private login() {
    this.isResultsLoading = true;
    let {email, password} = this.authForm.value;
    let user: User = {email, password};

    this.authService.login(user).subscribe(data => {
      this.jwtService.setToken(data.token);
      this.router.navigate(['/dashboard', '/test-results']);
    }, err => this.errorHandler(err, 'Ooops, something went wrong'),
    () => this.isResultsLoading = false);
  }

  forgotPassHandler() {
    this.router.navigate(['/forgot-password']);
  }

  private errorHandler(error, message) {
    this.isResultsLoading = false;
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }
}
