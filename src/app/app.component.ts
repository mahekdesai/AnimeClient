import { Component, Injector } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HelloComponent } from "./hello/hello.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { ReactiveFormsModule } from '@angular/forms';

const oktaConfig = {
  issuer: 'https://dev-11969775.okta.com/oauth2/default',
  clientId: '0oagvjn41y1HFONz75d7',
  redirectUri: 'https://comp584.anime-stars.com/callback',
  scopes: ['openid', 'profile', 'email']
};


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HelloComponent, NavBarComponent, OktaAuthModule, ReactiveFormsModule],
    providers: [
      {provide: OKTA_CONFIG, useValue: oktaConfig},
    ],
})

export class AppComponent {
  title = 'animeClient';
  
}
