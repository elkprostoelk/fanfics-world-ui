import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login/login.component";
import {FanficsComponent} from "./components/fanfics/fanfics.component";

const routes: Routes = [
  { component: LoginComponent, path: 'login' },
  { component: FanficsComponent, path: '' },
  { path: 'fanfics',   redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
