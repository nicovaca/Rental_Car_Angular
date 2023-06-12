import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit{

  constructor(private authService : AuthenticationService, private router: Router) { }

  ngOnInit() {
    sessionStorage.removeItem('isUserLoggedIn')
    sessionStorage.removeItem("ruolo")
    this.authService.logout();
    this.router.navigate(['/'])
      .then(() => {
        window.location.reload();
      });
  }
}
