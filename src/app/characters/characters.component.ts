import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Character } from './character';
import { AuthenticationService } from '../auth/oktaauth.service';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent {
  public characters: Character[] = [];
  public isAuthorized : boolean = false;

  constructor(private http: HttpClient, private authService : AuthenticationService){}

      ngOnInit(){
        this.getCharacters();
        this.checkAuthorization();
      }
      
      getCharacters() {
        this.http.get<Character[]>(environment.baseUrl + 'api/Characters').subscribe(
          {
            next: result => this.characters = result,
            error: error => console.log(error)
          }
        );
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
}
