import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Encuesta } from '../../models/Encuesta';
import { Observable } from 'rxjs';
import { EncuestaService } from '../../services/encuesta.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resultados-encuesta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultados-encuesta.component.html',
  styleUrl: './resultados-encuesta.component.css'
})
export class ResultadosEncuestaComponent implements OnInit{
  resultados$!:Observable<Encuesta[]>;
  @Output() resultadoSeleccionado: EventEmitter<Encuesta> = new EventEmitter<Encuesta>();
  
  constructor(private encuestaService: EncuestaService){}

  ngOnInit(): void {
    this.resultados$ = this.encuestaService.traerResultados();
  }

  seleccionarResultado(encuesta: Encuesta):void{
    this.resultadoSeleccionado.emit(encuesta);
  }

}
