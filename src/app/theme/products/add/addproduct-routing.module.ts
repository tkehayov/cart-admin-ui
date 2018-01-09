import {NgModule} from '@angular/core';
import {AddProductComponent} from './addproduct.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AddProductComponent,
    data: {
      title: 'New Product',
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
export class AddProductRoutingModule { }
