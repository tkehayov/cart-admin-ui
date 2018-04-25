import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASICENDPOINT } from '../../../constants';
import { transition, trigger, style, animate } from '@angular/animations';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';

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
  featureImageUrl = "";
  gallery = {
    "id": [],
    "filenames": []
  };

  // pnotify options
  options: any = {
    position: ['bottom', 'right'],
    timeOut: 1000,
    theClass: 'small-icon'
  };

  state: ITreeState;
  category = [];

  constructor(private http: HttpClient, private servicePNotify: NotificationsService, private route: ActivatedRoute) {
    const name = new FormControl('', Validators.required);
    const description = new FormControl('', Validators.required);
    const salePrice = new FormControl('', [Validators.required, CustomValidators.number]);

    this.productForm = new FormGroup({
      name: name,
      description: description,
      salePrice: salePrice
    });
  }

  selectCategory() {
    this.productForm.value.categoryId = this.state.focusedNodeId;
  }

  ngOnInit() {
    this.listCategories();
    this.listImages();

    this.route.params.subscribe(params => this.queryParams = params.id);

    this.http.get(BASICENDPOINT + '/products/' + this.queryParams).subscribe(data => {
      var products = JSON.parse(JSON.stringify(data));
      this.featureImageUrl = products.featureImage;
      this.gallery.filenames = products.gallery;
      this.productForm.setValue({
        name: products.name,
        description: products.description,
        salePrice: products.salePrice
      });
    });
  }

  onSubmit() {
    this.servicePNotify.remove();
    this.submitted = true;

    if (this.productForm.status === "VALID") {
      this.productForm.value.id = this.queryParams;

      this.productForm.value.featureImage = this.featureImageUrl;
      this.productForm.value.gallery = this.gallery.filenames;

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
    });
  }

  listImages() {
    this.http.get(BASICENDPOINT + '/gallery/imagelist').subscribe(data => {
      var jsonData = JSON.parse(JSON.stringify(data));
      this.images = jsonData.gallery;
    });
  }

  addproductFeatureImage(id, filename) {
    this.productForm.value.featureImage = id;
    this.featureImageUrl = filename;
    this.servicePNotify.success(
      "Success",
      "Feature image edited"
    );
  }

  addproductGalleryImage(id, filename) {
    this.gallery.filenames.push(filename);
    this.gallery.id.push(id);
    this.productForm.value.gallery = this.gallery.id;

    this.servicePNotify.success(
      "Success",
      "Image added to gallery"
    );
  }

  deleteProductGallery(image) {
    var currentImageIndex = this.gallery.filenames.indexOf(image);

    if (currentImageIndex > -1) {
      this.gallery.filenames.splice(currentImageIndex, 1);
    }
  }

  deleteProductFeatureImage() {
    this.featureImageUrl = "";
  }
}
