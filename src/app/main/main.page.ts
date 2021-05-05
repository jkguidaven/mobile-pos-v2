import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../services/user-info.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(
    private userInfoService: UserInfoService) {
    }

  ngOnInit() {
    this.userInfoService.load();
  }
}
