import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonNav } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { AuthResult } from 'src/app/models/auth-result';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { ServerSettingsComponent } from './server-settings.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  private errorMessage: string;

  processing: boolean;

  form: FormGroup = new FormGroup({
    username: new FormControl('', [ Validators.required ]),
    password: new FormControl('', [ Validators.required ])
  });

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private nav: IonNav,
    private router: Router) { }

  ngOnInit() {
  }

  error(): string {
    return this.errorMessage;
  }

  authenticate() {
    const username = this.form.controls['username'].value;
    const password = this.form.controls['password'].value;
    this.processing = true;
    this.errorMessage = null;

    this.authService
      .authenticate(username, password)
      .pipe(finalize(() => this.processing = false))
      .subscribe((result: AuthResult) => {
        this.errorMessage = result.message;

        if (result.accessToken) {
          this.tokenService.set(result.accessToken);
          this.router.navigate([ '/main' ], { replaceUrl: true });
        }
      });
  }

  async showServerSettings() {
    this.nav.push(ServerSettingsComponent);
  }
}
