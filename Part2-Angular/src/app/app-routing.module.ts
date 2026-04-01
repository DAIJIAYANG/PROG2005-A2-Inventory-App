/**
 * Author: JIAYANG DAI
 * Student ID: 24664639
 * Email: j.dai.12@student.scu.edu.au
 * Assignment: PROG2005 Assessment 2 - Part 2
 * Description: Configuration file for application routing and navigation.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importing all page components for routing
import { HomeComponent } from './pages/home/home.component';
import { ManageComponent } from './pages/manage/manage.component';
import { SearchComponent } from './pages/search/search.component';
import { PrivacySecurityComponent } from './pages/privacy-security/privacy-security.component';
import { HelpComponent } from './pages/help/help.component';

// Defining the navigation paths for the application
const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route
  { path: 'manage', component: ManageComponent },
  { path: 'search', component: SearchComponent },
  { path: 'privacy', component: PrivacySecurityComponent },
  { path: 'help', component: HelpComponent },
  // Catch-all route to redirect invalid URLs back to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }