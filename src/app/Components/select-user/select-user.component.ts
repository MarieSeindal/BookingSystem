import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from '../../Services/UserService';
import {Observable, of} from 'rxjs';
import {User} from './user';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'select-user',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectUserComponent implements OnInit{

  users: Observable<User[]> = of([]);


  constructor(
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.users = this.userService.getAllUsers();
  }



}
