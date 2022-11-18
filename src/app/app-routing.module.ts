import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login/login.component";
import { FanficsComponent } from "./components/fanfics/fanfics.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import {AddFanficComponent} from "./components/add-fanfic/add-fanfic.component";
import {AuthGuardService} from "./services/auth-guard/auth-guard.service";

const routes: Routes = [
  { component: LoginComponent, path: 'login' },
  { component: FanficsComponent, path: '' },
  { path: 'fanfics',   redirectTo: '', pathMatch: 'full' },
  { component: AddFanficComponent, path: 'add-fanfic', canActivate: [AuthGuardService] },
  { component: NotFoundComponent, path: '**' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
