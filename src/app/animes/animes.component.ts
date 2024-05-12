import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { Anime } from './anime';
import { AuthenticationService } from '../auth/oktaauth.service';

@Component({
  selector: 'app-animes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './animes.component.html',
  styleUrl: './animes.component.scss',
})
export class AnimesComponent implements OnInit {
  public animes: Anime[] = [];
  public isAuthorized : boolean = false;

  constructor(private http: HttpClient, private authService : AuthenticationService) {}

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
      return image; // Image is already formatted correctly
    }
    return `data:image/jpeg;base64,${image}`; // Adjust the MIME type as needed
  }

  checkAuthorization(): void {
    console.log("IN ANIME COMPONENT")
    this.isAuthorized = this.authService.isAuthorized();
  }

  editEntries(): void {
    console.log('EDIT ENTRIES----------------------');
  }
}
