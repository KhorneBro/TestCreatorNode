import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../shared/services/user.service";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {AllUsers} from "../../shared/interfaces";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  form: FormGroup;
  /* создаем*/
  isNew = true;
  user: AllUsers;

  constructor(private route: ActivatedRoute,
              private UserService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      telegram: new FormControl(null,),
      status: new FormControl(null, [Validators.required]),
    });

    this.form.disable();
    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              /* редактируем*/
              this.isNew = false;
              return this.UserService.getById(params['id'])
            }
            return of(null)
          }
        )
      )
      .subscribe(
        (user: AllUsers) => {
          if (user) {
            this.user = user;
            this.form.patchValue({
              email: user.email,
              name: user.name,
              password: user.password,
              telegram: user.telegram,
              status: user.status
            })
          }
          this.form.enable()
        },
        error => {
          console.log(error)
        }
      )
  }

  onSubmit() {
    let obs$;
    this.form.disable();
    if (this.isNew) {
      obs$ = this.UserService.create(this.form.value)
    } else {
      obs$ = this.UserService.update(this.user._id, this.form.value)
    }
    obs$.subscribe(
      user => {
        this.form.enable();
        this.user = user;
        this.router.navigate(['/allUsers'])
      },
      error => console.log(error)
    )
  }
}
