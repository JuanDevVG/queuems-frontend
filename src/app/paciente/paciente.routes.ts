import { Routes } from "@angular/router";
import { TurnoComponent } from "./turno/turno.component";
import { PacienteComponent } from "./paciente.component";
import { authGuard } from "../guards/auth.guard";


export const PACIENTE_ROUTES:Routes = [
    {
        path: '',
        component:PacienteComponent
    },
    {
        path: 'turno',
        component: TurnoComponent
    }
]