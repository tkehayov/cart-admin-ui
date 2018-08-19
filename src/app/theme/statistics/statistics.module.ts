import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics.component';
import {StatisticsRoutingModule} from './statistics-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {SimpleNotificationsModule} from 'angular2-notifications';

@NgModule({
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    SharedModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [StatisticsComponent]
})

export class StatisticsModule {
}
