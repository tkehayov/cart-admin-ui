import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './addproduct.component';
import {AddProductRoutingModule} from './addproduct-routing.module';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AddProductRoutingModule,
    SharedModule
  ],
  declarations: [AddProductComponent]
})
export class AddProductModule {

}
