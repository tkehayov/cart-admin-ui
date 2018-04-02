import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from './products.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    data: {
      title: 'Products',
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
export class ProductsRoutingModule { }

// {s
//   path: 'products',
//   loadChildren: './products/products.module#ProductsModule'
// },
