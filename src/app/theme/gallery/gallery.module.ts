import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery.component';
import {GalleryRoutingModule} from './gallery-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {FileUploadModule} from 'ng2-file-upload';

    // NgxDatatableModule
@NgModule({
  imports: [
    CommonModule,
    GalleryRoutingModule,
    SharedModule,
    FileUploadModule
  ],
  declarations: [GalleryComponent]
})
export class GalleryModule {

}
