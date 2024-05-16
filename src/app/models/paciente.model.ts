export class Paciente {
    id:number;
    identityCard:string;
    name:string;
    lastname:string;
    category:string;
    active:boolean;

    constructor(id:number, identityCard:string, name:string, lastname:string, category:string, active:boolean) {
        this.id = id;
        this.identityCard = identityCard;
        this.name = name;
        this.lastname = lastname;
        this.category = category;
        this.active  = active;
    }
}