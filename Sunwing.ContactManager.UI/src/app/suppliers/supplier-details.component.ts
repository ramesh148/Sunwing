import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ISupplier } from './supplier';

@Component({
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.css']
})

export class SupplierDetailsComponent implements OnInit {

  pageTitle: string = 'Supplier Detail';
  supplier: ISupplier;
  constructor(private _route: ActivatedRoute, private _router: Router) { }
  ngOnInit() {
    let id = +this._route.snapshot.paramMap.get('Id');
    this.pageTitle += `: ${id}`;
    this.supplier = {
      "Id": id,
      "FirstName": "Leaf Rake",
      "LastName": "GDN-0011",
      "Telephone": "6473350575",           
    }
  }
  
  onBack():void{
    this._router.navigate(['/suppliers']);
  }
}

