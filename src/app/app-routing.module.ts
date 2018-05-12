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
        path: 'products/edit/:id',
        loadChildren: './theme/products/edit/editproduct.module#EditProductModule'
      },
      {
        path: 'products/view/:id',
        loadChildren: './theme/products/view/viewproduct.module#ViewProductModule'
      },
      {
        path: 'orders',
        loadChildren: './theme/orders/orders.module#OrdersModule'
      },
      {
        path: 'order/:id',
        loadChildren: './theme/order/order.module#OrderModule'
      },
      {
        path: 'categories',
        loadChildren: './theme/categories/categories.module#CategoriesModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
