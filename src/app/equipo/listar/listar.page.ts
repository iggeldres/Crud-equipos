import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EquipoConID } from '../modelo/equipo';
import { ServicioService } from '../servicio/servicio.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {
  @ViewChild(IonInfiniteScroll)
  public scroll: IonInfiniteScroll;
  public equipos: Array<EquipoConID> = [];
  constructor(
    private apiEquipo: ServicioService,
    private router: Router
  ) { }

  ngOnInit() {

  }
  ionViewWillEnter(){
    this.apiEquipo.listarPrimerosElementos()
    this.apiEquipo.listaProductos$.subscribe(datosActualizados => {
      this.equipos = datosActualizados;
      if(this.scroll){
        this.scroll.complete();
      }
    })
  }
  public cargarMasDatos(){
    this.apiEquipo.obtenerMasElementos();
  }
}
