import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// 导入我们生成的 5 个页面组件
import { HomeComponent } from './pages/home/home.component';
import { ManageComponent } from './pages/manage/manage.component';
import { SearchComponent } from './pages/search/search.component';
import { PrivacySecurityComponent } from './pages/privacy-security/privacy-security.component';
import { HelpComponent } from './pages/help/help.component';

// 定义路由规则
const routes: Routes = [
  { path: '', component: HomeComponent }, // 默认首页
  { path: 'manage', component: ManageComponent },
  { path: 'search', component: SearchComponent },
  { path: 'privacy', component: PrivacySecurityComponent },
  { path: 'help', component: HelpComponent },
  { path: '**', redirectTo: '' } // 如果用户乱输入网址，自动跳回首页
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }