import {inject, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login/login.component";
import { FanficsComponent } from "./components/fanfics/fanfics.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import {AddFanficComponent} from "./components/add-fanfic/add-fanfic.component";
import {AuthGuardService} from "./services/auth-guard/auth-guard.service";
import {FanficPageComponent} from "./components/fanfic-page/fanfic-page.component";
import {RegisterComponent} from "./components/register/register.component";
import {EditFanficComponent} from "./components/edit-fanfic/edit-fanfic.component";
import {AdminPanelComponent} from "./components/admin-panel/admin-panel.component";
import {RoleGuardService} from "./services/role-guard/role-guard.service";
import {AdultContentComponent} from "./components/adult-content/adult-content.component";

const routes: Routes = [
  { component: LoginComponent, path: 'login' },
  { component: RegisterComponent, path: 'register' },
  { component: FanficsComponent, path: '' },
  { path: 'fanfics',   redirectTo: '' },
  { path: 'adult-content', component: AdultContentComponent },
  { component: AddFanficComponent, path: 'add-fanfic', canActivate: [() => inject(AuthGuardService).canActivate()] },
  { component: EditFanficComponent, path: 'edit-fanfic/:id', canActivate: [() => inject(AuthGuardService).canActivate()] },
  { component: FanficPageComponent, path: 'fanfic/:id' },
  { component: AdminPanelComponent, path: 'admin-panel', canActivate: [() => inject(RoleGuardService).canActivate('Admin')] },
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
