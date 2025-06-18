import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentMixedComponent } from './content-mixed.component';

describe('ContentMixedComponent', () => {
  let component: ContentMixedComponent;
  let fixture: ComponentFixture<ContentMixedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentMixedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentMixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
