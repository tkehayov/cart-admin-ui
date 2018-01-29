import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery.component';
import {GalleryRoutingModule} from './gallery-routing.module';
import {SharedModule} from '../../shared/shared.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import {SimpleNotificationsModule} from 'angular2-notifications';

    // NgxDatatableModule
@NgModule({
  imports: [
    CommonModule,
    GalleryRoutingModule,
    SharedModule,
    ImageCropperModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [GalleryComponent]
})
export class GalleryModule {

}
