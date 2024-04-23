import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table'; // Make sure this is imported
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-animes-voiceactors',
  standalone: true,
  imports: [CommonModule,MatTableModule],
  templateUrl: './animes-voiceactors.component.html',
  styleUrl: './animes-voiceactors.component.scss'
})
export class AnimesVoiceactorsComponent implements OnInit{
  public animeVoiceactors: any[] = []; // Adjust the type according to your data model
  public displayedColumns: string[] = ['animeId', 'animeName', 'animeImage','voiceActorId', 'voiceActorName', 'voiceActorImage'];
  private id: number = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
      this.getAnimesVoiceactors();
    });
  }

  getAnimesVoiceactors(): void {
    this.http.get<any[]>(`${environment.baseUrl}api/Characters/AnimesVoiceactors/${this.id}`).subscribe({
      next: data => this.animeVoiceactors = data,
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



