import { Injectable } from "@angular/core";
import { ISupplier } from "./supplier";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/do";

@Injectable()
export class SupplierService {

    constructor(private _httpClient: HttpClient) {

    }

    private _supplierUrl: string = './api/suppliers/suppliers.json';

    getSuppliers(): Observable<ISupplier[]> {
        return this._httpClient.get<ISupplier[]>(this._supplierUrl)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }
}