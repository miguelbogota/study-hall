import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup = null;
  isLoading = false;
  errorMessage = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  formSubmit(): void {
    this.isLoading = true;
    this.auth.signIn(this.username.value, this.password.value)
      .subscribe(u => {
        if (u) {
          this.router.navigate([`/profile/${this.username.value}`]);
          this.isLoading = false;
        }
        else {
          this.errorMessage = 'Las credenciales no son correctas, por favor verificalas.';
        }
      });
  }

  // Getters
  get username(): AbstractControl { return this.signInForm.get('username'); }
  get password(): AbstractControl { return this.signInForm.get('password'); }

}
