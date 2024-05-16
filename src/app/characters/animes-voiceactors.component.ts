import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

interface NewAnimeVoiceactor {
  animeName: string;
  animeImage: File | null;
  voiceActorName: string;
  voiceActorImage: File | null;
}

@Component({
  selector: 'app-animes-voiceactors',
  standalone: true,
  imports: [CommonModule,MatTableModule, FormsModule],
  templateUrl: './animes-voiceactors.component.html',
  styleUrl: './animes-voiceactors.component.scss'
})
export class AnimesVoiceactorsComponent implements OnInit{
  public animeVoiceactors: any[] = [];
  public displayedColumns: string[] = ['animeId', 'animeName', 'animeImage','voiceActorId', 'voiceActorName', 'voiceActorImage'];
  private id: number = 0;
  public isAuthorized : boolean = false;
  public showForm: boolean = false;
  public showIncompleteFieldsError: boolean = false;
  public newAnimeVoiceactor: NewAnimeVoiceactor = {
    animeName: '',
    animeImage: null,
    voiceActorName: '',
    voiceActorImage: null
  }

  constructor(private http: HttpClient, private route: ActivatedRoute, private authService : AuthService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
      this.getAnimesVoiceactors();
    });
    this.checkAuthorization();
  }

  getAnimesVoiceactors(): void {
    this.http.get<any[]>(`${environment.baseUrl}api/Characters/AnimesVoiceactors/${this.id}`).subscribe({
      next: data => this.animeVoiceactors = data,
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
    this.isAuthorized = this.authService.isAuthenticated();
  }

  showAddAnimeVoiceactorForm(): void {
    this.showForm = true;
    this.showIncompleteFieldsError=false;
  }

  handleAnimeFileInput(event: any): void {
    const file = event.target.files[0];
    this.newAnimeVoiceactor.animeImage = file;
  }

  handleVoiceActorFileInput(event: any): void {
    const file = event.target.files[0];
    this.newAnimeVoiceactor.voiceActorImage = file;
  }

  addNewAnimeVoiceactor(): void {
    if (!this.newAnimeVoiceactor.animeName || !this.newAnimeVoiceactor.animeImage || !this.newAnimeVoiceactor.voiceActorName || !this.newAnimeVoiceactor.voiceActorImage) {
      this.showIncompleteFieldsError = true;
      return;
    }
    const formData = new FormData();
    formData.append('animeName', this.newAnimeVoiceactor.animeName);
    if(this.newAnimeVoiceactor.animeImage){
      formData.append('animeImage', this.newAnimeVoiceactor.animeImage);
    }
    formData.append('voiceActorName', this.newAnimeVoiceactor.voiceActorName);
    if(this.newAnimeVoiceactor.voiceActorImage){
      formData.append('voiceActorImage', this.newAnimeVoiceactor.voiceActorImage);
    }

    this.http.post(environment.baseUrl + `api/Characters/${this.id}/AddAnimeVoiceactor`, formData).subscribe({
      next: () => {
        this.getAnimesVoiceactors();
        this.newAnimeVoiceactor = {
          animeName: '',
          animeImage: null,
          voiceActorName: '',
          voiceActorImage: null
        };
        this.showForm = false;
        this.newAnimeVoiceactor.animeName='';
        this.newAnimeVoiceactor.animeImage=null;
        this.newAnimeVoiceactor.voiceActorImage=null;
        this.newAnimeVoiceactor.voiceActorName='';
      },
      error: (error) => console.error(error),
    });
  }

  onFormCancel(){
    this.showForm = false;
    this.newAnimeVoiceactor.animeName='';
    this.newAnimeVoiceactor.animeImage=null;
    this.newAnimeVoiceactor.voiceActorImage=null;
    this.newAnimeVoiceactor.voiceActorName='';
  }
}



