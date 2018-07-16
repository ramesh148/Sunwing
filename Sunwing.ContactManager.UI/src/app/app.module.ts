import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { CustomerModule } from './customers/customer.module';
import { AppRoutingModule } from './app-routing.module';
import { SupplierModule } from './suppliers/supplier.module';
import { HttpModule } from '@angular/http';

@NgModule(
  {
    imports: [
      BrowserModule,
      HttpModule,                  
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