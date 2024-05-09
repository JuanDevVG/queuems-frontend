import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./login/login.routes').then(m => m.LOGIN_ROUTES)
    },
    {
        path: 'paciente',
        loadChildren: () => import('./paciente/paciente.routes').then(m => m.PACIENTE_ROUTES),
        canActivate: [authGuard]
    },
    {
        path: 'atencion',
        loadChildren: () => import('./atencion/atencion.routes').then(m => m.ATENCION_ROUTES),
        canActivate: [authGuard]
    },
    {
        path:'turnos',
        loadChildren: () => import('./turnos/turnos.routes').then(m => m.TURNOS_ROUTES),
        canActivate: [authGuard]
    },
    { 
        path: '', 
        redirectTo: '/login', 
        pathMatch: 'full' 
    }
];
