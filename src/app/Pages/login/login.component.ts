import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SelectUserComponent} from '../../Components/select-user/select-user.component';

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, SelectUserComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

}
