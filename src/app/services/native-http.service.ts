import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import '@capacitor-community/http';
import { HttpOptions, HttpResponse } from '@capacitor-community/http';
import { Plugins } from '@capacitor/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class NativeHttpService {

  constructor(private tokenService: TokenService, private router: Router) { }

  request(opt: HttpOptions): Promise<HttpResponse> {
    const { Http: http } = Plugins;

    return http.request({
      ...opt,
      headers: {
        ...(opt.headers || {}),
        // eslint-disable-next-line
        Authorization: `Bearer ${this.tokenService.get()}`
      }
    }).then((result) => {
      if (result.status === 401) {
        this.tokenService.clear();
        this.router.navigate([ '/login' ]);
        return undefined;
      }

      return result;
    });
  }
}
