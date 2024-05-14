import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { VoiceActor } from './voice-actor';
import { AuthenticationService } from '../auth/oktaauth.service';
import { FormsModule } from '@angular/forms';

interface NewVoiceActor {
  voiceActorName: string;
  voiceActorImage: File | null;
}

@Component({
  selector: 'app-voice-actors',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './voice-actors.component.html',
  styleUrl: './voice-actors.component.scss'
})
export class VoiceActorsComponent {
  public voiceActors: VoiceActor[] = [];
  public isAuthorized : boolean = false;
  public showForm: boolean = false;
  public showIncompleteFieldsError: boolean = false;
  public newVoiceActor: NewVoiceActor = {
    voiceActorName: '',
    voiceActorImage: null,
  }

  constructor(private http: HttpClient, private authService : AuthenticationService){}

      ngOnInit(){
        this.getVoiceActors();
        this.checkAuthorization();
      }
      
      getVoiceActors() {
        this.http.get<VoiceActor[]>(environment.baseUrl + 'api/VoiceActors').subscribe(
          {
            next: result => this.voiceActors = result,
            error: error => console.log(error)
          }
        );
      }

      getFormattedImage(image: string): string {
        if (image.startsWith('data:image')) {
          return image; 
        }
        return `data:image/jpeg;base64,${image}`;
      }

      checkAuthorization(): void {
        this.isAuthorized = this.authService.isAuthorized();
      }

      showAddVoiceActorForm(): void {
        this.showForm = true;
      }
    
      handleFileInput(event: any): void {
        const file = event.target.files[0];
        this.newVoiceActor.voiceActorImage = file;
      }
    
      addNewVoiceActor(): void {
        if (!this.newVoiceActor.voiceActorName || !this.newVoiceActor.voiceActorImage) {
          this.showIncompleteFieldsError = true;
          return;
        }
        const formData = new FormData();
        formData.append('voiceActorName', this.newVoiceActor.voiceActorName);
        if (this.newVoiceActor.voiceActorImage) {
          formData.append('voiceActorImage', this.newVoiceActor.voiceActorImage);
        }
    
        this.http.post(environment.baseUrl + 'api/VoiceActors', formData).subscribe({
          next: () => {
            this.getVoiceActors();
            this.showForm = false;
          },
          error: (error) => console.error(error),
        });
      }

      onFormCancel(){
        this.showForm = false;
      }
}
