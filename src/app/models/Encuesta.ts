export class Encuesta{
    nombre: string;
    apellido : string;
    edad:number;
    nroTelefono: number;
    estrellas: number;
    mejorJuego: string;
    comentarios: string;

    constructor(
        nombre: string,
        apellido : string,
        edad:number,
        nroTelefono: number,
        estrellas: number,
        mejorJuego: string,
        comentarios: string
    ){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.nroTelefono = nroTelefono;
        this.estrellas = estrellas;
        this.mejorJuego = mejorJuego;
        this.comentarios = comentarios;
    }
}