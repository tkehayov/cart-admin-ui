import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GalleryComponent} from './gallery.component';

const routes: Routes = [
  {
    path: '',
    component: GalleryComponent,
    data: {
      title: 'Gallery',
      icon: 'icon-receipt',
      caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit - basic table',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
