import {Component, OnInit} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'App';

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    const potentialToken = localStorage.getItem('auth-token')
    if (potentialToken !== null) {
      this.auth.setToken(potentialToken)
    }
  }

}
