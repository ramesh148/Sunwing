import { Injectable } from "@angular/core";
import { ICustomer } from "./customer";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/do";

@Injectable()
export class CustomerService {

    constructor(private _httpClient: HttpClient) {

    }

    private _customerUrl: string = './api/products/customers.json';

    getCustomers(): Observable<ICustomer[]> {
        return this._httpClient.get<ICustomer[]>(this._customerUrl)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }
}