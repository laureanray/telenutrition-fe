import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AboutUsComponent} from './about-us/about-us.component';
import {HowItWorksComponent} from './how-it-works/how-it-works.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AppComponent} from './root/app.component';
import {HomeComponent} from './home/home.component';
import {ConfirmComponent} from './confirm/confirm.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full'},
  { path: 'about', component: AboutUsComponent, pathMatch: 'full' },
  { path: 'how-it-works', component: HowItWorksComponent, pathMatch: 'full' },
  { path: 'contact', component: ContactUsComponent, pathMatch: 'full' },
  { path: 'confirm', component: ConfirmComponent, pathMatch: 'full' },
  {
    path: 'admin',
    loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)
    // data: { role: 'ROLE_ADMIN' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
