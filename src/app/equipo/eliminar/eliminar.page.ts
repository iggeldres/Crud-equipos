import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipoConID } from '../modelo/equipo';
import { ServicioService } from './../servicio/servicio.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.page.html',
  styleUrls: ['./eliminar.page.scss'],
})
export class EliminarPage implements OnInit {
  public idActiva: number = 0;
  public productoAct!: EquipoConID;

  constructor(
    private rutaAct: ActivatedRoute,
    private router: Router,
    private apiEquipo: ServicioService,
    private alerta: AlertController
  ) { }

  ngOnInit() {
    // this.rutaActiva.params.subscribe(parametros => {
    //   this.idActiva = parametros.idProducto; // undefined;
    // });
    this.rutaAct.paramMap.subscribe(parametros => {
      this.idActiva = +parametros.get('idProducto') // null;
      this.apiEquipo.obtenerProductoPorID(this.idActiva)
      .subscribe(datos => {
        if(datos){
          this.productoAct = datos;
        }else {
          this.router.navigate(['']);
        }
      })
    });
  }

  public async borrar(){
    const mensaje = await this.alerta.create({
      header: '¿Seguro quieres borrar?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Si, borrar',
          role: 'confirm',
          handler: () => {
            this.apiEquipo.eliminarProductoPorID(this.idActiva)
            .subscribe(() => {
              this.router.navigate(['']);
            })
          }
        }
      ]
    });
    await mensaje.present();
  }

}
