import { invalid } from '@angular/compiler/src/render3/view/util';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthResult } from '../models/auth-result';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  validate(token: string): Observable<boolean> {
    return  of(token === 'VALID');
  }

  authenticate(username: string, password: string): Observable<AuthResult> {
    const success = username === 'username' &&  password === 'password';
    return of({
      result: success
        ? 'success'
        : 'fail',
      accessToken: success ? 'VALID' : undefined,
      message: success ? undefined : 'invalid credentials'
    });
  }
}
