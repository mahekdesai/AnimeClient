import { Routes } from '@angular/router';
import { HelloComponent } from './hello/hello.component';
import { AnimesComponent } from './animes/animes.component';
import { VoiceActorsComponent } from './voice-actors/voice-actors.component';
import { CharactersComponent } from './characters/characters.component';

export const routes: Routes = [
    {path : '', component : HelloComponent, pathMatch : 'full'}, 
    {path : 'animes', component : AnimesComponent},
    {path : 'voice-actors', component : VoiceActorsComponent},
    {path : 'characters', component : CharactersComponent},
];
