import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuth } from '@okta/okta-auth-js';
import { BehaviorSubject, Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    oktaAuth = new OktaAuth({
    issuer: 'https://dev-11969775.okta.com/oauth2/default',
    clientId: '0oagvjn41y1HFONz75d7',
    redirectUri: 'http://localhost:4200/callback',
    scopes: ['openid', 'profile', 'email'],
    responseType: ['token', 'id_token'],
    pkce: true
  });
  private _authStatus = new BehaviorSubject<boolean>(false);
  public authStatus = this._authStatus.asObservable();
  public tokenKey = 'tokenKey';

  constructor(private router : Router) { }

  async login(): Promise<void> {
    try {
      const state = this.generateState();
      const nonce = this.generateNonce();
      await this.oktaAuth.token.getWithRedirect({
        responseType: ['token', 'id_token'],
        scopes: ['openid', 'profile', 'email'],
        state,
        nonce
      });
      await this.getToken();
    } catch (error) {
      console.error('Error initiating login:', error);
    }
  }

  async getToken() : Promise<string | null> {
    try {
      const tokens = await this.oktaAuth.token.parseFromUrl();
      if (tokens?.tokens?.accessToken) {
        this._setAuthStatus(true);
        localStorage.setItem(this.tokenKey, tokens.tokens.accessToken.accessToken);
        return null;
      } else {
        this._setAuthStatus(false);
        return null;
      }
      }
    catch (error) {
      console.error('Error handling redirect callback:', error);
      return null;
    }
  }

  private generateState(): string {
    return Math.random().toString(36).substring(2);
  }

  private generateNonce(): string {
    return Math.random().toString(36).substring(2);
  }

  private _setAuthStatus(isAuthenticated: boolean): void {
    this._authStatus.next(isAuthenticated);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.tokenKey) !== null;
  }

  logout(): void {
    this.oktaAuth.signOut();
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/']);
  }
}
