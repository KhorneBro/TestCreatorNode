import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/services/user.service";
import {AllUsers} from "../shared/interfaces";
import {Observable} from "rxjs";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  users$: Observable<AllUsers[]>;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.users$ = this.userService.fetch()
  }

  deleteUser(_id: string) {
    this.userService.deleteUser(_id);
    window.location.reload()
  }
}
