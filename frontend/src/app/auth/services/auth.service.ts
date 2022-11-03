import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo, MutationResult, QueryRef } from 'apollo-angular';
import { LOGIN } from 'src/app/queries/auth.query';
import { EventEmitter } from '@angular/core';
import { UserResponseI } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new EventEmitter<UserResponseI>()

  constructor(public apollo: Apollo) { }

  login(email: string, password: string): Observable<MutationResult<string>> {
    return this.apollo.mutate<string>({
      mutation: LOGIN,
      variables: {
        "loginUserInput": {
          "email": email,
          "password": password
        }
      }
    })

    
  }
  logout(): void {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    let user: UserResponseI
    this.user.emit(user)
  }
}
