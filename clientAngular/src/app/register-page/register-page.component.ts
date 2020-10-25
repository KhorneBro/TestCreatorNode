import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";

import {AuthService} from "../shared/services/auth.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  asub: Subscription


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
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    })
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {

      } else if (params['accessDenied']) {

      }
    })
  }

  onSubmit() {
    this.form.disable()

    this.asub = this.auth.register(this.form.value).subscribe(
      () => {
        console.log("register Success")
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        })
      },
      error => {
        console.warn(error)
        this.form.enable()
      }
    )
  }

}
