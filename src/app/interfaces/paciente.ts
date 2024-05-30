import { Categoria } from "../models/categoria.model";

export interface Paciente {
    id:number;
    idType:string;
    identityCard:string;
    name:string;
    lastname:string;
    category:Categoria;
    active:boolean;
}