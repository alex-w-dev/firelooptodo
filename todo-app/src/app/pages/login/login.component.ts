import { Component } from '@angular/core';
import { User } from '../../shared/sdk/models/User';
import { UserApi } from '../../shared/sdk/services/custom/User';
import { AccessToken } from '../../shared/sdk/models/BaseModels';
import { RealTime } from '../../shared/sdk/services/core/real.time';
import { Router } from '@angular/router';
import { SocketConnection } from '../../shared/sdk/sockets/socket.connections';

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

  constructor(private userApi: UserApi, private realTime: RealTime, private router: Router, private socketConnection: SocketConnection) {}

  login(): void {
    this.userApi.login(this.user).subscribe(
      (token: AccessToken) => this.realTime.onReady().subscribe(() => {
        this.socketConnection.on('authenticated', () => {
          this.router.navigate(['/todo']);
        })
      }),
      (err) => console.log(err)
    );
  }
}
