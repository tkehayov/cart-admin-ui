import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrdersComponent} from './orders.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    data: {
      title: 'Orders',
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

export class OrdersRoutingModule { }
