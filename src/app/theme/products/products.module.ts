import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import {ProductsRoutingModule} from './products-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ],
  declarations: [ProductsComponent]
})
export class ProductsModule {
  
}
