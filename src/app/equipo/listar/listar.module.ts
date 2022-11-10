import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { IonicModule } from '@ionic/angular';
import { ServicioService } from './../servicio/servicio.service';
import { ListarPageRoutingModule } from './listar-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ListarPage } from './listar.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ListarPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ListarPage],
  providers: [ServicioService]
})
export class ListarPageModule {}
