import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'agregar',
    loadChildren: () => import('./equipo/agregar/agregar.module').then( m => m.AgregarPageModule)
  },
  {
    path: 'eliminar/:idProducto',
    loadChildren: () => import('./equipo/eliminar/eliminar.module').then( m => m.EliminarPageModule)
  },
  {
    path: 'modificar/:idProducto',
    loadChildren: () => import('./equipo/modificar/modificar.module').then( m => m.ModificarPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./equipo/listar/listar.module').then( m => m.ListarPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
