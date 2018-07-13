import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { CustomerModule } from './customers/customer.module';
import { AppRoutingModule } from './app-routing.module';
import { SupplierModule } from './suppliers/supplier.module';

@NgModule(
  {
    imports: [
      BrowserModule,      
      HttpClientModule,      
      CustomerModule,
      SupplierModule,
      AppRoutingModule
    ],

    declarations: [
      AppComponent,
      WelcomeComponent
    ],

    providers: [
     
    ],

    bootstrap: [AppComponent]
  }
)

export class AppModule { };