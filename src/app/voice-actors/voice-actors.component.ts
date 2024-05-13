import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { VoiceActor } from './voice-actor';
import { AuthenticationService } from '../auth/oktaauth.service';

@Component({
  selector: 'app-voice-actors',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './voice-actors.component.html',
  styleUrl: './voice-actors.component.scss'
})
export class VoiceActorsComponent {
  public voiceActors: VoiceActor[] = [];
  public isAuthorized : boolean = false;

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
}
