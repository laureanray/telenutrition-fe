import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginAndRegisterComponent} from './login-and-register/login-and-register.component';

const routes: Routes = [
  { path: 'login', component: LoginAndRegisterComponent },
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
