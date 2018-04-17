import {NgModule} from '@angular/core';
import {EditProductComponent} from './editproduct.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: EditProductComponent,
    data: {
      title: 'Edit Product',
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
export class EditProductRoutingModule { }
