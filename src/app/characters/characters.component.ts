import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Character } from './character';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent {
  public characters: Character[] = [];

  constructor(private http: HttpClient){}

      ngOnInit(){
        this.getCountries();
      }
      
      getCountries() {
        this.http.get<Character[]>(environment.baseUrl + 'api/Characters').subscribe(
          {
            next: result => this.characters = result,
            error: error => console.log(error)
          }
        );
      }
}
