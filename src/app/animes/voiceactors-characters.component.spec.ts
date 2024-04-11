import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceactorsCharactersComponent } from './voiceactors-characters.component';

describe('VoiceactorsCharactersComponent', () => {
  let component: VoiceactorsCharactersComponent;
  let fixture: ComponentFixture<VoiceactorsCharactersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoiceactorsCharactersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoiceactorsCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
