import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimesVoiceactorsComponent } from './animes-voiceactors.component';

describe('AnimesVoiceactorsComponent', () => {
  let component: AnimesVoiceactorsComponent;
  let fixture: ComponentFixture<AnimesVoiceactorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimesVoiceactorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimesVoiceactorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
