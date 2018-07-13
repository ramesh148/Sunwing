import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { CustomerModule } from './customers/customer.module';
import { AppRoutingModule } from './app-routing.module';



@NgModule(
  {
    imports: [
      BrowserModule,      
      HttpClientModule,      
      CustomerModule,
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