import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path: 'table/:tableId', loadComponent: () => import('./pages/table/table.component').then(m => m.TableComponent), canActivate: [authGuard]},
    {path: '', loadComponent: () => import('./pages/cutomerlogin/cutomerlogin.component').then(m => m.CutomerloginComponent)},
];
