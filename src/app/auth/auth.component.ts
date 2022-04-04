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

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private jwtService: JwtService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.title = this.router.url === '/login' ? 'Login' : 'Signup';
  }

  private initForm() {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.title === 'Signup') {
      console.log('Signup');
    }
    else {
      this.authService.login(this.authForm.value).subscribe(data => {
        this.jwtService.setToken(data.token);
        this.router.navigate(['/dashboard', '/test-results']);
      }, err => console.error(err));
    }
  }
}
