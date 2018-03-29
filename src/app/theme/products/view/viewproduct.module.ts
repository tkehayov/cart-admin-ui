import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProductComponent } from './viewproduct.component';
import { ViewProductRoutingModule } from './viewproduct-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ViewProductRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: [ViewProductComponent],
  bootstrap: [ViewProductComponent]
})
export class ViewProductModule {

}
