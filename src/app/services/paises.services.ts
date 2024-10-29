import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';

interface Pais {
cca3: string; // Use cca3 as ID
name: {
common: string;
};
flags: {
svg: string;
};
region: string;
capital: string[];
}

@Injectable({
providedIn: 'root'
})
export class PaisesService {
private apiUrl: string = 'https://restcountries.com/v3.1/all';
private apiUrlbyName: string = 'https://restcountries.com/v3.1/name/';

constructor(private http: HttpClient) { }

traerPaises(): Observable<Pais[]> {
return this.http.get<Pais[]>(this.apiUrl).pipe(
    map(paises => paises.sort((a, b) => a.name.common.localeCompare(b.name.common)))
);
}

traerPaisporNombre(nombre: string): Observable<any> {
return this.http.get<any[]>(`${this.apiUrlbyName}${nombre}`).pipe(
    map(response => response[0])
);
}

obtenerCapitalYBanderas(): Observable<{ capital: string; opciones: { nombre: string; bandera: string }[] }> {
return this.http.get<Pais[]>(this.apiUrl).pipe(
    map((paises) => paises.filter(pais => pais.capital && pais.capital.length > 0)),
    switchMap((paises) => {
    const paisCorrecto = paises[Math.floor(Math.random() * paises.length)];
    const opciones = [
        { nombre: paisCorrecto.name.common, bandera: paisCorrecto.flags.svg }
    ];
    while (opciones.length < 4) {
        const paisAleatorio = paises[Math.floor(Math.random() * paises.length)];
        if (!opciones.some(op => op.nombre === paisAleatorio.name.common)) {
        opciones.push({ nombre: paisAleatorio.name.common, bandera: paisAleatorio.flags.svg });
        }
    }
    return of({
        capital: paisCorrecto.capital[0],
        opciones: this.desordenarArray(opciones)
    });
    })
);
}

private desordenarArray(array: any[]): any[] {
return array.sort(() => Math.random() - 0.5);
}
}
