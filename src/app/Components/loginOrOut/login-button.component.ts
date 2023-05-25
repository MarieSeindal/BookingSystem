import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'login-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: '<button mat-raised-button color="primary" style="margin: 5px" class="rounded-3" (click)="login()">Log in</button>',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginButtonComponent {
  constructor(public auth: AuthService) {}

  public login() {
    this.auth.loginWithRedirect({
      authorizationParams: {
        redirect_uri: "http://localhost:4200/app"
      }
    });
  }

}
