import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { Anime } from './anime';
import { AuthenticationService } from '../auth/oktaauth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface NewAnime {
  animeName: string;
  animeImage: File | null;
}

@Component({
  selector: 'app-animes',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './animes.component.html',
  styleUrl: './animes.component.scss',
})
export class AnimesComponent implements OnInit {
  public animes: Anime[] = [];
  public isAuthorized : boolean = false;
  public showForm: boolean = false;
  public newAnime: NewAnime = {
    animeName: '',
    animeImage: null,
  }

  constructor(private http: HttpClient, private authService : AuthenticationService, private router : Router) {}

  ngOnInit() {
    this.getAnimes();
    this.checkAuthorization();
  }
  
  getAnimes() {
    this.http.get<Anime[]>(environment.baseUrl + 'api/Animes').subscribe({
      next: result => this.animes = result,
      error: error => console.error(error)
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

  showAddAnimeForm(): void {
    this.showForm = true;
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    this.newAnime.animeImage = file;
  }

  addNewAnime(): void {
    const formData = new FormData();
    formData.append('animeName', this.newAnime.animeName);
    if (this.newAnime.animeImage) {
      formData.append('animeImage', this.newAnime.animeImage);
    }

    this.http.post(environment.baseUrl + 'api/Animes', formData).subscribe({
      next: () => {
        this.getAnimes();
        this.showForm = false;
      },
      error: (error) => console.error(error),
    });
  }

  onFormCancel(){
    this.showForm = false;
  }
}
