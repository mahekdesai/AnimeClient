import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Character } from './character';
import { AuthenticationService } from '../auth/oktaauth.service';
import { FormsModule } from '@angular/forms';

interface NewCharacter {
  characterName: string;
  characterImage: File | null;
}

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent {
  public characters: Character[] = [];
  public isAuthorized : boolean = false;
  public showForm: boolean = false;
  public showIncompleteFieldsError: boolean = false;
  public newCharacter: NewCharacter = {
    characterName: '',
    characterImage: null,
  }

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

      showAddCharacterForm(): void {
        this.showForm = true;
      }
    
      handleFileInput(event: any): void {
        const file = event.target.files[0];
        this.newCharacter.characterImage = file;
      }
    
      addNewCharacter(): void {
        if (!this.newCharacter.characterName || !this.newCharacter.characterImage) {
          this.showIncompleteFieldsError = true;
          return;
        }
        const formData = new FormData();
        formData.append('characterName', this.newCharacter.characterName);
        if (this.newCharacter.characterImage) {
          formData.append('characterImage', this.newCharacter.characterImage);
        }
    
        this.http.post(environment.baseUrl + 'api/Characters', formData).subscribe({
          next: () => {
            this.getCharacters();
            this.showForm = false;
          },
          error: (error) => console.error(error),
        });
      }

      onFormCancel(){
        this.showForm = false;
      }
}
