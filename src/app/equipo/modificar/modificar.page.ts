import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from './../servicio/servicio.service'
import { Equipo } from './../modelo/equipo';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {
  public imgC = false;
  public imgb64 = '';
  public formulario: FormGroup;
  public idActiva =  0;

  constructor(
    private router: Router,
    private rutaAct: ActivatedRoute,
    private apiEquipo: ServicioService,
    private formB: FormBuilder
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
    this.rutaAct.params.subscribe(parametros => {
      this.idActiva = parametros.idProducto;
      this.apiEquipo.obtenerProductoPorID(this.idActiva)
      .subscribe(producto => {
        if(producto){
          this.imgb64 = producto.imagen;
          this.formulario.setValue({
            ...producto
          });
          this.formulario.updateValueAndValidity();
        }
        else{
          this.router.navigate(['']);
        }
      })
    })

  }

  public modi(){
    if(this.formulario.invalid || this.imgC){
      this.formulario.markAllAsTouched();
      return;
    }
    this.apiEquipo.modificarPorID(this.idActiva,{
      ...this.formulario.value,
      imagen: this.imgb64
    }).subscribe(datos => {
      if(datos){
        alert('Modificado')
        this.router.navigate(['']);
      }
    })
  }

}
