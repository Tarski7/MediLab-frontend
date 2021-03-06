import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../../../core/services/auth.service';
import { Router } from '@angular/router';
import { JwtService } from './../../../core/services/jwt.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter();

  constructor(private jwtService: JwtService,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout().subscribe(data => {
      console.log(data);
    }, err => this.errorHandler(err, 'Ooops, something went wrong'),
    () => {
      this.jwtService.destroyToken();
      this.router.navigate(['/login']);
    });
  }

  private errorHandler(error, message) {
    console.log(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }
}
