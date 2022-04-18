import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../../core/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;
  isResultLoading = false;
  private token = '';

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
     this.token = this.route.snapshot.params['token'];
  }

  private initForm() {
    this.form = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    let {password, confirmPassword} = this.form.value;
    if (password !== confirmPassword) {
      this.snackBar.open('Both password should match', 'Warning', {
        duration: 3000
      });
      return;
    }

    this.isResultLoading = true;
    this.authService.resetPassword({token: this.token, password}).subscribe(data => {
      this.snackBar.open('Password updated successfully', 'Success', {
        duration: 3000
      });
      this.router.navigate(['/login']);
    }, err => this.errorHandler(err, 'Ooops, something went wrong'),
    () => this.isResultLoading = false);
  }

  private errorHandler(error, message) {
    this.isResultLoading = false;
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }
}
