import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, forkJoin, switchMap, catchError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PerritosService {
    private apiUrlBreedImage = 'https://dog.ceo/api/breed';
    private apiUrlBreedsList = 'https://dog.ceo/api/breeds/list/all';

    constructor(private http: HttpClient) { }

    obtenerRazaAleatoria(): Observable<string> {
        return this.http.get<{ message: { [key: string]: string[] }, status: string }>(this.apiUrlBreedsList).pipe(
            map(response => {
                const todasRazas = Object.keys(response.message);
                const razaAleatoria = todasRazas[Math.floor(Math.random() * todasRazas.length)];
                return razaAleatoria;
            })
        );
    }

    obtenerImagenDeRaza(raza: string): Observable<string> {
        const url = `${this.apiUrlBreedImage}/${raza}/images/random`;
        return this.http.get<{ message: string, status: string }>(url).pipe(
            map(response => response.message),
            catchError(error => {
                console.error("Error al obtener la imagen de la raza:", error);
                throw error;
            })
        );
    }

    obtenerRazasRandom(razaExcluida: string): Observable<string[]> {
        return this.http.get<{ message: { [key: string]: string[] }, status: string }>(this.apiUrlBreedsList).pipe(
            map(response => {
                const todasRazas = Object.keys(response.message);
                return todasRazas
                    .filter(breed => breed !== razaExcluida)
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 3);
            })
        );
    }

    traerPregunta(): Observable<{ imagenUrl: string, razaCorrecta: string, opciones: string[] }> {
        return this.obtenerRazaAleatoria().pipe(
            switchMap(razaCorrecta => 
                this.obtenerImagenDeRaza(razaCorrecta).pipe(
                    switchMap(imagenUrl => 
                        this.obtenerRazasRandom(razaCorrecta).pipe(
                            map(otrasRazas => ({
                                imagenUrl,
                                razaCorrecta,
                                opciones: [razaCorrecta, ...otrasRazas].sort(() => Math.random() - 0.5)
                            }))
                        )
                    )
                )
            )
        );
    }
}
