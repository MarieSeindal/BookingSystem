import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {UserService} from "../Services/UserService";

@Component({
  selector: 'app-layout',
  standalone: true,
	imports: [CommonModule, MatButtonModule, MatIconModule, MatToolbarModule, RouterLink, RouterOutlet],
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent implements OnInit {

  protected adminAccess = false;


  constructor(
    private router: Router,
    private ref: ChangeDetectorRef,
    private userService: UserService,
  ) {
  }

  public async ngOnInit() {
    const userId = sessionStorage.getItem('user');
    if (!(userId === null)) {

      //Fetch user permission
      const isAdmin = await this.userService.getUserPermission(userId);

      isAdmin.forEach(b => {
        this.adminAccess = b;
        console.log('Is admin', this.adminAccess,b);

      }); // there should be only 1 value in the returned array



    } else {
      this.router.navigate(['login']);
    }
  }

  public logOut(event: Event) {
    sessionStorage.removeItem('user');
    this.router.navigate(['login']);

  }
}
