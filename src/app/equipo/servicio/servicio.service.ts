import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Equipo , EquipoConID, ProductoP } from './../modelo/equipo';
import { Observable, BehaviorSubject, pipe } from 'rxjs';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private URL_EQUIPO = 'http://localhost:3000/equipos';
  private paginaActual = 1;
  // Tiene que ser notificada de un cambio
  private comLista = new BehaviorSubject<Array<EquipoConID>>([]);
  // Emitir un observable para todos los componentes subcritos.
  public listaProductos$ = this.comLista.asObservable();
  constructor(
    private cliente: HttpClient
  ) { }

  public agregarEquipo(producto: Equipo){
    return this.cliente.post(this.URL_EQUIPO,producto,{
      headers: {
        'Content-Type':'application/json;charset=utf-8'
      }
    })
  }

  public listarPrimerosElementos(){
    this.cliente.get<Array<EquipoConID>>(`${this.URL_EQUIPO}?_page=1`)
    .subscribe(datos => {
      // Notifica un cambio
      this.paginaActual = this.paginaActual + 1;
      this.comLista.next(datos);
    });
  }

  public obtenerMasElementos(){
    this.cliente.get<Array<EquipoConID>>(`${this.URL_EQUIPO}?_page=${this.paginaActual}`)
    .pipe(
      delay(2000)
    )
    .subscribe(datos => {
      if(datos){
        this.paginaActual = this.paginaActual + 1;
        this.comLista.next(this.comLista.getValue().concat(datos));
      }

    })
  }

  public obtenerProductoPorID(id: number): Observable<EquipoConID | null> {
    return this.cliente.get<EquipoConID | null>(`${this.URL_EQUIPO}/${id}`);
  }

  public eliminarProductoPorID(id: number): Observable<any> {
      return this.cliente.delete(`${this.URL_EQUIPO}/${id}`)
  }

  public modificarPorID(id: number, payload: ProductoP): Observable<any>{
    return this.cliente.patch(`${this.URL_EQUIPO}/${id}`, payload, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  }
}
