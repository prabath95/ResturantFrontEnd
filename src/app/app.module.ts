import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClarityModule } from "clarity-angular";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { VerticalnavComponent } from './verticalnav/verticalnav.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { BreakfastComponent } from './menu/breakfast/breakfast.component';
import { LunchComponent } from './menu/lunch/lunch.component';
import { DinnerComponent } from './menu/dinner/dinner.component';
import { BooktableComponent } from './booktable/booktable.component';
import { ContactusComponent } from './contactus/contactus.component';
import { LoginmodalComponent } from './shared/loginmodal/loginmodal.component';
import { LoginComponent } from './login/login.component';

import { LoginServiceService } from "./services/login/login-service.service";
import { BookingserviceService } from "./services/booking/bookingservice.service";
import { DessertsComponent } from './menu/desserts/desserts.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const appRoutes: Routes = [
  {
    path: '',
    component : HomeComponent,
  },
  {
    path: 'home', 
    component : HomeComponent,
  },
  {
    path: 'header',
    component : HeaderComponent,
  },
  {
    path: 'about',
    component : AboutusComponent,
  },
  {
    path: 'menu/breakfast',
    component : BreakfastComponent,
  },
  {
    path: 'menu/lunch',
    component : LunchComponent,
  },
  {
    path: 'menu/dinner',
    component : DinnerComponent,
  },
  {
    path: 'menu/dessert', 
    component : DessertsComponent,
  },
  {
    path: 'booktable',
    component : BooktableComponent,
  },
  {
    path: 'signup',
    component : SignUpComponent,
  },
  {
    path: 'contactus',
    component : ContactusComponent,
  },
  {
    path: 'login',
    component : LoginComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    VerticalnavComponent,
    AboutusComponent,
    BreakfastComponent,
    LunchComponent,
    DinnerComponent,
    BooktableComponent,
    ContactusComponent,
    LoginmodalComponent,
    LoginComponent,
    DessertsComponent,
    SignUpComponent,
  ],
  imports: [
    ClarityModule.forRoot(),
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    LoginServiceService,
    BookingserviceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
