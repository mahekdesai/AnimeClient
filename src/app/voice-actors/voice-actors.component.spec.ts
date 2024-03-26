import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceActorsComponent } from './voice-actors.component';

describe('VoiceActorsComponent', () => {
  let component: VoiceActorsComponent;
  let fixture: ComponentFixture<VoiceActorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoiceActorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoiceActorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
