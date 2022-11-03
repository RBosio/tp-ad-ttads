import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from '../auth/services/auth.service';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
  ],
  providers: [
    AuthService
  ],
  exports: [
    HeaderComponent
  ]
})
export class SharedModule { }
