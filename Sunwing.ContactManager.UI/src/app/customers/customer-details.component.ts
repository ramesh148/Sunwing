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
    let id = +this._route.snapshot.paramMap.get('Id');
    this.pageTitle += `: ${id}`;
    this.customer = {
      "Id": id,
      "FirstName": "Leaf Rake",
      "LastName": "GDN-0011",
      "BirthDay": "March 19, 2016",
      "Email": "Leaf rake with 48-inch wooden handle.",     
    }
  }
  
  onBack():void{
    this._router.navigate(['/customers']);
  }
}

