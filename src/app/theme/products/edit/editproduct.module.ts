import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProductComponent } from './editproduct.component';
import { EditProductRoutingModule } from './editproduct-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {SimpleNotificationsModule} from 'angular2-notifications';
import { TreeModule } from 'angular-tree-component';


@NgModule({
  imports: [
    CommonModule,
    EditProductRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TreeModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [EditProductComponent],
  bootstrap: [EditProductComponent]
})
export class EditProductModule {

}
