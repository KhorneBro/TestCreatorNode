import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AllUsers} from "../interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private URL_API = '/api/users'

  constructor(private htpp: HttpClient) {
  }

  fetch(): Observable<AllUsers[]> {
    return this.htpp.get<AllUsers[]>(this.URL_API + '/allUsers',)
  }

}
