export class Platform {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;

  constructor(platform: {
    id?: string,
    nombre?: string,
    descripcion?: string,
    imagen?: string
  }) {
    this.id = platform.id || '';
    this.nombre = platform.nombre || '';
    this.descripcion = platform.descripcion || '';
    this.imagen = platform.imagen || '';
  }
}
