import { Injectable } from "@angular/core";
import { ICustomer } from "./customer";
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/do";

@Injectable()
export class CustomerService {

    cutomers: Observable<ICustomer[]>;
    newCustomers: Observable<ICustomer>;

    constructor(private _httpClient: HttpClient) {

    }

    private _customerUrl: string = "http://localhost:5165/api/customer"; //'./api/customers/customers.json'; 

    
    getCustomers(): Observable<ICustomer[]> {
        return this._httpClient.get<ICustomer[]>(this._customerUrl + '/GetAll')
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    AddCustomer(customer: ICustomer) {
        const headers = new HttpHeaders().set('content-type', 'application/json');
        var body = {
            FirstName: customer.FirstName, LastName: customer.LastName, BirthDay: customer.BirthDay, Email: customer.Email,
        }
        return this._httpClient.post<ICustomer>(this._customerUrl + '/Customer', body, { headers })
    }

    EditCustomer(customer: ICustomer) {
        const params = new HttpParams().set('Id', customer.Id.toString());
        const headers = new HttpHeaders().set('content-type', 'application/json');
        var body = {
            Id:customer.Id, FirstName: customer.FirstName, LastName: customer.LastName, BirthDay: customer.BirthDay, Email: customer.Email,

        }
        return this._httpClient.put<ICustomer>(this._customerUrl , body, { headers, params })
    }

    DeleteCustomer(customer: ICustomer) {
        const params = new HttpParams().set('Id', customer.Id.toString());
        const headers = new HttpHeaders().set('content-type', 'application/json');
        var body = {
            Id:customer.Id, FirstName: customer.FirstName, LastName: customer.LastName, BirthDay: customer.BirthDay, Email: customer.Email,
        }
        return this._httpClient.delete<ICustomer>(this._customerUrl + "/delete?Id=" + customer.Id);
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }
}