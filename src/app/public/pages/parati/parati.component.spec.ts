import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParatiComponent } from './parati.component';

describe('ParatiComponent', () => {
  let component: ParatiComponent;
  let fixture: ComponentFixture<ParatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParatiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
