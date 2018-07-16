import { ReactiveFormsModule } from '@angular/forms'
import { CustomerListComponent } from './customer-list.component';
import { CustomerDetailsComponent } from './customer-details.component';
import { RouterModule } from '@angular/router';
import { CustomerService } from './customer.service';
import { SharedModule } from './../shared/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { NgModule } from '@angular/core';
import { CustomerEditComponent } from './customer-edit.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    CustomerRoutingModule,
    RouterModule.forChild([
      {
        path: 'customers',
        component: CustomerListComponent
      },
      {
        path: 'customer/:id',
        component: CustomerDetailsComponent
      },
      {
        path: 'customerEdit/:id',
        component: CustomerEditComponent
      },
    ])
  ],

  declarations: [
    CustomerListComponent,
    CustomerDetailsComponent,
    CustomerEditComponent
  ],

  providers: [
    CustomerService,
  ]
})

export class CustomerModule { }
