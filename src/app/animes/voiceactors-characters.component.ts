import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { ActivatedRoute } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { VoiceactorsCharacters } from './voiceactors-characters';


@Component({
  selector: 'app-voiceactors-characters',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './voiceactors-characters.component.html',
  styleUrl: './voiceactors-characters.component.scss'
})
export class VoiceactorsCharactersComponent {
  public voiceactorsCharacters: VoiceactorsCharacters[] = [];
  public displayedColumns : string[] = ['voiceActorsId','voiceActorsName','voiceActorsImage'];
  id: number;
  constructor(private http: HttpClient, private activedRoute : ActivatedRoute){
    this.id = -1;
  }

      ngOnInit(){
        this.getCountryCities();
      }
      
      getCountryCities() {
        let idParam = this.activedRoute.snapshot.paramMap.get("id");
        this.id = idParam ? +idParam : 0;
        this.http.get<VoiceactorsCharacters[]>(`${environment.baseUrl}api/Animes/VoiceactorsCharacters/${this.id}`).subscribe(
          {
            next: result => this.voiceactorsCharacters = result,
            error: error => console.log(error)
          }
        );
      }
}