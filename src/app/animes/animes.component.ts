import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Anime } from './anime';

@Component({
  selector: 'app-animes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './animes.component.html',
  styleUrl: './animes.component.scss'
})
export class AnimesComponent {
  public animes: Anime[] = [];

  constructor(private http: HttpClient){}

      ngOnInit(){
        this.getCountries();
      }
      
      getCountries() {
        this.http.get<Anime[]>(environment.baseUrl + 'api/Animes').subscribe(
          {
            next: result => this.animes = result,
            error: error => console.log(error)
          }
        );
      }
}
