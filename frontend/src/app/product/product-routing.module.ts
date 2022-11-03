import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', component: ListComponent
  },
  {
    path: 'detail/:id', component: DetailComponent
  },
  {
    path: 'edit/:id', component: EditComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
