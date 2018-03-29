import {NgModule} from '@angular/core';
import {ViewProductComponent} from './viewproduct.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ViewProductComponent,
    data: {
      title: 'View Product',
      icon: 'icon-receipt',
      caption: '',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewProductRoutingModule { }
