///json-server --watch base.json
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , FormControl, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { ServicioService } from './../servicio/servicio.service'
import { Equipo } from './../modelo/equipo';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  public imgC = false;
  public imgb64 = '';
  public formulario: FormGroup;

  constructor(
    private formB: FormBuilder,
    private apiEquipo: ServicioService,
    private router: Router
  ) {
    this.formulario = this.formB.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      imagen: ['',[Validators.required]],
      abreviatura: ['',[Validators.required,Validators.minLength(2), Validators.maxLength(8)]],
      pais: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(30)]],
      region: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(30)]],
      stock:[0,[Validators.required, Validators.min(1)]],
    })
  }
  public campo(control: string) {
    return this.formulario.get(control);
  }
  public fueTocado(control: string) {
    return this.formulario.get(control).touched;
  }
  public estaSucio(control: string) {
    return this.formulario.get(control).dirty;
  }
  public cargarFoto(e: Event){
    this.imgC = true;
    const elemento = e.target as HTMLInputElement;
    const archivo = elemento.files[0];
    console.log(archivo);
    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onload = () => {
      this.imgC = false;
      console.log('Carga completa');
      this.imgb64 = reader.result as string;
    }
  }
  ngOnInit() {
  }
  public guardarImg(): void{
    if(this.formulario.invalid || this.imgC){
      this.formulario.markAllAsTouched();
      return;
    }
    this.apiEquipo.agregarEquipo({
      ...this.formulario.value,
      imagen: this.imgb64
    })
    .subscribe(resultado => {
      if(resultado){
        this.formulario.reset();
        this.formulario.updateValueAndValidity();
        alert('Imagen Guardada');
        this.router.navigate(['']);
      }
    })
  }
}
