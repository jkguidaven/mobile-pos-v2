import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  username: string = "James kenneth A. guidaven";

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit() {}

  showDBSyncPage() {
  }

  showProfilePage() {
  }

  logout() {
    this.tokenService.set(undefined);
    this.router.navigate([ 'login' ]);
  }
}
