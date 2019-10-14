import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
customers: any;
customersList = ['cust_id', 'cust_name', 'cust_email', 'cust_ph_num'];

  dataSource = new CustomerDataSource(this.api);

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.api.getCustomers()
      .subscribe(res => {
        console.log(res);
        this.customers = res;
      }, err => {
        console.log(err);
      });
  }
}


export class CustomerDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super();
  }

  connect() {
    return this.api.getCustomers();
  }

  disconnect() {

  }
}
