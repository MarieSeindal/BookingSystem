import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {LogoutButtonComponent} from '../Components/loginOrOut/logout-button.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatToolbarModule, RouterLink, RouterOutlet, LogoutButtonComponent],
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLayoutComponent implements OnInit{


  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('user') === null) {
      this.router.navigate(['login']);
    }
  }

  public logOut(event: Event) {
    sessionStorage.removeItem('user');
    this.router.navigate(['login']);

  }
}
