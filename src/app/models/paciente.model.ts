import { Categoria } from "./categoria.model";

export class Paciente {
    id:number;
    identityCard:string;
    name:string;
    lastname:string;
    category:Categoria;
    active:boolean;

    constructor() {
        this.id = 0;
        this.identityCard = '';
        this.name = '';
        this.lastname = '';
        this.category = new Categoria();
        this.active  = false;
    }
}