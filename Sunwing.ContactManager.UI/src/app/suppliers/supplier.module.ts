import { NgModule } from '@angular/core';
import { SupplierListComponent } from './supplier-list.component';
import { SupplierDetailsComponent } from './supplier-details.component';
import { RouterModule } from '@angular/router';
import { SupplierService } from './supplier.service';
import { SupplierRoutingModule } from './supplier-routing.module';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'suppliers', 
        component: SupplierListComponent 
      },
      {
        path: 'suppliers/:Id',
        component: SupplierDetailsComponent
      },
    ]),
    SupplierRoutingModule
  ],

  declarations: [
    SupplierListComponent,
    SupplierDetailsComponent
  ],

  providers: [
    SupplierService,
  ]
})

export class SupplierModule { }
