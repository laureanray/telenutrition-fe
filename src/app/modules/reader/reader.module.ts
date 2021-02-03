import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReaderShellComponent} from './reader-shell/reader-shell.component';
import {RenderComponent} from './render/render.component';


@NgModule({
  declarations: [ReaderShellComponent, RenderComponent],
  imports: [
    CommonModule
  ]
})
export class ReaderModule {
}
