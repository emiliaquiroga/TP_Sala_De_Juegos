import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Encuesta } from '../../models/Encuesta';
import { EncuestaService } from '../../services/encuesta.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css'
})
export class EncuestaComponent {

  form!: FormGroup;

  constructor(private encuestaService: EncuestaService){}
  ngOnInit(): void {
    this.form = new FormGroup({
      nombre: new FormControl("", [
        Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ\\s]+$'),
        Validators.required
      ]),
      apellido: new FormControl("", [
        Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ\\s]+$'),
        Validators.required
      ]),
      edad: new FormControl("", [
        Validators.min(18),
        Validators.max(99),
        Validators.required
      ]),
      nroTelefono: new FormControl("", [
        Validators.pattern('^[0-9]{7,10}$'),
        Validators.required
      ]),

      estrellas: new FormControl("", [
        Validators.pattern('^[0-9]{0,5}$'),
        Validators.required
      ]),

      mejorJuego: new FormControl("", [
        Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ\\s]+$'),
        Validators.required
      ]),
      
      comentarios: new FormControl("", [
        Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ\\s]+$'),
        Validators.required
      ]),
    });
  }

  get nombre(){
    return this.form.get('nombre');
  }
  get apellido(){
    return this.form.get('apellido');
  }
  get edad(){
    return this.form.get('edad');
  }
  get nroTelefono(){
    return this.form.get('nroTelefono');
  }
  get estrellas(){
    return this.form.get('estrellas');
  }
  get mejorJuego(){
    return this.form.get('mejorJuego');
  }
  get comentarios(){
    return this.form.get('comentarios');
  }


  enviarEncuesta():void{
    if(this.form.invalid){
      console.log("problema al momento de enviar la encuesta!")
      return;
    }

    const resultado = new Encuesta(
      this.form.value.nombre, 
      this.form.value.apellido,
      this.form.value.edad,
      this.form.value.nroTelefono,
      this.form.value.estrellas,
      this.form.value.mejorJuego,
      this.form.value.comentarios
    );
    this.encuestaService.guardarEncuesta(resultado)
    .then(():void=>{
      this.alertaExito('Tus respuestas se guardaron satisfactoriamente. ¡Gracias por tu Feedback!').then(() => {
        this.form.reset();
      })
    })
    .catch(error => {
      this.alertaError('Error al guardar tus respuestas: '+ error).then(()=>{
        this.form.reset();
        
      });
    });
  }

  private alertaExito(message: string) {
    return Swal.fire({
      title: 'Resultado Enviado!',
      text: message,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
  private alertaError(message: string) {
    return Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      confirmButtonText: 'Cerrar'
    });
  }
}

