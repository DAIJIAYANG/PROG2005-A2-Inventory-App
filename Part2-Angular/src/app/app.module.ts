/**
 * Author: JIAYANG DAI
 * Student ID: 24664639
 * Email: j.dai.12@student.scu.edu.au
 * Assignment: PROG2005 Assessment 2 - Part 2
 * Description: Root module configuration for the Angular application.
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Required for two-way data binding (ngModel)

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ManageComponent } from './pages/manage/manage.component';
import { SearchComponent } from './pages/search/search.component';
import { PrivacySecurityComponent } from './pages/privacy-security/privacy-security.component';
import { HelpComponent } from './pages/help/help.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ManageComponent,
    SearchComponent,
    PrivacySecurityComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule // Added FormsModule for form handling
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }