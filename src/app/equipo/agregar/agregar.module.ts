import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ServicioService } from './../servicio/servicio.service';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AgregarPageRoutingModule } from './agregar-routing.module';
import { AgregarPage } from './agregar.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AgregarPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  declarations: [AgregarPage],
  providers: [ServicioService]
})
export class AgregarPageModule {}
