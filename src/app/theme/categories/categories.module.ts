import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import {CategoriesRoutingModule} from './categories-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {SimpleNotificationsModule} from 'angular2-notifications';

@NgModule({
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [CategoriesComponent]
})

export class CategoriesModule {
}
