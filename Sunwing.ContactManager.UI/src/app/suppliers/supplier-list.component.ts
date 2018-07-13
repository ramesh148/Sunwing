import { Component, OnInit } from '@angular/core';
import { ISupplier } from './supplier';
import { SupplierService } from './supplier.service';

@Component({
    templateUrl: './supplier-list.component.html',
    styleUrls: ['./supplier-list.component.css']
})

export class SupplierListComponent implements OnInit {
    pageTitle: string = 'Supplier LIst';    
    
    private errorMessage: string;
           
    suppliers: ISupplier[];

    constructor(private _supplierService: SupplierService) {

    }   

    ngOnInit(): void {
        this._supplierService.getSuppliers()
            .subscribe(suppliers => { 
                this.suppliers = suppliers 
            }, 
            error => this.errorMessage = <any>error);        
    }
}