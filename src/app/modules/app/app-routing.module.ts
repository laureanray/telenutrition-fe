import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginAndRegisterComponent} from './login-and-register/login-and-register.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {HowItWorksComponent} from './how-it-works/how-it-works.component';
import {ContactUsComponent} from './contact-us/contact-us.component';

const routes: Routes = [
  { path: 'login', component: LoginAndRegisterComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'contact', component: ContactUsComponent },
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
