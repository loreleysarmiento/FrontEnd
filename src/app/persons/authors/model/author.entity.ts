export class Author {
  id: string;
  nombre: string;
  descripcion: string;
  edad: number;
  ciudad_origen: string;
  imagen: string;

  constructor(author: Partial<Author>) {
    this.id = author.id || '';
    this.nombre = author.nombre || '';
    this.descripcion = author.descripcion || '';
    this.edad = author.edad || 0;
    this.ciudad_origen = author.ciudad_origen || '';
    this.imagen = author.imagen || '';
  }
}
