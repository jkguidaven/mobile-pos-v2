import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from './pages/form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  rootPage: any = LoginFormComponent;

  ngOnInit() {
  }
}
