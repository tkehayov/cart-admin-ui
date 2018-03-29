import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './layout/admin/admin.component';
import {AuthComponent} from './layout/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      },
      {
        path: 'products',
        loadChildren: './theme/products/products.module#ProductsModule'
      },
      {
        path: 'products/add',
        loadChildren: './theme/products/add/addproduct.module#AddProductModule'
      },
      {
        path: 'products/view/:id',
        loadChildren: './theme/products/view/viewproduct.module#ViewProductModule'
      },
      {
        path: 'gallery',
        loadChildren: './theme/gallery/gallery.module#GalleryModule'
      },
      {
        path: 'orders',
        loadChildren: './theme/orders/orders.module#OrdersModule'
      },
      {
        path: 'order/:id',
        loadChildren: './theme/order/order.module#OrderModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
