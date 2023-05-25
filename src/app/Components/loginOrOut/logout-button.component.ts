import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {CommonModule, DOCUMENT} from '@angular/common';
import {AuthService} from '@auth0/auth0-angular';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'logout-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <button mat-raised-button color="warn" style="margin: 5px" class="rounded-3" (click)="logout()">Log ud</button>
  `,  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutButtonComponent {
  constructor(
    @Inject(DOCUMENT) public document: Document,
    private auth: AuthService
  ) {}

  logout() {
    this.auth.logout({
      logoutParams: {
        returnTo: this.document.location.origin
      }
    });
  }
}
