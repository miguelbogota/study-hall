import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  authState = null;

  constructor(
    public auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.auth.authStateChanges
      .subscribe(u => {
        this.authState = u;
      })
  }

  signOut() {
    this.auth.signOut();
    this.router.navigate(['/']);
  }

}
