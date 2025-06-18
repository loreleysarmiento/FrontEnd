import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Author } from '../../model/author.entity';
import { AuthorService } from '../../services/author.service.service';
import { BookService } from '../../../../contents/books/services/book.service.service';
import { BookCardComponent } from '../../../../contents/books/components/book-card/book-card.component';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-author-profile',
  standalone: true,
  templateUrl: './author-profile.component.html',
  styleUrls: ['./author-profile.component.css'],
  imports: [
    RouterLink,
    BookCardComponent,
    NgForOf,
    NgIf
  ]
})
export class AuthorProfileComponent implements OnInit {
  author: Author | null = null;
  id: string | null = null;
  libros: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.authorService.getAuthorById(this.id).subscribe(author => {
        this.author = author;

        if (author) {
          const authorId = author.id;

          this.bookService.getBooks().subscribe((allBooks: any[]) => {
            this.libros = allBooks.filter((libro: any) =>
              libro.autor_id?.includes(authorId)
            );
          });
        }
      });
    }
  }

  get hasLibros(): boolean {
    return this.libros.length > 0;
  }
}
