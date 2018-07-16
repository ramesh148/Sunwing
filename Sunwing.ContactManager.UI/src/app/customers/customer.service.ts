import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/Observable/of';

import { ICustomer } from './customer';

@Injectable()
export class CustomerService {

    constructor(private http: Http) {

    }
    customers:ICustomer[];
    private baseUrl: string = "http://localhost:5165/api/customer"; //'./api/customers/customers.json'; 


    getCustomers() {  
        return this.http.get(this.baseUrl)  
            .map((response: Response) => response.json())  
            .catch(this.handleError); 
    }
    
    getCustomerById(id: number) {  
        return this.http.get(this.baseUrl + "/" + id)  
            .map((response: Response) => response.json())  
            .catch(this.handleError)  
    } 

    saveCustomer(customer) {  
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.baseUrl + "/", customer, options)  
            .map((response: Response) => response.json())  
            .catch(this.handleError)  
    }
    
    updateCustomer(customer) {  
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const url = `${this.baseUrl}/${customer.Id}`;
        return this.http.put(url, customer, options)  
            .map((response: Response) => response.json())  
            .catch(this.handleError);  
    } 
    

    deleteCustomer(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
            .do(data => console.log('deleteCustomer: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    
    private handleError(error: Response): Observable<any> {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    initializeCustomer(): ICustomer {
        // Return an initialized object
        return {
            Id: 0,
            FirstName: null,
            LastName: null,
            BirthDay: null,
            Email: null,
        };
    }
}