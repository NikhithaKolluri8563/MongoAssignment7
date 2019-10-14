import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  customer = {};
  customerForm: FormGroup;
  cust_id: string = '';
  cust_name: string = '';
  cust_email: string = '';
  cust_ph_num: string = '';
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      'cust_id': [null, Validators.required],
      'cust_name': [null, Validators.required],
      'cust_email': [null, Validators.required],
      'cust_ph_num': [null, Validators.required]
    });
    this.fetchCustomer(this.route.snapshot.params['id']);
  }
  fetchCustomerDetails(id) {
    this.api.getCustomer(id)
      .subscribe(data => {
        console.log(data);
        this.customer = data;
      });
  }
  onFormSubmit(form: NgForm) {
    let id = this.route.snapshot.params['id'];
    console.log(form)
    this.api.updateCustomer(id, form)
      .subscribe(res => {
        this.router.navigate(['/customer-details', id]);
      }, (err) => {
        console.log(err);
      });
  }
  fetchCustomer(id) {
    this.api.getCustomer(id).subscribe(data => {
      id = data._id;
      this.customerForm.setValue({
        cust_id: data.cust_id,
        cust_name: data.cust_name,
        cust_email: data.cust_email,
        cust_ph_num: data.cust_ph_num
      });
    });
  }
}
