import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASICENDPOINT } from '../../../constants';
import { transition, trigger, style, animate } from '@angular/animations';
import { NotificationsService } from 'angular2-notifications';

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
  images = [];
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

  state: any;
  category = [];

  constructor(private http: HttpClient, private servicePNotify: NotificationsService) {
    const name = new FormControl('', Validators.required);
    const description = new FormControl('', Validators.required);
    const salePrice = new FormControl('', [Validators.required, CustomValidators.number]);
    this.state = ITreeState;

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
  }

  onSubmit() {
    this.servicePNotify.remove();
    this.submitted = true;

    if (this.productForm.status === "VALID") {
      this.http.post(BASICENDPOINT + '/products', this.productForm.value).subscribe(data => {
        this.state.focusedNodeId = 0;
        this.productForm.value.featureImage = "";
        this.featureImageUrl = "";

        this.gallery.filenames = [];
        this.gallery.id = [];

        this.productForm.setValue({
          name: "",
          description: "",
          salePrice: 0
        });

        this.servicePNotify.success(
          "Success",
          "Product added"
        );
      }, Error => {
        console.log(this.productForm.value);

        // this.productForm.setValue({
        //   name: "",
        //   description: "",
        //   salePrice: 0,
        //   categoryId: ""
        // });

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
      this.images = JSON.parse(JSON.stringify(data));
    });
  }

  addproductFeatureImage(id, filename) {
    this.productForm.value.featureImage = id;
    this.featureImageUrl = filename;
    this.servicePNotify.success(
      "Success",
      "Feature image added"
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
}
