import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SelectUserComponent} from '../../Components/select-user/select-user.component';
import {LoginButtonComponent} from '../../Components/loginOrOut/login-button.component';

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, SelectUserComponent, LoginButtonComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

}
