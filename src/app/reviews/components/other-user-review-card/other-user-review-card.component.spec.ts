import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherUserReviewCardComponent } from './other-user-review-card.component';

describe('OtherUserReviewCardComponent', () => {
  let component: OtherUserReviewCardComponent;
  let fixture: ComponentFixture<OtherUserReviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherUserReviewCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherUserReviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
