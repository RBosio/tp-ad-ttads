import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import jwt_decode from 'jwt-decode'
import { UserResponseI } from 'src/app/models/user.model';
import { TokenI } from 'src/app/models/token.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  token: string

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login($event: Event, email: HTMLInputElement, password: HTMLInputElement){
    $event.preventDefault()
    if(email.value == "" || password.value == ""){

    } else {
        this.authService.login(email.value, password.value).subscribe((result: any) => {
          this.token = result?.data?.login.token
          localStorage.setItem("token", this.token)
          
          const { payload }: TokenI = jwt_decode(this.token)
          
          const user = payload
          
          this.authService.user.emit(user)
          localStorage.setItem("user", JSON.stringify(user))
  
          this.router.navigateByUrl("/product")
        })
    }

  }

}
