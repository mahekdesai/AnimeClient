import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment.development';
import { AuthenticationService } from '../auth/oktaauth.service';
import { FormsModule } from '@angular/forms';

interface NewVoiceactorCharacter {
  characterName: string;
  characterImage: File | null;
  voiceActorName: string;
  voiceActorImage: File | null;
}

@Component({
  selector: 'app-voiceactors-characters',
  standalone: true,
  imports: [CommonModule, MatTableModule, FormsModule],
  templateUrl: './voiceactors-characters.component.html',
  styleUrls: ['./voiceactors-characters.component.scss']
})
export class VoiceactorsCharactersComponent implements OnInit {
  public voiceactorsCharacters: any[] = [];
  public displayedColumns: string[] = ['voiceActorId', 'voiceActorName', 'voiceActorImage', 'characterId', 'characterName', 'characterImage'];
  private id: number = 0;
  public isAuthorized : boolean = false;
  public showForm: boolean = false;
  public showIncompleteFieldsError: boolean = false;
  public newVoiceactorCharacter: NewVoiceactorCharacter = {
    characterName: '',
    characterImage: null,
    voiceActorName: '',
    voiceActorImage: null
  }

  constructor(private http: HttpClient, private route: ActivatedRoute, private authService : AuthenticationService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
      this.getVoiceactorsCharacters();
    });
    this.checkAuthorization();
  }

  getVoiceactorsCharacters(): void {
    this.http.get<any[]>(`${environment.baseUrl}api/Animes/VoiceactorsCharacters/${this.id}`).subscribe({
      next: data => this.voiceactorsCharacters = data,
      error: error => console.error('There was an issue fetching data:', error)
    });
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

  showAddVoiceactorCharacterForm(): void {
    this.showForm = true;
  }

  handleCharacterFileInput(event: any): void {
    const file = event.target.files[0];
    this.newVoiceactorCharacter.characterImage = file;
  }

  handleVoiceActorFileInput(event: any): void {
    const file = event.target.files[0];
    this.newVoiceactorCharacter.voiceActorImage = file;
  }

  addNewVoiceactorCharacter(): void {
    if (!this.newVoiceactorCharacter.characterName || !this.newVoiceactorCharacter.characterImage || !this.newVoiceactorCharacter.voiceActorName || !this.newVoiceactorCharacter.voiceActorImage) {
      this.showIncompleteFieldsError = true;
      return;
    }
    const formData = new FormData();
    formData.append('characterName', this.newVoiceactorCharacter.characterName);
    if(this.newVoiceactorCharacter.characterImage){
      formData.append('characterImage', this.newVoiceactorCharacter.characterImage);
    }
    formData.append('voiceActorName', this.newVoiceactorCharacter.voiceActorName);
    if(this.newVoiceactorCharacter.voiceActorImage){
      formData.append('voiceActorImage', this.newVoiceactorCharacter.voiceActorImage);
    }

    this.http.post(environment.baseUrl + `api/Animes/${this.id}/AddVoiceactorCharacter`, formData).subscribe({
      next: () => {
        this.getVoiceactorsCharacters();
        this.newVoiceactorCharacter = {
          characterName: '',
          characterImage: null,
          voiceActorName: '',
          voiceActorImage: null
        };
        this.showForm = false;
      },
      error: (error) => console.error(error),
    });
  }

  onFormCancel(){
    this.showForm = false;
  }
}
