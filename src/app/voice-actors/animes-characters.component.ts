import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment.development';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../auth/oktaauth.service';

interface NewAnimeCharacter {
  animeName: string;
  animeImage: File | null;
  characterName: string;
  characterImage: File | null;
}

@Component({
  selector: 'app-animes-characters',
  standalone: true,
  imports: [CommonModule,
  MatTableModule, FormsModule],
  templateUrl: './animes-characters.component.html',
  styleUrl: './animes-characters.component.scss'
})
export class AnimesCharactersComponent implements OnInit{
  public animesCharacters: any[] = [];
  public displayedColumns: string[] = ['animeId', 'animeName', 'animeImage', 'characterId', 'characterName', 'characterImage'];
  private id: number = 0;
  public isAuthorized : boolean = false;
  public showForm: boolean = false;
  public showIncompleteFieldsError: boolean = false;
  public newAnimeCharacter: NewAnimeCharacter = {
    animeName: '',
    animeImage: null,
    characterName: '',
    characterImage: null
  }

  constructor(private http: HttpClient, private route: ActivatedRoute, private authService : AuthenticationService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
      this.getAnimesCharacters();
      this.checkAuthorization();
    });
  }

  getAnimesCharacters(): void {
    this.http.get<any[]>(`${environment.baseUrl}api/VoiceActors/AnimesCharacters/${this.id}`).subscribe({
      next: data => this.animesCharacters = data,
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

  showAddAnimeCharacterForm(): void {
    this.showForm = true;
  }

  handleAnimeFileInput(event: any): void {
    const file = event.target.files[0];
    this.newAnimeCharacter.animeImage = file;
  }

  handleCharacterFileInput(event: any): void {
    const file = event.target.files[0];
    this.newAnimeCharacter.characterImage = file;
  }

  addNewAnimeCharacter(): void {
    if (!this.newAnimeCharacter.animeName || !this.newAnimeCharacter.animeImage || !this.newAnimeCharacter.characterName || !this.newAnimeCharacter.characterImage) {
      this.showIncompleteFieldsError = true;
      return;
    }
    const formData = new FormData();
    formData.append('animeName', this.newAnimeCharacter.animeName);
    if(this.newAnimeCharacter.animeImage){
      formData.append('animeImage', this.newAnimeCharacter.animeImage);
    }
    formData.append('characterName', this.newAnimeCharacter.characterName);
    if(this.newAnimeCharacter.characterImage){
      formData.append('characterImage', this.newAnimeCharacter.characterImage);
    }

    this.http.post(environment.baseUrl + `api/VoiceActors/${this.id}/AddAnimeCharacter`, formData).subscribe({
      next: () => {
        this.getAnimesCharacters();
        this.newAnimeCharacter = {
          animeName: '',
          animeImage: null,
          characterName: '',
          characterImage: null
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
