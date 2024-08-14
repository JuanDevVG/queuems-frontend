import { Categoria } from "./categoria.model";

export class Paciente {
    patientId:number;
    idType:string;
    identityCard:string | null;
    name:string;
    lastname:string;
    category:Categoria;
    active:boolean;

    constructor() {
        this.patientId = 0;
        this.idType = '';
        this.identityCard = '';
        this.name = '';
        this.lastname = '';
        this.category = new Categoria();
        this.active  = false;
    }
}