import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { VoiceActor } from './voice-actor';

@Component({
  selector: 'app-voice-actors',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './voice-actors.component.html',
  styleUrl: './voice-actors.component.scss'
})
export class VoiceActorsComponent {
  public voiceActors: VoiceActor[] = [];

  constructor(private http: HttpClient){}

      ngOnInit(){
        this.getCountries();
      }
      
      getCountries() {
        this.http.get<VoiceActor[]>(environment.baseUrl + 'api/VoiceActors').subscribe(
          {
            next: result => this.voiceActors = result,
            error: error => console.log(error)
          }
        );
      }
}
