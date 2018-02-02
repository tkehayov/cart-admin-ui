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
    './../../../../assets/icon/icofont/css/icofont.scss'],
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

  // pnotify options
  options: any = {
    position: ['bottom', 'right'],
    timeOut: 5000,
    theClass: 'small-icon'
  };

  constructor(private http: HttpClient, private servicePNotify: NotificationsService) {
    const name = new FormControl('', Validators.required);
    const description = new FormControl('', Validators.required);
    const salePrice = new FormControl('', [Validators.required, CustomValidators.number]);

    this.productForm = new FormGroup({
      name: name,
      description: description,
      salePrice: salePrice
    });
  }

  ngOnInit() {
    this.listImages();
  }

  onSubmit() {
    this.servicePNotify.remove();
    this.submitted = true;

    if (this.productForm.status === "VALID") {
      this.http.post(BASICENDPOINT + '/products', this.productForm.value).subscribe(data => {
        this.servicePNotify.success(
          "",
          "Success!"
        );
      });
    }
  }

  listImages() {
    this.http.get(BASICENDPOINT + '/gallery/imagelist').subscribe(data => {
      this.images = JSON.parse(JSON.stringify(data));
    });
  }

  addproductFeatureImage(id) {
    this.productForm.value.featureImage = id;
    this.servicePNotify.success(
      "Success!",
      "Feature image added"
    );
  }
}
