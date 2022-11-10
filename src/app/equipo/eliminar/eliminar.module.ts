import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { IonicModule } from '@ionic/angular';
import { ServicioService } from './../servicio/servicio.service';
import { EliminarPageRoutingModule } from './eliminar-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { EliminarPage } from './eliminar.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    EliminarPageRoutingModule,
    HttpClientModule
  ],
  declarations: [EliminarPage],
  providers: [ServicioService]

})
export class EliminarPageModule {}
