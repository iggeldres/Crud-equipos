import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarPageRoutingModule } from './modificar-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { ModificarPage } from './modificar.page';
import { ServicioService } from '../servicio/servicio.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ModificarPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ModificarPage],
  providers: [ServicioService]
})
export class ModificarPageModule {}
