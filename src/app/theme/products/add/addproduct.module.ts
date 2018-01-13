import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './addproduct.component';
import { AddProductRoutingModule } from './addproduct-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {SimpleNotificationsModule} from 'angular2-notifications';

@NgModule({
  imports: [
    CommonModule,
    AddProductRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [AddProductComponent],
  bootstrap: [AddProductComponent]
})
export class AddProductModule {

}
