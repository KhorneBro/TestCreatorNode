import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/services/user.service";
import {AllUsers} from "../shared/interfaces";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  loading: boolean = false

  private users: AllUsers[] = []

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.loading = true
    this.userService.fetch().subscribe((users) => {
      this.loading = false
      this.users = users
      console.log(users)
    })
  }

}
