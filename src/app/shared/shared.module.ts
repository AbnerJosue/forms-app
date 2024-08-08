import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    Error404PageComponent,
    SideMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[ 
    Error404PageComponent,
    SideMenuComponent,
  ]
})
export class SharedModule { }
