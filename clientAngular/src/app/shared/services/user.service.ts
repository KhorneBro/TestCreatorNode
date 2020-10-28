import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AllUsers} from "../interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private URL_API = '/api/users';

  constructor(private htpp: HttpClient) {
  }

  fetch(): Observable<AllUsers[]> {
    return this.htpp.get<AllUsers[]>(this.URL_API + '/allUsers',)
  }

  getById(id: string): Observable<AllUsers> {
    return this.htpp.get<AllUsers>(this.URL_API + '/user/' + id)
  }

  deleteUser(id: string): void {
    this.htpp.delete(this.URL_API + '/deleteUser/' + id).subscribe()
  }

  create(user: AllUsers): Observable<AllUsers> {
    return this.htpp.post<AllUsers>(this.URL_API + '/addUser', user)
  }

  update(id: string, data: AllUsers): Observable<AllUsers> {
    return this.htpp.patch<AllUsers>(this.URL_API + '/updateUser/' + id, data)
  }
}
