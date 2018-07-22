import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASICENDPOINT } from '../../../constants';
import { transition, trigger, style, animate } from '@angular/animations';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { TreeNode, TreeModel, ITreeState, ITreeOptions } from 'angular-tree-component';

@Component({
  selector: 'app-product',
  templateUrl: './editproduct.component.html',
  styleUrls: [
    './editproduct.component.scss',
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

export class EditProductComponent implements OnInit {
  basicEndPoint = BASICENDPOINT;
  images = [];
  queryParams: { id: "" };
  productForm: FormGroup;
  submitted: boolean;
  results: string[];
  imageChangedEvent: any = '';
  gallery = {
    "featureImage": "",
    "images": []
  };
  categoryId = "";
  // pnotify options
  options: any = {
    position: ['bottom', 'right'],
    timeOut: 1000,
    theClass: 'small-icon'
  };
  status = "";
  croppedImage: any = '';
  state: ITreeState = {
    activeNodeIds: {}
  };

  category = [];

  constructor(private http: HttpClient, private servicePNotify: NotificationsService, private route: ActivatedRoute) {
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
    this.route.params.subscribe(params => this.queryParams = params.id);

    this.http.get(BASICENDPOINT + '/products/' + this.queryParams).subscribe(data => {
      var products = JSON.parse(JSON.stringify(data));
      this.gallery = products.gallery;
      this.status = products.status;
      this.categoryId = products.categoryId;

      this.productForm.setValue({
        name: products.name,
        description: products.description,
        salePrice: products.salePrice,
        oldPrice: products.oldPrice
      });
    });
    this.listCategories();
  }

  onSubmit() {
    this.servicePNotify.remove();
    this.submitted = true;

    if (this.productForm.status === "VALID") {
      this.productForm.value.id = this.queryParams;
      this.productForm.value.gallery = this.gallery;
      this.productForm.value.status = this.status;
      this.http.put(BASICENDPOINT + '/products', this.productForm.value).subscribe(data => {
        this.state.focusedNodeId = 0;

        this.servicePNotify.success(
          "Success",
          "Product edited"
        );
      }, Error => {
        console.log(this.productForm.value);
      });
    }
  }

  listCategories() {
    this.http.get(BASICENDPOINT + '/categories').subscribe(data => {
      this.category = JSON.parse(JSON.stringify(data));
      this.state.activeNodeIds[this.categoryId] = true;
    });
  }

  imageCropped(image: string) {
    this.croppedImage = image;
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

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  updateStatus(status) {
    this.status = status;
  }
}
