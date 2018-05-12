import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './addproduct.component';
import { AddProductRoutingModule } from './addproduct-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {SimpleNotificationsModule} from 'angular2-notifications';
import { TreeModule } from 'angular-tree-component';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    AddProductRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TreeModule,
    ImageCropperModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [AddProductComponent],
  bootstrap: [AddProductComponent]
})
export class AddProductModule {

}
