import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";

import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  asub: Subscription;

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnDestroy() {
    if (this.asub) {
      this.asub.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    });
  }

  onSubmit() {
    this.form.disable();

    this.asub = this.auth.login(this.form.value).subscribe(
      () => {
        console.log("Login Success");
        this.router.navigate(['/allUsers'])
      },
      error => {
        console.warn(error);
        this.form.enable()
      }
    )
  }
}
