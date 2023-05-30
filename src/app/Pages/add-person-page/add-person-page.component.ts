import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../../Services/UserService";
import {Router, RouterLink} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {User} from "../../Components/select-user/user";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-person-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterLink, MatIconModule],
  templateUrl: './add-person-page.component.html',
  styleUrls: ['./add-person-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPersonPageComponent {

  private listOfPersons:any[] = [];

  constructor(
    private userService: UserService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastrService
    ){
  }

  formPerson = this._formBuilder.group({
    firstName: [''],
    lastName: [''],
    password: [''],
  });

  hide = true;
  get passwordInput() { return this.formPerson.get('passWord'); }

  public submitPerson(formPers: FormGroup) {

    const placeholderID: any = '';

    const fname = formPers.get('firstName')?.value;
    const lname = formPers.get('lastName')?.value;
    const pw = formPers.get('password')?.value;

    const user: User = {userId: placeholderID, firstName: fname, lastName: lname, password: pw, isAdmin: false};

    // call service
    this.userService.postUser(user)
      .subscribe((res) => {
        console.log('response form postUser',res);
        // window.location.reload();

        this.toast.success('User created','Success', {
          timeOut: 2000,
          disableTimeOut: false,
        });
      });

  }

}
