import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentMixedComponent } from '../../../contents/pages/content-mixed/content-mixed.component';

@Component({
  selector: 'app-parati',
  standalone: true,
  imports: [CommonModule, ContentMixedComponent],
  template: `<app-content-mixed></app-content-mixed>`,
  styleUrls: ['./parati.component.css']
})
export class ParatiComponent {}
