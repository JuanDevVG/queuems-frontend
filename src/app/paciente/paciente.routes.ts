import { Routes } from "@angular/router";
import { PacienteComponent } from "./paciente.component";
import { TurnoComponent } from "./turno/turno.component";


export const PACIENTE_ROUTES:Routes = [
    {
        path: 'paciente', 
        component: PacienteComponent
    },
    {
        path: 'turno',
        component: TurnoComponent
    }
]