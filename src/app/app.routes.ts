import { Routes } from '@angular/router';
import {Login} from './components/login/login';
import {AddFanfic} from './components/add-fanfic/add-fanfic';
import {Register} from './components/register/register';

export const routes: Routes = [
  { path: 'login', component: Login, pathMatch: 'full' },
  { path: 'register', component: Register, pathMatch: 'full' },
  { path: 'add-fanfic', component: AddFanfic, pathMatch: 'full' },
];
