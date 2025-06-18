export class Actor {
  id: string;
  nombre: string;
  descripcion: string;
  edad: number;
  ciudad_origen: string;
  imagen: string;

  constructor(actor: {
    id?: string,
    nombre?: string,
    descripcion?: string,
    edad?: number,
    ciudad_origen?: string,
    imagen?: string
  }) {
    this.id = actor.id || '';
    this.nombre = actor.nombre || '';
    this.descripcion = actor.descripcion || '';
    this.edad = actor.edad && Number.isInteger(actor.edad) ? actor.edad : 0;
    this.ciudad_origen = actor.ciudad_origen || '';
    this.imagen = actor.imagen || '';
  }
}
