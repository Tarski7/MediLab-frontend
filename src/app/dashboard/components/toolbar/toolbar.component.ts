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
    private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.jwtService.destroyToken();
    this.router.navigate(['/login']);
  }
}
