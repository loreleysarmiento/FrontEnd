export class Director {
  id: string;
  nombre: string;
  descripcion: string;
  edad: number;
  ciudad_origen: string;
  imagen: string;

  constructor(director: {
    id?: string,
    nombre?: string,
    descripcion?: string,
    edad?: number,
    ciudad_origen?: string,
    imagen?: string
  }) {
    this.id = director.id || '';
    this.nombre = director.nombre || '';
    this.descripcion = director.descripcion || '';
    this.edad = director.edad || 0;
    this.ciudad_origen = director.ciudad_origen || '';
    this.imagen = director.imagen || '';
  }
}
