import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./login/login.routes').then(m => m.LOGIN_ROUTES)
    },
    {
        path: 'paciente',
        loadChildren: () => import('./paciente/paciente.routes').then(m => m.PACIENTE_ROUTES)
    },
    {
        path: 'atencion',
        loadChildren: () => import('./atencion/atencion.routes').then(m => m.ATENCION_ROUTES)
    },
    {
        path:'turnos',
        loadChildren: () => import('./turnos/turnos.routes').then(m => m.TURNOS_ROUTES)
    }
];
