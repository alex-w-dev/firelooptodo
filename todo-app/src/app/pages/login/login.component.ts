import { Component } from '@angular/core';
import { User } from '../../shared/sdk/models/User';
import { UserApi } from '../../shared/sdk/services/custom/User';
import { AccessToken } from '../../shared/sdk/models/BaseModels';

@Component({
  selector: 'app-login',
  template: `
  <h1>Login</h1>
  <form (submit)="login()">
    <input type="text" name="email" [(ngModel)]="user.email"/>
    <input type="password" name="password" [(ngModel)]="user.password"/>
    <button>Enter</button>
  </form>
`
})
export class LoginComponent {

  private user: User = new User();

  constructor(private userApi: UserApi) {}

  login(): void {
    this.userApi.login(this.user).subscribe(
      (token: AccessToken) => console.log(token),
      (err) => console.log(err)
    );
  }
}
