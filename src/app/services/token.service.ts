import { Injectable } from '@angular/core';

const TOKEN_STORE_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() { }

  get(): string {
    return localStorage.getItem(TOKEN_STORE_KEY);
  }

  set(token: string): void {
    localStorage.setItem(TOKEN_STORE_KEY, token);
  }
}
