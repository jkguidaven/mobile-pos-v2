import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonNav } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { AuthResult } from 'src/app/models/auth-result';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { TransactionQueueService } from 'src/app/services/transaction-queue.service';
import { UserInfoService } from 'src/app/services/user-info.service';
import { ServerSettingsComponent } from './server-settings.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  processing: boolean;

  form: FormGroup = new FormGroup({
    username: new FormControl('', [ Validators.required ]),
    password: new FormControl('', [ Validators.required ])
  });

  private errorMessage: string;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private userInfoService: UserInfoService,
    private transactionQueueService: TransactionQueueService,
    private nav: IonNav,
    private router: Router) { }

  ngOnInit() {
  }

  error(): string {
    return this.errorMessage;
  }

  async authenticate() {
    const username = this.form.controls.username.value;
    const password = this.form.controls.password.value;
    this.processing = true;
    this.errorMessage = null;

    const result: AuthResult = await this.authService.authenticate(username, password);
    this.errorMessage = result.message;

    if (result.accessToken) {
      console.log('setting access token to local storage.');
      this.tokenService.set(result.accessToken);
      console.log('Fetching user info.');
      await this.userInfoService.fetch();
      await this.transactionQueueService.load(true);
      console.log('redirecting to main page');
      this.router.navigate([ '/main' ], { replaceUrl: true });
    }

    this.processing = false;
  }

  async showServerSettings() {
    this.nav.push(ServerSettingsComponent);
  }
}
