import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserResponseI } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario: UserResponseI

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      if(!user){
        this.usuario = null
      } else {
        this.usuario = user
      }
    })
  }

  logout(): void {
    this.authService.logout()
    this.router.navigateByUrl("/auth/login")
  }

}
