import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {
  customerForm: FormGroup;
  cust_id: string = '';
  cust_name: string = '';
  cust_email: string = '';
  cust_ph_num: string = '';

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      'cust_id': [null, Validators.required],
      'cust_name': [null, Validators.required],
      'cust_email': [null, Validators.required],
      'cust_ph_num': [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.postCustomer(form)
      .subscribe(res => {
        let id = res['_id'];
        this.router.navigate(['/customer-details', id]);
      }, (err) => {
        console.log(err);
      });
  }
}

