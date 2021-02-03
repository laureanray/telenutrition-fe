import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginAndRegisterComponent} from './login-and-register/login-and-register.component';

const routes: Routes = [
  {path: 'login', component: LoginAndRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
