import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/Observable/fromEvent';
import 'rxjs/add/Observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ICustomer } from './customer';
import { CustomerService } from './customer.service';

import { GenericValidator } from '../shared/generic-validator';

function emailMatcher(c: AbstractControl) {
    let emailControl = c.get("email");
    let confirmEmailControl = c.get("confirmEmail");

    if (emailControl.pristine || confirmEmailControl.pristine) {
        return null;
    }

    if (emailControl.value === confirmEmailControl.value) {
        return null;
    };

    return { 'match': true };
}

@Component({
    templateUrl: './customer-edit.component.html'
})
export class CustomerEditComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    pageTitle: string = 'Customer Edit';
    errorMessage: string;
    customerForm: FormGroup;

    customer: ICustomer;
    private sub: Subscription;

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private customerService: CustomerService) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            firstName: {
                required: 'Customer first name is required.',
                minlength: 'Customer first name must be at least three characters.',
                maxlength: 'Customer first name cannot exceed 50 characters.'
            },
            lastName: {
                required: 'Customer last name is required.',
                minlength: 'Customer last name must be at least three characters.',
                maxlength: 'Customer last name cannot exceed 50 characters.'
            },

            email: {
                required: 'Customer email is required.',
                pattern: 'Cutomer email must be valid',
                match: 'The confirmation does not match email address.'
            },
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.customerForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(3), Validators.max(50)]],
            lastName: ['', [Validators.required, Validators.minLength(3), Validators.max(50)]],
            birthDay: '',
            email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],            
        });

        // Read the customer Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getCustomer(id);
            }
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        let controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.customerForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.customerForm);
        });
    }

    getCustomer(id: number): void {
        if (id != 0) {
            this.customerService.getCustomerById(id)
                .subscribe(
                    (customer: ICustomer) => this.onCustomerRetrieved(customer),
                    (error: any) => this.errorMessage = <any>error
                );
        }
    }

    onCustomerRetrieved(customer: ICustomer): void {
        if (this.customerForm) {
            this.customerForm.reset();
        }
        this.customer = customer;

        if (this.customer.Id === 0) {
            this.pageTitle = 'Add Customer';
        } else {
            this.pageTitle = `Edit Customer: ${this.customer.FirstName}`;
        }

        // Update the data on the form
        this.customerForm.patchValue({
            firstName: this.customer.FirstName,
            lastName: this.customer.LastName,
            email: this.customer.Email,
            birthDay: this.customer.BirthDay
        });
    }

    deleteCustomer(): void {
        if (this.customer.Id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the customer: ${this.customer.FirstName}?`)) {
                this.customerService.deleteCustomer(this.customer.Id)
                    .subscribe(
                        () => this.onSaveComplete(),
                        (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    saveCustomer(): void {
        if (this.customerForm.dirty && this.customerForm.valid) {
            // Copy the form values over the customer object values
            let p = Object.assign({}, this.customer, this.customerForm.value);

            this.customerService.saveCustomer(p)
                .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.customerForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.customerForm.reset();
        this.router.navigate(['/customers']);
    }
}