import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'table/:tableId', loadComponent: () => import('./pages/table/table.component').then(m => m.TableComponent)},
];
