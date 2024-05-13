import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-voiceactors-characters',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './voiceactors-characters.component.html',
  styleUrls: ['./voiceactors-characters.component.scss']
})
export class VoiceactorsCharactersComponent implements OnInit {
  public voiceactorsCharacters: any[] = [];
  public displayedColumns: string[] = ['voiceActorId', 'voiceActorName', 'voiceActorImage', 'characterId', 'characterName', 'characterImage'];
  private id: number = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
      this.getVoiceactorsCharacters();
    });
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
}
