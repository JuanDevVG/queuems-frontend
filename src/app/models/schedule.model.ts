import { Paciente } from "./paciente.model";
import { Servicio } from "./servicio.model";
import { Usuario } from "./usuario.model";

export class Schedule {
    scheduleId: number;
    patient: Paciente;
    user: Usuario;
    scheduleNumber: string;
    scheduleAssignmentDate: string;
    scheduleAttendanceDate: string;
    status: boolean;
    service: Servicio;

    constructor () {
        this.scheduleId = 0;
        this.patient = new Paciente;
        this.user = new Usuario;
        this.scheduleNumber = "" ;
        this.scheduleAssignmentDate = "";
        this.scheduleAttendanceDate = "";
        this.status = true;
        this.service = new Servicio;
    }
}