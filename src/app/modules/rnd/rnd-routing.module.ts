import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RndComponent} from './rnd/rnd.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {
    path: '', component: RndComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent, pathMatch: 'full'},
      {path: 'account-settings', component: AccountSettingsComponent, pathMatch: 'full'}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule
  ],
  exports: [RouterModule]
})

export class RndRoutingModule {
}
