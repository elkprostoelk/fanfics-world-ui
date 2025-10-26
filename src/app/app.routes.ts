import { Routes } from '@angular/router';
import {Login} from './components/login/login';
import {AddFanfic} from './components/add-fanfic/add-fanfic';

export const routes: Routes = [
  { path: 'login', component: Login, pathMatch: 'full' },
  { path: 'add-fanfic', component: AddFanfic, pathMatch: 'full' },
];
