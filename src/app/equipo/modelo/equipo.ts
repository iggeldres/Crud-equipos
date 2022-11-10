export interface Equipo{
  imagen: string;
  nombre: string;
  abreviatura: string;
  pais: string;
  region:string;
  stock: number;
}

export interface EquipoConID extends Equipo {
  id: number;
}

export interface ProductoP extends Partial <Equipo>{}
