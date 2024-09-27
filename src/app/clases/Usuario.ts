import { provideExperimentalZonelessChangeDetection } from "@angular/core";

export class Usuario {
    email: string;
    clave: string;
    

    constructor() {
        this.email = "email@admin.com";
        this.clave = "admin123";
        
    }
}

// COMANDOS !!!
//ng build
//firebase deploy