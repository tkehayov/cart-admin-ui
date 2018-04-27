import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SearchService } from '../../shared/search.service';
import {SimpleNotificationsModule} from 'angular2-notifications';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    NgxDatatableModule,
    HttpModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [SearchService],
  declarations: [ProductsComponent]
})
export class ProductsModule {

}
