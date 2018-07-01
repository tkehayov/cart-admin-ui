import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASICENDPOINT } from '../../../constants';
import { transition, trigger, style, animate } from '@angular/animations';
import { NotificationsService } from 'angular2-notifications';
import { ITreeState } from 'angular-tree-component';

@Component({
  selector: 'app-product',
  templateUrl: './addproduct.component.html',
  styleUrls: [
    './addproduct.component.scss',
    './../../../../assets/icon/icofont/css/icofont.scss'
  ],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translate(0)' }),
        animate('400ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})

export class AddProductComponent implements OnInit {
  basicEndPoint = BASICENDPOINT;

  gallery = {
    "featureImage": "",
    "images": []
  };

  productForm: FormGroup;
  submitted: boolean;
  results: string[];
  imageChangedEvent: any = '';
  croppedImage: any = '';

  // pnotify options
  options: any = {
    position: ['bottom', 'right'],
    timeOut: 1000,
    theClass: 'small-icon'
  };

  state: ITreeState;
  category = [];

  constructor(private http: HttpClient, private servicePNotify: NotificationsService) {
    const name = new FormControl('', Validators.required);
    const description = new FormControl('', Validators.required);
    const salePrice = new FormControl('', [Validators.required, CustomValidators.number]);
    const oldPrice = new FormControl('', [CustomValidators.number]);

    this.productForm = new FormGroup({
      name: name,
      description: description,
      salePrice: salePrice,
      oldPrice: oldPrice
    });
  }

  selectCategory() {
    this.productForm.value.categoryId = this.state.focusedNodeId;
  }

  ngOnInit() {
    this.listCategories();
  }

  onSubmit() {
    this.servicePNotify.remove();
    this.submitted = true;

    if (this.productForm.status === "VALID") {
      this.productForm.value.status = "inactive";
      this.productForm.value.gallery = this.gallery;

      this.http.post(BASICENDPOINT + '/products', this.productForm.value).subscribe(data => {
        this.state.focusedNodeId = 0;
        this.productForm.value.featureImage = "";

        this.productForm.setValue({
          name: "",
          description: "",
          salePrice: 0,
          oldPrice: null
        });

        this.servicePNotify.success(
          "Success",
          "Product added"
        );
      }, Error => {
        console.log(this.productForm.value);
      });
    }
  }

  send(type) {
    var formData = new FormData();
    var croppedImage = this.dataURItoBlob(this.croppedImage);

    formData.set("file", croppedImage, "bat.jpg");

    this.http.post(BASICENDPOINT + '/gallery/image', formData).subscribe(data => {
      var parsedJson = JSON.parse(JSON.stringify(data));
      if (type == "gallery") {
        this.gallery.images.push(parsedJson.filename);
      }

      if (type == "feature") {
        this.gallery.featureImage = parsedJson.filename;
      }

      this.servicePNotify.success(
        "Success",
        "Feature image added"
      );
    }, Error => {
      console.log(Error);
    });
  }

  listCategories() {
    this.http.get(BASICENDPOINT + '/categories').subscribe(data => {
      this.category = JSON.parse(JSON.stringify(data));
    });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(image: string) {
    this.croppedImage = image;
  }

  dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    var blob = new Blob([ab], { type: mimeString });
    return blob;
  }
}
