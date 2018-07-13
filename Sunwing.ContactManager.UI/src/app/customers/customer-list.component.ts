import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms'
import { ICustomer } from './customer';
import { Customer } from "./CustomerModel";
import { CustomerService } from './customer.service';

@Component({
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.css']
})

export class CustomerListComponent implements OnInit {
    pageTitle: string = 'Customer LIst';
    private errorMessage: string;
    FirstName: string = "";
    LastName: string = "";
    Email: string = "";
    BirthDay: string = "";
    Id: string = "";
    status: boolean = false;
    FormHeader = ""


    editCustomer: boolean = false;
    customers: Observable<ICustomer[]>
    test: any[];
    customerList: ICustomer[];
    mappedlist: ICustomer[] = [];
    dummyCustomer: ICustomer;

    constructor(private _customerService: CustomerService) {

    }

    ngOnInit(): void {
        this._customerService.getCustomers()
            .subscribe(customers => {
                this.customerList = customers
            },
                error => this.errorMessage = <any>error);
    }

    ShowCustomerForm = function (customer) {
        this.editCustomer = true;
        if (customer != null) {
            this.SetValuesForEdit(customer);
        }
        else {
            this.ResetValues();
        }
    }


    ShowCustomerFormForDelete = function (customer) {
        this.editCustomer = true;
        if (customer != null) {
            this.SetValuesForDelete(customer)
        }
    }

    SetValuesForDelete = function (customer) {
        this.FirstName = customer.FirstName;
        this.LastName = customer.LastName;
        this.Email = customer.Email;
        this.BirthDay = customer.BirthDay;
        this.Id = customer.Id;
        this.FormHeader = "Delete"
    }

    //Function to set the values for edit form
    SetValuesForEdit = function (customer) {
        this.FirstName = customer.FirstName;
        this.LastName = customer.LastName;
        this.Email = customer.Email;
        this.BirthDay = customer.BirthDay;
        this.Id = customer.Id;
        this.FormHeader = "Edit";
    }
    //Function to reset the values 
    ResetValues() {
        this.FirstName = "";
        this.LastName = "";
        this.Email = "";
        this.BirthDay = "";
        this.Id = "";
        this.FormHeader = "Add"
    }
    //Common function for the Operation 
    Save(customerForm: NgForm) {
        this.GetDummyObject(customerForm);

        switch (this.FormHeader) {
            case "Add":
                this.AddCustomer(this.dummyCustomer);
                break;
            case "Edit":
                this.UpdateCustomer(this.dummyCustomer);
                break;
            case "Delete":
                this.DeleteCustomer(this.dummyCustomer);
                break;
            default:
                break;

        }
    }

    GetDummyObject(customerForm: NgForm): ICustomer {
        this.dummyCustomer = new  Customer();
        this.dummyCustomer.Email = customerForm.value.Email;
        this.dummyCustomer.FirstName = customerForm.value.FirstName;
        this.dummyCustomer.LastName = customerForm.value.LastName;
        this.dummyCustomer.Id = customerForm.value.Id;
        return this.dummyCustomer;
    }
    AddCustomer(customer: ICustomer) {
        this._customerService.AddCustomer(this.dummyCustomer).subscribe(res => {
            this.customerList.push(res);
            alert("Data added successfully !! ")
            this.editCustomer = false;
        })
            , err => {
                console.log("Error Occured " + err);
            }
    }


    UpdateCustomer(customer: ICustomer) {
        this._customerService.EditCustomer(this.dummyCustomer).subscribe(res => {
            this.editCustomer = false;
            this._customerService.getCustomers().subscribe(res => {
                this.customerList = res;
            });
            alert("Customer data Updated successfully !!")
        });
    }

    DeleteCustomer(customer: ICustomer) {
        this._customerService.DeleteCustomer(this.dummyCustomer).subscribe(res => {
            this.editCustomer = false;
            // this._customerService.getCustomers().subscribe(res => {
            //     this.customerList = res;
            // });
            alert("Customer deleted succesfully !! ")
        });
    }
}