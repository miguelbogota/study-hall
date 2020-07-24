import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  singinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.singinForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.singinForm.value);
    this.auth.signIn(this.username.value, this.password.value)
      .subscribe(u => console.log('Sign in Succesfull!'));
  }

  // Getters
  get username(): AbstractControl { return this.singinForm.get('username'); }
  get password(): AbstractControl { return this.singinForm.get('password'); }

}
