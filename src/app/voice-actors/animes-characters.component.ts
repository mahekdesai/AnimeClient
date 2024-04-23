import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table'; // Make sure this is imported
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-animes-characters',
  standalone: true,
  imports: [CommonModule, // Import CommonModule for *ngIf and other common directives
  MatTableModule],
  templateUrl: './animes-characters.component.html',
  styleUrl: './animes-characters.component.scss'
})
export class AnimesCharactersComponent implements OnInit{
  public animesCharacters: any[] = []; // Adjust the type according to your data model
  public displayedColumns: string[] = ['animeId', 'animeName', 'animeImage', 'characterId', 'characterName', 'characterImage'];
  private id: number = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
      this.getVoiceactorsCharacters();
    });
  }

  getVoiceactorsCharacters(): void {
    this.http.get<any[]>(`${environment.baseUrl}api/VoiceActors/AnimesCharacters/${this.id}`).subscribe({
      next: data => this.animesCharacters = data,
      error: error => console.error('There was an issue fetching data:', error)
    });
  }

  getFormattedImage(image: string): string {
    if (image.startsWith('data:image')) {
      return image; // Image is already formatted correctly
    }
    return `data:image/jpeg;base64,${image}`; // Adjust the MIME type as needed
  }
}
