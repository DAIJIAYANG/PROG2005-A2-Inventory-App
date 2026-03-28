import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// 👉 新增这一行：导入表单模块
import { FormsModule } from '@angular/forms'; 

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
    FormsModule // 👉 新增这一行：把 FormsModule 放进这里
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }