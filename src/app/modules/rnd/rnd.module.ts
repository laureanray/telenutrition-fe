import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RndComponent } from './rnd/rnd.component';
import { RndNavComponent } from './rnd-nav/rnd-nav.component';
import { RndRoutingModule } from './rnd-routing.module';

@NgModule({
  declarations: [RndComponent, RndNavComponent],
  imports: [
    CommonModule,
    RndRoutingModule
  ]
})
export class RndModule { }
