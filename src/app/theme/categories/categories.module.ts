import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { TreeModule } from 'angular-tree-component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CategoriesRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    TreeModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [CategoriesComponent]
})

export class CategoriesModule {
}
