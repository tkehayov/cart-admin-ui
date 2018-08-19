import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StatisticsComponent} from './statistics.component';

const routes: Routes = [
  {
    path: '',
    component: StatisticsComponent,
    data: {
      title: 'Statistics',
      icon: 'icon-receipt',
      caption: '',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StatisticsRoutingModule { }
