import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }       from 'rxjs/Subscription';
import { ICustomer } from './customer';
import { CustomerService } from './customer.service';

@Component({
    templateUrl: './customer-details.component.html'
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Customer Detail';
    product: ICustomer;
    errorMessage: string;
    private sub: Subscription;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private customerService: CustomerService) {
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getCustomer(id);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getCustomer(id: number) {
        this.customerService.getCustomerById(id).subscribe(
            product => this.product = product,
            error => this.errorMessage = <any>error);
    }

    onBack(): void {
        this.router.navigate(['/customers']);
    }    
}