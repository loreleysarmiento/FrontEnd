export class ListEntity {
  id: string;
  userId: string;
  name: string;
  description: string;
  list_content: string[];

  constructor(listEntity: {
    id?: string,
    userId?: string,
    name?: string,
    description?: string,
    list_content?: string[]
  }) {
    this.id = listEntity.id || '';
    this.userId = listEntity.userId || '';
    this.name = listEntity.name || '';
    this.description = listEntity.description || '';
    this.list_content = listEntity.list_content || [];
  }
}
