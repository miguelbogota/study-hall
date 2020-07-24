import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private userS: UserService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.isLoading = true;
    if (this.password.value === this.passwordRepeat.value) {
      
      this.userS.getUser(this.username.value).subscribe(u => {
        if (!u.username) {
          const user: User = {
            email: this.email.value,
            password: this.password.value,
            photoUrl: '',
            status: '¡Hola! ¡Soy nuevo!',
            subjectIds: [],
            type: 'student',
            username: this.username.value
          }
          this.auth.signUp(user)
            .subscribe(u => {
              this.router.navigate(['/singin']);
              this.isLoading = false;
          });
        }
        else {
          this.errorMessage = 'El nombre de usuario ya existe, escoge otro por favor.';
          this.isLoading = false;
        }
      })
    }
    else {
      this.errorMessage = 'Las contraseñas no coinciden, verifica que esten correctas por favor.';
      this.isLoading = false;
    }
  }

  // Getters
  get username(): AbstractControl { return this.signupForm.get('username'); }
  get email(): AbstractControl { return this.signupForm.get('email'); }
  get password(): AbstractControl { return this.signupForm.get('password'); }
  get passwordRepeat(): AbstractControl { return this.signupForm.get('passwordRepeat'); }

}
