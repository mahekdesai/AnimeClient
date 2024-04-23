import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { Anime } from './anime';

@Component({
  selector: 'app-animes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './animes.component.html',
  styleUrls: ['./animes.component.scss']  // Corrected from styleUrl to styleUrls
})
export class AnimesComponent implements OnInit {
  public animes: Anime[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAnimes();
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
}
