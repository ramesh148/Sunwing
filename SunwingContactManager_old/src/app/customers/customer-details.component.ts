import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICustomer } from './customer';

@Component({
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})

export class CustomerDetailsComponent implements OnInit {

  pageTitle: string = 'Customer Detail';
  customer: ICustomer;
  constructor(private _route: ActivatedRoute, private _router: Router) { }
  ngOnInit() {
    let id = +this._route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;
    this.customer = {
      "customerId": id,
      "firstName": "Leaf Rake",
      "lastName": "GDN-0011",
      "birthDay": "Aug 14th 2018",
      "email": "Leaf rake with 48-inch wooden handle."      
    }
  }
  
  onBack():void{
    this._router.navigate(['/customers']);
  }
}

