import { Routes } from '@angular/router';
import { HelloComponent } from './hello/hello.component';
import { AnimesComponent } from './animes/animes.component';
import { VoiceActorsComponent } from './voice-actors/voice-actors.component';
import { CharactersComponent } from './characters/characters.component';
import { VoiceactorsCharactersComponent } from './animes/voiceactors-characters.component';
import { AnimesVoiceactorsComponent } from './characters/animes-voiceactors.component';
import { AnimesCharactersComponent } from './voice-actors/animes-characters.component';
import { LoginComponent } from './auth/login.component';

export const routes: Routes = [
    {path : '', component : HelloComponent, pathMatch : 'full'}, 
    {path : 'animes', component : AnimesComponent},
    {path : 'voice-actors', component : VoiceActorsComponent},
    {path : 'characters', component : CharactersComponent},
    {path : 'animes/voiceActorsCharacters/:id', component : VoiceactorsCharactersComponent},
    {path : 'characters/animesVoiceActors/:id', component : AnimesVoiceactorsComponent},
    {path : 'voice-actors/animesCharacters/:id', component : AnimesCharactersComponent},
    {path : 'login', component : LoginComponent},
];
