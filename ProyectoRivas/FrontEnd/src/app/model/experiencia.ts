export class Experiencia {
    id? : number;
    nombreE : string;
    descripcionE : string;

    constructor(nombreE: string, descripcionE: string){
        this.nombreE = nombreE;
        this.descripcionE = descripcionE;
    }
} //"replico" el entity que tengo en la base de datos pero inicializo a nombre y descripción