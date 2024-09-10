import { provideExperimentalZonelessChangeDetection } from "@angular/core";

export class Usuario {
    usuario: string;
    clave: string;

    constructor() {
        this.usuario = "admin";
        this.clave = "admin123";
    }
}