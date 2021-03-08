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
import {AuthGuard} from '../../core/authentication/auth.guard';
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {RegisterRndComponent} from './register-rnd/register-rnd.component';
import {ProviderViewContext} from '@angular/compiler/src/provider_analyzer';
import {PrivacyComponent} from './privacy/privacy.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full'},
  { path: 'register-rnd', component: RegisterRndComponent, pathMatch: 'full'},
  { path: 'about', component: AboutUsComponent, pathMatch: 'full' },
  { path: 'how-it-works', component: HowItWorksComponent, pathMatch: 'full' },
  { path: 'contact', component: ContactUsComponent, pathMatch: 'full' },
  { path: 'confirm', component: ConfirmComponent, pathMatch: 'full' },
  { path: 'privacy', component: PrivacyComponent, pathMatch: 'full'},
  // { path: 'confirm-rnd', component: }
  { path: 'reset-password', component: PasswordResetComponent, pathMatch: 'full' },
  {
    path: 'admin',
    loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    data: { role: 'ROLE_ADMIN'}
    // data: { role: 'ROLE_ADMIN' }
  },
  {
    path: 'patient',
    loadChildren: () => import('../patient/patient.module').then(m => m.PatientModule),
    canActivate: [AuthGuard],
    data: { role: 'ROLE_PATIENT'}
  },
  {
    path: 'rnd',
    loadChildren: () => import('../rnd/rnd.module').then(m => m.RndModule),
    canActivate: [AuthGuard],
    data: { role: 'ROLE_RND'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
