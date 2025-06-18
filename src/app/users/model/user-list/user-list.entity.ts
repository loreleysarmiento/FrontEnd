export class UserListEntity {
  id: string;
  userId: string;
  name: string;
  description: string;
  list_content: string[];

  constructor(list: {
    id?: string;
    userId?: string;
    name?: string;
    description?: string;
    list_content?: string[];
  }) {
    this.id = list.id || '';
    this.userId = list.userId || '';
    this.name = list.name || '';
    this.description = list.description || '';
    this.list_content = list.list_content || [];
  }
}
