import { NgModule } from '@angular/core';
import { CustomerListComponent } from './customer-list.component';
import { CustomerDetailsComponent } from './customer-details.component';
import { RouterModule } from '@angular/router';
import { CustomerService } from './customer.service';
import { SharedModule } from './../shared/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';

@NgModule({
  imports: [    
    RouterModule.forChild([
      { path: 'customers', component: CustomerListComponent },
        {
          path: 'customers/:Id',          
          component: CustomerDetailsComponent
        },
    ]),
    SharedModule,
    CustomerRoutingModule
  ],

  declarations: [
    CustomerListComponent,
    CustomerDetailsComponent    
  ],

  providers: [
    CustomerService,    
  ]
})

export class CustomerModule { }
