// src/app/model/review.entity.ts
export class Review {
  id: string;
  userId: string;
  contenidoId: string;
  rating: number;
  text: string;
  createdAt: Date;

  constructor(review: {
    id?: string,
    userId?: string,
    contenidoId?: string,
    rating?: number,
    text?: string,
    createdAt?: Date
  }) {
    this.id = review.id || '';
    this.userId = review.userId || '';
    this.contenidoId = review.contenidoId || '';
    this.rating = review.rating || 0;
    this.text = review.text || '';
    this.createdAt = review.createdAt || new Date();
  }
}
