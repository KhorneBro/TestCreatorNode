import {Injectable} from "@angular/core";
import {User} from "../interfaces";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private token = null
  private userStatus = null

  constructor(private http: HttpClient) {
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user)
  }

  login(user: User): Observable<any> {
    return this.http.post<any>('/api/auth/login', user)
      .pipe(
        tap(
          ({token, userStatus}) => {
            localStorage.setItem('auth-token', token)
            localStorage.setItem('userStatus', userStatus)
            this.setToken(token)

          }
        )
      )
  }

  setToken(token: string) {
    this.token = token
  }

  getToken(): string {
    return this.token
  }

  setUserStatus(userStatus: string) {
    this.userStatus = userStatus
  }

  getUserStatus(): string {
    return this.userStatus
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  logout() {
    this.setToken(null)
    localStorage.clear()
  }
}
