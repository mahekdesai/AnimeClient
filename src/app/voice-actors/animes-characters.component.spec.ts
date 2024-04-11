import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimesCharactersComponent } from './animes-characters.component';

describe('AnimesCharactersComponent', () => {
  let component: AnimesCharactersComponent;
  let fixture: ComponentFixture<AnimesCharactersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimesCharactersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimesCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
